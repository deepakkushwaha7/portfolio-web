"""
Health check endpoint — used by Docker, load balancers, and uptime monitors.

GET /health/  →  200 { status: "ok", checks: { db: "ok", cache: "ok" } }
             →  503 if any dependency is down
"""

import logging

from django.db import connection
from django.http import JsonResponse

logger = logging.getLogger(__name__)


def health_check(request):
    checks = {}
    status_code = 200

    # ── Database ──────────────────────────────────────────────────────────────
    try:
        connection.ensure_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        checks["db"] = "ok"
    except Exception as exc:
        logger.error("Health check — DB failed: %s", exc)
        checks["db"] = "error"
        status_code = 503

    # ── Cache (Redis) ─────────────────────────────────────────────────────────
    try:
        from django.core.cache import cache
        cache.set("_health", "1", timeout=5)
        assert cache.get("_health") == "1"
        checks["cache"] = "ok"
    except Exception as exc:
        logger.error("Health check — cache failed: %s", exc)
        checks["cache"] = "error"
        status_code = 503

    return JsonResponse(
        {"status": "ok" if status_code == 200 else "degraded", "checks": checks},
        status=status_code,
    )
