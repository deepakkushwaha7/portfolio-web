"""
Bookings URL configuration.

  GET  /api/bookings/availability/    — next 30-day active slots
  POST /api/bookings/create-order/    — initiate booking + payment
  POST /api/bookings/confirm-payment/ — confirm payment (frontend redirect)
  POST /api/bookings/webhook/phonepe/ — PhonePe server-to-server webhook
  GET  /api/bookings/admin/           — admin: list all bookings
"""

from django.urls import path

from .views import (
    AvailabilityView,
    BookingListView,
    ConfirmPaymentView,
    CreateOrderView,
    PhonePeWebhookView,
)

urlpatterns = [
    path("availability/", AvailabilityView.as_view(), name="booking-availability"),
    path("create-order/", CreateOrderView.as_view(), name="booking-create-order"),
    path("confirm-payment/", ConfirmPaymentView.as_view(), name="booking-confirm-payment"),
    path("webhook/phonepe/", PhonePeWebhookView.as_view(), name="phonepe-webhook"),
    path("admin/", BookingListView.as_view(), name="booking-admin-list"),
]
