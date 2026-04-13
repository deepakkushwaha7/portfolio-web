"""
Portfolio serializers.
"""

from rest_framework import serializers

from .models import Project


class ProjectListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list / grid views."""

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "tagline",
            "cover_image",
            "tech_tags",
            "category",
            "is_featured",
            "order",
            "date_range",
            "company",
            "role",
        ]


class ProjectDetailSerializer(serializers.ModelSerializer):
    """Full serializer including description HTML, gallery, metrics, links."""

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "tagline",
            "description",
            "cover_image",
            "gallery",
            "tech_tags",
            "category",
            "links",
            "company",
            "role",
            "date_range",
            "metrics",
            "is_featured",
            "order",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]
