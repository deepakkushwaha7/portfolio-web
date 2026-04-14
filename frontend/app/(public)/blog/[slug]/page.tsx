import { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { PostDetail } from '@/types/blog'

const SITE = 'https://deepakkushwaha.tech'
// Server-side URL — Django runs on localhost:8000 in the same container.
// Override via INTERNAL_API_URL env var when running separate services.
const BACKEND = process.env.INTERNAL_API_URL ?? 'http://localhost:8000'

// cache() deduplicates the fetch so generateMetadata + the page share one request
const getPost = cache(async (slug: string): Promise<PostDetail | null> => {
  try {
    const res = await fetch(`${BACKEND}/api/blog/posts/${slug}/`, {
      next: { revalidate: 3600, tags: [`post-${slug}`] },
    })
    if (!res.ok) return null
    return res.json() as Promise<PostDetail>
  } catch {
    return null
  }
})

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ slug: string }> }

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return { title: 'Post Not Found' }

  const title = post.meta_title || post.title
  const description = post.meta_description || post.excerpt
  const ogImage = post.og_image || `${SITE}/og-image.png`
  const url = `${SITE}/blog/${slug}`

  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: ['Deepak Kushwaha'],
      tags: post.tags.map((t) => t.name),
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@deepakkushwaha',
    },
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  const url = `${SITE}/blog/${slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      '@id': `${SITE}/#person`,
      name: 'Deepak Kushwaha',
      url: SITE,
    },
    publisher: {
      '@type': 'Person',
      name: 'Deepak Kushwaha',
      url: SITE,
    },
    keywords: post.tags.map((t) => t.name).join(', '),
    ...(post.cover_image ? { image: post.cover_image } : {}),
    ...(post.og_image ? { thumbnailUrl: post.og_image } : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="min-h-screen pt-28 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#f5f5f0]/40 hover:text-[#f5f5f0] transition-colors mb-10 tracking-wide"
          >
            <ArrowLeft size={12} />
            Back to Blog
          </Link>

          {/* Category */}
          {post.category && (
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#f5f5f0]/30 uppercase mb-4">
              {post.category.name}
            </p>
          )}

          {/* Title */}
          <h1 className="headline font-serif font-black text-[#f5f5f0] leading-tight mb-5">
            {post.title}
          </h1>

          {/* Excerpt / standfirst */}
          <p className="font-sans text-base text-[#f5f5f0]/50 leading-relaxed mb-8 max-w-xl">
            {post.excerpt}
          </p>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pb-8 border-b border-white/10">
            <span className="font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest">
              {formatDate(post.published_at)}
            </span>
            <span className="font-mono text-[10px] text-[#f5f5f0]/15">·</span>
            <span className="font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest">
              {post.read_time} min read
            </span>
            {post.tags.length > 0 && (
              <>
                <span className="font-mono text-[10px] text-[#f5f5f0]/15">·</span>
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 border border-white/10 text-[#f5f5f0]/35"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Article body — TipTap HTML */}
          <div
            className="blog-body mt-10"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#f5f5f0]/40 hover:text-[#f5f5f0] transition-colors tracking-wide"
            >
              <ArrowLeft size={12} />
              Back to Blog
            </Link>
            <p className="font-mono text-[10px] text-[#f5f5f0]/20 tracking-wide">
              Deepak Kushwaha
            </p>
          </div>
        </div>
      </article>
    </>
  )
}
