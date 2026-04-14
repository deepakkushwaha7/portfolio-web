import type { Metadata } from 'next'
import WorkClient from '@/components/sections/WorkClient'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Work & Case Studies | Deepak Kushwaha — AI Architect',
  description:
    'Case studies and portfolio of AI products, RAG pipelines, SaaS platforms, and engineering consulting by Deepak Kushwaha — 9+ years, 20+ shipped products across India, Europe, and the US.',
  keywords: [
    'Deepak Kushwaha portfolio',
    'AI engineer portfolio India',
    'RAG pipeline case study',
    'SaaS architecture portfolio',
    'LangChain project India',
    'engineering consulting India',
  ],
  alternates: { canonical: `${SITE_URL}/work` },
  openGraph: {
    title: 'Work & Case Studies | Deepak Kushwaha — AI Architect',
    description:
      '20+ shipped products across AI, SaaS, and marketplaces. Case studies from Turno, Tally, The Branding Club, and more.',
    url: `${SITE_URL}/work`,
  },
}

export default function WorkPage() {
  return <WorkClient />
}
