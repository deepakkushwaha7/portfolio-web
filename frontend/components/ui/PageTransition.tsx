'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface PageTransitionProps {
  children: React.ReactNode
}

// ---------------------------------------------------------------------------
// Curtain variants – covers screen on arrival then slides away upward
// ---------------------------------------------------------------------------
const curtainVariants = {
  // Curtain starts fully covering the screen (new page just arrived)
  initial: {
    y: '0%',
  },
  // Immediately slides up to reveal the page below
  animate: {
    y: '-100%',
    transition: {
      duration: 0.65,
      ease:     [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
  // On navigate-away: sweeps back in from top to cover old content
  exit: {
    y: '0%',
    transition: {
      duration: 0.5,
      ease:     [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
}

// Content fades in after curtain exits
// Note: transition is applied via prop, not inside variants, to satisfy FM v12 types
const contentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.45 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Curtain overlay – keyed to pathname so it replays on each route change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`curtain-${pathname}`}
          variants={curtainVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position:       'fixed',
            inset:          0,
            background:     '#0a0a0a',
            zIndex:         10000,
            pointerEvents:  'none',
          }}
        />
      </AnimatePresence>
    </>
  )
}

export default PageTransition
