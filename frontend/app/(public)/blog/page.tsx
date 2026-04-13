import type { Metadata } from 'next'
import BlogClient from '@/components/sections/BlogClient'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Long-form writing on AI engineering, RAG pipelines, system design, and engineering leadership by Deepak Kushwaha.',
  openGraph: {
    title: 'Blog | Deepak Kushwaha',
    description: 'Long-form writing on AI engineering and leadership.',
    url: 'https://deepakkushwaha.dev/blog',
  },
}

export default function BlogPage() {
  return <BlogClient />
}
