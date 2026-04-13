#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Obtain a Let's Encrypt certificate for deepakkushwaha.tech using Certbot.
# Run this ONCE on your production server before starting docker-compose.
#
# Pre-requisites:
#   - certbot installed  (apt install certbot  or  brew install certbot)
#   - Port 80 open and pointing to this server
#   - deepakkushwaha.tech DNS A record → server IP
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

DOMAIN="deepakkushwaha.tech"
EMAIL="kdeepakkushwaha@gmail.com"
SSL_DIR="$(dirname "$0")/../nginx/ssl"
WEBROOT="/var/www/certbot"

mkdir -p "$WEBROOT" "$SSL_DIR"

# Stop nginx if running so certbot can bind :80
docker compose stop nginx 2>/dev/null || true

certbot certonly \
  --standalone \
  --preferred-challenges http \
  --agree-tos \
  --email "$EMAIL" \
  -d "$DOMAIN" \
  -d "www.$DOMAIN"

# Copy certs into nginx/ssl where docker-compose expects them
cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem "$SSL_DIR/fullchain.pem"
cp /etc/letsencrypt/live/$DOMAIN/privkey.pem   "$SSL_DIR/privkey.pem"
chmod 644 "$SSL_DIR/fullchain.pem"
chmod 600 "$SSL_DIR/privkey.pem"

echo "✓ Certs copied to $SSL_DIR — restart nginx:"
echo "  docker compose up -d nginx"

# ── Auto-renewal cron (add to server crontab) ────────────────────────────────
# 0 3 * * * certbot renew --quiet && \
#   cp /etc/letsencrypt/live/deepakkushwaha.tech/fullchain.pem /path/to/nginx/ssl/fullchain.pem && \
#   cp /etc/letsencrypt/live/deepakkushwaha.tech/privkey.pem   /path/to/nginx/ssl/privkey.pem && \
#   docker compose exec nginx nginx -s reload
