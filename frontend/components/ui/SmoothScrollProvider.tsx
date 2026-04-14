'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import Lenis from 'lenis'

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const LenisContext = createContext<Lenis | null>(null)

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export function useLenis(): Lenis | null {
  return useContext(LenisContext)
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
interface SmoothScrollProviderProps {
  children: React.ReactNode
  options?: ConstructorParameters<typeof Lenis>[0]
}

export function SmoothScrollProvider({
  children,
  options,
}: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    let instance: Lenis | null = null
    let idleId: number | null = null
    let tickerHandle: ReturnType<typeof setTimeout> | null = null

    const init = () => {
      instance = new Lenis({
        duration:        0.9,
        easing:          (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel:     true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        autoRaf:         false,
        ...options,
      })

      setLenis(instance)

      function raf(time: number) {
        instance!.raf(time)
        rafIdRef.current = requestAnimationFrame(raf)
      }
      rafIdRef.current = requestAnimationFrame(raf)
    }

    // Defer until after LCP — browser paints critical content first
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = (window as Window & { requestIdleCallback: (cb: () => void) => number })
        .requestIdleCallback(init)
    } else {
      tickerHandle = setTimeout(init, 200)
    }

    return () => {
      if (idleId !== null && 'cancelIdleCallback' in window) {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId)
      }
      if (tickerHandle !== null) clearTimeout(tickerHandle)
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
      instance?.destroy()
      setLenis(null)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}

export default SmoothScrollProvider
