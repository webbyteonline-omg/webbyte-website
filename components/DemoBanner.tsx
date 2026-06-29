'use client'
import Link from 'next/link'
import { ArrowRight, Eye } from 'lucide-react'

interface Props {
  industry: string
  price?: string
}

export default function DemoBanner({ industry, price = '₹9,999' }: Props) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm">
          <Eye className="w-3.5 h-3.5 text-purple-300 flex-shrink-0" />
          <span className="text-purple-100">WebByte Demo</span>
          <span className="text-purple-400">·</span>
          <span className="font-semibold">{industry} Website</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-purple-200 text-xs hidden sm:inline">Want this for your business?</span>
          <Link
            href="/order"
            className="bg-white text-purple-700 font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1 hover:bg-purple-50 transition-colors"
          >
            Order Now — {price} <ArrowRight className="w-3 h-3" />
          </Link>
          <Link
            href="/industries"
            className="text-purple-200 text-xs hover:text-white transition-colors hidden sm:inline"
          >
            ← All Industries
          </Link>
        </div>
      </div>
    </div>
  )
}
