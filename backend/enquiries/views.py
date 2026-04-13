"""
Enquiries views.

  POST /api/enquiries/hire/     — submit a hire / collaboration enquiry
  POST /api/enquiries/contact/  — submit a general contact message
"""

import logging

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ContactMessage, HireEnquiry
from .serializers import ContactMessageSerializer, HireEnquiryCreateSerializer
from .tasks import send_contact_notification, send_hire_enquiry_notification

logger = logging.getLogger(__name__)


class HireEnquiryCreateView(APIView):
    """
    POST /api/enquiries/hire/

    Anyone can submit a hire enquiry. After creation, an email notification
    is dispatched asynchronously via Celery.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = HireEnquiryCreateSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        enquiry = serializer.save()

        # Trigger async notification to Deepak.
        send_hire_enquiry_notification.delay(enquiry.id)

        return Response(
            {
                "success": True,
                "detail": "Your enquiry has been received. I'll be in touch shortly.",
            },
            status=status.HTTP_201_CREATED,
        )


class ContactMessageCreateView(APIView):
    """
    POST /api/enquiries/contact/

    Generic contact form. Notification email sent asynchronously.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        message = serializer.save()

        # Trigger async notification to Deepak.
        send_contact_notification.delay(message.id)

        return Response(
            {
                "success": True,
                "detail": "Message received! I'll get back to you soon.",
            },
            status=status.HTTP_201_CREATED,
        )
