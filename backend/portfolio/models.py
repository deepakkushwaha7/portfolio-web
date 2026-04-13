"""
Portfolio application models.

Each Project represents a piece of work — product, SaaS, consulting, startup.
"""

from django.db import models


class Project(models.Model):
    CATEGORY_CHOICES = [
        ("AI_PRODUCT", "AI Product"),
        ("SAAS", "SaaS"),
        ("STARTUP", "Startup"),
        ("CONSULTING", "Consulting"),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    tagline = models.CharField(max_length=300)
    description = models.TextField(help_text="HTML content")
    cover_image = models.URLField(blank=True)

    # gallery: list of image URL strings
    gallery = models.JSONField(default=list, blank=True)

    # tech_tags: list of technology name strings, e.g. ["Python", "FastAPI"]
    tech_tags = models.JSONField(default=list, blank=True)

    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)

    # links: dict with optional keys: live, github, case_study
    links = models.JSONField(
        default=dict,
        blank=True,
        help_text='e.g. {"live": "https://...", "github": "https://...", "case_study": "https://..."}',
    )

    company = models.CharField(max_length=200, blank=True)
    role = models.CharField(max_length=200, blank=True)
    date_range = models.CharField(max_length=100, blank=True, help_text='e.g. "Jan 2023 – Mar 2024"')

    # metrics: list of {label, value} dicts, e.g. [{"label": "Users", "value": "10k+"}]
    metrics = models.JSONField(default=list, blank=True)

    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0, help_text="Lower number appears first")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.title
