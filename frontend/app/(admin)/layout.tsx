import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | DK Admin',
    default: 'Admin | Deepak Kushwaha',
  },
  robots: {
    index: false,
    follow: false,
  },
}

/**
 * Admin route group layout.
 * No public navigation — the dashboard manages its own sidebar layout.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-[#0a0a0a]">{children}</div>
}
