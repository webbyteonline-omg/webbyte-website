'use client'
import { useEffect, useState } from 'react'
import { X, ArrowRight } from 'lucide-react'

interface Banner {
  id: string; title: string; subtitle: string | null; badge: string | null
  ctaText: string | null; ctaLink: string | null; gradient: string
  style: string; position: string; priority: number
}

interface Props {
  position: string
  className?: string
}

export default function DynamicBanner({ position, className = '' }: Props) {
  const [banners,    setBanners]    = useState<Banner[]>([])
  const [dismissed,  setDismissed]  = useState<Set<string>>(new Set())
  const [loaded,     setLoaded]     = useState(false)

  useEffect(() => {
    // Restore dismissed set from sessionStorage
    try {
      const saved = JSON.parse(sessionStorage.getItem('dismissed_banners') || '[]')
      setDismissed(new Set(saved))
    } catch {}

    fetch(`/api/banners?position=${position}`)
      .then(r => r.json())
      .then(j => { setBanners(j.banners || []); setLoaded(true) })
      .catch(() => setLoaded(true))
  }, [position])

  const dismiss = (id: string) => {
    setDismissed(prev => {
      const next = new Set(prev)
      next.add(id)
      try { sessionStorage.setItem('dismissed_banners', JSON.stringify([...next])) } catch {}
      return next
    })
  }

  if (!loaded) return null

  const visible = banners.filter(b => !dismissed.has(b.id))
  if (!visible.length) return null

  return (
    <div className={`w-full space-y-0 ${className}`}>
      {visible.map(b => {
        if (b.style === 'strip') {
          return (
            <div key={b.id} className={`w-full bg-gradient-to-r ${b.gradient} relative`}>
              <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  {b.badge && (
                    <span className="text-xs font-bold bg-white/20 text-white px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
                      {b.badge}
                    </span>
                  )}
                  <p className="text-white text-sm font-semibold truncate">{b.title}</p>
                  {b.subtitle && (
                    <p className="text-white/75 text-xs hidden md:block truncate">{b.subtitle}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {b.ctaText && b.ctaLink && (
                    <a href={b.ctaLink}
                      className="flex items-center gap-1.5 text-xs font-bold bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                      {b.ctaText} <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                  <button onClick={() => dismiss(b.id)} className="p-1 rounded text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )
        }

        if (b.style === 'card') {
          return (
            <div key={b.id} className={`w-full bg-gradient-to-r ${b.gradient} relative overflow-hidden`}>
              <button onClick={() => dismiss(b.id)} className="absolute top-3 right-3 p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors z-10">
                <X className="w-4 h-4" />
              </button>
              <div className="max-w-4xl mx-auto px-6 py-10 text-center relative z-0">
                {b.badge && (
                  <span className="inline-block text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full mb-4">
                    {b.badge}
                  </span>
                )}
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">{b.title}</h2>
                {b.subtitle && <p className="text-white/80 text-base mb-6 max-w-xl mx-auto">{b.subtitle}</p>}
                {b.ctaText && b.ctaLink && (
                  <a href={b.ctaLink}
                    className="inline-flex items-center gap-2 bg-white text-gray-900 font-extrabold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors shadow-lg">
                    {b.ctaText} <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          )
        }

        // floating
        return (
          <div key={b.id}
            className={`fixed bottom-20 right-4 z-40 w-72 bg-gradient-to-br ${b.gradient} rounded-2xl shadow-2xl overflow-hidden`}>
            <button onClick={() => dismiss(b.id)} className="absolute top-2.5 right-2.5 p-1 rounded-full text-white/60 hover:text-white hover:bg-white/15 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="p-4">
              {b.badge && (
                <span className="text-xs font-bold bg-white/20 text-white px-2.5 py-1 rounded-full mb-2.5 inline-block">
                  {b.badge}
                </span>
              )}
              <p className="text-white font-bold text-sm leading-snug">{b.title}</p>
              {b.subtitle && <p className="text-white/70 text-xs mt-1">{b.subtitle}</p>}
              {b.ctaText && b.ctaLink && (
                <a href={b.ctaLink}
                  className="mt-3 flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors w-fit">
                  {b.ctaText} <ArrowRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
