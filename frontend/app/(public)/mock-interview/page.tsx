import type { Metadata } from 'next'
import MockInterviewClient from '@/components/sections/MockInterviewClient'

export const metadata: Metadata = {
  title: '1:1 Mock Interview',
  description:
    '60-minute 1:1 mock interview sessions with Deepak Kushwaha — System Design, DSA, AI/ML, Behavioral. Written feedback report included. ₹499 per session.',
  openGraph: {
    title: '1:1 Mock Interview with Deepak Kushwaha | ₹499',
    description:
      '60-minute mock interview sessions covering System Design, DSA, AI/ML, and Behavioral. Written feedback report included.',
    url: 'https://deepakkushwaha.dev/mock-interview',
  },
}

export default function MockInterviewPage() {
  return <MockInterviewClient />
}
