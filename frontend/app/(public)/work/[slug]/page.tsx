import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'

// ─── Case study data ──────────────────────────────────────────────────────────

type Metric = { value: string; label: string }

type CaseStudy = {
  slug: string
  company: string
  role: string
  dateRange: string
  category: string
  tagline: string
  overview: string
  challenge: string
  whatIBuilt: string[]
  stack: { group: string; items: string[] }[]
  metrics: Metric[]
  nextSlug?: string
  nextCompany?: string
}

const CASE_STUDIES: Record<string, CaseStudy> = {
  'the-branding-club': {
    slug: 'the-branding-club',
    company: 'The Branding Club',
    role: 'Head of Engineering & AI Architect',
    dateRange: 'May 2024 – Present',
    category: 'AI Product',
    tagline: 'Brandhub — microservices SaaS processing 100K read/write ops/second, 100K SKUs per batch, RAG pipelines cutting content effort by 70%.',
    overview:
      'The Branding Club is a brand content and SKU generation SaaS. I joined as the Head of Engineering and built the company\'s entire technical foundation — establishing a 20-member cross-functional team (Engineering, QA, DevOps) from zero and architecting Brandhub, the core product: a high-throughput microservices platform capable of generating 100,000 SKUs per batch with AI-powered content at its core.',
    challenge:
      'The product needed to process massive volumes of product data and generate high-quality brand content at scale — 100,000 SKUs per batch — without sacrificing speed or consistency. A naive LLM-per-request approach would be too slow and too expensive. The architecture needed multiprocessing, intelligent queuing, and an LLM evaluation layer to maintain output quality across all AI workloads.',
    whatIBuilt: [
      'Established and scaled a 20-member cross-functional team (Engineering, QA, DevOps) from zero — driving hiring pipelines, engineering culture, onboarding, and technical standards.',
      'Architected Brandhub\'s core microservices platform: multiprocessing workers, multithreaded queuing, and database sharding to sustain 100,000 read/write ops/second and generate 100,000 SKUs per batch.',
      'Designed the AI content and SKU generation layer using RAG pipelines and LLM APIs (GPT-4, Claude) — cutting manual content production effort by 70% vs the previous workflow.',
      'Introduced LLM evaluation and observability tooling (Helicone, LangSmith) to monitor output quality, reduce hallucinations, and optimise token costs across all AI workloads.',
      'Built the multi-tenant SaaS architecture on Django — per-tenant data isolation, JWT-scoped API access, Stripe subscription billing, and a role-based admin portal.',
      'Deployed on AWS (EC2 Auto Scaling, RDS PostgreSQL, ElastiCache Redis, S3, CloudFront) with Kubernetes orchestration and GitHub Actions CI/CD.',
    ],
    stack: [
      { group: 'AI / LLM', items: ['GPT-4', 'Claude API', 'LangChain', 'RAG Pipelines', 'Helicone', 'LangSmith'] },
      { group: 'Backend', items: ['Django', 'DRF', 'Celery', 'Redis', 'PostgreSQL', 'Kafka'] },
      { group: 'Frontend', items: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts'] },
      { group: 'Infrastructure', items: ['AWS EC2', 'Kubernetes', 'RDS', 'ElastiCache', 'S3', 'CloudFront'] },
    ],
    metrics: [
      { value: '100K/s', label: 'Read/write ops sustained' },
      { value: '100K', label: 'SKUs generated per batch' },
      { value: '70%', label: 'Manual content effort cut' },
      { value: '20', label: 'Engineers hired & led' },
    ],
    nextSlug: 'ceodekho',
    nextCompany: 'Ceodekho',
  },

  ceodekho: {
    slug: 'ceodekho',
    company: 'Ceodekho',
    role: 'Co-founder & CTO',
    dateRange: 'Dec 2023 – Jun 2024',
    category: 'AI SaaS · Content',
    tagline: 'AI-native SaaS blogging platform — LLM pipelines and agentic content workflows cutting production time by 80%, PageSpeed 99+ desktop.',
    overview:
      'Ceodekho is an AI-native SaaS blogging platform I co-founded and led as CTO. The product lets content teams produce high-quality, SEO-optimised blog posts at scale using LLM pipelines and agentic content workflows — reducing human content production time by 80%. I owned the full technical stack from architecture through deployment.',
    challenge:
      'Content teams waste enormous time on research, structuring, and drafting. The challenge was building AI pipelines that produced genuinely useful, SEO-ready content — not generic filler — and delivering it fast enough to feel like a productivity tool rather than a slow automation. On top of this, the frontend needed to score 99+ on PageSpeed to ensure the content we published actually ranked.',
    whatIBuilt: [
      'Designed and built the LLM content pipeline: agentic content workflows (research → outline → draft → edit) using OpenAI APIs, reducing content production time by 80% vs manual writing.',
      'Engineered the technical SEO layer into the platform — structured data, canonical tags, sitemap generation, and meta automation — achieving PageSpeed 99+ on desktop and 90+ on mobile.',
      'Built the Next.js SSR frontend with edge caching on Vercel/Cloudflare — ensuring published content loaded under 1 second globally.',
      'Designed multi-tenant architecture with cost-optimised token management: per-tenant usage quotas, model routing (GPT-4 for quality-critical tasks, GPT-3.5 for volume tasks), and token budget alerts.',
      'Built the subscription and billing layer with Stripe — tiered plans based on monthly word output, overage handling, and a free trial that seeded organic growth.',
    ],
    stack: [
      { group: 'AI / LLM', items: ['OpenAI API', 'LLM Agents', 'Prompt Chaining', 'Agentic Workflows'] },
      { group: 'Backend', items: ['Django', 'Python', 'Celery', 'PostgreSQL', 'Redis'] },
      { group: 'Frontend', items: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Technical SEO'] },
      { group: 'Infrastructure', items: ['AWS EC2', 'Cloudflare', 'Docker', 'GitHub Actions'] },
    ],
    metrics: [
      { value: '80%', label: 'Content production time saved' },
      { value: '99+', label: 'PageSpeed score (desktop)' },
      { value: '90+', label: 'PageSpeed score (mobile)' },
      { value: 'Multi-tenant', label: 'Cost-optimised AI at scale' },
    ],
    nextSlug: 'khaatadekho',
    nextCompany: 'Khaatadekho',
  },

  khaatadekho: {
    slug: 'khaatadekho',
    company: 'Khaatadekho',
    role: 'Founder',
    dateRange: 'Nov 2023 – Jun 2024',
    category: 'CRM SaaS · 0-to-1',
    tagline: 'Mini-Salesforce CRM — AI-assisted lead scoring, 10+ stable clients, ₹80K average monthly revenue, 60% CRM data entry reduction.',
    overview:
      'Khaatadekho is a CRM SaaS platform I founded and built from scratch — a lightweight Salesforce alternative for Indian SMBs who find enterprise CRMs too expensive and complex. I owned everything: product research, backend, frontend, AI integration, and client acquisition. Within months of launch, the platform reached 10+ stable paying clients generating ₹80,000 in average monthly revenue.',
    challenge:
      'Indian SMBs need CRM software but refuse to pay for Salesforce or deal with its complexity. The challenge was building a CRM that was genuinely useful out of the box — not a feature-bloated enterprise tool — while adding AI-driven lead scoring that actually reduced manual data entry rather than adding more fields to fill in.',
    whatIBuilt: [
      'Built the full CRM platform from scratch: contact management, deal pipeline (Kanban + list views), activity tracking, notes, and email/call logging — all in React + Django with PostgreSQL.',
      'Integrated AI-assisted lead scoring using LLM APIs — the system reads CRM notes and interaction history, scores leads by conversion likelihood, and surfaces action recommendations, reducing manual CRM data entry by 60%.',
      'Designed the pipeline automation engine: rule-based triggers (deal stage change → auto-task creation, inactivity → follow-up reminder) that saved sales reps 2+ hours per week.',
      'Built multi-tenant architecture with subdomain routing, role-based permissions (admin, sales rep, manager), and per-tenant data isolation.',
      'Acquired 10+ stable clients through direct outreach and referrals, growing to ₹80,000 average monthly revenue — validating the product-market fit.',
    ],
    stack: [
      { group: 'AI / LLM', items: ['LLM APIs', 'AI Lead Scoring', 'OpenAI API'] },
      { group: 'Backend', items: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Redis'] },
      { group: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'React Query'] },
      { group: 'Infrastructure', items: ['AWS EC2', 'RDS', 'Docker', 'GitHub Actions'] },
    ],
    metrics: [
      { value: '10+', label: 'Stable paying clients' },
      { value: '₹80K', label: 'Avg monthly revenue' },
      { value: '60%', label: 'CRM data entry reduced' },
      { value: '0→1', label: 'Solo founder build' },
    ],
    nextSlug: 'intellectyx',
    nextCompany: 'Intellectyx',
  },

  intellectyx: {
    slug: 'intellectyx',
    company: 'Intellectyx',
    role: 'Technical Lead — AI & SaaS Consultant',
    dateRange: 'Nov 2023 – May 2024',
    category: 'AI Consulting',
    tagline: 'Technical Lead across 4 cross-functional teams — Udemy-style AI platform, vector embeddings, 35% productivity lift, $2M client revenue.',
    overview:
      'Intellectyx is a data and AI consulting firm serving US-based enterprise clients. As Technical Lead — AI & SaaS Consultant, I led 4 cross-functional engineering teams architecting scalable SaaS products across edtech, enterprise productivity, and AI tooling. My work contributed directly to $2M in additional client revenue.',
    challenge:
      'US enterprise clients wanted AI-powered products built fast and reliably — but they also had compliance constraints, procurement-approved stacks, and internal teams that needed to maintain the systems after delivery. The challenge was balancing cutting-edge AI capabilities with maintainable, well-documented architectures that client teams could own long-term.',
    whatIBuilt: [
      'Led 4 cross-functional engineering teams (12+ engineers total) architecting and shipping scalable SaaS products for US-based enterprise clients — owning architecture reviews, sprint planning, and technical delivery.',
      'Designed a Udemy-style learning platform with an AI-powered course recommendation engine: vector embeddings of course content and learner history, cosine-similarity retrieval, and a re-ranking layer — improving learner engagement by 40%.',
      'Increased engineering team productivity by 35% across client engagements by introducing AI-assisted development tooling (Cursor, GitHub Copilot), standardised code review workflows, and internal prompt engineering guides.',
      'Contributed to $2M in additional client revenue by expanding project scope through well-timed technical proposals: identifying adjacent AI use cases mid-engagement and pitching them as follow-on work.',
      'Built reusable AI microservice templates: FastAPI with standardised request/response schemas, OpenTelemetry tracing, token cost tracking, and prompt version management — reducing time-to-first-endpoint from days to hours.',
    ],
    stack: [
      { group: 'AI / ML', items: ['Vector Embeddings', 'AI Recommendations', 'OpenAI API', 'LlamaIndex'] },
      { group: 'Backend', items: ['Python', 'Node.js', 'FastAPI', 'PostgreSQL', 'Redis'] },
      { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
      { group: 'Infrastructure', items: ['AWS', 'Azure', 'Docker', 'Terraform', 'GitHub Actions'] },
    ],
    metrics: [
      { value: '4', label: 'Cross-functional teams led' },
      { value: '40%', label: 'Learner engagement improvement' },
      { value: '35%', label: 'Engineering productivity lift' },
      { value: '$2M', label: 'Additional client revenue' },
    ],
    nextSlug: 'turno',
    nextCompany: 'Turno',
  },

  turno: {
    slug: 'turno',
    company: 'Turno',
    role: 'Technical Lead — Founding Team',
    dateRange: 'May 2022 – Dec 2023',
    category: 'Marketplace · EV',
    tagline: 'Led Facebook/Google partnership driving conversions 1%→25% across 20 landing pages; built AI personalisation and full-stack Agent App.',
    overview:
      'Turno is India\'s electric vehicle marketplace for commercial fleet buyers. I joined as part of the founding technical team and served as Technical Lead, owning major growth and product initiatives end-to-end — from a high-impact partnership with Facebook and Google to building the internal Agent App and AI personalisation layer that improved sales funnel efficiency.',
    challenge:
      'The platform had traffic but poor conversion — 1% of visitors were taking action. At the same time, the sales team lacked internal tooling: they were managing field operations and enterprise accounts through WhatsApp and spreadsheets. Two parallel challenges: dramatically improve top-of-funnel conversion, and build the internal systems that let a lean sales team scale.',
    whatIBuilt: [
      'Led the Facebook and Google partnership initiative — engineered a dynamic website deployment system that launched 20 tailored landing pages optimised per ad audience, channel, and geography. Drove conversion rate from 1% to 25%.',
      'Integrated AI-driven personalisation into the sales funnel: LLM-assisted copy generation for landing page variants, dynamic CTAs based on visitor behaviour signals, and A/B testing infrastructure — significantly reducing customer acquisition cost (CAC).',
      'Built and owned the full-stack Agent App end-to-end: field sales reps\' primary tool for managing leads, scheduling visits, logging outcomes, and accessing vehicle inventory — React Native mobile + Django backend + real-time sync.',
      'Built the EWS (Early Warning System) — an internal dashboard that surfaced at-risk deals, flagged inactive leads, and triggered automated follow-up sequences, helping sales managers prioritise their team\'s pipeline.',
      'Oversaw backend, frontend, and DevOps for all owned products — including CI/CD pipelines, deployment automation, and monitoring setup.',
    ],
    stack: [
      { group: 'AI / Personalisation', items: ['LLM APIs', 'AI Copy Generation', 'A/B Testing', 'Dynamic CTAs'] },
      { group: 'Backend', items: ['Django', 'Python', 'Node.js', 'PostgreSQL', 'Redis', 'Celery'] },
      { group: 'Frontend', items: ['React', 'React Native', 'TypeScript', 'Redux Toolkit'] },
      { group: 'Infrastructure', items: ['AWS EC2', 'Docker', 'CI/CD', 'GitHub Actions'] },
    ],
    metrics: [
      { value: '1%→25%', label: 'Conversion rate (landing pages)' },
      { value: '20', label: 'Tailored landing pages launched' },
      { value: '↓ CAC', label: 'AI personalisation impact' },
      { value: '2', label: 'Internal tools built (Agent App + EWS)' },
    ],
    nextSlug: 'wizcommerce',
    nextCompany: 'Wizcommerce',
  },

  wizcommerce: {
    slug: 'wizcommerce',
    company: 'Wizcommerce',
    role: 'Senior Software Engineer — Founding Team',
    dateRange: 'Sep 2021 – Jun 2022',
    category: 'B2B SaaS',
    tagline: 'Founding team engineer — compressed customer onboarding from 10 days to 1 day, built Sourcewiz Customer App from scratch across the full stack.',
    overview:
      'Wizcommerce (Sourcewiz) is a B2B SaaS platform enabling wholesale and distribution businesses to manage orders, inventory, and customer relationships online. I joined as a Senior Software Engineer on the founding team — one of the early engineers shaping the core product architecture and owning critical features end-to-end.',
    challenge:
      'New customers faced a 10-day manual onboarding process — data migration, product catalogue setup, and team training — before they could use the platform. This was a major bottleneck for sales and churn risk in the first 30 days. In parallel, the company needed to build a customer-facing app from scratch with a 3-person team on a tight timeline.',
    whatIBuilt: [
      'Built the onboarding automation tool that compressed customer onboarding from 10 days to 1 day — automated data import, product catalogue mapping, and guided setup wizard replaced the previous manual white-glove process.',
      'Led a 3–4 member team to build Sourcewiz\'s Customer App from scratch: owned product scoping, frontend (React), backend APIs (Python/Django), and deployment — shipping the app end-to-end within the engagement timeline.',
      'Designed the multi-warehouse inventory system: stock levels per SKU per warehouse, inter-warehouse transfer workflows, and a reservation system that prevented overselling across concurrent orders.',
      'Profiled and eliminated N+1 queries across key API endpoints — rewrote ORM queries with select_related/prefetch_related and Redis caching, reducing response times from 4–8s to under 800ms for large accounts.',
      'Contributed to B2B commerce platform features: order management lifecycle (placed → confirmed → shipped → delivered), payment integrations, and customer-specific pricing and discount rules.',
    ],
    stack: [
      { group: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Celery'] },
      { group: 'Frontend', items: ['React', 'TypeScript', 'GraphQL', 'Apollo Client'] },
      { group: 'Infrastructure', items: ['AWS EC2', 'RDS', 'ElastiCache', 'S3', 'Docker'] },
    ],
    metrics: [
      { value: '60%', label: 'API performance improvement' },
      { value: '4–8s → <800ms', label: 'Inventory search latency' },
      { value: '100+', label: 'Enterprise clients served' },
      { value: '12×', label: 'Fewer DB queries per request' },
    ],
    nextSlug: 'tally-solutions',
    nextCompany: 'Tally Solutions',
  },

  'tally-solutions': {
    slug: 'tally-solutions',
    company: 'Tally Solutions',
    role: 'Software Development Engineer I & II',
    dateRange: 'Aug 2019 – Sep 2021',
    category: 'Enterprise Software',
    tagline: 'Core contributor to Tally Prime — accounting engine, GST statutory compliance modules, REST API layer, and automated test suites.',
    overview:
      'Tally Solutions is one of India\'s most widely used business software products, with over 7 million active businesses. I worked on the core Tally Prime product as a Software Engineer — contributing to the accounting engine, building statutory compliance modules for the GST era, and helping architect the REST API layer that enabled third-party integrations.',
    challenge:
      'Tally Prime was undergoing a major re-architecture during my tenure — transitioning from TDL (Tally Definition Language) monolith to a hybrid model with a modern REST API layer. The challenge was maintaining full backward compatibility with 10+ years of customer data and configurations while modernising the integration layer and keeping up with quarterly GST regulation changes from the Indian government.',
    whatIBuilt: [
      'Developed GSTR-9 (Annual Return) and GSTR-9C (Reconciliation Statement) compliance modules in TDL and C++ — handling complex tax computation across 30+ GSTIN registration types with support for amendments, credit notes, and debit notes.',
      'Contributed to the Tally REST API layer: designed and implemented 15+ endpoints for voucher creation, ledger queries, balance sheet extraction, and report generation — used by 200+ certified third-party integration partners.',
      'Built an automated regression test suite using Python + Selenium that replayed 10,000 real customer transaction sequences against each release, catching compliance regressions before they shipped to 7M users.',
      'Implemented the e-Invoice API integration (IRP/NIC portal) — digital signing of B2B invoices, QR code generation, IRN (Invoice Reference Number) management, and error reconciliation for failed submissions.',
      'Optimised the ledger summary computation for large datasets: companies with 500K+ vouchers/year were taking 45+ seconds to generate a P&L report. Rewrote the computation using incremental aggregation with a dirty-flag cache, reducing it to under 3 seconds.',
    ],
    stack: [
      { group: 'Core', items: ['C++', 'TDL (Tally Definition Language)', 'REST APIs'] },
      { group: 'Testing & Tooling', items: ['Python', 'Selenium', 'pytest', 'Postman', 'MSSQL'] },
      { group: 'Compliance', items: ['GST APIs (IRP/NIC)', 'e-Invoice', 'GSTR filing formats'] },
    ],
    metrics: [
      { value: '7M+', label: 'Businesses using Tally Prime' },
      { value: '10+', label: 'Compliance modules shipped' },
      { value: '45s → 3s', label: 'P&L report time (large datasets)' },
      { value: '200+', label: 'Integration partners on REST API' },
    ],
    nextSlug: 'pixelai',
    nextCompany: 'PixelAI.in',
  },

  pixelai: {
    slug: 'pixelai',
    company: 'PixelAI.in',
    role: 'Co-founder',
    dateRange: 'Jan 2017 – Mar 2020',
    category: 'AI SaaS · Startup',
    tagline: 'AI-powered image enhancement SaaS — 10,000+ users across 40 countries, bootstrapped to profitability, GPU inference at scale.',
    overview:
      'PixelAI.in was an AI-powered image enhancement and restoration SaaS that I co-founded and built from zero. The platform offered photographers, e-commerce sellers, and designers tools like super-resolution, background removal, noise reduction, and colour grading — powered by custom deep learning models running on GPU inference infrastructure. We grew to 10,000+ active users across 40 countries and reached profitability without external funding.',
    challenge:
      'The hard part was not the machine learning — it was serving GPU inference economically at sub-3-second latency for consumer users who expected instant results, while keeping infrastructure costs low enough to stay profitable on a $9/month subscription. Cloud GPU instances cost $2–5 per hour. A naive approach would make every free-tier request cost us more than the user paid in a month.',
    whatIBuilt: [
      'Trained and fine-tuned ESRGAN (super-resolution), U-Net (background removal), and DnCNN (denoising) models on curated datasets — optimised models to TensorRT for GPU deployment, reducing inference time by 40% vs PyTorch baseline.',
      'Engineered a GPU instance pool scheduler: auto-scales EC2 GPU instances (g4dn.xlarge) based on queue depth, pre-warms instances 2 minutes before predicted traffic spikes (from historical patterns), and hibernates idle instances — keeping GPU cost at $180/month vs $2,000+ with always-on approach.',
      'Built the full-stack SaaS platform: Flask API backend, React frontend with real-time job progress (WebSocket), Stripe subscription billing with usage-based overage, team workspaces, API access tier with SDK, and a Figma plugin.',
      'Designed the job queue architecture: image upload → S3 → SQS → GPU worker → result S3 → webhook/polling — fully async with retry logic, dead-letter queue, and cost-per-job tracking per customer.',
      'Grew the product from 0 to 10,000 users through a SEO-first content strategy (long-tail "how to remove background from image" keywords), Product Hunt launches (#3 Product of the Day), and a free tier limited to 5 images/day.',
    ],
    stack: [
      { group: 'AI / ML', items: ['TensorFlow', 'PyTorch', 'TensorRT', 'ESRGAN', 'U-Net', 'DnCNN'] },
      { group: 'Backend', items: ['Python', 'Flask', 'Celery', 'PostgreSQL', 'Redis', 'SQS'] },
      { group: 'Frontend', items: ['React', 'JavaScript', 'WebSockets', 'Stripe.js'] },
      { group: 'Infrastructure', items: ['AWS EC2 (GPU)', 'S3', 'SQS', 'CloudFront', 'Route 53', 'Docker'] },
    ],
    metrics: [
      { value: '10K+', label: 'Active users' },
      { value: '40', label: 'Countries' },
      { value: '91%', label: 'GPU cost reduction' },
      { value: 'Profitable', label: 'Bootstrapped, no funding' },
    ],
    nextSlug: 'the-branding-club',
    nextCompany: 'The Branding Club',
  },
}

// ─── Static params for SSG ─────────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = CASE_STUDIES[slug]
  if (!cs) return { title: 'Not Found' }
  return {
    title: `${cs.company} — Case Study`,
    description: cs.tagline,
    alternates: { canonical: `${SITE_URL}/work/${slug}` },
    openGraph: {
      title: `${cs.company} | Deepak Kushwaha`,
      description: cs.tagline,
      url: `${SITE_URL}/work/${slug}`,
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function WorkSlugPage({ params }: Props) {
  const { slug } = await params
  const cs = CASE_STUDIES[slug]
  if (!cs) notFound()

  return (
    <div className="min-h-screen pt-32 pb-24">

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <div className="px-6 mb-20">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#f5f5f0]/40 hover:text-[#f5f5f0] transition-colors mb-12 tracking-wide"
          >
            <ArrowLeft size={12} />
            Back to Work
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#f5f5f0]/30 uppercase">
              {cs.category}
            </span>
            <span className="text-[#f5f5f0]/10">·</span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#f5f5f0]/30 uppercase">
              {cs.dateRange}
            </span>
          </div>

          <h1 className="font-serif font-black text-4xl sm:text-5xl md:text-7xl text-[#f5f5f0] uppercase leading-none mb-6">
            {cs.company}
          </h1>

          <p className="font-sans text-base md:text-lg text-[#f5f5f0]/50 leading-relaxed max-w-2xl mb-2">
            {cs.role}
          </p>
        </div>
      </div>

      {/* ── METRICS BAR ─────────────────────────────────────────────────────── */}
      <div className="border-t border-b border-white/10 py-10 px-6 mb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {cs.metrics.map((m) => (
            <div key={m.label} className="flex flex-col">
              <span className="font-serif font-black text-3xl md:text-4xl text-[#f5f5f0] leading-none mb-2">
                {m.value}
              </span>
              <span className="font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest uppercase">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── BODY ────────────────────────────────────────────────────────────── */}
      <div className="px-6">
        <div className="max-w-4xl mx-auto space-y-20">

          {/* Overview */}
          <section>
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#f5f5f0]/30 uppercase mb-5">
              Overview
            </p>
            <p className="font-sans text-base md:text-lg text-[#f5f5f0]/70 leading-relaxed">
              {cs.overview}
            </p>
          </section>

          {/* Challenge */}
          <section className="border-l-2 border-white/10 pl-8">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#f5f5f0]/30 uppercase mb-5">
              The Challenge
            </p>
            <p className="font-sans text-base text-[#f5f5f0]/60 leading-relaxed">
              {cs.challenge}
            </p>
          </section>

          {/* What I Built */}
          <section>
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#f5f5f0]/30 uppercase mb-8">
              What I Built
            </p>
            <div className="space-y-6">
              {cs.whatIBuilt.map((item, i) => (
                <div key={i} className="flex gap-6">
                  <span className="font-mono text-xs text-[#f5f5f0]/15 shrink-0 pt-0.5 w-5 text-right">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-sans text-sm md:text-base text-[#f5f5f0]/60 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="border-t border-white/10 pt-16">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#f5f5f0]/30 uppercase mb-8">
              Tech Stack
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cs.stack.map((group) => (
                <div key={group.group}>
                  <p className="font-mono text-[10px] text-[#f5f5f0]/20 tracking-widest uppercase mb-3">
                    {group.group}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-xs px-3 py-1.5 border border-white/10 text-[#f5f5f0]/50 tracking-wide"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* ── NEXT PROJECT ────────────────────────────────────────────────────── */}
      {cs.nextSlug && (
        <div className="mt-24 border-t border-white/10 px-6 pt-16">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <span className="font-mono text-xs text-[#f5f5f0]/20 tracking-widest uppercase">
              Next Project
            </span>
            <Link
              href={`/work/${cs.nextSlug}`}
              className="group inline-flex items-center gap-3 font-serif font-bold text-2xl md:text-3xl text-[#f5f5f0]/70 hover:text-[#f5f5f0] transition-colors duration-200"
            >
              {cs.nextCompany}
              <ArrowRight size={20} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      )}

    </div>
  )
}
