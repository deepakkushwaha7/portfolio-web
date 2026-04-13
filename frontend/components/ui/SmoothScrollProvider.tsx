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
    const instance = new Lenis({
      duration:        0.9,
      easing:          (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel:     true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      autoRaf:         false,
      ...options,
    })

    setLenis(instance)

    // Simple RAF loop — no GSAP, no ScrollTrigger interference
    function raf(time: number) {
      instance.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }
    rafIdRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
      instance.destroy()
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
