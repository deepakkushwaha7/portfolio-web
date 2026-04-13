'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// ---------------------------------------------------------------------------
// Lerp helper
// ---------------------------------------------------------------------------
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

// ---------------------------------------------------------------------------
// Cursor inner component (mounted after hydration)
// ---------------------------------------------------------------------------
function CursorInner() {
  const dotRef   = useRef<HTMLDivElement>(null!)
  const ringRef  = useRef<HTMLDivElement>(null!)

  // Exact cursor position
  const cursor = useRef({ x: -100, y: -100 })
  // Lagged ring position
  const ring   = useRef({ x: -100, y: -100 })

  // ring visual state
  const ringState = useRef<'default' | 'link' | 'magnetic'>('default')

  useEffect(() => {
    // ── hide native cursor ──────────────────────────────────────────────
    document.body.style.cursor = 'none'

    // ── mouse tracking ──────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      cursor.current.x = e.clientX
      cursor.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    // ── hover detection ─────────────────────────────────────────────────
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="magnetic"]')) {
        ringState.current = 'magnetic'
      } else if (target.closest('a, button, [role="button"]')) {
        ringState.current = 'link'
      } else {
        ringState.current = 'default'
      }
    }
    window.addEventListener('mouseover', onOver, { passive: true })

    // ── rAF animation loop ───────────────────────────────────────────────
    let rafId: number

    const tick = () => {
      const dot  = dotRef.current
      const ring = ringRef.current

      if (dot && ring) {
        // dot follows exactly
        dot.style.transform = `translate(${cursor.current.x - 4}px, ${cursor.current.y - 4}px)`

        // ring follows with lag
        const rx = lerp(
          parseFloat(ring.dataset.x ?? String(cursor.current.x)),
          cursor.current.x,
          0.12
        )
        const ry = lerp(
          parseFloat(ring.dataset.y ?? String(cursor.current.y)),
          cursor.current.y,
          0.12
        )
        ring.dataset.x = String(rx)
        ring.dataset.y = String(ry)

        const state = ringState.current
        let size   = 32
        let bg     = 'transparent'
        let border = '1.5px solid rgba(255,255,255,0.85)'
        let mix    = 'normal'

        if (state === 'magnetic') {
          size   = 64
          bg     = 'rgba(255,255,255,0.92)'
          border = 'none'
          mix    = 'difference'
        } else if (state === 'link') {
          size   = 48
          bg     = 'rgba(255,255,255,0.12)'
          border = '1.5px solid rgba(255,255,255,0.9)'
        }

        const offset = size / 2
        ring.style.transform  = `translate(${rx - offset}px, ${ry - offset}px)`
        ring.style.width      = `${size}px`
        ring.style.height     = `${size}px`
        ring.style.background = bg
        ring.style.border     = border
        ring.style.mixBlendMode = mix as CSSMixBlendMode
      }

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <>
      {/* small dot */}
      <div
        ref={dotRef}
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          width:           8,
          height:          8,
          borderRadius:    '50%',
          background:      '#ffffff',
          pointerEvents:   'none',
          zIndex:          99999,
          willChange:      'transform',
          transition:      'opacity 0.2s',
        }}
      />
      {/* lagged ring */}
      <div
        ref={ringRef}
        data-x="-100"
        data-y="-100"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         32,
          height:        32,
          borderRadius:  '50%',
          border:        '1.5px solid rgba(255,255,255,0.85)',
          pointerEvents: 'none',
          zIndex:        99998,
          willChange:    'transform, width, height',
          transition:    'width 0.25s cubic-bezier(0.25,0.46,0.45,0.94), height 0.25s cubic-bezier(0.25,0.46,0.45,0.94), background 0.25s, border 0.25s',
        }}
      />
    </>
  )
}

// ---------------------------------------------------------------------------
// Portal wrapper – SSR safe
// ---------------------------------------------------------------------------
export function CustomCursor() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || typeof document === 'undefined') return null

  return createPortal(<CursorInner />, document.body)
}

export default CustomCursor

// Needed because TS doesn't expose CSSMixBlendMode as a global
type CSSMixBlendMode =
  | 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken'
  | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light'
  | 'soft-light' | 'difference' | 'exclusion' | 'hue'
  | 'saturation' | 'color' | 'luminosity'
