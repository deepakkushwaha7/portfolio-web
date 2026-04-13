"""
Enquiries URL configuration.

  POST /api/enquiries/hire/     — submit hire / collaboration enquiry
  POST /api/enquiries/contact/  — submit general contact message
"""

from django.urls import path

from .views import ContactMessageCreateView, HireEnquiryCreateView

urlpatterns = [
    path("hire/", HireEnquiryCreateView.as_view(), name="hire-enquiry-create"),
    path("contact/", ContactMessageCreateView.as_view(), name="contact-message-create"),
]
