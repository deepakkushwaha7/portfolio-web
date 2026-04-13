import type { Metadata } from 'next'
import HireClient from '@/components/sections/HireClient'

export const metadata: Metadata = {
  title: 'Hire Me',
  description:
    'Hire Deepak Kushwaha — AI Architect & Engineering Leader available for contract, full-time, and advisory roles. Based in Bangalore, India.',
  openGraph: {
    title: 'Hire Deepak Kushwaha | AI Architect & Engineering Leader',
    description:
      'Available for contract, full-time, and advisory roles in AI architecture and engineering leadership.',
    url: 'https://deepakkushwaha.dev/hire',
  },
}

export default function HirePage() {
  return <HireClient />
}
