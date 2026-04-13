"""
Enquiries serializers.
"""

from rest_framework import serializers

from .models import ContactMessage, HireEnquiry


class HireEnquiryCreateSerializer(serializers.ModelSerializer):
    """
    Input serializer for the public hire-enquiry form.
    Status is managed internally and not exposed to the submitter.
    """

    class Meta:
        model = HireEnquiry
        fields = [
            "name",
            "email",
            "company",
            "role_type",
            "budget_range",
            "message",
        ]


class HireEnquiryDetailSerializer(serializers.ModelSerializer):
    """Full read serializer for admin use."""

    class Meta:
        model = HireEnquiry
        fields = [
            "id",
            "name",
            "email",
            "company",
            "role_type",
            "budget_range",
            "message",
            "status",
            "created_at",
        ]
        read_only_fields = ["created_at"]


class ContactMessageSerializer(serializers.ModelSerializer):
    """Serializer for the public contact form (create) and admin read."""

    class Meta:
        model = ContactMessage
        fields = [
            "id",
            "name",
            "email",
            "subject",
            "message",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
