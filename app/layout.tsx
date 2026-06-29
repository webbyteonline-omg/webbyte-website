import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import ConditionalLayout from '@/components/ConditionalLayout'
import AuthProvider from '@/components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://webbyte.in'),
  title: {
    default: 'WebByte — Professional Websites, SaaS & Billing Software',
    template: '%s | WebByte',
  },
  description:
    'WebByte builds professional websites, SaaS products, and billing software for businesses across India. SEO-ready, modern, and delivered on time. Order online instantly.',
  keywords: [
    'website development', 'SaaS development', 'billing software', 'web development India',
    'professional website', 'custom website', 'WebByte', 'online billing software',
  ],
  authors: [{ name: 'WebByte', url: 'https://webbyte.in' }],
  creator: 'WebByte',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://webbyte.in',
    siteName: 'WebByte',
    title: 'WebByte — Professional Websites, SaaS & Billing Software',
    description: 'Modern digital products built for Indian businesses. Websites, SaaS, and billing software — delivered online.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'WebByte' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebByte — Professional Websites & SaaS',
    description: 'Modern digital products built for Indian businesses.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <Toaster position="top-right" toastOptions={{ className: 'text-sm font-medium' }} />
        </AuthProvider>
      </body>
    </html>
  )
}
