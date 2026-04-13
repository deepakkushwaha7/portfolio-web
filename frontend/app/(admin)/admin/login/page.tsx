'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs))

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

type LoginError = string | null

export default function AdminLoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<LoginError>(null)
  const [loading, setLoading] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('dk_admin_token')
    if (token) {
      router.replace('/admin/dashboard')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/api/auth/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = (await res.json()) as { detail?: string }
        setError(data.detail ?? 'Invalid credentials. Please try again.')
        return
      }

      const data = (await res.json()) as { access: string; refresh: string }
      localStorage.setItem('dk_admin_token', data.access)
      localStorage.setItem('dk_admin_refresh', data.refresh)
      router.push('/admin/dashboard')
    } catch {
      setError('Unable to connect to the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Monogram */}
        <div className="text-center mb-12">
          <span className="font-serif font-black text-5xl text-[#f5f5f0]">DK</span>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#f5f5f0]/30 uppercase mt-2">
            Admin Access
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Error message */}
          {error && (
            <div className="border border-red-500/30 bg-red-500/5 px-4 py-3">
              <p className="font-mono text-xs text-red-400/80">{error}</p>
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="login-email"
              className="block font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest uppercase mb-2"
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@deepakkushwaha.dev"
              className="w-full bg-transparent border border-white/10 px-4 py-3 font-sans text-sm text-[#f5f5f0] placeholder:text-[#f5f5f0]/15 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="login-password"
              className="block font-mono text-[10px] text-[#f5f5f0]/30 tracking-widest uppercase mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-transparent border border-white/10 px-4 py-3 pr-12 font-sans text-sm text-[#f5f5f0] placeholder:text-[#f5f5f0]/15 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#f5f5f0]/30 hover:text-[#f5f5f0]/60 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={cn(
              'w-full py-3.5 font-sans font-semibold text-sm tracking-wide transition-all duration-200',
              'flex items-center justify-center gap-3',
              loading
                ? 'bg-[#f5f5f0]/20 text-[#f5f5f0]/30 cursor-not-allowed'
                : 'bg-[#f5f5f0] text-[#0a0a0a] hover:bg-white'
            )}
          >
            {loading ? 'Signing in...' : <>Sign In <ArrowRight size={14} /></>}
          </button>
        </form>

        <p className="font-mono text-[10px] text-center text-[#f5f5f0]/15 tracking-widest uppercase mt-10">
          Deepak Kushwaha · Admin
        </p>
      </div>
    </div>
  )
}
