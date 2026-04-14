'use client'

import React from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type BentoSize = 'small' | 'medium' | 'large' | 'wide'

export interface BentoItem {
  title:       string
  description: string
  icon?:       React.ReactNode
  size:        BentoSize
  /** Optional extra className for the card */
  className?:  string
}

interface BentoGridProps {
  items:      BentoItem[]
  className?: string
}

// ---------------------------------------------------------------------------
// Size → Tailwind grid-span classes
// ---------------------------------------------------------------------------
// Grid is 4-col desktop / 2-col tablet / 1-col mobile
// small  : 1×1
// medium : 1 col × 2 rows
// wide   : 2 col × 1 row
// large  : 2 col × 2 rows
const sizeClasses: Record<BentoSize, string> = {
  small:  'col-span-1 row-span-1',
  medium: 'col-span-1 row-span-1 sm:row-span-2',
  wide:   'col-span-1 sm:col-span-2 row-span-1',
  large:  'col-span-1 sm:col-span-2 row-span-1 sm:row-span-2',
}

// On tablet (2-col), wide/large still max out at 2 columns:
// Tailwind classes handle this because we define grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
// and the col-span-2 is naturally capped by available columns.

// ---------------------------------------------------------------------------
// Card component
// ---------------------------------------------------------------------------
function BentoCard({ item }: { item: BentoItem }) {
  const { title, description, icon, size, className = '' } = item

  return (
    <article
      className={[
        // grid span
        sizeClasses[size],
        // base card styles
        'group relative flex flex-col justify-between',
        'border border-white/10 rounded-lg overflow-hidden',
        // subtle noise-texture background
        'bg-[#0f0f0f]',
        // hover lift
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(255,255,255,0.06)]',
        'hover:border-white/20',
        // padding
        'p-6',
        className,
      ].join(' ')}
    >
      {/* Noise texture overlay (very subtle) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '150px 150px',
        }}
      />

      {/* Top section */}
      <div className="relative z-10 flex flex-col gap-3">
        {/* Icon */}
        {icon && (
          <div className="flex items-center justify-start text-white/60 group-hover:text-white/90 transition-colors duration-300 w-8 h-8">
            {icon}
          </div>
        )}

        {/* Title */}
        <h3 className="font-semibold text-white text-base md:text-lg leading-tight tracking-tight">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="relative z-10 mt-4 text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
        {description}
      </p>

      {/* Bottom-right decorative corner — appears on hover */}
      <div
        aria-hidden="true"
        className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-white/10 group-hover:border-white/30 transition-colors duration-300 rounded-sm"
      />
    </article>
  )
}

// ---------------------------------------------------------------------------
// BentoGrid
// ---------------------------------------------------------------------------
export default function BentoGrid({ items, className = '' }: BentoGridProps) {
  return (
    <div
      className={[
        'grid',
        // Responsive columns
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        // Auto rows — each row unit is the same height, cards span multiples
        'auto-rows-[minmax(160px,auto)]',
        'gap-3 md:gap-4',
        className,
      ].join(' ')}
    >
      {items.map((item, idx) => (
        <BentoCard key={`${item.title}-${idx}`} item={item} />
      ))}
    </div>
  )
}
