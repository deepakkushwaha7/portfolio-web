import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Required for multi-stage Docker build — produces a self-contained server.js
  output: 'standalone',

  // Proxy /api/* to Django (localhost:8000 in the single container).
  // This means NEXT_PUBLIC_API_URL can be left empty — the browser calls
  // /api/... and Next.js forwards it to Django server-side.
  async rewrites() {
    const djangoBase = process.env.INTERNAL_API_URL ?? 'http://localhost:8000'
    return [
      {
        source: '/api/:path*',
        destination: `${djangoBase}/api/:path*`,
      },
    ]
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Transpile Three.js for Next.js bundler compatibility
  transpilePackages: ['three'],

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
