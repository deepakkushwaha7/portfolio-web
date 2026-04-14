import type { Metadata, Viewport } from 'next'
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

const SITE = 'https://deepakkushwaha.tech'

// ── Structured data (JSON-LD) ─────────────────────────────────────────────────
const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE}/#person`,
      name: 'Deepak Kushwaha',
      url: SITE,
      jobTitle: 'AI Architect & Engineering Leader',
      description:
        'AI Architect & Engineering Leader with 9+ years building SaaS platforms. Expert in RAG pipelines, LangChain, multi-agent systems, and scaling engineering teams.',
      knowsAbout: [
        'RAG Pipelines',
        'LangChain',
        'LlamaIndex',
        'Multi-Agent Systems',
        'LLM Observability',
        'Next.js',
        'Django',
        'Kubernetes',
        'System Design',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bangalore',
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
      sameAs: [
        'https://www.linkedin.com/in/deepak8896484842',
        'https://github.com/deepakkushwaha7',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      name: 'Deepak Kushwaha',
      url: SITE,
      description:
        'AI Architect & Engineering Leader — RAG pipelines, LangChain, system design, and mock interview coaching.',
      author: { '@id': `${SITE}/#person` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE}/blog?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
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
  authors: [{ name: 'Deepak Kushwaha', url: SITE }],
  creator: 'Deepak Kushwaha',
  alternates: { canonical: SITE },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE,
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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
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
