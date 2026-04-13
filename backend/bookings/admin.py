"""
Bookings admin configuration.
"""

from django.contrib import admin
from django.utils.html import format_html

from .models import Availability, MockInterviewBooking


@admin.register(Availability)
class AvailabilityAdmin(admin.ModelAdmin):
    list_display = ["date", "slot_count", "is_active"]
    list_filter = ["is_active"]
    list_editable = ["is_active"]
    ordering = ["date"]
    date_hierarchy = "date"

    def slot_count(self, obj):
        return len(obj.time_slots)

    slot_count.short_description = "Slots"


@admin.register(MockInterviewBooking)
class MockInterviewBookingAdmin(admin.ModelAdmin):
    list_display = [
        "merchant_order_id",
        "name",
        "email",
        "slot_datetime",
        "payment_status",
        "session_status",
        "amount",
        "created_at",
    ]
    list_filter = [
        "payment_status",
        "session_status",
        "created_at",
    ]
    search_fields = ["name", "email", "merchant_order_id", "phonepe_transaction_id"]
    readonly_fields = [
        "merchant_order_id",
        "created_at",
        "updated_at",
        "phonepe_transaction_id",
    ]
    ordering = ["-created_at"]
    date_hierarchy = "created_at"

    fieldsets = (
        (
            "Candidate",
            {
                "fields": (
                    "name",
                    "email",
                    "phone",
                    "current_role",
                    "target_role",
                )
            },
        ),
        (
            "Booking",
            {
                "fields": (
                    "slot_datetime",
                    "focus_areas",
                    "notes",
                )
            },
        ),
        (
            "Payment",
            {
                "fields": (
                    "amount",
                    "payment_status",
                    "merchant_order_id",
                    "phonepe_transaction_id",
                )
            },
        ),
        (
            "Session",
            {
                "fields": (
                    "session_status",
                    "meeting_link",
                )
            },
        ),
        (
            "Timestamps",
            {
                "fields": ("created_at", "updated_at"),
                "classes": ("collapse",),
            },
        ),
    )
