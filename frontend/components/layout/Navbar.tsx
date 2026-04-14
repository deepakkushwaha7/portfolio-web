'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs))

const NAV_LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300',
          scrolled
            ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Left: Monogram */}
          <Link
            href="/"
            className="font-serif font-bold text-xl text-[#f5f5f0] tracking-tight hover:opacity-70 transition-opacity"
          >
            DK
          </Link>

          {/* Center: Nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-sm font-sans tracking-wide transition-colors duration-200',
                    'after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-[#f5f5f0]',
                    'after:transition-all after:duration-300',
                    isActive
                      ? 'text-[#f5f5f0] after:w-full'
                      : 'text-[#f5f5f0]/60 hover:text-[#f5f5f0] after:w-0 hover:after:w-full'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/mock-interview"
              className={cn(
                'hidden md:inline-flex items-center px-4 py-1.5 text-sm font-sans font-medium',
                'border border-[#f5f5f0]/60 text-[#f5f5f0] rounded-none',
                'transition-all duration-200',
                'hover:bg-[#f5f5f0] hover:text-[#0a0a0a] hover:border-[#f5f5f0]'
              )}
            >
              Book Interview
            </Link>

            {/* Hamburger — mobile only */}
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 group -mr-1.5"
            >
              <span
                className={cn(
                  'block h-px w-6 bg-[#f5f5f0] transition-all duration-300 origin-center',
                  mobileOpen ? 'rotate-45 translate-y-[4px]' : ''
                )}
              />
              <span
                className={cn(
                  'block h-px w-6 bg-[#f5f5f0] transition-all duration-300',
                  mobileOpen ? 'opacity-0 w-0' : ''
                )}
              />
              <span
                className={cn(
                  'block h-px w-6 bg-[#f5f5f0] transition-all duration-300 origin-center',
                  mobileOpen ? '-rotate-45 -translate-y-[10px]' : ''
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col transition-transform duration-400 md:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col justify-center items-center h-full gap-10 px-8">
          {NAV_LINKS.map((link, i) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-serif text-4xl sm:text-5xl font-bold transition-all duration-200',
                  'border-b border-transparent',
                  isActive
                    ? 'text-[#f5f5f0]'
                    : 'text-[#f5f5f0]/50 hover:text-[#f5f5f0]'
                )}
                style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms' }}
              >
                {link.label}
              </Link>
            )
          })}

          <Link
            href="/mock-interview"
            className={cn(
              'mt-6 inline-flex items-center px-8 py-3 text-base font-sans font-medium',
              'border border-[#f5f5f0] text-[#f5f5f0]',
              'hover:bg-[#f5f5f0] hover:text-[#0a0a0a] transition-all duration-200'
            )}
          >
            Book Interview
          </Link>
        </div>
      </div>
    </>
  )
}
