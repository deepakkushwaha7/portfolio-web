'use client'

import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ---------------------------------------------------------------------------
// DK letter particle positions (parametric, normalized then scaled to ±1.2)
// ---------------------------------------------------------------------------
function generateLetterParticles(): Float32Array {
  const positions: number[] = []

  const addPoint = (x: number, y: number) => {
    positions.push(x, y, (Math.random() - 0.5) * 0.4)
  }

  // ── Letter "D" ──  centred around x = -1.1
  const D_X = -1.1
  const steps = 120
  // Vertical bar
  for (let i = 0; i < 60; i++) {
    const t = i / 59
    addPoint(D_X - 0.35, -1.0 + t * 2.0)
  }
  // Curved right side  (half-ellipse)
  for (let i = 0; i < steps; i++) {
    const angle = (Math.PI / 2) - (i / (steps - 1)) * Math.PI
    const rx = 0.55
    const ry = 1.0
    addPoint(D_X - 0.35 + rx + rx * Math.cos(angle), ry * Math.sin(angle))
  }

  // ── Letter "K" ──  centred around x = 1.1
  const K_X = 1.1
  // Vertical bar
  for (let i = 0; i < 60; i++) {
    const t = i / 59
    addPoint(K_X - 0.35, -1.0 + t * 2.0)
  }
  // Upper diagonal
  for (let i = 0; i < 60; i++) {
    const t = i / 59
    addPoint(K_X - 0.35 + t * 0.7, t * 1.0)
  }
  // Lower diagonal
  for (let i = 0; i < 60; i++) {
    const t = i / 59
    addPoint(K_X - 0.35 + t * 0.7, -t * 1.0)
  }

  // scale so letters sit comfortably at radius ~1.5
  const scale = 1.5
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] *= scale
    positions[i + 1] *= scale
    // z stays
  }

  return new Float32Array(positions)
}

// ---------------------------------------------------------------------------
// Main particle system
// ---------------------------------------------------------------------------
interface ParticlesProps {
  mouse: React.MutableRefObject<[number, number]>
}

function Particles({ mouse }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null!)
  const { size } = useThree()

  // Build geometry once
  const { positions, phases } = useMemo(() => {
    const FIELD_COUNT = 1600 // background field
    const letterPositions = generateLetterParticles()
    const LETTER_COUNT = letterPositions.length / 3

    const total = FIELD_COUNT + LETTER_COUNT
    const pos = new Float32Array(total * 3)
    const ph = new Float32Array(total)

    // background field – random sphere radius 8
    for (let i = 0; i < FIELD_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1 + Math.cbrt(Math.random()) * 7 // cube-root for uniform density
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      ph[i] = Math.random() * Math.PI * 2
    }

    // letter particles layered on top (z ~ 0, slight spread)
    for (let i = 0; i < LETTER_COUNT; i++) {
      const base = FIELD_COUNT + i
      pos[base * 3]     = letterPositions[i * 3]
      pos[base * 3 + 1] = letterPositions[i * 3 + 1]
      pos[base * 3 + 2] = letterPositions[i * 3 + 2]
      ph[base] = Math.random() * Math.PI * 2
    }

    return { positions: pos, phases: ph }
  }, [])

  // Store initial positions for sine-wave offset reference
  const initPos = useMemo(() => positions.slice(), [positions])

  // Smooth tilt targets
  const tilt = useRef({ x: 0, y: 0 })

  useFrame(({ clock }) => {
    if (!pointsRef.current) return

    const t = clock.getElapsedTime()
    const geo = pointsRef.current.geometry
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array
    const total = arr.length / 3

    // lerp tilt toward mouse
    const targetX = mouse.current[1] * 0.3
    const targetY = mouse.current[0] * 0.3
    tilt.current.x += (targetX - tilt.current.x) * 0.04
    tilt.current.y += (targetY - tilt.current.y) * 0.04

    pointsRef.current.rotation.x = tilt.current.x
    pointsRef.current.rotation.y = tilt.current.y

    // animate float
    for (let i = 0; i < total; i++) {
      const iy = i * 3 + 1
      arr[iy] = initPos[iy] + Math.sin(t * 0.6 + phases[i]) * 0.08
    }

    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015 * (size.width / 1440 + 0.5)} // slight responsive scaling
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  )
}

// ---------------------------------------------------------------------------
// Scene wrapper – handles mouse tracking
// ---------------------------------------------------------------------------
function Scene() {
  const mouse = useRef<[number, number]>([0, 0])

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      ]
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <fogExp2 attach="fog" args={['#0a0a0a', 0.05]} />
      <Particles mouse={mouse} />
    </>
  )
}

// ---------------------------------------------------------------------------
// Exported component
// ---------------------------------------------------------------------------
export default function HeroScene() {
  return (
    <Canvas
      style={{ background: '#0a0a0a', width: '100%', height: '100%', pointerEvents: 'none' }}
      camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 10] }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: false }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
