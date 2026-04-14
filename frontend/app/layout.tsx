import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { PostHogProvider } from '@/components/PostHogProvider'
import { SITE_URL } from '@/lib/site'

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

// ── Structured data (JSON-LD) ─────────────────────────────────────────────────
const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Deepak Kushwaha',
      givenName: 'Deepak',
      familyName: 'Kushwaha',
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      jobTitle: 'AI Architect & Engineering Leader',
      description:
        'Deepak Kushwaha is an AI Architect and Engineering Leader with 9+ years building production AI systems, RAG pipelines, LangChain agents, and SaaS platforms at scale. Co-founder, CTO, and Head of Engineering based in Bangalore, India.',
      email: 'kdeepakkushwaha@gmail.com',
      knowsAbout: [
        'Artificial Intelligence',
        'RAG Pipelines',
        'LangChain',
        'LlamaIndex',
        'GPT-4',
        'Multi-Agent Systems',
        'LLM Observability',
        'Vector Databases',
        'System Design',
        'Engineering Leadership',
        'Next.js',
        'Django',
        'Kubernetes',
        'SaaS Architecture',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bangalore',
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Visvesvaraya Technological University',
        address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressCountry: 'IN' },
      },
      sameAs: [
        'https://www.linkedin.com/in/deepak8896484842',
        'https://github.com/deepakkushwaha7',
        SITE_URL,
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Deepak Kushwaha',
      url: SITE_URL,
      description:
        'Deepak Kushwaha — AI Architect & Engineering Leader. RAG pipelines, LangChain, system design, mock interview coaching, and engineering consulting.',
      author: { '@id': `${SITE_URL}/#person` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/blog?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: 'Deepak Kushwaha — AI Architect & Engineering Leader',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#person` },
      mainEntity: { '@id': `${SITE_URL}/#person` },
    },
  ],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Deepak Kushwaha',
    default: 'Deepak Kushwaha | AI Architect & Engineering Leader',
  },
  description:
    'AI Architect & Engineering Leader with 9+ years building SaaS platforms. Expert in RAG pipelines, LangChain, GPT-4 integrations, and scaling engineering teams. Based in Bangalore, India.',
  keywords: [
    'Deepak Kushwaha',
    'Deepak Kushwaha AI architect',
    'Deepak Kushwaha engineer',
    'AI Architect India',
    'AI Architect Bangalore',
    'Engineering Leader Bangalore',
    'CTO India',
    'Head of Engineering India',
    'RAG pipeline expert',
    'LangChain developer India',
    'mock interview AI engineer',
    'AI SaaS architect',
    'top AI engineer India',
    'engineering manager India',
    'Full Stack Engineer India',
  ],
  authors: [{ name: 'Deepak Kushwaha', url: SITE_URL }],
  creator: 'Deepak Kushwaha',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Deepak Kushwaha',
    title: 'Deepak Kushwaha | AI Architect & Engineering Leader',
    description:
      'AI Architect & Engineering Leader with 9+ years building SaaS platforms. Expert in RAG pipelines, LangChain, GPT-4 integrations.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deepak Kushwaha | AI Architect & Engineering Leader',
    description:
      'AI Architect & Engineering Leader with 9+ years building SaaS platforms.',
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
        {/* JSON-LD — Person + WebSite + ProfilePage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        {/* Entity verification — links profile to social accounts */}
        <link rel="me" href="https://www.linkedin.com/in/deepak8896484842" />
        <link rel="me" href="https://github.com/deepakkushwaha7" />
        {/* Local SEO signals */}
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore, Karnataka, India" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
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
