import Link from 'next/link'

export const metadata = {
  title: '404 — Page Not Found',
}

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0] flex items-center justify-center px-6">
        <div className="max-w-lg w-full">
          <p className="font-mono text-xs tracking-[0.3em] text-[#f5f5f0]/30 uppercase mb-6">
            404
          </p>
          <h1 className="font-serif text-5xl font-black text-[#f5f5f0] leading-tight mb-4">
            Page Not Found
          </h1>
          <p className="font-sans text-base text-[#f5f5f0]/50 mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-mono text-sm border border-white/20 px-6 py-3 hover:border-white/60 hover:bg-white/5 transition-all duration-200"
            >
              ← Go home
            </Link>
            <Link
              href="/blog"
              className="font-mono text-sm text-[#f5f5f0]/40 hover:text-[#f5f5f0] transition-colors duration-200"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
