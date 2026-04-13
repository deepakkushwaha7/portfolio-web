// TODO: Fetch blog post data from Django API at /api/blog/posts/{slug}/
// This page will render full MDX/Tiptap content with code highlighting and OG metadata.

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const title = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
  return {
    title,
    description: `${title} — a post by Deepak Kushwaha on AI engineering, system design, and leadership.`,
  }
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-[#f5f5f0]/40 hover:text-[#f5f5f0] transition-colors mb-12 tracking-wide"
        >
          <ArrowLeft size={12} />
          Back to Blog
        </Link>

        <p className="font-mono text-xs text-[#f5f5f0]/30 tracking-widest uppercase mb-4">
          Article
        </p>
        <h1 className="headline font-serif font-black text-[#f5f5f0] mb-8 leading-tight">
          {slug
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')}
        </h1>

        <div className="border border-white/10 p-8 text-center">
          <p className="font-mono text-sm text-[#f5f5f0]/30 tracking-wide">
            Full article coming soon.
          </p>
          <p className="font-mono text-xs text-[#f5f5f0]/15 mt-2">
            API integration pending — content will be fetched from /api/blog/posts/{slug}/
          </p>
        </div>
      </div>
    </div>
  )
}
