"""
Blog serializers.
"""

from rest_framework import serializers

from .models import Category, Post, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name", "slug"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description"]


class PostListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views — excludes the heavy body field."""

    tags = TagSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "cover_image",
            "tags",
            "category",
            "published_at",
            "read_time",
            "meta_description",
        ]


class PostDetailSerializer(serializers.ModelSerializer):
    """Full serializer for detail / create / update views."""

    tags = TagSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)

    # Accept tag IDs and category ID on write.
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        many=True,
        write_only=True,
        required=False,
        source="tags",
    )
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        write_only=True,
        required=False,
        allow_null=True,
        source="category",
    )

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "body",
            "cover_image",
            "tags",
            "tag_ids",
            "category",
            "category_id",
            "is_published",
            "published_at",
            "created_at",
            "updated_at",
            "meta_title",
            "meta_description",
            "og_image",
            "read_time",
        ]
        read_only_fields = ["published_at", "created_at", "updated_at", "read_time"]
