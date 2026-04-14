#!/bin/sh
# Container entrypoint — runs DB migrations then hands off to supervisord.
set -e

echo "──────────────────────────────────────────"
echo "  Running Django migrations..."
echo "──────────────────────────────────────────"
cd /app/backend
python manage.py migrate --noinput

echo "──────────────────────────────────────────"
echo "  Seeding blog posts..."
echo "──────────────────────────────────────────"
python manage.py seed_blog

echo "──────────────────────────────────────────"
echo "  Starting Django + Next.js via supervisord"
echo "──────────────────────────────────────────"
exec supervisord -n -c /etc/supervisor/supervisord.conf
