"""
Bookings application models.

Handles availability slots and mock-interview booking + PhonePe payment flow.
"""

import uuid

from django.db import models


class Availability(models.Model):
    """
    Stores available time slots for a given date.
    time_slots is a list of "HH:MM" strings, e.g. ["10:00", "11:00", "14:00"].
    """

    date = models.DateField(unique=True)
    time_slots = models.JSONField(
        default=list,
        help_text='List of available time strings, e.g. ["10:00", "14:00"]',
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["date"]
        verbose_name_plural = "availabilities"

    def __str__(self):
        return f"{self.date} — {len(self.time_slots)} slot(s)"


class MockInterviewBooking(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ("pending", "Pending"),
        ("paid", "Paid"),
        ("refunded", "Refunded"),
        ("cancelled", "Cancelled"),
    ]

    SESSION_STATUS_CHOICES = [
        ("scheduled", "Scheduled"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    # Candidate details
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)

    # Booking details
    slot_datetime = models.DateTimeField()
    focus_areas = models.JSONField(
        default=list,
        help_text='e.g. ["system_design", "dsa", "ai_ml", "behavioral"]',
    )
    current_role = models.CharField(max_length=200, blank=True)
    target_role = models.CharField(max_length=200, blank=True)
    notes = models.TextField(blank=True)

    # Payment
    amount = models.DecimalField(max_digits=8, decimal_places=2, default=499.00)
    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS_CHOICES,
        default="pending",
    )
    phonepe_transaction_id = models.CharField(max_length=200, blank=True)
    merchant_order_id = models.CharField(max_length=200, unique=True, blank=True)

    # Session
    session_status = models.CharField(
        max_length=20,
        choices=SESSION_STATUS_CHOICES,
        default="scheduled",
    )
    meeting_link = models.CharField(max_length=500, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} — {self.slot_datetime:%Y-%m-%d %H:%M} ({self.payment_status})"

    def save(self, *args, **kwargs):
        # Auto-generate a human-readable, unique merchant order ID on first save.
        if not self.merchant_order_id:
            self.merchant_order_id = f"DK-{uuid.uuid4().hex[:12].upper()}"
        super().save(*args, **kwargs)
