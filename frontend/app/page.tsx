import type { Metadata } from 'next'
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider'
import { PageTransition } from '@/components/ui/PageTransition'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HomeClient from '@/components/sections/home/HomeClient'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Deepak Kushwaha | AI Architect & Engineering Leader | Bangalore, India',
  description:
    'Deepak Kushwaha — AI Architect and Engineering Leader with 9+ years building production AI systems, RAG pipelines, LangChain agents, and SaaS platforms. Co-founder & CTO based in Bangalore, India.',
  keywords: [
    'Deepak Kushwaha',
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
    title: 'Deepak Kushwaha | AI Architect & Engineering Leader | Bangalore',
    description:
      'AI Architect & Engineering Leader with 9+ years building AI-native SaaS platforms. Expert in RAG pipelines, LangChain, and scaling engineering teams.',
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
