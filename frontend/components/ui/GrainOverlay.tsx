'use client'

import React, { useEffect, useRef } from 'react'

// ---------------------------------------------------------------------------
// GrainOverlay
//
// Fixed-position full-screen SVG feTurbulence grain. The noise baseFrequency
// is subtly animated via a small JS interval so the texture feels alive
// without costing GPU bandwidth (it's a pure CPU SVG filter).
// ---------------------------------------------------------------------------
export default function GrainOverlay() {
  const filterRef = useRef<SVGFETurbulenceElement>(null!)

  useEffect(() => {
    const el = filterRef.current
    if (!el) return

    let seed = 0
    const interval = setInterval(() => {
      seed = (seed + 1) % 1000
      // drift the seed to make the grain "move"
      el.setAttribute('seed', String(seed))
    }, 80) // ~12 fps for the grain animation — imperceptible but alive

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        9999,
        opacity:       0.03,
        // The SVG filter is applied via CSS filter on the div
        filter:        'url(#grain-filter)',
        // White background that the grain pattern sits on top of
        background:    '#ffffff',
      }}
    >
      {/* Hidden SVG that defines the filter — lives in the DOM so the CSS
          url() reference resolves correctly even inside a stacking context */}
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id="grain-filter"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={filterRef}
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              seed="0"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="greyNoise"
            />
            <feBlend in="SourceGraphic" in2="greyNoise" mode="multiply" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
