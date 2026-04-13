'use client'

import React, { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface MagneticButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  /** Magnetic pull strength (0–1). Default 0.3 */
  strength?: number
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.3,
  ...rest
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null!)

  // Raw motion values – updated imperatively for performance
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Spring config – snappy settle
  const springConfig = { stiffness: 300, damping: 20, mass: 0.8 }
  const x = useSpring(rawX, springConfig)
  const y = useSpring(rawY, springConfig)

  useEffect(() => {
    const el = containerRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect    = el.getBoundingClientRect()
      const centerX = rect.left + rect.width  / 2
      const centerY = rect.top  + rect.height / 2
      const deltaX  = (e.clientX - centerX) * strength
      const deltaY  = (e.clientY - centerY) * strength
      rawX.set(deltaX)
      rawY.set(deltaY)
    }

    const handleMouseLeave = () => {
      rawX.set(0)
      rawY.set(0)
    }

    el.addEventListener('mousemove',  handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove',  handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [rawX, rawY, strength])

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      onClick={onClick}
      data-cursor="magnetic"
      {...rest}
    >
      <motion.div style={{ x, y }}>
        {children}
      </motion.div>
    </div>
  )
}
