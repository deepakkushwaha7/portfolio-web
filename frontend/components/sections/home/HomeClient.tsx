'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import BentoGrid from '@/components/ui/BentoGrid'

// Dynamically import heavy Three.js scene — no SSR
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0a0a0a]" />,
})

// ─── Static data ──────────────────────────────────────────────────────────────

const TYPEWRITER_TEXTS = [
  'Building AI-Native Products',
  'Scaling SaaS Platforms',
  'Leading Engineering Teams',
  '9+ Years · 20+ Products · Millions of Users',
]

const MARQUEE_ITEMS = [
  'RAG Pipelines',
  'LangChain',
  'GPT-4',
  'Multi-Agent Systems',
  'Kubernetes',
  'Next.js',
  'Python',
  'Django',
  'AWS',
  'Vector DBs',
  'System Design',
  'AI Architecture',
]

const STATS = [
  { value: 9, suffix: '+', label: 'Years Experience' },
  { value: 20, suffix: '+', label: 'Products Shipped' },
  { value: 35, suffix: '+', label: 'Team Members Led' },
]

const FEATURED_PROJECTS = [
  {
    slug: 'the-branding-club',
    category: 'AI PRODUCT',
    company: 'The Branding Club',
    tagline:
      'AI-powered brand intelligence platform — GPT-4 integrations, RAG pipelines, and multi-tenant SaaS architecture.',
    tech: ['GPT-4', 'RAG', 'Next.js', 'Django', 'Pinecone', 'AWS'],
    dateRange: 'May 2024 – Present',
  },
  {
    slug: 'ceodekho',
    category: 'SAAS PLATFORM',
    company: 'Ceodekho',
    tagline:
      'Executive discovery and intelligence platform for Indian startups. Full-stack architecture, advanced search, recommendation engine.',
    tech: ['React', 'Python', 'Elasticsearch', 'PostgreSQL', 'Kafka'],
    dateRange: 'Dec 2023 – Jun 2024',
  },
  {
    slug: 'turno',
    category: 'MARKETPLACE',
    company: 'Turno',
    tagline:
      'Electric vehicle marketplace platform. Scaled to millions of users with Kubernetes orchestration and real-time bidding engine.',
    tech: ['React', 'Django', 'Kubernetes', 'Redis', 'PostgreSQL', 'AWS'],
    dateRange: 'May 2022 – Dec 2023',
  },
]

const BENTO_ITEMS = [
  {
    title: 'LLM Integration',
    description: 'GPT-4, Claude, Gemini, Mistral, LLaMA',
    size: 'medium' as const,
  },
  {
    title: 'RAG Pipelines',
    description: 'Vector DBs (Pinecone, Weaviate, pgvector), LangChain, LlamaIndex',
    size: 'large' as const,
  },
  {
    title: 'Eval & Observability',
    description: 'LangSmith, Helicone, Braintrust',
    size: 'small' as const,
  },
  {
    title: 'AI Infrastructure',
    description: 'vLLM, token optimization, fine-tuning',
    size: 'small' as const,
  },
  {
    title: 'Full-Stack',
    description: 'React, Next.js, Django, Python, TypeScript',
    size: 'medium' as const,
  },
  {
    title: 'Cloud & DevOps',
    description: 'AWS, Kubernetes, Kafka, Docker, CI/CD',
    size: 'wide' as const,
  },
  {
    title: 'Responsible AI',
    description: 'Bias auditing, PII handling, EU AI Act',
    size: 'small' as const,
  },
]

const BLOG_POSTS = [
  {
    slug: 'building-rag-pipelines-at-scale',
    date: 'Mar 28, 2025',
    title: 'Building RAG Pipelines at Scale: Lessons from Production',
    excerpt:
      'What nobody tells you about retrieval-augmented generation when you move from prototype to production: chunking strategies, re-ranking, and eval loops that actually catch regressions.',
  },
  {
    slug: 'ai-native-product-architecture',
    date: 'Feb 14, 2025',
    title: 'AI-Native Product Architecture: Beyond the ChatGPT Wrapper',
    excerpt:
      'A framework for building products where AI is the core — not a feature bolted on. Covering LLM routing, fallback chains, observability, and cost control at scale.',
  },
  {
    slug: 'engineering-leadership-remote-india',
    date: 'Jan 5, 2025',
    title: 'Engineering Leadership in Remote-First Indian Startups',
    excerpt:
      'Nine years of hard-won lessons on building high-performing distributed teams — hiring for ownership, async-first culture, and why velocity is a lagging indicator.',
  },
]

// ─── Typewriter hook ──────────────────────────────────────────────────────────

function useTypewriter(texts: string[], speed = 55, pauseMs = 2200) {
  const [displayed, setDisplayed] = useState('')
  const [textIdx, setTextIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx))
        setCharIdx((c) => c + 1)
      }, speed)
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pauseMs)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1))
        setCharIdx((c) => c - 1)
      }, speed / 2)
    } else {
      setDeleting(false)
      setTextIdx((i) => (i + 1) % texts.length)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, textIdx, texts, speed, pauseMs])

  return displayed
}

// ─── Hero heading word animation ─────────────────────────────────────────────

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HomeClient() {
  const typewriterText = useTypewriter(TYPEWRITER_TEXTS)

  return (
    <>
      {/* ── SECTION 1: HERO ─────────────────────────────────────────────────── */}
      <section className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        {/* Three.js canvas — behind text */}
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>

        {/* Gradient vignette */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/80 pointer-events-none" />

        {/* Centered content */}
        <div className="relative z-[2] flex flex-col items-center text-center px-6 w-full max-w-5xl mx-auto">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-xs tracking-[0.3em] text-[#f5f5f0]/50 uppercase mb-8"
          >
            AI Architect &amp; Engineering Leader
          </motion.p>

          {/* Main heading */}
          <div className="mb-4">
            {['DEEPAK', 'KUSHWAHA'].map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.h1
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  className="display block text-[#f5f5f0] font-serif font-black uppercase leading-none"
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="h-8 flex items-center mb-10"
          >
            <p className="font-mono text-sm md:text-base text-[#f5f5f0]/60 tracking-wide">
              {typewriterText}
              <span className="animate-blink">|</span>
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <MagneticButton>
              <Link
                href="/work"
                className="inline-flex items-center px-8 py-3.5 bg-[#f5f5f0] text-[#0a0a0a] font-sans font-semibold text-sm tracking-wide hover:bg-white transition-colors duration-200"
              >
                See My Work
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/mock-interview"
                className="inline-flex items-center px-8 py-3.5 border border-[#f5f5f0]/60 text-[#f5f5f0] font-sans font-semibold text-sm tracking-wide hover:bg-[#f5f5f0]/10 transition-colors duration-200"
              >
                Book Mock Interview
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#f5f5f0]/30 uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} className="text-[#f5f5f0]/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 2: MARQUEE STRIP ─────────────────────────────────────────── */}
      <section className="w-full overflow-hidden border-t border-b border-white/10 py-4">
        <MarqueeStrip items={MARQUEE_ITEMS} />
      </section>

      {/* ── SECTION 3: NUMBERS ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center px-6 py-6 first:pl-0 last:pr-0"
              >
                <div className="font-serif font-black text-5xl md:text-6xl text-[#f5f5f0] leading-none mb-3">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={1.8}
                  />
                </div>
                <p className="font-mono text-xs text-[#f5f5f0]/40 tracking-widest uppercase text-center">
                  {stat.label}
                </p>
              </div>
            ))}

            {/* 100M+ Users column */}
            <div className="flex flex-col items-center px-6 py-6 last:pr-0">
              <div className="font-serif font-black text-5xl md:text-6xl text-[#f5f5f0] leading-none mb-3">
                <AnimatedCounter value={100} suffix="M+" duration={2} />
              </div>
              <p className="font-mono text-xs text-[#f5f5f0]/40 tracking-widest uppercase text-center">
                Users Served
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: SELECTED WORK ──────────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-xs text-[#f5f5f0]/40 tracking-[0.3em] uppercase mb-12">
            Selected Work
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {FEATURED_PROJECTS.map((project) => (
              <div
                key={project.slug}
                className="group relative bg-[#0a0a0a] border border-white/10 p-8 hover:border-white/40 transition-all duration-300"
              >
                <p className="font-mono text-[10px] tracking-[0.25em] text-[#f5f5f0]/30 uppercase mb-4">
                  {project.category} &nbsp;·&nbsp; {project.dateRange}
                </p>
                <h3 className="font-serif text-3xl font-bold text-[#f5f5f0] mb-3 leading-tight">
                  {project.company}
                </h3>
                <p className="font-sans text-sm text-[#f5f5f0]/50 leading-relaxed mb-6">
                  {project.tagline}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-1 border border-white/10 text-[#f5f5f0]/40 tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-2 font-mono text-xs text-[#f5f5f0] opacity-0 group-hover:opacity-100 transition-opacity duration-200 tracking-wide"
                >
                  View Case Study <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 text-right">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#f5f5f0]/50 hover:text-[#f5f5f0] transition-colors duration-200 tracking-wide group"
            >
              View All Work
              <ArrowRight
                size={12}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: BENTO GRID ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-xs text-[#f5f5f0]/40 tracking-[0.3em] uppercase mb-4">
            AI &amp; Engineering Expertise
          </p>
          <h2 className="headline font-serif text-[#f5f5f0] mb-12">
            Built for the AI Era
          </h2>
          <BentoGrid items={BENTO_ITEMS} />
        </div>
      </section>

      {/* ── SECTION 6: LATEST FROM BLOG ──────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs text-[#f5f5f0]/40 tracking-[0.3em] uppercase mb-12">
            Latest Thoughts
          </p>
          <div className="flex flex-col divide-y divide-white/10">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="group py-10 first:pt-0">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest uppercase mb-3">
                      {post.date}
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#f5f5f0] leading-snug mb-3 group-hover:text-[#f5f5f0]/80 transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-sans text-sm text-[#f5f5f0]/40 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="shrink-0 md:pt-8">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 font-mono text-xs text-[#f5f5f0]/40 hover:text-[#f5f5f0] transition-colors duration-200 tracking-wide group/link"
                    >
                      Read
                      <ArrowRight
                        size={12}
                        className="transition-transform duration-200 group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#f5f5f0]/40 hover:text-[#f5f5f0] transition-colors duration-200 tracking-wide group"
            >
              View All Posts
              <ArrowRight
                size={12}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: MOCK INTERVIEW CTA ─────────────────────────────────────── */}
      <section className="bg-[#f5f5f0] text-[#0a0a0a] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-[#0a0a0a]/40 uppercase mb-6">
                Mock Interviews
              </p>
              <h2 className="headline font-serif font-bold text-[#0a0a0a] mb-6 leading-tight">
                Ready to Level Up Your Interview Game?
              </h2>
              <p className="font-sans text-base text-[#0a0a0a]/60 leading-relaxed mb-8">
                A focused 60-minute 1:1 session with Deepak — covering the topics that
                actually show up in senior engineering and AI architect interviews.
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  'System Design',
                  'DSA & Algorithms',
                  'AI / ML Concepts',
                  'Behavioral & Leadership',
                  'Written Feedback Report',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-mono text-sm text-[#0a0a0a]/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]/40 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <span className="font-serif font-black text-6xl sm:text-7xl md:text-8xl text-[#0a0a0a] leading-none mb-2">
                ₹499
              </span>
              <p className="font-mono text-sm text-[#0a0a0a]/50 mb-8 tracking-wide">
                per session &nbsp;·&nbsp; 60 minutes &nbsp;·&nbsp; 1:1 with Deepak
              </p>
              <MagneticButton>
                <Link
                  href="/mock-interview"
                  className="inline-flex items-center px-10 py-4 bg-[#0a0a0a] text-[#f5f5f0] font-sans font-semibold text-sm tracking-wide hover:bg-[#1a1a1a] transition-colors duration-200"
                >
                  Book Your Slot
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: HIRE ME CTA ────────────────────────────────────────────── */}
      <section className="py-32 px-6 flex flex-col items-center text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#f5f5f0]/50 tracking-widest uppercase mb-10">
            <span className="w-2 h-2 rounded-full bg-[#f5f5f0]/60 animate-pulse" />
            Open to Opportunities
          </div>
          <h2 className="headline font-serif font-bold text-[#f5f5f0] mb-6">
            Let&rsquo;s Build Something Exceptional
          </h2>
          <p className="font-sans text-base text-[#f5f5f0]/40 leading-relaxed mb-12">
            Available for contract, full-time, and advisory roles in AI architecture
            and engineering leadership.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <a
                href="/Deepak-Kushwaha-Resume.pdf"
                download
                className="inline-flex items-center px-8 py-3.5 border border-[#f5f5f0]/30 text-[#f5f5f0] font-sans font-medium text-sm tracking-wide hover:border-[#f5f5f0]/70 hover:bg-[#f5f5f0]/5 transition-all duration-200"
              >
                Download Resume
              </a>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/hire"
                className="inline-flex items-center px-8 py-3.5 bg-[#f5f5f0] text-[#0a0a0a] font-sans font-semibold text-sm tracking-wide hover:bg-white transition-colors duration-200"
              >
                Send Enquiry
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  )
}
