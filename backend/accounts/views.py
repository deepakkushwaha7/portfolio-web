"""
Accounts views.

  POST /api/auth/token/          — obtain JWT access + refresh tokens
  POST /api/auth/token/refresh/  — refresh access token
  GET  /api/admin/stats/         — admin dashboard aggregate stats
"""

import logging
from datetime import timedelta

from django.utils import timezone
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

logger = logging.getLogger(__name__)


class AdminDashboardStatsView(APIView):
    """
    GET /api/admin/stats/

    Returns key metrics for the admin dashboard:
      - Blog post counts
      - Project count
      - Booking stats for the current calendar month
      - Enquiry stats
    """

    permission_classes = [IsAdminUser]

    def get(self, request):
        from blog.models import Post
        from bookings.models import MockInterviewBooking
        from enquiries.models import HireEnquiry
        from portfolio.models import Project

        now = timezone.now()
        month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

        total_posts = Post.objects.count()
        published_posts = Post.objects.filter(is_published=True).count()

        total_projects = Project.objects.count()
        featured_projects = Project.objects.filter(is_featured=True).count()

        bookings_this_month = MockInterviewBooking.objects.filter(
            created_at__gte=month_start
        ).count()

        paid_bookings_this_month = MockInterviewBooking.objects.filter(
            created_at__gte=month_start,
            payment_status="paid",
        ).count()

        revenue_this_month = (
            MockInterviewBooking.objects.filter(
                created_at__gte=month_start,
                payment_status="paid",
            )
            .values_list("amount", flat=True)
        )
        total_revenue_this_month = sum(revenue_this_month)

        new_enquiries = HireEnquiry.objects.filter(status="new").count()
        total_enquiries = HireEnquiry.objects.count()

        return Response(
            {
                "blog": {
                    "total_posts": total_posts,
                    "published_posts": published_posts,
                    "draft_posts": total_posts - published_posts,
                },
                "portfolio": {
                    "total_projects": total_projects,
                    "featured_projects": featured_projects,
                },
                "bookings": {
                    "bookings_this_month": bookings_this_month,
                    "paid_bookings_this_month": paid_bookings_this_month,
                    "revenue_this_month_inr": float(total_revenue_this_month),
                },
                "enquiries": {
                    "new_enquiries": new_enquiries,
                    "total_enquiries": total_enquiries,
                },
                "generated_at": now.isoformat(),
            }
        )
