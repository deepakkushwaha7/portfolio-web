"""
Portfolio admin configuration.
"""

from django.contrib import admin

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "category",
        "company",
        "is_featured",
        "order",
        "created_at",
    ]
    list_filter = ["category", "is_featured", "created_at"]
    search_fields = ["title", "tagline", "description", "company", "role"]
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ["created_at", "updated_at"]
    list_editable = ["order", "is_featured"]
    ordering = ["order", "-created_at"]

    fieldsets = (
        (
            "Core",
            {
                "fields": (
                    "title",
                    "slug",
                    "tagline",
                    "description",
                    "cover_image",
                    "gallery",
                )
            },
        ),
        (
            "Classification",
            {
                "fields": (
                    "category",
                    "tech_tags",
                    "company",
                    "role",
                    "date_range",
                )
            },
        ),
        (
            "Links & Metrics",
            {
                "fields": (
                    "links",
                    "metrics",
                )
            },
        ),
        (
            "Display",
            {
                "fields": (
                    "is_featured",
                    "order",
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )
