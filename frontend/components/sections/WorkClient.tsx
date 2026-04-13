'use client'

// TODO: Replace static data with dynamic API fetch from Django backend at /api/projects/
// Data will include cover images, detailed case study content, and live URLs.

import React, { useState } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ArrowRight } from 'lucide-react'

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs))

type FilterTag = 'All' | 'AI Products' | 'SaaS' | 'Startups' | 'Consulting'

type Project = {
  slug: string
  company: string
  role: string
  dateRange: string
  tagline: string
  tech: string[]
  initial: string
  gradient: string
  tags: FilterTag[]
}

const PROJECTS: Project[] = [
  {
    slug: 'the-branding-club',
    company: 'The Branding Club',
    role: 'Lead AI Engineer & Founding Architect',
    dateRange: 'May 2024 – Present',
    tagline:
      'AI-powered brand intelligence platform — GPT-4 RAG pipelines, multi-tenant SaaS, real-time brand insights served at sub-second latency.',
    tech: ['GPT-4', 'RAG', 'LangChain', 'Next.js', 'Django', 'Pinecone', 'AWS'],
    initial: 'T',
    gradient: 'from-[#1a1a1a] to-[#2a2a2a]',
    tags: ['All', 'AI Products', 'Startups'],
  },
  {
    slug: 'ceodekho',
    company: 'Ceodekho',
    role: 'Senior Full-Stack Engineer',
    dateRange: 'Dec 2023 – Jun 2024',
    tagline:
      'Executive discovery and intelligence platform for Indian startups — advanced search, ML recommendation engine, Kafka analytics pipeline.',
    tech: ['React', 'Python', 'Elasticsearch', 'PostgreSQL', 'Kafka', 'Redis'],
    initial: 'C',
    gradient: 'from-[#1a1a1a] to-[#252525]',
    tags: ['All', 'SaaS', 'Startups'],
  },
  {
    slug: 'khaatadekho',
    company: 'Khaatadekho',
    role: 'Full-Stack Engineer',
    dateRange: 'Nov 2023 – Jun 2024',
    tagline:
      'MSME-focused accounting and GST compliance platform. Automated invoice parsing pipeline reducing manual effort by 70%.',
    tech: ['React', 'Django', 'PostgreSQL', 'Celery', 'AWS'],
    initial: 'K',
    gradient: 'from-[#181818] to-[#222222]',
    tags: ['All', 'SaaS', 'Startups'],
  },
  {
    slug: 'intellectyx',
    company: 'Intellectyx',
    role: 'AI Solutions Architect',
    dateRange: 'Nov 2023 – May 2024',
    tagline:
      'AI/ML consulting for Fortune 500 clients — NLP pipelines, anomaly detection, LLM integrations, document intelligence systems.',
    tech: ['LlamaIndex', 'Azure OpenAI', 'Python', 'FastAPI', 'PyTorch'],
    initial: 'I',
    gradient: 'from-[#161616] to-[#202020]',
    tags: ['All', 'AI Products', 'Consulting'],
  },
  {
    slug: 'turno',
    company: 'Turno',
    role: 'Engineering Lead',
    dateRange: 'May 2022 – Dec 2023',
    tagline:
      'Electric vehicle marketplace scaled to millions of users — Kubernetes orchestration, real-time bidding engine, 3× GMV growth in 6 months.',
    tech: ['React', 'Django', 'Kubernetes', 'Redis', 'PostgreSQL', 'AWS', 'Kafka'],
    initial: 'T',
    gradient: 'from-[#1c1c1c] to-[#262626]',
    tags: ['All', 'SaaS', 'Startups'],
  },
  {
    slug: 'wizcommerce',
    company: 'Wizcommerce',
    role: 'Senior Software Engineer',
    dateRange: 'Sep 2021 – Jun 2022',
    tagline:
      'B2B commerce platform — order management, multi-warehouse inventory, 60% API performance improvement.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
    initial: 'W',
    gradient: 'from-[#181818] to-[#232323]',
    tags: ['All', 'SaaS'],
  },
  {
    slug: 'tally-solutions',
    company: 'Tally Solutions',
    role: 'Software Engineer',
    dateRange: 'Aug 2019 – Sep 2021',
    tagline:
      'Core contributor to Tally Prime — accounting engine, statutory compliance modules, REST API layer, automated test suites.',
    tech: ['C++', 'TDL', 'REST APIs', 'Python', 'Selenium'],
    initial: 'T',
    gradient: 'from-[#141414] to-[#1e1e1e]',
    tags: ['All', 'SaaS'],
  },
  {
    slug: 'pixelai',
    company: 'PixelAI.in',
    role: 'Co-founder & CTO',
    dateRange: 'Jan 2017 – Mar 2020',
    tagline:
      'AI-powered image enhancement SaaS — 10,000+ users across 40 countries. Full-stack + GPU inference pipeline + Stripe billing.',
    tech: ['Python', 'Flask', 'React', 'TensorFlow', 'GPU Inference', 'Stripe'],
    initial: 'P',
    gradient: 'from-[#1a1a1a] to-[#282828]',
    tags: ['All', 'AI Products', 'Startups'],
  },
]

const FILTER_TABS: FilterTag[] = ['All', 'AI Products', 'SaaS', 'Startups', 'Consulting']

export default function WorkClient() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>('All')

  const filtered = PROJECTS.filter((p) => p.tags.includes(activeFilter))

  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-16 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-xs tracking-[0.3em] text-[#f5f5f0]/40 uppercase mb-4">
            Portfolio
          </p>
          <h1 className="display font-serif font-black text-[#f5f5f0] uppercase mb-6">
            Work
          </h1>
          <p className="font-sans text-base text-[#f5f5f0]/40 max-w-lg leading-relaxed">
            Eight years of shipped products. AI platforms, SaaS tools, marketplaces,
            and consulting engagements — all built to production standard.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-16 z-30 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={cn(
                'shrink-0 px-4 py-1.5 font-mono text-xs tracking-widest uppercase transition-all duration-200',
                activeFilter === tab
                  ? 'bg-[#f5f5f0] text-[#0a0a0a]'
                  : 'text-[#f5f5f0]/40 border border-white/10 hover:border-white/30 hover:text-[#f5f5f0]'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Project grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group relative bg-[#0a0a0a] border border-white/10 hover:border-white/40 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Cover area */}
              <div
                className={cn(
                  'relative w-full aspect-video bg-gradient-to-br flex items-center justify-center overflow-hidden',
                  project.gradient
                )}
              >
                <span className="font-serif font-black text-8xl text-[#f5f5f0]/10 select-none group-hover:text-[#f5f5f0]/15 transition-colors duration-500">
                  {project.initial}
                </span>
                <div className="absolute inset-0 bg-[#f5f5f0]/0 group-hover:bg-[#f5f5f0]/[0.03] transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <p className="font-mono text-[10px] tracking-[0.25em] text-[#f5f5f0]/30 uppercase mb-3">
                  {project.dateRange}
                </p>
                <h2 className="font-serif text-2xl font-bold text-[#f5f5f0] leading-tight mb-2">
                  {project.company}
                </h2>
                <p className="font-sans text-xs text-[#f5f5f0]/40 mb-4">
                  {project.role}
                </p>
                <p className="font-sans text-sm text-[#f5f5f0]/50 leading-relaxed mb-6 line-clamp-2">
                  {project.tagline}
                </p>
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {project.tech.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-1 border border-white/10 text-[#f5f5f0]/30 tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tech.length > 5 && (
                    <span className="font-mono text-[10px] px-2 py-1 border border-white/10 text-[#f5f5f0]/20">
                      +{project.tech.length - 5}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#f5f5f0] opacity-0 group-hover:opacity-100 transition-opacity duration-200 tracking-wide">
                  View Case Study
                  <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-mono text-sm text-[#f5f5f0]/30 tracking-wide">
              No projects found for this filter.
            </p>
          </div>
        )}
      </section>
    </>
  )
}
