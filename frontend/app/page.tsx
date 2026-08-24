import type { Metadata } from 'next'
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider'
import { PageTransition } from '@/components/ui/PageTransition'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HomeClient from '@/components/sections/home/HomeClient'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Deepak Kushwaha | CTO & AI Architect | Bangalore, India',
  description:
    'Deepak Kushwaha — CTO at Metis Labs and AI Architect with 9+ years building production AI systems, RAG pipelines, LangChain agents, and SaaS platforms. Based in Bangalore, India.',
  keywords: [
    'Deepak Kushwaha',
    'Deepak Kushwaha CTO',
    'Deepak Kushwaha Metis Labs',
    'Deepak Kushwaha AI architect',
    'Deepak Kushwaha engineering leader',
    'AI Architect Bangalore',
    'AI Engineer India',
    'Engineering Leader India',
    'Head of Engineering Bangalore',
    'CTO India Bangalore',
    'RAG pipeline expert',
    'LangChain developer India',
    'AI SaaS architect India',
    'top AI engineer India',
    'mock interview AI engineer',
    'engineering manager India',
  ],
  openGraph: {
    title: 'Deepak Kushwaha | CTO & AI Architect | Bangalore',
    description:
      'CTO & AI Architect with 9+ years building AI-native SaaS platforms. Expert in RAG pipelines, LangChain, and scaling engineering teams.',
    url: SITE_URL,
  },
}

export default function RootPage() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <PageTransition>
        <main className="flex-1">
          <HomeClient />
        </main>
      </PageTransition>
      <Footer />
    </SmoothScrollProvider>
  )
}
