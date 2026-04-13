import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider'
import { PageTransition } from '@/components/ui/PageTransition'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <PageTransition>
        <main className="flex-1">{children}</main>
      </PageTransition>
      <Footer />
    </SmoothScrollProvider>
  )
}
