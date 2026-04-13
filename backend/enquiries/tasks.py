"""
Celery tasks for the enquiries app.
"""

import logging

from celery import shared_task
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags

logger = logging.getLogger(__name__)


@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_hire_enquiry_notification(self, enquiry_id: int):
    """
    Notify Deepak (kdeepakkushwaha@gmail.com) when a new hire enquiry arrives.
    Retries up to 3 times on SMTP failure.
    """
    from .models import HireEnquiry

    try:
        enquiry = HireEnquiry.objects.get(pk=enquiry_id)
    except HireEnquiry.DoesNotExist:
        logger.error("send_hire_enquiry_notification: enquiry %d not found.", enquiry_id)
        return

    admin_email = getattr(settings, "ADMIN_EMAIL", "kdeepakkushwaha@gmail.com")
    from_email = getattr(settings, "DEFAULT_FROM_EMAIL", "noreply@deepakkushwaha.com")

    subject = f"[Hire Enquiry] {enquiry.name} — {enquiry.get_role_type_display()}"

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a2e;">New Hire Enquiry</h2>
      <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 35%;">Name</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{enquiry.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">
            <a href="mailto:{enquiry.email}">{enquiry.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Company</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{enquiry.company or "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Role Type</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{enquiry.get_role_type_display()}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Budget Range</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{enquiry.budget_range or "Not specified"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Message</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{enquiry.message}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Received At</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{enquiry.created_at.strftime("%d %b %Y, %I:%M %p IST")}</td>
        </tr>
      </table>
      <p>
        <a href="mailto:{enquiry.email}?subject=Re: Your Enquiry"
           style="background: #1a1a2e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
          Reply to {enquiry.name}
        </a>
      </p>
    </div>
    """

    try:
        msg = EmailMultiAlternatives(
            subject=subject,
            body=strip_tags(html_body),
            from_email=from_email,
            to=[admin_email],
            reply_to=[enquiry.email],
        )
        msg.attach_alternative(html_body, "text/html")
        msg.send()
        logger.info("Hire enquiry notification sent for enquiry %d.", enquiry_id)
    except Exception as exc:
        logger.error("Failed to send hire enquiry notification: %s", exc)
        raise self.retry(exc=exc)


@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_contact_notification(self, message_id: int):
    """
    Notify Deepak when a new contact message arrives.
    Retries up to 3 times on SMTP failure.
    """
    from .models import ContactMessage

    try:
        contact = ContactMessage.objects.get(pk=message_id)
    except ContactMessage.DoesNotExist:
        logger.error("send_contact_notification: message %d not found.", message_id)
        return

    admin_email = getattr(settings, "ADMIN_EMAIL", "kdeepakkushwaha@gmail.com")
    from_email = getattr(settings, "DEFAULT_FROM_EMAIL", "noreply@deepakkushwaha.com")

    subject = f"[Contact] {contact.subject} — {contact.name}"

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a2e;">New Contact Message</h2>
      <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 35%;">Name</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{contact.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">
            <a href="mailto:{contact.email}">{contact.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Subject</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{contact.subject}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Message</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{contact.message}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Received At</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">{contact.created_at.strftime("%d %b %Y, %I:%M %p IST")}</td>
        </tr>
      </table>
      <p>
        <a href="mailto:{contact.email}?subject=Re: {contact.subject}"
           style="background: #1a1a2e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
          Reply to {contact.name}
        </a>
      </p>
    </div>
    """

    try:
        msg = EmailMultiAlternatives(
            subject=subject,
            body=strip_tags(html_body),
            from_email=from_email,
            to=[admin_email],
            reply_to=[contact.email],
        )
        msg.attach_alternative(html_body, "text/html")
        msg.send()
        logger.info("Contact notification sent for message %d.", message_id)
    except Exception as exc:
        logger.error("Failed to send contact notification: %s", exc)
        raise self.retry(exc=exc)
