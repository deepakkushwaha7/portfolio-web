"""
Portfolio URL configuration.

Registered via DefaultRouter:
  GET  /api/portfolio/projects/           — paginated project list
  GET  /api/portfolio/projects/{slug}/    — project detail
"""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ProjectViewSet

router = DefaultRouter()
router.register(r"projects", ProjectViewSet, basename="project")

urlpatterns = [
    path("", include(router.urls)),
]
