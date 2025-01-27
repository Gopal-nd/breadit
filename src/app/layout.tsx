import Navbar from '@/components/Navbar'
import Providers from '@/components/Proviers'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import {Inter} from 'next/font/google'
export const metadata = {
  title: 'Breadit',
  description: 'A Reddit clone built with Next.js and TypeScript.',
}

const inter = Inter({subsets: ['latin']})

export default function RootLayout({
  children,authModal
}: {
  children: React.ReactNode,
  authModal: React.ReactNode
}) {
  return (
    <html lang='en' className={cn('antialiased bg-white text-slate-900 font-light',inter.className)}>
      <body className='min-h-scren pt-12 bg-slate-50 antialiased' >
      <Providers>

        {/* @ts-expect-error Server Component */}
        <Navbar />
        {authModal}
        <div className='container  max-w-7xl mx-auto h-full pt-12'>
          {children}
          </div>
          <Toaster  />
      </Providers>
          </body>
    </html>
  )
}
