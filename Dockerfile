# ─────────────────────────────────────────────────────────────────────────────
# Single-container build for Railway deployment.
# Runs Django (gunicorn :8000) + Next.js (node :$PORT) via supervisord.
# Browser API calls go to /api/* → Next.js rewrites → localhost:8000.
#
# Railway add-ons required: PostgreSQL plugin + Redis plugin
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1: Build Next.js frontend ──────────────────────────────────────────
FROM node:22-slim AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ .

# NEXT_PUBLIC_API_URL is intentionally left empty — all /api/* calls go
# through Next.js rewrites which proxy to localhost:8000 server-side.
ARG NEXT_PUBLIC_PHONEPE_ENV=UAT
ARG NEXT_PUBLIC_GA_ID=""
ARG NEXT_PUBLIC_POSTHOG_KEY=""
ARG NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"
ARG REVALIDATION_SECRET="build-placeholder"

ENV NEXT_PUBLIC_PHONEPE_ENV=$NEXT_PUBLIC_PHONEPE_ENV
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_POSTHOG_KEY=$NEXT_PUBLIC_POSTHOG_KEY
ENV NEXT_PUBLIC_POSTHOG_HOST=$NEXT_PUBLIC_POSTHOG_HOST
ENV REVALIDATION_SECRET=$REVALIDATION_SECRET
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ── Stage 2: Install Python dependencies ─────────────────────────────────────
FROM python:3.12-slim AS backend-builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --prefix=/install --no-cache-dir -r requirements.txt

# ── Stage 3: Combined runtime ─────────────────────────────────────────────────
FROM python:3.12-slim AS runner

# Install Node.js 22, libpq (Postgres client), and supervisord
RUN apt-get update && apt-get install -y --no-install-recommends \
        curl gnupg libpq5 supervisor \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

# Copy Python packages
COPY --from=backend-builder /install /usr/local

# ── Django ────────────────────────────────────────────────────────────────────
WORKDIR /app/backend
COPY backend/ .
RUN SECRET_KEY=collectstatic-placeholder DEBUG=False \
    python manage.py collectstatic --noinput

# ── Next.js standalone ────────────────────────────────────────────────────────
WORKDIR /app/frontend
COPY --from=frontend-builder /app/frontend/public              ./public
COPY --from=frontend-builder /app/frontend/.next/standalone    ./
COPY --from=frontend-builder /app/frontend/.next/static        ./.next/static

# ── Process manager + entrypoint ─────────────────────────────────────────────
COPY supervisord.conf /etc/supervisor/conf.d/app.conf
COPY start.sh         /start.sh
RUN chmod +x /start.sh

# Railway injects $PORT at runtime — Next.js standalone reads it automatically.
# Django binds to 8000 (internal only, never exposed).
EXPOSE 3000

CMD ["/start.sh"]
