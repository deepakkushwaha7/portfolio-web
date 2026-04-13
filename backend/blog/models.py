"""
Blog application models.

Covers Tags, Categories, and Posts (TipTap HTML body).
"""

from django.db import models
from django.utils import timezone


class Tag(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "categories"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=300)
    slug = models.SlugField(unique=True, max_length=300)
    excerpt = models.TextField(max_length=500)
    body = models.TextField(help_text="HTML content from TipTap editor")
    cover_image = models.URLField(blank=True)

    tags = models.ManyToManyField(Tag, blank=True, related_name="posts")
    category = models.ForeignKey(
        Category,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="posts",
    )

    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # SEO fields
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.CharField(max_length=300, blank=True)
    og_image = models.URLField(blank=True)

    # Auto-calculated reading time (words / 200 wpm, minimum 1 minute)
    read_time = models.IntegerField(default=0)

    class Meta:
        ordering = ["-published_at", "-created_at"]

    def __str__(self):
        return self.title

    def _calculate_read_time(self) -> int:
        """Return estimated reading time in minutes (minimum 1)."""
        word_count = len(self.body.split())
        return max(1, word_count // 200)

    def save(self, *args, **kwargs):
        # Auto-set published_at the first time is_published flips to True.
        if self.is_published and self.published_at is None:
            self.published_at = timezone.now()
        # If un-published, clear the timestamp so it can be reset cleanly later.
        elif not self.is_published:
            self.published_at = None

        # Recalculate reading time on every save.
        self.read_time = self._calculate_read_time()

        super().save(*args, **kwargs)
