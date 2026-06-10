import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'The City of Strangers | A Virtual City of Anonymous Stories',
  description:
    'Explore a living digital city built from anonymous human experiences, memories, confessions, and hopes. No followers. No likes. Just authentic human stories.',
  keywords: [
    'anonymous stories',
    'virtual city',
    'human experiences',
    'digital archive',
    'memories',
  ],
  authors: [{ name: 'The City of Strangers' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid #334155',
            },
          }}
        />
      </body>
    </html>
  )
}
