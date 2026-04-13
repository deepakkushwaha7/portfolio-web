'use client'

import React from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface MarqueeStripProps {
  items: string[]
  speed?: string
  direction?: 'left' | 'right'
  className?: string
  itemClassName?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function MarqueeStrip({
  items,
  speed     = '30s',
  direction = 'left',
  className      = '',
  itemClassName  = '',
}: MarqueeStripProps) {
  // Duplicate items to ensure seamless looping (need at least 2 copies)
  const repeated = [...items, ...items]

  const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right'

  return (
    <>
      {/* Keyframe definitions injected once per page via <style> */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <div
        className={`overflow-hidden whitespace-nowrap ${className}`}
        aria-hidden="true"
      >
        <div
          className="marquee-track"
          style={{
            animation:           `${animationName} ${speed} linear infinite`,
            animationPlayState:  'running',
          }}
        >
          {repeated.map((item, idx) => (
            <span
              key={idx}
              className={`inline-flex items-center ${itemClassName}`}
            >
              <span className="px-4 md:px-6">{item}</span>
              {/* bullet separator – skip after last element of full set to avoid double-bullet at seam */}
              {idx !== repeated.length - 1 && (
                <span className="opacity-40 select-none" aria-hidden="true">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
