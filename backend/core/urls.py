"""
Root URL configuration for the portfolio backend.

API surface:
  /api/auth/token/          — obtain JWT (POST)
  /api/auth/token/refresh/  — refresh JWT (POST)
  /api/blog/                — blog posts, tags, categories
  /api/portfolio/           — portfolio projects
  /api/bookings/            — availability, booking flow, webhook
  /api/enquiries/           — hire enquiry + contact message forms
  /api/admin/stats/         — admin dashboard aggregate stats
  /django-admin/            — Django admin site
"""

from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from accounts.views import AdminDashboardStatsView
from core.health import health_check

urlpatterns = [
    # Health check — no auth, used by Docker + uptime monitors
    path("health/", health_check, name="health-check"),

    # Django admin
    path("django-admin/", admin.site.urls),

    # JWT auth
    path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # App routers / URL configs
    path("api/blog/", include("blog.urls")),
    path("api/portfolio/", include("portfolio.urls")),
    path("api/bookings/", include("bookings.urls")),
    path("api/enquiries/", include("enquiries.urls")),

    # Admin dashboard stats
    path("api/admin/stats/", AdminDashboardStatsView.as_view(), name="admin-dashboard-stats"),
]
