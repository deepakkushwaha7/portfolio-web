import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { PostHogProvider } from '@/components/PostHogProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://deepakkushwaha.dev'),
  title: {
    template: '%s | Deepak Kushwaha',
    default: 'Deepak Kushwaha | AI Architect & Engineering Leader',
  },
  description:
    'AI Architect & Engineering Leader with 9+ years building SaaS platforms. Expert in RAG pipelines, LangChain, GPT-4 integrations, and scaling engineering teams. Based in Bangalore, India.',
  keywords: [
    'AI Architect India',
    'Engineering Leader Bangalore',
    'RAG pipeline expert',
    'LangChain developer',
    'mock interview AI engineer',
    'Deepak Kushwaha',
    'AI SaaS',
    'Full Stack Engineer India',
  ],
  authors: [{ name: 'Deepak Kushwaha', url: 'https://deepakkushwaha.dev' }],
  creator: 'Deepak Kushwaha',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://deepakkushwaha.dev',
    siteName: 'Deepak Kushwaha',
    title: 'Deepak Kushwaha | AI Architect & Engineering Leader',
    description:
      'AI Architect & Engineering Leader with 9+ years building SaaS platforms. Expert in RAG pipelines, LangChain, GPT-4 integrations.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Deepak Kushwaha — AI Architect & Engineering Leader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deepak Kushwaha | AI Architect & Engineering Leader',
    description:
      'AI Architect & Engineering Leader with 9+ years building SaaS platforms.',
    images: ['/og-image.png'],
    creator: '@deepakkushwaha',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#f5f5f0]">
        {/* Grain overlay — fixed, pointer-events none */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Custom cursor — applies site-wide including admin */}
        <CustomCursor />

        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}
