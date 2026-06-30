import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import WhatsAppButton from '@/components/WhatsAppButton'
import DynamicBanner from '@/components/DynamicBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://webbyte.online'),
  title: {
    default: 'WebByte — Professional Websites, SaaS & Billing Software',
    template: '%s | WebByte',
  },
  description:
    'WebByte builds professional websites, SaaS products, and billing software for businesses across India. SEO-ready, modern, and delivered on time.',
  keywords: [
    'website development', 'SaaS development', 'billing software', 'web development India',
    'professional website', 'custom website', 'WebByte',
  ],
  authors:  [{ name: 'WebByte', url: 'https://webbyte.online' }],
  creator:  'WebByte',
  openGraph: {
    type:      'website',
    locale:    'en_IN',
    url:       'https://webbyte.online',
    siteName:  'WebByte',
    title:     'WebByte — Professional Websites, SaaS & Billing Software',
    description: 'Modern digital products built for Indian businesses.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'WebByte' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'WebByte — Professional Websites & SaaS',
    description: 'Modern digital products built for Indian businesses.',
    images:      ['/og-image.png'],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h        = await headers()
  const isAdmin  = h.get('x-is-admin') === '1'
  const pathname = h.get('x-pathname') || ''

  // Demo pages must render bare — no site Navbar / Footer / WhatsApp overlay
  const isDemoPage = /^\/(industries|billing)\/.+/.test(pathname)
  const showChrome = !isAdmin && !isDemoPage

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {showChrome && <DynamicBanner position="top-strip" />}
          {showChrome && <Navbar />}
          <main>{children}</main>
          {showChrome && <Footer />}
          {showChrome && <WhatsAppButton />}
          <Toaster position="top-right" toastOptions={{ className: 'text-sm font-medium' }} />
        </AuthProvider>
      </body>
    </html>
  )
}
