'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key  = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com'

    if (!key) return   // don't initialise in dev if key isn't set

    posthog.init(key, {
      api_host:              host,
      capture_pageview:      false,   // we fire manual pageviews below
      capture_pageleave:     true,
      autocapture:           true,
      persistence:           'localStorage',
      respect_dnt:           true,
      // Session replay — disable if not on PostHog paid plan
      disable_session_recording: process.env.NODE_ENV !== 'production',
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
