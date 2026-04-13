"""
Blog URL configuration.

Registered via DefaultRouter:
  GET  /api/blog/posts/           — paginated post list
  GET  /api/blog/posts/{slug}/    — post detail
  GET  /api/blog/tags/            — all tags
  GET  /api/blog/categories/      — all categories
"""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CategoryViewSet, PostViewSet, TagViewSet

router = DefaultRouter()
router.register(r"posts", PostViewSet, basename="post")
router.register(r"tags", TagViewSet, basename="tag")
router.register(r"categories", CategoryViewSet, basename="category")

urlpatterns = [
    path("", include(router.urls)),
]
