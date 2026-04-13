#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Generate self-signed SSL certs for local development.
# For production use Let's Encrypt (see scripts/letsencrypt.sh).
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

SSL_DIR="$(dirname "$0")/../nginx/ssl"
mkdir -p "$SSL_DIR"

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout "$SSL_DIR/privkey.pem" \
  -out    "$SSL_DIR/fullchain.pem" \
  -subj   "/C=IN/ST=Karnataka/L=Bangalore/O=DeepakKushwaha/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,DNS:deepakkushwaha.tech,IP:127.0.0.1"

echo "✓ Dev certs written to $SSL_DIR"
echo "  fullchain.pem  (certificate)"
echo "  privkey.pem    (private key)"
