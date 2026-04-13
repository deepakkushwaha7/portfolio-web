'use client'

// TODO: Replace all fetch calls with actual Django API endpoints once deployed
// API base: process.env.NEXT_PUBLIC_API_URL + /api/...

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Calendar,
  Clock,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react'

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs))

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

// ─── Types ────────────────────────────────────────────────────────────────────

type StatsData = {
  totalPosts: number
  publishedPosts: number
  totalProjects: number
  bookingsThisMonth: number
  newEnquiries: number
}

type Booking = {
  id: string
  name: string
  email: string
  slot: string
  date: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  paid: boolean
}

type Enquiry = {
  id: string
  name: string
  email: string
  company: string
  roleType: string
  createdAt: string
  read: boolean
}

// ─── Nav items ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/posts', label: 'Posts', icon: FileText },
  { href: '/admin/projects', label: 'Projects', icon: Briefcase },
  { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
  { href: '/admin/availability', label: 'Availability', icon: Clock },
  { href: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

const STATUS_COLORS: Record<Booking['status'], string> = {
  pending: 'text-yellow-400/70 bg-yellow-400/10',
  confirmed: 'text-blue-400/70 bg-blue-400/10',
  completed: 'text-green-400/70 bg-green-400/10',
  cancelled: 'text-red-400/70 bg-red-400/10',
}

// ─── Placeholder data (until API is live) ────────────────────────────────────

const PLACEHOLDER_STATS: StatsData = {
  totalPosts: 12,
  publishedPosts: 9,
  totalProjects: 8,
  bookingsThisMonth: 14,
  newEnquiries: 5,
}

const PLACEHOLDER_BOOKINGS: Booking[] = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', slot: '10:00 AM', date: 'Apr 15, 2026', status: 'confirmed', paid: true },
  { id: '2', name: 'Priya Patel', email: 'priya@example.com', slot: '2:00 PM', date: 'Apr 16, 2026', status: 'pending', paid: false },
  { id: '3', name: 'Ankit Joshi', email: 'ankit@example.com', slot: '5:00 PM', date: 'Apr 15, 2026', status: 'completed', paid: true },
  { id: '4', name: 'Divya Menon', email: 'divya@example.com', slot: '11:00 AM', date: 'Apr 17, 2026', status: 'confirmed', paid: true },
  { id: '5', name: 'Saurabh Kumar', email: 'saurabh@example.com', slot: '3:00 PM', date: 'Apr 19, 2026', status: 'pending', paid: false },
]

const PLACEHOLDER_ENQUIRIES: Enquiry[] = [
  { id: '1', name: 'CTO @ Startup', email: 'cto@startup.io', company: 'TechCorp', roleType: 'Advisory', createdAt: 'Apr 12, 2026', read: false },
  { id: '2', name: 'HR Manager', email: 'hr@unicorn.in', company: 'Unicorn Inc.', roleType: 'Full-Time', createdAt: 'Apr 11, 2026', read: false },
  { id: '3', name: 'Founder', email: 'founder@ailab.io', company: 'AI Lab', roleType: 'Contract', createdAt: 'Apr 10, 2026', read: true },
]

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
  open,
  onClose,
  onLogout,
}: {
  open: boolean
  onClose: () => void
  onLogout: () => void
}) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-[#0d0d0d] border-r border-white/10 z-50 flex flex-col transition-transform duration-300',
          'md:translate-x-0 md:static md:flex',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10 shrink-0">
          <Link href="/" className="font-serif font-bold text-lg text-[#f5f5f0]">
            DK
          </Link>
          <button
            onClick={onClose}
            className="md:hidden text-[#f5f5f0]/40 hover:text-[#f5f5f0]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-6 py-2.5 font-sans text-sm transition-all duration-150',
                  isActive
                    ? 'bg-[#f5f5f0]/10 text-[#f5f5f0] border-r-2 border-[#f5f5f0]'
                    : 'text-[#f5f5f0]/40 hover:text-[#f5f5f0] hover:bg-[#f5f5f0]/5'
                )}
              >
                <Icon size={15} strokeWidth={1.5} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-[#f5f5f0]/30 hover:text-[#f5f5f0]/60 transition-colors mb-3"
          >
            <ExternalLink size={11} />
            View Site
          </a>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 font-mono text-xs text-[#f5f5f0]/30 hover:text-red-400/70 transition-colors"
          >
            <LogOut size={11} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}

// ─── Stats card ───────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <div className="bg-[#0d0d0d] border border-white/10 p-6 hover:border-white/20 transition-all">
      <p className="font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest uppercase mb-3">
        {label}
      </p>
      <p className="font-serif font-bold text-4xl text-[#f5f5f0] leading-none mb-1">
        {value}
      </p>
      {sub && (
        <p className="font-mono text-[10px] text-[#f5f5f0]/20 mt-2">{sub}</p>
      )}
    </div>
  )
}

// ─── Dashboard page ───────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState<StatsData>(PLACEHOLDER_STATS)
  const [bookings, setBookings] = useState<Booking[]>(PLACEHOLDER_BOOKINGS)
  const [enquiries, setEnquiries] = useState<Enquiry[]>(PLACEHOLDER_ENQUIRIES)
  const [loading, setLoading] = useState(false)

  const logout = useCallback(() => {
    localStorage.removeItem('dk_admin_token')
    localStorage.removeItem('dk_admin_refresh')
    router.push('/admin/login')
  }, [router])

  // Verify auth + fetch data
  useEffect(() => {
    const token = localStorage.getItem('dk_admin_token')
    if (!token) {
      router.replace('/admin/login')
      return
    }

    const fetchDashboard = async () => {
      setLoading(true)
      try {
        // TODO: Replace with real API calls
        // const [statsRes, bookingsRes, enquiriesRes] = await Promise.all([
        //   fetch(`${API_BASE}/api/dashboard/stats/`, { headers: { Authorization: `Bearer ${token}` } }),
        //   fetch(`${API_BASE}/api/bookings/?limit=5`, { headers: { Authorization: `Bearer ${token}` } }),
        //   fetch(`${API_BASE}/api/enquiries/?limit=5`, { headers: { Authorization: `Bearer ${token}` } }),
        // ])
        // if (statsRes.status === 401) { logout(); return }
        // setStats(await statsRes.json())
        // setBookings(await bookingsRes.json())
        // setEnquiries(await enquiriesRes.json())
        void API_BASE // suppress unused var lint
      } catch (err) {
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [router, logout])

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={logout}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0a0a0a] sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-[#f5f5f0]/40 hover:text-[#f5f5f0]"
            >
              <Menu size={18} />
            </button>
            <div>
              <h1 className="font-sans text-sm font-semibold text-[#f5f5f0]">Dashboard</h1>
              <p className="font-mono text-[10px] text-[#f5f5f0]/30">Welcome back, Deepak</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {loading && (
              <span className="font-mono text-[10px] text-[#f5f5f0]/30">Loading...</span>
            )}
            <div className="w-7 h-7 bg-[#f5f5f0]/10 border border-white/10 flex items-center justify-center">
              <span className="font-serif font-bold text-xs text-[#f5f5f0]">D</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 mb-8">
            <StatCard label="Total Posts" value={stats.totalPosts} />
            <StatCard label="Published" value={stats.publishedPosts} sub={`${stats.totalPosts - stats.publishedPosts} drafts`} />
            <StatCard label="Projects" value={stats.totalProjects} />
            <StatCard label="Bookings" value={stats.bookingsThisMonth} sub="this month" />
            <StatCard label="New Enquiries" value={stats.newEnquiries} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Recent bookings */}
            <div className="bg-[#0d0d0d] border border-white/10">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="font-sans text-sm font-semibold text-[#f5f5f0]">
                  Recent Bookings
                </h2>
                <Link
                  href="/admin/bookings"
                  className="flex items-center gap-1 font-mono text-[10px] text-[#f5f5f0]/30 hover:text-[#f5f5f0]/60 transition-colors"
                >
                  View all <ChevronRight size={11} />
                </Link>
              </div>
              <div className="divide-y divide-white/10">
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex items-center gap-4 px-6 py-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm text-[#f5f5f0] truncate">{booking.name}</p>
                      <p className="font-mono text-[10px] text-[#f5f5f0]/30 truncate">{booking.email}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-mono text-[10px] text-[#f5f5f0]/50">{booking.date}</p>
                      <p className="font-mono text-[10px] text-[#f5f5f0]/30">{booking.slot}</p>
                    </div>
                    <span
                      className={cn(
                        'font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 shrink-0',
                        STATUS_COLORS[booking.status]
                      )}
                    >
                      {booking.status}
                    </span>
                    <span
                      className={cn(
                        'font-mono text-[9px] px-2 py-0.5 shrink-0',
                        booking.paid
                          ? 'text-green-400/60 bg-green-400/10'
                          : 'text-[#f5f5f0]/20 bg-white/5'
                      )}
                    >
                      {booking.paid ? 'Paid' : 'Unpaid'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent enquiries */}
            <div className="bg-[#0d0d0d] border border-white/10">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="font-sans text-sm font-semibold text-[#f5f5f0]">
                  Recent Enquiries
                </h2>
                <Link
                  href="/admin/enquiries"
                  className="flex items-center gap-1 font-mono text-[10px] text-[#f5f5f0]/30 hover:text-[#f5f5f0]/60 transition-colors"
                >
                  View all <ChevronRight size={11} />
                </Link>
              </div>
              <div className="divide-y divide-white/10">
                {enquiries.map((enquiry) => (
                  <div key={enquiry.id} className="flex items-start gap-4 px-6 py-4">
                    {!enquiry.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f5f5f0]/60 mt-1.5 shrink-0" />
                    )}
                    <div className={cn('flex-1 min-w-0', enquiry.read ? 'pl-[14px]' : '')}>
                      <p className="font-sans text-sm text-[#f5f5f0] truncate">{enquiry.name}</p>
                      <p className="font-mono text-[10px] text-[#f5f5f0]/30">{enquiry.company} · {enquiry.roleType}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-mono text-[10px] text-[#f5f5f0]/30">{enquiry.createdAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { href: '/admin/posts', label: 'New Post', icon: FileText },
              { href: '/admin/projects', label: 'Add Project', icon: Briefcase },
              { href: '/admin/availability', label: 'Set Availability', icon: Clock },
              { href: '/admin/enquiries', label: 'View Enquiries', icon: MessageSquare },
            ].map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-4 py-3 bg-[#0d0d0d] border border-white/10 hover:border-white/25 transition-all group"
              >
                <Icon size={14} className="text-[#f5f5f0]/30 group-hover:text-[#f5f5f0]/60 transition-colors" strokeWidth={1.5} />
                <span className="font-sans text-sm text-[#f5f5f0]/50 group-hover:text-[#f5f5f0] transition-colors">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
