"""
Enquiries admin configuration.
"""

from django.contrib import admin

from .models import ContactMessage, HireEnquiry


@admin.register(HireEnquiry)
class HireEnquiryAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "company", "role_type", "status", "created_at"]
    list_filter = ["role_type", "status", "created_at"]
    search_fields = ["name", "email", "company", "message"]
    list_editable = ["status"]
    readonly_fields = ["created_at"]
    ordering = ["-created_at"]
    date_hierarchy = "created_at"

    fieldsets = (
        (
            "Contact",
            {"fields": ("name", "email", "company")},
        ),
        (
            "Enquiry Details",
            {"fields": ("role_type", "budget_range", "message")},
        ),
        (
            "Admin",
            {"fields": ("status", "created_at")},
        ),
    )


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "subject", "created_at"]
    search_fields = ["name", "email", "subject", "message"]
    readonly_fields = ["created_at"]
    ordering = ["-created_at"]
    date_hierarchy = "created_at"
