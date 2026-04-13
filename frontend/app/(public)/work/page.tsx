import type { Metadata } from 'next'
import WorkClient from '@/components/sections/WorkClient'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Portfolio of AI products, SaaS platforms, and engineering consulting by Deepak Kushwaha — 8 years, 20+ shipped products.',
  openGraph: {
    title: 'Work | Deepak Kushwaha',
    description: '20+ shipped products across AI, SaaS, and marketplaces.',
    url: 'https://deepakkushwaha.dev/work',
  },
}

export default function WorkPage() {
  return <WorkClient />
}
