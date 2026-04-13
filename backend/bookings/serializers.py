"""
Bookings serializers.
"""

from rest_framework import serializers

from .models import Availability, MockInterviewBooking


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ["id", "date", "time_slots", "is_active"]


class BookingCreateSerializer(serializers.ModelSerializer):
    """
    Write-only input serializer used when a visitor initiates a booking.
    Sensitive fields (payment status, merchant_order_id, etc.) are excluded
    and handled internally.
    """

    class Meta:
        model = MockInterviewBooking
        fields = [
            "name",
            "email",
            "phone",
            "slot_datetime",
            "focus_areas",
            "current_role",
            "target_role",
            "notes",
        ]

    def validate_focus_areas(self, value):
        allowed = {"system_design", "dsa", "ai_ml", "behavioral"}
        invalid = set(value) - allowed
        if invalid:
            raise serializers.ValidationError(
                f"Invalid focus area(s): {', '.join(invalid)}. "
                f"Allowed values: {', '.join(sorted(allowed))}."
            )
        return value

    def validate_slot_datetime(self, value):
        from django.utils import timezone

        if value <= timezone.now():
            raise serializers.ValidationError("Slot datetime must be in the future.")
        return value


class BookingDetailSerializer(serializers.ModelSerializer):
    """
    Full serializer used in admin views and confirmation responses.
    """

    class Meta:
        model = MockInterviewBooking
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "slot_datetime",
            "focus_areas",
            "current_role",
            "target_role",
            "notes",
            "amount",
            "payment_status",
            "phonepe_transaction_id",
            "merchant_order_id",
            "session_status",
            "meeting_link",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["merchant_order_id", "created_at", "updated_at"]
