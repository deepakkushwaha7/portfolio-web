'use client'

import dynamic from 'next/dynamic'

const FluidBackground = dynamic(
  () => import('@/components/three/FluidBackground'),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-[#0a0a0a]" /> }
)

export default function AboutHero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <FluidBackground />
      </div>
      <div className="absolute inset-0 z-[1] bg-[#0a0a0a]/50 pointer-events-none" />

      <div className="relative z-[2] text-center px-6 max-w-4xl mx-auto">
        <p className="font-mono text-xs tracking-[0.3em] text-[#f5f5f0]/40 uppercase mb-6">
          The Person Behind The Code
        </p>
        <h1 className="display font-serif font-black text-[#f5f5f0] uppercase mb-6">
          About Me
        </h1>
        <p className="font-sans text-lg text-[#f5f5f0]/50 max-w-xl mx-auto leading-relaxed">
          AI Architect. Engineering Leader. Builder of things that actually work at scale.
        </p>
      </div>
    </section>
  )
}
