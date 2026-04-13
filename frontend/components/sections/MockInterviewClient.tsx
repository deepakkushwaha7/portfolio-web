'use client'

// TODO: Replace booking form submit with actual API call to Django backend at /api/bookings/create/
// TODO: Integrate payment gateway (Razorpay) for ₹499 booking payment flow

import React, { useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react'

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs))

const WHAT_YOU_GET = [
  {
    icon: '⌘',
    title: 'System Design',
    description:
      'Deep dive into scalable architecture — distributed systems, databases, APIs, microservices, and real trade-off discussions.',
  },
  {
    icon: '∑',
    title: 'DSA & Algorithms',
    description:
      'LeetCode-style problems with optimal solutions, complexity analysis, and the communication strategy that impresses interviewers.',
  },
  {
    icon: '◈',
    title: 'AI / ML Concepts',
    description:
      'RAG pipelines, model evaluation, LLM architecture, ML system design, and AI-specific questions for senior roles.',
  },
  {
    icon: '◎',
    title: 'Written Feedback Report',
    description:
      'Detailed written assessment delivered within 24 hours — strengths, gaps, and a personalised preparation roadmap.',
  },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Choose Your Slot', description: 'Pick an available date and time that works for you.' },
  { step: '02', title: 'Book & Pay', description: 'Secure your slot with a ₹499 payment via Razorpay.' },
  { step: '03', title: 'Get Confirmation', description: 'Receive calendar invite + Google Meet link within minutes.' },
  { step: '04', title: 'Your Interview', description: '60-minute 1:1 session, live problem-solving, real feedback.' },
]

const AVAILABLE_DATES = [
  { date: 'Apr 15', slots: ['10:00 AM', '2:00 PM', '5:00 PM'] },
  { date: 'Apr 16', slots: ['11:00 AM', '3:00 PM'] },
  { date: 'Apr 17', slots: ['10:00 AM', '1:00 PM', '4:00 PM', '6:00 PM'] },
  { date: 'Apr 19', slots: ['10:00 AM', '2:00 PM'] },
  { date: 'Apr 21', slots: ['11:00 AM', '3:00 PM', '5:00 PM'] },
  { date: 'Apr 22', slots: ['10:00 AM', '12:00 PM', '4:00 PM'] },
]

const FOCUS_AREAS = [
  'System Design',
  'DSA & Algorithms',
  'AI / ML',
  'Behavioral / Leadership',
  'Mock Full Interview',
  'Resume Review',
]

const FAQ = [
  {
    q: 'Is this suitable for freshers?',
    a: 'This session is best suited for engineers with 2+ years of experience targeting senior, staff, or principal roles. For freshers, a lighter prep session is recommended — reach out before booking.',
  },
  {
    q: 'What happens if I need to reschedule?',
    a: 'You can reschedule up to 24 hours before the session at no extra charge. Cancellations within 24 hours are non-refundable.',
  },
  {
    q: 'What platform will we use?',
    a: 'Google Meet for video, with shared screen for code. You can use any online IDE of your choice (Replit, CoderPad, etc.).',
  },
  {
    q: 'Do you provide a recording of the session?',
    a: 'Sessions are not recorded by default, but you can request a recording in the booking form. Recordings are shared only with you.',
  },
  {
    q: 'Can I book multiple sessions?',
    a: 'Yes — multi-session bundles (3 sessions, 5 sessions) are available at a discount. Contact directly for bundle pricing.',
  },
]

type BookingFormData = {
  name: string
  email: string
  phone: string
  currentRole: string
  targetRole: string
  focusAreas: string[]
  selectedDate: string
  selectedSlot: string
  wantsRecording: boolean
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-sans text-base text-[#f5f5f0]/80">{q}</span>
        <ChevronDown
          size={16}
          className={cn(
            'shrink-0 text-[#f5f5f0]/30 transition-transform duration-200',
            open ? 'rotate-180' : ''
          )}
        />
      </button>
      {open && (
        <div className="pb-5">
          <p className="font-sans text-sm text-[#f5f5f0]/40 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function MockInterviewClient() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    currentRole: '',
    targetRole: '',
    focusAreas: [],
    selectedDate: '',
    selectedSlot: '',
    wantsRecording: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleFocusToggle = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter((a) => a !== area)
        : [...prev.focusAreas, area],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // TODO: POST to /api/bookings/create/ with auth + trigger Razorpay payment
    console.log('Booking data:', formData)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitting(false)
    setSubmitted(true)
  }

  const availableSlots =
    AVAILABLE_DATES.find((d) => d.date === formData.selectedDate)?.slots ?? []

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-[#0a0a0a] bg-[#f5f5f0] px-4 py-2 uppercase mb-8">
            ₹499 per session
          </div>
          <h1 className="display font-serif font-black text-[#f5f5f0] uppercase leading-none mb-6">
            1:1 Mock Interview
            <br />
            <span className="text-[#f5f5f0]/40">with Deepak</span>
          </h1>
          <p className="font-sans text-lg text-[#f5f5f0]/40 max-w-xl mx-auto leading-relaxed">
            A focused 60-minute session covering the exact topics that appear in
            senior engineering and AI architect interviews — with written feedback.
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-xs text-[#f5f5f0]/40 tracking-[0.3em] uppercase mb-12 text-center">
            What&rsquo;s Included
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {WHAT_YOU_GET.map((item) => (
              <div
                key={item.title}
                className="bg-[#0a0a0a] border border-white/10 p-8 hover:border-white/30 transition-all duration-300"
              >
                <div className="font-serif text-4xl text-[#f5f5f0]/10 mb-4">{item.icon}</div>
                <h3 className="font-serif text-xl font-bold text-[#f5f5f0] mb-3">{item.title}</h3>
                <p className="font-sans text-sm text-[#f5f5f0]/40 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs text-[#f5f5f0]/40 tracking-[0.3em] uppercase mb-12 text-center">
            How It Works
          </p>
          <div className="flex flex-col md:flex-row gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="flex-1 p-8 text-center">
                <p className="font-mono text-5xl font-bold text-[#f5f5f0]/10 mb-4">{step.step}</p>
                <h3 className="font-serif text-lg font-bold text-[#f5f5f0] mb-2">{step.title}</h3>
                <p className="font-sans text-sm text-[#f5f5f0]/40 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs text-[#f5f5f0]/40 tracking-[0.3em] uppercase mb-4 text-center">
            Book Your Session
          </p>
          <h2 className="headline font-serif font-bold text-[#f5f5f0] text-center mb-12">
            Choose Your Slot
          </h2>

          {submitted ? (
            <div className="text-center py-16 border border-white/10">
              <CheckCircle2 size={40} className="text-[#f5f5f0]/40 mx-auto mb-6" strokeWidth={1} />
              <h3 className="font-serif text-2xl font-bold text-[#f5f5f0] mb-3">Booking Received</h3>
              <p className="font-sans text-sm text-[#f5f5f0]/40 leading-relaxed max-w-sm mx-auto">
                Payment link sent to your email. Once confirmed you&rsquo;ll receive
                a calendar invite within 15 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Date picker */}
              <div>
                <label className="block font-mono text-xs text-[#f5f5f0]/40 tracking-widest uppercase mb-4">
                  Available Dates (April 2026)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {AVAILABLE_DATES.map(({ date }) => (
                    <button
                      key={date}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, selectedDate: date, selectedSlot: '' }))}
                      className={cn(
                        'py-3 font-mono text-xs tracking-wide transition-all duration-200 border',
                        formData.selectedDate === date
                          ? 'bg-[#f5f5f0] text-[#0a0a0a] border-[#f5f5f0]'
                          : 'text-[#f5f5f0]/50 border-white/10 hover:border-white/30'
                      )}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slots */}
              {formData.selectedDate && (
                <div>
                  <label className="block font-mono text-xs text-[#f5f5f0]/40 tracking-widest uppercase mb-4">
                    Available Times — {formData.selectedDate}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, selectedSlot: slot }))}
                        className={cn(
                          'px-5 py-2.5 font-mono text-xs tracking-wide transition-all duration-200 border',
                          formData.selectedSlot === slot
                            ? 'bg-[#f5f5f0] text-[#0a0a0a] border-[#f5f5f0]'
                            : 'text-[#f5f5f0]/50 border-white/10 hover:border-white/30'
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Personal info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(
                  [
                    { name: 'name' as const, label: 'Full Name', placeholder: 'Rahul Sharma', type: 'text' },
                    { name: 'email' as const, label: 'Email', placeholder: 'rahul@example.com', type: 'email' },
                    { name: 'phone' as const, label: 'Phone', placeholder: '+91 98765 43210', type: 'tel' },
                    { name: 'currentRole' as const, label: 'Current Role', placeholder: 'Senior Engineer @ Startup', type: 'text' },
                  ]
                ).map((field) => (
                  <div key={field.name}>
                    <label className="block font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest uppercase mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={(e) => setFormData((p) => ({ ...p, [field.name]: e.target.value }))}
                      className="w-full bg-transparent border border-white/10 px-4 py-3 font-sans text-sm text-[#f5f5f0] placeholder:text-[#f5f5f0]/20 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label className="block font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest uppercase mb-2">
                    Target Role
                  </label>
                  <input
                    type="text"
                    placeholder="Staff Engineer / AI Architect @ FAANG"
                    value={formData.targetRole}
                    onChange={(e) => setFormData((p) => ({ ...p, targetRole: e.target.value }))}
                    className="w-full bg-transparent border border-white/10 px-4 py-3 font-sans text-sm text-[#f5f5f0] placeholder:text-[#f5f5f0]/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              {/* Focus areas */}
              <div>
                <label className="block font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest uppercase mb-4">
                  Areas to Focus (select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {FOCUS_AREAS.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => handleFocusToggle(area)}
                      className={cn(
                        'px-4 py-2 font-mono text-xs tracking-wide transition-all duration-200 border',
                        formData.focusAreas.includes(area)
                          ? 'bg-[#f5f5f0] text-[#0a0a0a] border-[#f5f5f0]'
                          : 'text-[#f5f5f0]/50 border-white/10 hover:border-white/30'
                      )}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recording */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.wantsRecording}
                  onChange={(e) => setFormData((p) => ({ ...p, wantsRecording: e.target.checked }))}
                  className="w-4 h-4 border border-white/20 bg-transparent accent-[#f5f5f0]"
                />
                <span className="font-sans text-sm text-[#f5f5f0]/50 group-hover:text-[#f5f5f0]/70 transition-colors">
                  I&rsquo;d like a recording of the session
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting || !formData.selectedDate || !formData.selectedSlot}
                className={cn(
                  'w-full py-4 font-sans font-semibold text-sm tracking-wide transition-all duration-200',
                  'flex items-center justify-center gap-3',
                  submitting || !formData.selectedDate || !formData.selectedSlot
                    ? 'bg-[#f5f5f0]/20 text-[#f5f5f0]/30 cursor-not-allowed'
                    : 'bg-[#f5f5f0] text-[#0a0a0a] hover:bg-white'
                )}
              >
                {submitting ? 'Processing...' : <> Book &amp; Pay ₹499 <ArrowRight size={14} /> </>}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs text-[#f5f5f0]/40 tracking-[0.3em] uppercase mb-12 text-center">
            FAQ
          </p>
          <div className="flex flex-col">
            {FAQ.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
