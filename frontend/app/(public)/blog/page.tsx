import type { Metadata } from 'next'
import BlogClient from '@/components/sections/BlogClient'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Long-form writing on AI engineering, RAG pipelines, system design, and engineering leadership by Deepak Kushwaha.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Blog | Deepak Kushwaha',
    description: 'Long-form writing on AI engineering and leadership.',
    url: `${SITE_URL}/blog`,
  },
}

export default function BlogPage() {
  return <BlogClient />
}
