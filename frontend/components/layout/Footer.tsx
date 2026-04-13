import React from 'react'
import Link from 'next/link'

const FOOTER_LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/mock-interview', label: 'Mock Interview' },
  { href: '/hire', label: 'Hire Me' },
]

// Inline SVGs — lucide-react dropped branded social icons in v0.400+
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/in/deepak8896484842/', label: 'LinkedIn', Icon: LinkedInIcon },
  { href: 'https://github.com/deepakkushwaha7', label: 'GitHub', Icon: GitHubIcon },
  { href: 'https://twitter.com/deepakkushwaha', label: 'Twitter / X', Icon: XIcon },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main footer row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
          {/* Left: copyright */}
          <p className="font-mono text-xs text-[#f5f5f0]/40 tracking-widest uppercase">
            &copy; 2025 Deepak Kushwaha
          </p>

          {/* Center: nav links */}
          <nav className="grid grid-cols-2 sm:flex sm:items-center gap-3 sm:gap-6">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-[#f5f5f0]/50 hover:text-[#f5f5f0] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: social icons */}
          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[#f5f5f0]/40 hover:text-[#f5f5f0] transition-colors duration-200"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-white/10 pt-6">
          <p className="font-mono text-xs text-[#f5f5f0]/20 text-center tracking-wider">
            Built with Next.js &nbsp;&middot;&nbsp; Django &nbsp;&middot;&nbsp; Three.js
          </p>
        </div>
      </div>
    </footer>
  )
}
