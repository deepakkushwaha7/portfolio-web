'use client'

// TODO: Replace form submit with actual API call to Django backend at /api/enquiries/create/

import React, { useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Download, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs))

const OFFERINGS = [
  {
    tag: 'CONTRACT',
    title: 'Contract Work',
    description:
      'Short to mid-term engagements for well-scoped AI and full-stack engineering projects. Weekly/monthly billing, milestone-based delivery.',
    highlights: ['4–24 week engagements', 'Remote-first', 'Clear SOW', 'IP transfer included'],
  },
  {
    tag: 'FULL-TIME',
    title: 'Full-Time Roles',
    description:
      'Open to senior individual contributor and engineering leadership roles at ambitious companies building in AI, SaaS, or deep tech.',
    highlights: ['Senior IC or Lead roles', 'AI-first products preferred', 'Bangalore or remote', 'Immediate availability'],
  },
  {
    tag: 'ADVISORY',
    title: 'Advisory & Consulting',
    description:
      'Strategic advisory for founders and CTOs — AI architecture, team structure, product strategy, and technical due diligence.',
    highlights: ['Monthly retainer', 'Fractional CTO', 'Architecture reviews', 'Due diligence'],
  },
]

const WORKING_STYLE = [
  'I write documentation before I write code. Systems that outlive their authors start with clear thinking.',
  'Async-first but synchronous when it matters. I optimise for outcomes, not presence.',
  'I hire people I can learn from and create environments where they can do their best work.',
  'I believe in shipping early, measuring everything, and iterating without ego.',
  'No siloed engineering. I collaborate closely with product, design, and business from day one.',
  'My benchmark for AI systems: not "does it work in the demo" but "is it reliable at 3 AM".',
]

const ROLE_TYPES = [
  'Contract / Freelance',
  'Full-Time Employment',
  'Advisory / Fractional CTO',
  'Technical Co-founder',
  'Other',
]

const BUDGET_RANGES = [
  '< ₹50 LPA',
  '₹50–80 LPA',
  '₹80–120 LPA',
  '₹120–180 LPA',
  '₹180 LPA+',
  "Custom / Let's discuss",
]

type EnquiryForm = {
  name: string
  email: string
  company: string
  roleType: string
  budgetRange: string
  message: string
}

export default function HireClient() {
  const [form, setForm] = useState<EnquiryForm>({
    name: '',
    email: '',
    company: '',
    roleType: '',
    budgetRange: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // TODO: POST to /api/enquiries/create/ with form data
    console.log('Enquiry:', form)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <>
      {/* Availability */}
      <section className="pt-32 pb-20 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-3 font-mono text-sm text-[#f5f5f0]/70 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f5f5f0]/40 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f5f5f0]/80" />
            </span>
            Currently Open to Opportunities
          </div>
          <h1 className="display font-serif font-black text-[#f5f5f0] uppercase leading-none mb-6">
            Hire Me
          </h1>
          <p className="font-sans text-lg text-[#f5f5f0]/40 max-w-xl leading-relaxed">
            9 years. 20+ products. AI-native platforms, SaaS marketplaces, and
            everything in between. Let&rsquo;s talk about what we can build together.
          </p>
        </div>
      </section>

      {/* What I offer */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-xs text-[#f5f5f0]/40 tracking-[0.3em] uppercase mb-12">
            What I Offer
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {OFFERINGS.map((offering) => (
              <div
                key={offering.tag}
                className="bg-[#0a0a0a] border border-white/10 p-8 hover:border-white/30 transition-all duration-300 flex flex-col"
              >
                <p className="font-mono text-[10px] tracking-[0.3em] text-[#f5f5f0]/30 uppercase mb-4">
                  {offering.tag}
                </p>
                <h3 className="font-serif text-2xl font-bold text-[#f5f5f0] mb-4">{offering.title}</h3>
                <p className="font-sans text-sm text-[#f5f5f0]/40 leading-relaxed mb-8 flex-1">
                  {offering.description}
                </p>
                <ul className="flex flex-col gap-2">
                  {offering.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3 font-mono text-xs text-[#f5f5f0]/30">
                      <span className="w-1 h-1 rounded-full bg-[#f5f5f0]/20 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs text-[#f5f5f0]/40 tracking-[0.3em] uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="headline font-serif font-bold text-[#f5f5f0] mb-12">
            Send an Enquiry
          </h2>

          {submitted ? (
            <div className="text-center py-16 border border-white/10">
              <CheckCircle2 size={40} className="text-[#f5f5f0]/40 mx-auto mb-6" strokeWidth={1} />
              <h3 className="font-serif text-2xl font-bold text-[#f5f5f0] mb-3">Message Received</h3>
              <p className="font-sans text-sm text-[#f5f5f0]/40 leading-relaxed max-w-sm mx-auto">
                I&rsquo;ll review your message and get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="hire-name" className="block font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest uppercase mb-2">
                    Name
                  </label>
                  <input
                    id="hire-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Priya Mehta"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/10 px-4 py-3 font-sans text-sm text-[#f5f5f0] placeholder:text-[#f5f5f0]/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="hire-email" className="block font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest uppercase mb-2">
                    Email
                  </label>
                  <input
                    id="hire-email"
                    name="email"
                    type="email"
                    required
                    placeholder="priya@company.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/10 px-4 py-3 font-sans text-sm text-[#f5f5f0] placeholder:text-[#f5f5f0]/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="hire-company" className="block font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest uppercase mb-2">
                    Company
                  </label>
                  <input
                    id="hire-company"
                    name="company"
                    type="text"
                    placeholder="Acme Inc."
                    value={form.company}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/10 px-4 py-3 font-sans text-sm text-[#f5f5f0] placeholder:text-[#f5f5f0]/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="hire-role" className="block font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest uppercase mb-2">
                    Role Type
                  </label>
                  <select
                    id="hire-role"
                    name="roleType"
                    required
                    value={form.roleType}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 font-sans text-sm text-[#f5f5f0] focus:outline-none focus:border-white/30 transition-colors appearance-none"
                  >
                    <option value="" disabled>Select type…</option>
                    {ROLE_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="hire-budget" className="block font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest uppercase mb-2">
                    Budget / Compensation Range
                  </label>
                  <select
                    id="hire-budget"
                    name="budgetRange"
                    value={form.budgetRange}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 font-sans text-sm text-[#f5f5f0] focus:outline-none focus:border-white/30 transition-colors appearance-none"
                  >
                    <option value="">Select range…</option>
                    {BUDGET_RANGES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="hire-message" className="block font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest uppercase mb-2">
                  Tell Me About the Opportunity
                </label>
                <textarea
                  id="hire-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Describe the role, the problem you're solving, the tech stack, and what success looks like in 6 months..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/10 px-4 py-3 font-sans text-sm text-[#f5f5f0] placeholder:text-[#f5f5f0]/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={cn(
                  'w-full py-4 font-sans font-semibold text-sm tracking-wide transition-all duration-200',
                  'flex items-center justify-center gap-3',
                  submitting
                    ? 'bg-[#f5f5f0]/20 text-[#f5f5f0]/30 cursor-not-allowed'
                    : 'bg-[#f5f5f0] text-[#0a0a0a] hover:bg-white'
                )}
              >
                {submitting ? 'Sending...' : <>Send Enquiry <ArrowRight size={14} /></>}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Download resume */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#f5f5f0] mb-1">Prefer a PDF?</h3>
            <p className="font-sans text-sm text-[#f5f5f0]/40">
              Download my full resume with work history, skills, and contact details.
            </p>
          </div>
          <a
            href="/Deepak-Kushwaha-Resume.pdf"
            download
            className="shrink-0 inline-flex items-center gap-3 px-6 py-3 border border-white/20 text-[#f5f5f0]/60 font-sans text-sm font-medium hover:border-white/50 hover:text-[#f5f5f0] transition-all duration-200"
          >
            <Download size={14} />
            Download Resume
          </a>
        </div>
      </section>

      {/* Working style */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs text-[#f5f5f0]/40 tracking-[0.3em] uppercase mb-12">
            How I Work
          </p>
          <div className="flex flex-col gap-6">
            {WORKING_STYLE.map((item, i) => (
              <div key={i} className="flex gap-6 items-start border-b border-white/10 pb-6 last:border-0">
                <span className="font-mono text-xs text-[#f5f5f0]/15 pt-1 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-sans text-base text-[#f5f5f0]/60 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
