"""
Bookings views.

Endpoints:
  GET  /api/bookings/availability/       — next-30-day active slots
  POST /api/bookings/create-order/       — create booking + initiate payment
  POST /api/bookings/confirm-payment/    — mark paid + trigger confirmation email
  POST /api/bookings/webhook/phonepe/    — PhonePe server-to-server webhook
  GET  /api/bookings/admin/              — admin: list all bookings (with filters)
"""

import hashlib
import hmac
import json
import logging
from datetime import timedelta

from django.conf import settings
from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Availability, MockInterviewBooking
from .serializers import (
    AvailabilitySerializer,
    BookingCreateSerializer,
    BookingDetailSerializer,
)
from .tasks import send_booking_confirmation

logger = logging.getLogger(__name__)


class AvailabilityView(APIView):
    """
    GET /api/bookings/availability/
    Returns active availability records for the next 30 days.
    """

    permission_classes = [AllowAny]

    def get(self, request):
        today = timezone.localdate()
        end_date = today + timedelta(days=30)
        slots = Availability.objects.filter(
            is_active=True,
            date__gte=today,
            date__lte=end_date,
        )
        serializer = AvailabilitySerializer(slots, many=True)
        return Response(serializer.data)


class CreateOrderView(APIView):
    """
    POST /api/bookings/create-order/

    Validates the requested slot, creates a MockInterviewBooking with
    payment_status=pending, and returns the merchant_order_id and amount so
    the frontend can proceed to the PhonePe checkout.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = BookingCreateSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        slot_datetime = serializer.validated_data["slot_datetime"]

        # Guard: reject if another paid booking already occupies this exact slot.
        conflict = MockInterviewBooking.objects.filter(
            slot_datetime=slot_datetime,
            payment_status="paid",
        ).exists()
        if conflict:
            return Response(
                {"detail": "This time slot is no longer available. Please choose another."},
                status=status.HTTP_409_CONFLICT,
            )

        booking = serializer.save()

        return Response(
            {
                "booking_id": booking.id,
                "merchant_order_id": booking.merchant_order_id,
                "amount": str(booking.amount),
                "currency": "INR",
                # PhonePe checkout URL will be constructed on the frontend
                # using the merchant_order_id once the PhonePe SDK is integrated.
                "payment_gateway": "phonepe",
            },
            status=status.HTTP_201_CREATED,
        )


class ConfirmPaymentView(APIView):
    """
    POST /api/bookings/confirm-payment/

    Called by the frontend after PhonePe redirects back to the success page.
    Updates payment_status to 'paid' and triggers the confirmation email task.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        merchant_order_id = request.data.get("merchant_order_id")
        phonepe_transaction_id = request.data.get("phonepe_transaction_id")

        if not merchant_order_id:
            return Response(
                {"detail": "merchant_order_id is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            booking = MockInterviewBooking.objects.get(merchant_order_id=merchant_order_id)
        except MockInterviewBooking.DoesNotExist:
            return Response(
                {"detail": "Booking not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if booking.payment_status == "paid":
            # Idempotent — already confirmed, just return success.
            return Response(
                {
                    "success": True,
                    "detail": "Payment already confirmed.",
                    "booking": BookingDetailSerializer(booking).data,
                }
            )

        booking.payment_status = "paid"
        if phonepe_transaction_id:
            booking.phonepe_transaction_id = phonepe_transaction_id
        booking.save(update_fields=["payment_status", "phonepe_transaction_id", "updated_at"])

        # Fire-and-forget: send confirmation emails asynchronously.
        send_booking_confirmation.delay(booking.id)

        return Response(
            {
                "success": True,
                "booking": BookingDetailSerializer(booking).data,
            }
        )


class PhonePeWebhookView(APIView):
    """
    POST /api/bookings/webhook/phonepe/

    PhonePe server-to-server callback. Verifies the checksum and updates
    the booking payment status accordingly.

    PhonePe sends:  { "response": "<base64-encoded-payload>" }
    The X-VERIFY header contains: SHA256(response + "/pg/v1/status" + salt_key) + "###" + salt_index
    """

    permission_classes = [AllowAny]

    def post(self, request):
        import base64

        x_verify = request.headers.get("X-VERIFY", "")
        raw_body = request.data

        phonepe_salt_key = getattr(settings, "PHONEPE_SALT_KEY", "")
        phonepe_salt_index = getattr(settings, "PHONEPE_SALT_INDEX", "1")

        if phonepe_salt_key:
            # Validate checksum
            response_b64 = raw_body.get("response", "")
            expected_hash = hashlib.sha256(
                f"{response_b64}/pg/v1/status{phonepe_salt_key}".encode()
            ).hexdigest()
            expected_verify = f"{expected_hash}###{phonepe_salt_index}"

            if not hmac.compare_digest(x_verify, expected_verify):
                logger.warning("PhonePe webhook: checksum mismatch.")
                return Response(
                    {"detail": "Invalid checksum."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        # Decode payload
        try:
            response_b64 = raw_body.get("response", "")
            payload = json.loads(base64.b64decode(response_b64).decode())
        except Exception as exc:
            logger.error("PhonePe webhook: failed to decode payload — %s", exc)
            return Response(
                {"detail": "Invalid payload."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = payload.get("data", {})
        merchant_order_id = data.get("merchantOrderId") or data.get("merchantTransactionId")
        transaction_id = data.get("transactionId") or data.get("providerReferenceId", "")
        payment_state = data.get("state", "")  # COMPLETED | FAILED | PENDING

        if not merchant_order_id:
            return Response({"detail": "merchantOrderId missing."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            booking = MockInterviewBooking.objects.get(merchant_order_id=merchant_order_id)
        except MockInterviewBooking.DoesNotExist:
            logger.error("PhonePe webhook: booking %s not found.", merchant_order_id)
            return Response({"detail": "Booking not found."}, status=status.HTTP_404_NOT_FOUND)

        if payment_state == "COMPLETED" and booking.payment_status != "paid":
            booking.payment_status = "paid"
            booking.phonepe_transaction_id = transaction_id
            booking.save(update_fields=["payment_status", "phonepe_transaction_id", "updated_at"])
            send_booking_confirmation.delay(booking.id)
            logger.info("PhonePe webhook: booking %s marked paid.", merchant_order_id)

        elif payment_state == "FAILED" and booking.payment_status == "pending":
            booking.payment_status = "cancelled"
            booking.save(update_fields=["payment_status", "updated_at"])
            logger.info("PhonePe webhook: booking %s marked cancelled.", merchant_order_id)

        return Response({"success": True})


class BookingListView(APIView):
    """
    GET /api/bookings/admin/
    Admin-only: list all bookings with optional query filters.
    """

    permission_classes = [IsAdminUser]

    def get(self, request):
        qs = MockInterviewBooking.objects.all()

        payment_status = request.query_params.get("payment_status")
        if payment_status:
            qs = qs.filter(payment_status=payment_status)

        session_status = request.query_params.get("session_status")
        if session_status:
            qs = qs.filter(session_status=session_status)

        from_date = request.query_params.get("from_date")
        if from_date:
            qs = qs.filter(slot_datetime__date__gte=from_date)

        to_date = request.query_params.get("to_date")
        if to_date:
            qs = qs.filter(slot_datetime__date__lte=to_date)

        serializer = BookingDetailSerializer(qs, many=True)
        return Response({"count": qs.count(), "results": serializer.data})
