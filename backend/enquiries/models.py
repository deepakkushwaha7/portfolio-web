"""
Enquiries application models.

Two separate forms:
  1. HireEnquiry  — for contract / full-time / advisory opportunities.
  2. ContactMessage — generic contact / feedback messages.
"""

from django.db import models


class HireEnquiry(models.Model):
    ROLE_TYPE_CHOICES = [
        ("contract", "Contract"),
        ("fulltime", "Full-time"),
        ("advisory", "Advisory"),
        ("other", "Other"),
    ]

    STATUS_CHOICES = [
        ("new", "New"),
        ("replied", "Replied"),
        ("archived", "Archived"),
    ]

    name = models.CharField(max_length=200)
    email = models.EmailField()
    company = models.CharField(max_length=200, blank=True)
    role_type = models.CharField(max_length=20, choices=ROLE_TYPE_CHOICES)
    budget_range = models.CharField(max_length=100, blank=True)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "hire enquiries"

    def __str__(self):
        return f"{self.name} ({self.email}) — {self.role_type}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=300)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.subject} — {self.name}"
