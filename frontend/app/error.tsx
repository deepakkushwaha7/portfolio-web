'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Forward to PostHog if initialised
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.captureException(error)
    }
    console.error('[GlobalError]', error)
  }, [error])

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0] flex items-center justify-center px-6">
        <div className="max-w-lg w-full">
          <p className="font-mono text-xs tracking-[0.3em] text-[#f5f5f0]/30 uppercase mb-6">
            Something went wrong
          </p>
          <h1 className="font-serif text-5xl font-black text-[#f5f5f0] leading-tight mb-4">
            Unexpected Error
          </h1>
          <p className="font-sans text-base text-[#f5f5f0]/50 mb-8 leading-relaxed">
            An unexpected error occurred. It&apos;s been logged automatically.
            {error.digest && (
              <span className="block mt-2 font-mono text-xs text-[#f5f5f0]/20">
                Ref: {error.digest}
              </span>
            )}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={reset}
              className="font-mono text-sm border border-white/20 px-6 py-3 hover:border-white/60 hover:bg-white/5 transition-all duration-200"
            >
              Try again
            </button>
            <Link
              href="/"
              className="font-mono text-sm text-[#f5f5f0]/40 hover:text-[#f5f5f0] transition-colors duration-200"
            >
              ← Go home
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
