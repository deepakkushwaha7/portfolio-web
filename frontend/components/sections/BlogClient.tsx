'use client'

// TODO: Replace static placeholder data with dynamic API fetch from Django backend at /api/blog/posts/

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Search, ArrowRight } from 'lucide-react'

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs))

type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  gradient: string
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'building-rag-pipelines-at-scale',
    title: 'Building RAG Pipelines at Scale: Lessons from Production',
    excerpt:
      'What nobody tells you about retrieval-augmented generation when you move from prototype to production: chunking strategies, re-ranking, eval loops, and the surprising cost of naive embeddings.',
    date: 'Mar 28, 2025',
    readTime: '11 min',
    tags: ['RAG', 'LLM', 'Production'],
    gradient: 'from-[#1a1a1a] to-[#2a2a2a]',
  },
  {
    slug: 'ai-native-product-architecture',
    title: 'AI-Native Product Architecture: Beyond the ChatGPT Wrapper',
    excerpt:
      'A framework for building products where AI is the core, not a feature bolted on. LLM routing, fallback chains, observability, and cost control at scale.',
    date: 'Feb 14, 2025',
    readTime: '9 min',
    tags: ['Architecture', 'LLM', 'Product'],
    gradient: 'from-[#181818] to-[#282828]',
  },
  {
    slug: 'engineering-leadership-remote-india',
    title: 'Engineering Leadership in Remote-First Indian Startups',
    excerpt:
      'Nine years of hard-won lessons on building high-performing distributed teams — hiring for ownership, async-first culture, and why velocity is a lagging indicator.',
    date: 'Jan 5, 2025',
    readTime: '8 min',
    tags: ['Leadership', 'Culture', 'Startups'],
    gradient: 'from-[#141414] to-[#242424]',
  },
  {
    slug: 'langchain-vs-llamaindex-2025',
    title: 'LangChain vs LlamaIndex in 2025: A Pragmatic Comparison',
    excerpt:
      'After building production systems with both, here is where each framework genuinely shines — and where they will slow you down.',
    date: 'Dec 12, 2024',
    readTime: '7 min',
    tags: ['LangChain', 'LlamaIndex', 'RAG'],
    gradient: 'from-[#1c1c1c] to-[#2c2c2c]',
  },
  {
    slug: 'kubernetes-for-ml-workloads',
    title: 'Kubernetes for ML Workloads: A Practical Playbook',
    excerpt:
      'GPU node pools, spot instance strategies, model serving with vLLM, and the autoscaling configuration that cut our inference costs by 65%.',
    date: 'Nov 3, 2024',
    readTime: '13 min',
    tags: ['Kubernetes', 'MLOps', 'Infrastructure'],
    gradient: 'from-[#161616] to-[#262626]',
  },
  {
    slug: 'mock-interview-system-design-guide',
    title: 'The System Design Interview: What Interviewers Actually Want',
    excerpt:
      'After conducting 200+ mock interviews, I have noticed the same patterns. This is what separates strong candidates from exceptional ones.',
    date: 'Oct 15, 2024',
    readTime: '10 min',
    tags: ['Interviews', 'System Design', 'Career'],
    gradient: 'from-[#1a1a1a] to-[#242424]',
  },
]

const ALL_TAGS = Array.from(new Set(BLOG_POSTS.flatMap((p) => p.tags))).sort()

export default function BlogClient() {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesQuery =
        query.trim() === '' ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      const matchesTag = activeTag === null || post.tags.includes(activeTag)
      return matchesQuery && matchesTag
    })
  }, [query, activeTag])

  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-12 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs tracking-[0.3em] text-[#f5f5f0]/40 uppercase mb-4">
            Writing
          </p>
          <h1 className="display font-serif font-black text-[#f5f5f0] uppercase mb-6">
            Blog
          </h1>
          <p className="font-sans text-base text-[#f5f5f0]/40 max-w-lg leading-relaxed">
            Long-form thinking on AI engineering, system design, and building
            products people actually use.
          </p>
        </div>
      </section>

      {/* Search + filters */}
      <section className="sticky top-16 z-30 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 py-4 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f5f5f0]/30 pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full bg-transparent border border-white/10 pl-9 pr-4 py-2 font-mono text-xs text-[#f5f5f0] placeholder:text-[#f5f5f0]/25 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto shrink-0">
            <button
              onClick={() => setActiveTag(null)}
              className={cn(
                'shrink-0 px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-all duration-200',
                activeTag === null
                  ? 'bg-[#f5f5f0] text-[#0a0a0a]'
                  : 'text-[#f5f5f0]/40 border border-white/10 hover:border-white/30 hover:text-[#f5f5f0]'
              )}
            >
              All
            </button>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={cn(
                  'shrink-0 px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-all duration-200',
                  activeTag === tag
                    ? 'bg-[#f5f5f0] text-[#0a0a0a]'
                    : 'text-[#f5f5f0]/40 border border-white/10 hover:border-white/30 hover:text-[#f5f5f0]'
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Post grid */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-mono text-sm text-[#f5f5f0]/30 tracking-wide">
                No posts match your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10">
              {filtered.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Cover placeholder */}
                  <div
                    className={`relative w-full aspect-[16/7] bg-gradient-to-br overflow-hidden ${post.gradient}`}
                  >
                    <div className="absolute inset-0 bg-noise opacity-5" />
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 bg-[#0a0a0a]/60 text-[#f5f5f0]/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest">
                        {post.date}
                      </span>
                      <span className="font-mono text-[10px] text-[#f5f5f0]/20">·</span>
                      <span className="font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest">
                        {post.readTime} read
                      </span>
                    </div>
                    <h2 className="font-serif text-xl font-bold text-[#f5f5f0] leading-snug mb-3 group-hover:text-[#f5f5f0]/80 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="font-sans text-sm text-[#f5f5f0]/40 leading-relaxed line-clamp-3 mb-5 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 font-mono text-xs text-[#f5f5f0] opacity-0 group-hover:opacity-100 transition-opacity duration-200 tracking-wide mt-auto">
                      Read
                      <ArrowRight
                        size={11}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
