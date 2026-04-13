# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 — deps
# Install production node_modules only
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 — builder
# Build the Next.js app
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# Copy all node_modules (including devDeps needed for build)
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Next.js reads NEXT_PUBLIC_* at build time — pass them as build args
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_PHONEPE_ENV=UAT
ARG NEXT_PUBLIC_GA_ID
ARG REVALIDATION_SECRET

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_PHONEPE_ENV=$NEXT_PUBLIC_PHONEPE_ENV
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV REVALIDATION_SECRET=$REVALIDATION_SECRET

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ─────────────────────────────────────────────────────────────────────────────
# Stage 3 — runner
# Minimal production image
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Copy only what's needed to run
COPY --from=builder /app/public          ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
    CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["node", "server.js"]
