"""
Blog views — ModelViewSets for Posts, Tags, and Categories.

Public access (list/retrieve) requires no auth.
Create/update/partial_update/destroy requires IsAdminUser.
"""

from rest_framework import filters, mixins, viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly

from .models import Category, Post, Tag
from .serializers import (
    CategorySerializer,
    PostDetailSerializer,
    PostListSerializer,
    TagSerializer,
)


class PostViewSet(viewsets.ModelViewSet):
    """
    /api/blog/posts/          — list (paginated, 12/page), filterable
    /api/blog/posts/{slug}/   — retrieve full post
    POST/PUT/PATCH/DELETE      — admin only
    """

    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = "slug"
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "body", "excerpt"]
    ordering_fields = ["published_at", "created_at", "read_time"]
    ordering = ["-published_at"]

    def get_queryset(self):
        qs = Post.objects.select_related("category").prefetch_related("tags")

        # Non-admin users only see published posts.
        if not (self.request.user and self.request.user.is_staff):
            qs = qs.filter(is_published=True)

        # Filter by tag slug.
        tag_slug = self.request.query_params.get("tag")
        if tag_slug:
            qs = qs.filter(tags__slug=tag_slug)

        # Filter by category slug.
        category_slug = self.request.query_params.get("category")
        if category_slug:
            qs = qs.filter(category__slug=category_slug)

        return qs.distinct()

    def get_serializer_class(self):
        if self.action == "list":
            return PostListSerializer
        return PostDetailSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAdminUser()]
        return [IsAuthenticatedOrReadOnly()]


class TagViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """Read-only list of all tags."""

    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None  # return all tags without pagination


class CategoryViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """Read-only list of all categories."""

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None
