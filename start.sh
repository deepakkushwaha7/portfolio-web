#!/bin/sh
# Container entrypoint — runs DB migrations then hands off to supervisord.
set -e

echo "──────────────────────────────────────────"
echo "  Running Django migrations..."
echo "──────────────────────────────────────────"
cd /app/backend
python manage.py migrate --noinput

echo "──────────────────────────────────────────"
echo "  Creating superuser (if not exists)..."
echo "──────────────────────────────────────────"
if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ]; then
  python manage.py createsuperuser --noinput || true
else
  echo "  Skipping — DJANGO_SUPERUSER_USERNAME / DJANGO_SUPERUSER_PASSWORD not set."
fi

echo "──────────────────────────────────────────"
echo "  Seeding blog posts..."
echo "──────────────────────────────────────────"
python manage.py seed_blog

echo "──────────────────────────────────────────"
echo "  Starting Django + Next.js via supervisord"
echo "──────────────────────────────────────────"
exec supervisord -n -c /etc/supervisor/supervisord.conf
