import React from 'react'
import type { Metadata } from 'next'
import AboutHero from '@/components/sections/about/AboutHero'

export const metadata: Metadata = {
  title: 'About',
  description:
    'AI Architect & Engineering Leader with 9+ years building AI-native SaaS products. Bangalore-based. Available for senior engineering and advisory roles.',
  openGraph: {
    title: 'About Deepak Kushwaha | AI Architect & Engineering Leader',
    description:
      'AI Architect & Engineering Leader with 9+ years of experience. Based in Bangalore.',
    url: 'https://deepakkushwaha.dev/about',
  },
}

// ─── Career timeline data ─────────────────────────────────────────────────────

type TimelineEntry = {
  company: string
  role: string
  dateRange: string
  location?: string
  bullets: string[]
}

const TIMELINE: TimelineEntry[] = [
  {
    company: 'The Branding Club',
    role: 'Head of Engineering & AI Architect',
    dateRange: 'May 2024 – Present',
    location: 'Netherlands, Europe (Remote)',
    bullets: [
      'Established and scaled a 20-member cross-functional team (Engineering, QA, DevOps) from zero, driving hiring pipelines, engineering culture, and technical standards.',
      'Architected Brandhub — a microservices SaaS platform processing 100,000 read/write ops/second and generating 100,000 SKUs per batch using multiprocessing, multithreaded queuing, and sharding.',
      'Designed AI-powered content and SKU generation layer using RAG pipelines and LLM APIs (GPT-4, Claude), cutting manual content effort by 70%.',
    ],
  },
  {
    company: 'Ceodekho',
    role: 'Co-founder & CTO',
    dateRange: 'Dec 2023 – Jun 2024',
    location: 'Remote',
    bullets: [
      'Built an AI-native SaaS blogging platform using LLM pipelines and agentic content workflows, reducing content production time by 80%.',
      'Achieved PageSpeed 99+ on desktop, 90+ on mobile via Next.js SSR, edge caching, and Technical SEO optimisation.',
      'Designed multi-tenant architecture with cost-optimised token management strategies for AI content generation at scale.',
    ],
  },
  {
    company: 'Khaatadekho',
    role: 'Founder',
    dateRange: 'Nov 2023 – Jun 2024',
    location: 'Remote',
    bullets: [
      'Conceptualised and built a mini-Salesforce CRM platform from scratch, owning product research, backend, and frontend architecture end-to-end.',
      'Secured 10+ stable clients with average monthly revenue of ₹80,000; integrated AI-assisted lead scoring using LLM APIs, reducing manual CRM data entry by 60%.',
    ],
  },
  {
    company: 'Intellectyx',
    role: 'Technical Lead — AI & SaaS Consultant',
    dateRange: 'Nov 2023 – May 2024',
    location: 'USA (Remote)',
    bullets: [
      'Led 4 cross-functional teams architecting scalable SaaS products for US-based enterprise clients.',
      'Designed a Udemy-style platform with an AI-powered course recommendation engine using vector embeddings, improving learner engagement by 40%.',
      'Increased engineering productivity by 35% through AI-assisted development tooling, contributing to $2M in additional client revenue.',
    ],
  },
  {
    company: 'Turno',
    role: 'Technical Lead — Founding Team',
    dateRange: 'May 2022 – Dec 2023',
    location: 'Bangalore',
    bullets: [
      'Led partnership initiative with Facebook and Google, engineering a dynamic website deployment app that launched 20 tailored landing pages, driving conversions from 1% to 25%.',
      'Integrated AI-driven personalisation into the sales funnel using LLM-assisted copy generation, significantly reducing CAC.',
      'Built and owned the full-stack Agent App and EWS for internal and field sales teams, overseeing backend, frontend, and DevOps end-to-end.',
    ],
  },
  {
    company: 'Wizcommerce',
    role: 'Senior Software Engineer — Founding Team',
    dateRange: 'Sep 2021 – Jun 2022',
    location: 'Bangalore',
    bullets: [
      'Built an onboarding automation tool that compressed customer onboarding from 10 days to 1 day.',
      'Led a 3–4 member team to build Sourcewiz\'s Customer App from scratch across design, frontend, backend, and deployment.',
    ],
  },
  {
    company: 'Tally Solutions',
    role: 'Software Development Engineer I & II',
    dateRange: 'Aug 2019 – Sep 2021',
    location: 'Bangalore',
    bullets: [
      'Authored code design for TallyPrime 1.x and GST web components; developed UI and backend APIs independently from architecture through production.',
      'Led R&D on integrating WhatsApp and Payment Gateway with Tally — an early conversational automation initiative.',
    ],
  },
  {
    company: 'PixelAI.in',
    role: 'Co-founder',
    dateRange: 'Jan 2017 – Mar 2020',
    location: 'Bangalore',
    bullets: [
      'Co-founded an AI & software consultancy delivering 10+ SaaS products for Indian and US-based clients, specialising in digital performance and operational efficiency.',
    ],
  },
]

const AWARDS = [
  {
    title: 'Best Performer (Engineering) ×2',
    year: '2022',
    org: 'Turno',
    description: 'Recognised twice in the same year (Sep & Mar 2022) for engineering excellence and team impact.',
  },
  {
    title: 'Super Coder',
    year: '2021',
    org: 'Tally Solutions',
    description: 'Awarded for outstanding code quality and engineering contributions to TallyPrime.',
  },
  {
    title: 'Spot Award + Rookie Award',
    year: '2020–21',
    org: 'Tally Solutions',
    description: 'Dual recognition: on-the-spot performance award and best newcomer in engineering.',
  },
  {
    title: 'Google India Challenge Scholarship',
    year: '2018',
    org: 'Google',
    description: 'Awarded Google India Challenge Scholarship for excellence in computer science.',
  },
  {
    title: "Int'l Science Olympiad — AIR 38",
    year: '2012',
    org: 'Science Olympiad Foundation',
    description: 'All India Rank 38 in the International Science Olympiad.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ── SECTION 1: HERO ─────────────────────────────────────────────────── */}
      <AboutHero />

      {/* ── SECTION 2: BIO ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Pull quote */}
          <div>
            <blockquote className="font-serif text-3xl md:text-4xl font-bold text-[#f5f5f0] leading-snug border-l-2 border-[#f5f5f0]/20 pl-8">
              &ldquo;I build AI systems that don&rsquo;t just impress in demos — they hold
              up under the weight of real users.&rdquo;
            </blockquote>
          </div>

          {/* Bio summary */}
          <div className="flex flex-col gap-5 font-sans text-base text-[#f5f5f0]/60 leading-relaxed">
            <p>
              Nine years into building software, I&rsquo;ve shipped products across fintech,
              commerce, automotive, and branding — everything from solo co-founder to
              leading 35-person engineering departments.
            </p>
            <p>
              Today my focus is the intersection of large language models and production
              engineering: RAG pipelines that don&rsquo;t hallucinate, agentic workflows
              that run reliably, AI products that people actually pay for.
            </p>
            <p>
              Based in Bangalore. Open to contract, full-time, and advisory engagements.
              I also run 1:1 mock interview sessions for engineers targeting senior and
              principal-level roles.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <span className="font-mono text-xs text-[#f5f5f0]/30 border border-white/10 px-3 py-1.5">
                Bangalore, India
              </span>
              <span className="font-mono text-xs text-[#f5f5f0]/30 border border-white/10 px-3 py-1.5">
                9+ Years Experience
              </span>
              <span className="font-mono text-xs text-[#f5f5f0]/30 border border-white/10 px-3 py-1.5">
                English · Hindi
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: CAREER TIMELINE ──────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs text-[#f5f5f0]/40 tracking-[0.3em] uppercase mb-16">
            Career Timeline
          </p>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-px md:-translate-x-1/2" />

            <div className="flex flex-col gap-0">
              {TIMELINE.map((entry, i) => {
                const isLeft = i % 2 === 0
                return (
                  <div
                    key={`${entry.company}-${i}`}
                    className={`relative flex flex-col md:flex-row gap-0 md:gap-12 mb-16 pl-8 md:pl-0 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-[-4px] md:left-1/2 top-1 w-2.5 h-2.5 rounded-full bg-[#f5f5f0]/20 border border-[#f5f5f0]/40 -translate-x-1/2 z-10" />

                    {/* Content */}
                    <div className={`md:w-[calc(50%-2rem)] ${isLeft ? 'md:text-right md:pr-0' : 'md:text-left md:pl-0'}`}>
                      <p className="font-mono text-[10px] tracking-[0.25em] text-[#f5f5f0]/30 uppercase mb-2">
                        {entry.dateRange}
                        {entry.location && ` · ${entry.location}`}
                      </p>
                      <h3 className="font-serif text-2xl font-bold text-[#f5f5f0] leading-tight mb-1">
                        {entry.company}
                      </h3>
                      <p className="font-sans text-sm text-[#f5f5f0]/50 mb-4">
                        {entry.role}
                      </p>
                      <ul className={`flex flex-col gap-2 ${isLeft ? 'md:items-end' : 'md:items-start'}`}>
                        {entry.bullets.map((bullet, bi) => (
                          <li
                            key={bi}
                            className="font-sans text-sm text-[#f5f5f0]/40 leading-relaxed flex gap-2 items-start"
                          >
                            <span className="font-mono text-[#f5f5f0]/20 mt-1 shrink-0">—</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: AWARDS ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-xs text-[#f5f5f0]/40 tracking-[0.3em] uppercase mb-12">
            Recognition
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-white/10">
            {AWARDS.map((award) => (
              <div
                key={award.title}
                className="bg-[#0a0a0a] border border-white/10 p-6 hover:border-white/30 transition-all duration-300"
              >
                <p className="font-mono text-[10px] tracking-[0.25em] text-[#f5f5f0]/30 uppercase mb-3">
                  {award.org} &nbsp;·&nbsp; {award.year}
                </p>
                <h3 className="font-serif text-lg font-bold text-[#f5f5f0] leading-snug mb-3">
                  {award.title}
                </h3>
                <p className="font-sans text-sm text-[#f5f5f0]/40 leading-relaxed">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: EDUCATION + LANGUAGES ────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Education */}
          <div>
            <p className="font-mono text-xs text-[#f5f5f0]/40 tracking-[0.3em] uppercase mb-8">
              Education
            </p>
            <div className="flex flex-col gap-6">
              <div className="border-l border-white/10 pl-5">
                <p className="font-mono text-[10px] text-[#f5f5f0]/30 uppercase tracking-widest mb-1">
                  2015 – 2019
                </p>
                <h3 className="font-serif text-xl font-bold text-[#f5f5f0] mb-1">
                  B.Tech, Computer Science
                </h3>
                <p className="font-sans text-sm text-[#f5f5f0]/40">
                  Visvesvaraya Technological University, Bangalore
                </p>
              </div>
            </div>
          </div>

          {/* Languages + Skills overview */}
          <div>
            <p className="font-mono text-xs text-[#f5f5f0]/40 tracking-[0.3em] uppercase mb-8">
              Languages &amp; Communication
            </p>
            <div className="flex flex-col gap-4">
              {[
                { lang: 'English', level: 'Professional — C2' },
                { lang: 'Hindi', level: 'Native' },
                { lang: 'Kannada', level: 'Conversational' },
              ].map(({ lang, level }) => (
                <div key={lang} className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-sans text-base text-[#f5f5f0]/70">{lang}</span>
                  <span className="font-mono text-xs text-[#f5f5f0]/30 tracking-wide">
                    {level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
