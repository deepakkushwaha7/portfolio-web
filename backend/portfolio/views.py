"""
Portfolio views — ModelViewSet for Projects.

Public access for list/retrieve; admin required for mutations.
"""

from rest_framework import filters, viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly

from .models import Project
from .serializers import ProjectDetailSerializer, ProjectListSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    """
    /api/portfolio/projects/         — list, filterable by category / is_featured
    /api/portfolio/projects/{slug}/  — retrieve full project detail
    POST/PUT/PATCH/DELETE             — admin only
    """

    lookup_field = "slug"
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "tagline", "description", "tech_tags", "company"]
    ordering_fields = ["order", "created_at"]
    ordering = ["order", "-created_at"]

    def get_queryset(self):
        qs = Project.objects.all()

        # Filter by category value (e.g. AI_PRODUCT, SAAS).
        category = self.request.query_params.get("category")
        if category:
            qs = qs.filter(category=category)

        # Filter by featured flag.
        is_featured = self.request.query_params.get("is_featured")
        if is_featured is not None:
            qs = qs.filter(is_featured=is_featured.lower() in ("true", "1", "yes"))

        return qs

    def get_serializer_class(self):
        if self.action == "list":
            return ProjectListSerializer
        return ProjectDetailSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAdminUser()]
        return [IsAuthenticatedOrReadOnly()]
