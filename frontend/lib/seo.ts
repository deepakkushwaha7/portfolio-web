import type { Metadata } from 'next'

import { SITE_URL } from '@/lib/site'

const SITE_NAME = 'Deepak Kushwaha'
const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`

export function buildMetadata(overrides: Partial<Metadata> & {
  title: string
  description: string
  path?: string
  ogImage?: string
}): Metadata {
  const { title, description, path = '', ogImage, ...rest } = overrides
  const url = `${SITE_URL}${path}`
  const image = ogImage ?? DEFAULT_OG_IMAGE

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1 },
    },
    ...rest,
  }
}

// ---------------------------------------------------------------------------
// JSON-LD helpers
// ---------------------------------------------------------------------------

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Deepak Kushwaha',
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    jobTitle: 'AI Architect & Engineering Leader',
    worksFor: { '@type': 'Organization', name: 'The Branding Club' },
    address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressCountry: 'IN' },
    email: 'kdeepakkushwaha@gmail.com',
    sameAs: [
      'https://www.linkedin.com/in/deepak8896484842/',
      'https://deepakkushwaha.tech',
    ],
    knowsAbout: [
      'AI Architecture',
      'RAG Pipelines',
      'LangChain',
      'GPT-4',
      'Engineering Leadership',
      'SaaS',
      'Next.js',
      'Django',
    ],
  }
}

export function articleSchema(post: {
  title: string
  excerpt: string
  slug: string
  published_at: string
  updated_at: string
  cover_image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    image: post.cover_image || DEFAULT_OG_IMAGE,
    author: {
      '@type': 'Person',
      name: 'Deepak Kushwaha',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Deepak Kushwaha',
      url: SITE_URL,
    },
  }
}

export function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mock Interview — AI & Engineering',
    provider: {
      '@type': 'Person',
      name: 'Deepak Kushwaha',
      url: SITE_URL,
    },
    description:
      '60-minute 1:1 mock interview covering System Design, DSA, AI/ML, and Behavioral rounds with written feedback.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/LimitedAvailability',
      url: `${SITE_URL}/mock-interview`,
    },
    areaServed: 'IN',
  }
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
