"""
Celery tasks for the bookings app.
"""

import logging

from celery import shared_task
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

logger = logging.getLogger(__name__)


@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_booking_confirmation(self, booking_id: int):
    """
    Send two emails after a successful payment:
      1. Confirmation email to the candidate with slot details.
      2. New-booking notification to Deepak (kdeepakkushwaha@gmail.com).

    Retries up to 3 times on failure (60-second delay between attempts).

    TODO: Add Google Calendar invite creation using the Google Calendar API
          and attach the .ics invite to the candidate's confirmation email.
    """
    from .models import MockInterviewBooking

    try:
        booking = MockInterviewBooking.objects.get(pk=booking_id)
    except MockInterviewBooking.DoesNotExist:
        logger.error("send_booking_confirmation: booking %d not found.", booking_id)
        return

    admin_email = getattr(settings, "ADMIN_EMAIL", "kdeepakkushwaha@gmail.com")
    from_email = getattr(settings, "DEFAULT_FROM_EMAIL", "noreply@deepakkushwaha.com")

    slot_str = booking.slot_datetime.strftime("%A, %d %B %Y at %I:%M %p IST")
    focus_display = ", ".join(a.replace("_", " ").title() for a in booking.focus_areas) or "General"

    # ------------------------------------------------------------------ #
    # 1. Candidate confirmation email
    # ------------------------------------------------------------------ #
    candidate_subject = f"Mock Interview Booking Confirmed — {slot_str}"

    candidate_html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a2e;">Your Mock Interview is Confirmed!</h2>
      <p>Hi <strong>{booking.name}</strong>,</p>
      <p>Thank you for booking a mock interview session. Here are your details:</p>
      <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">Date &amp; Time</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{slot_str}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Focus Areas</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{focus_display}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Amount Paid</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">₹{booking.amount}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Order ID</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{booking.merchant_order_id}</td>
        </tr>
        {"<tr><td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;'>Meeting Link</td><td style='padding: 8px; border-bottom: 1px solid #eee;'><a href='" + booking.meeting_link + "'>" + booking.meeting_link + "</a></td></tr>" if booking.meeting_link else ""}
      </table>
      <p>I'll send you the meeting link 24 hours before the session if it's not already included above.</p>
      <p>If you have any questions, reply to this email or reach out at
         <a href="mailto:{admin_email}">{admin_email}</a>.</p>
      <p>Looking forward to our session!</p>
      <p style="margin-top: 32px;">— Deepak Kushwaha<br/>
         <em>AI Architect &amp; Engineering Leader</em><br/>
         <a href="https://deepakkushwaha.com">deepakkushwaha.com</a>
      </p>
    </div>
    """

    try:
        candidate_msg = EmailMultiAlternatives(
            subject=candidate_subject,
            body=strip_tags(candidate_html),
            from_email=from_email,
            to=[booking.email],
        )
        candidate_msg.attach_alternative(candidate_html, "text/html")
        candidate_msg.send()
        logger.info("Confirmation email sent to %s for booking %d.", booking.email, booking_id)
    except Exception as exc:
        logger.error("Failed to send candidate confirmation email: %s", exc)
        raise self.retry(exc=exc)

    # ------------------------------------------------------------------ #
    # 2. Admin notification email to Deepak
    # ------------------------------------------------------------------ #
    admin_subject = f"[New Booking] {booking.name} — {slot_str}"

    admin_html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a2e;">New Mock Interview Booking</h2>
      <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">Name</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{booking.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{booking.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{booking.phone or "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Slot</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{slot_str}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Focus Areas</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{focus_display}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Current Role</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{booking.current_role or "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Target Role</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{booking.target_role or "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Notes</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{booking.notes or "—"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Amount</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">₹{booking.amount}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Order ID</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{booking.merchant_order_id}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">PhonePe Txn</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{booking.phonepe_transaction_id or "N/A"}</td>
        </tr>
      </table>
    </div>
    """

    try:
        admin_msg = EmailMultiAlternatives(
            subject=admin_subject,
            body=strip_tags(admin_html),
            from_email=from_email,
            to=[admin_email],
        )
        admin_msg.attach_alternative(admin_html, "text/html")
        admin_msg.send()
        logger.info("Admin notification sent for booking %d.", booking_id)
    except Exception as exc:
        logger.error("Failed to send admin booking notification: %s", exc)
        # Don't retry for admin notification failure; candidate already notified.
