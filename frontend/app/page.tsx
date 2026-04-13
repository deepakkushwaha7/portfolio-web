import type { Metadata } from 'next'
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider'
import { PageTransition } from '@/components/ui/PageTransition'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HomeClient from '@/components/sections/home/HomeClient'

export const metadata: Metadata = {
  title: 'Deepak Kushwaha | AI Architect & Engineering Leader | Bangalore',
  description:
    'AI Architect & Engineering Leader with 9+ years building SaaS platforms. Expert in RAG pipelines, LangChain, GPT-4 integrations, and scaling engineering teams. Available for mock interviews and hiring.',
  keywords: [
    'AI Architect India',
    'Engineering Leader Bangalore',
    'RAG pipeline expert',
    'LangChain developer',
    'mock interview AI engineer',
  ],
  openGraph: {
    title: 'Deepak Kushwaha | AI Architect & Engineering Leader | Bangalore',
    description:
      'AI Architect & Engineering Leader with 9+ years building SaaS platforms.',
    url: 'https://deepakkushwaha.dev',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
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
