'use client'
import { ArrowRight, Eye } from 'lucide-react'

interface Props {
  industry: string
  price?:   string
  type?:    'website' | 'billing'
}

export default function DemoBanner({ industry, price = '₹9,999', type = 'website' }: Props) {
  const backHref  = type === 'billing' ? '/industries#billing' : '/industries'
  const backLabel = type === 'billing' ? '← All Software'      : '← All Industries'
  const label     = type === 'billing' ? `${industry} Software` : `${industry} Website`

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm">
          <Eye className="w-3.5 h-3.5 text-purple-300 flex-shrink-0" />
          <span className="text-purple-100">WebByte Demo</span>
          <span className="text-purple-400">·</span>
          <span className="font-semibold">{label}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-purple-200 text-xs hidden sm:inline">Want this for your business?</span>
          {/* target="_top" breaks out of the iframe — opens /order in the full browser window */}
          <a
            href="/order"
            target="_top"
            className="bg-white text-purple-700 font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1 hover:bg-purple-50 transition-colors"
          >
            Order Now — {price} <ArrowRight className="w-3 h-3" />
          </a>
          <a
            href={backHref}
            target="_top"
            className="text-purple-200 text-xs hover:text-white transition-colors hidden sm:inline"
          >
            {backLabel}
          </a>
        </div>
      </div>
    </div>
  )
}
