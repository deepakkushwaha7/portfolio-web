'use client'

import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  /** Decimal places to display (default 0) */
  decimals?: number
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function AnimatedCounter({
  value,
  suffix  = '',
  prefix  = '',
  duration = 2,
  className = '',
  decimals  = 0,
}: AnimatedCounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null!)
  const tweenRef     = useRef<gsap.core.Tween | null>(null)
  const [triggered, setTriggered] = useState(false)

  // ── Intersection Observer ───────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [triggered])

  // ── GSAP tween ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!triggered) return

    const obj = { val: 0 }

    tweenRef.current = gsap.to(obj, {
      val:      value,
      duration,
      ease:     'power3.out',
      onUpdate: () => {
        if (containerRef.current) {
          containerRef.current.textContent =
            `${prefix}${obj.val.toFixed(decimals)}${suffix}`
        }
      },
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.textContent =
            `${prefix}${value.toFixed(decimals)}${suffix}`
        }
      },
    })

    return () => {
      tweenRef.current?.kill()
    }
  }, [triggered, value, duration, prefix, suffix, decimals])

  return (
    <span
      ref={containerRef}
      className={`tabular-nums ${className}`}
      aria-label={`${prefix}${value}${suffix}`}
    >
      {/* Show final value immediately — animation replaces it when in view */}
      {`${prefix}${value}${suffix}`}
    </span>
  )
}
