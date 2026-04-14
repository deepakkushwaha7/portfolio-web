import type { Metadata } from 'next'
import MockInterviewClient from '@/components/sections/MockInterviewClient'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Free 1:1 Mock Interview | AI & System Design | Deepak Kushwaha',
  description:
    'Free 60-minute 1:1 mock interview with Deepak Kushwaha — AI architect & ex-CTO with 9+ years. Covers System Design, DSA, AI/ML, and Behavioral rounds. Written feedback included. Bangalore & Remote.',
  keywords: [
    'mock interview AI engineer India',
    'system design mock interview India',
    'technical interview coaching Bangalore',
    'free mock interview senior engineer',
    '1:1 interview prep India',
    'engineering interview coaching',
    'DSA mock interview',
    'AI ML interview prep',
    'Deepak Kushwaha mock interview',
  ],
  alternates: { canonical: `${SITE_URL}/mock-interview` },
  openGraph: {
    title: 'Free 1:1 Mock Interview with Deepak Kushwaha | AI & System Design',
    description:
      'Free 60-minute mock interview — System Design, DSA, AI/ML, Behavioral. Written feedback. Book your slot with an AI architect who has 9+ years of real-world experience.',
    url: `${SITE_URL}/mock-interview`,
  },
}

// FAQ schema for Google rich results
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this mock interview suitable for freshers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This session is best suited for engineers with 2+ years of experience targeting senior, staff, or principal roles. For freshers, a lighter prep session is recommended — reach out before booking.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does the free mock interview cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The 60-minute session covers System Design, DSA & Algorithms, AI/ML concepts, and Behavioral rounds — mirroring real senior and staff engineering interviews at top companies.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I need to reschedule?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can reschedule up to 24 hours before the session. Just reply to the confirmation email and a new slot will be arranged.',
      },
    },
    {
      '@type': 'Question',
      name: 'What platform is used for the mock interview?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Google Meet for video, with a shared screen for coding. You can use any online IDE of your choice such as Replit or CoderPad.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the mock interview session recorded?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sessions are not recorded by default, but you can request a recording in the booking form. Recordings are shared only with you.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I book multiple mock interview sessions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — multi-session bundles (3 sessions, 5 sessions) are available. Contact directly for bundle availability.',
      },
    },
  ],
}

export default function MockInterviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MockInterviewClient />
    </>
  )
}
