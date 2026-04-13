"""
Celery application configuration for the portfolio backend.
"""

import os

from celery import Celery

# Set the default Django settings module for Celery workers.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

app = Celery("core")

# Read config from Django settings, using the CELERY_ namespace prefix.
app.config_from_object("django.conf:settings", namespace="CELERY")

# Auto-discover tasks in all installed apps.
app.autodiscover_tasks()


@app.task(bind=True, ignore_result=True)
def debug_task(self):
    """Utility task for verifying the worker is alive."""
    print(f"Request: {self.request!r}")
