import type { Metadata } from 'next'
import MockInterviewClient from '@/components/sections/MockInterviewClient'

export const metadata: Metadata = {
  title: '1:1 Mock Interview',
  description:
    'Free 60-minute 1:1 mock interview with Deepak Kushwaha — System Design, DSA, AI/ML, Behavioral. Written feedback report included. Limited slots.',
  alternates: { canonical: 'https://deepakkushwaha.tech/mock-interview' },
  openGraph: {
    title: 'Free 1:1 Mock Interview with Deepak Kushwaha',
    description:
      'Free 60-minute mock interview sessions covering System Design, DSA, AI/ML, and Behavioral. Written feedback report included. Limited slots.',
    url: 'https://deepakkushwaha.tech/mock-interview',
  },
}

export default function MockInterviewPage() {
  return <MockInterviewClient />
}
