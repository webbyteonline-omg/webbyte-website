'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'

export default function ROICalculator() {
  const [visitors,    setVisitors]    = useState(500)
  const [conversion,  setConversion]  = useState(2)
  const [orderValue,  setOrderValue]  = useState(1500)

  const { monthly, yearly, roi } = useMemo(() => {
    const monthly = Math.round((visitors * (conversion / 100) * orderValue))
    const yearly  = monthly * 12
    const roi     = Math.round(((yearly - 9999) / 9999) * 100)
    return { monthly, yearly, roi }
  }, [visitors, conversion, orderValue])

  const fmt = (n: number) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` :
    n >= 1000   ? `₹${(n / 1000).toFixed(1)}K`   :
    `₹${n}`

  return (
    <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
      <div className="grid md:grid-cols-2 gap-8 items-center">

        {/* Sliders */}
        <div className="space-y-7">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-white text-sm font-semibold">Monthly Visitors</label>
              <span className="text-purple-200 font-bold">{visitors.toLocaleString()}</span>
            </div>
            <input type="range" min={100} max={10000} step={100} value={visitors}
              onChange={e => setVisitors(Number(e.target.value))}
              className="w-full accent-white cursor-pointer" />
            <div className="flex justify-between text-xs text-purple-300 mt-1">
              <span>100</span><span>10,000</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-white text-sm font-semibold">Conversion Rate</label>
              <span className="text-purple-200 font-bold">{conversion}%</span>
            </div>
            <input type="range" min={0.5} max={10} step={0.5} value={conversion}
              onChange={e => setConversion(Number(e.target.value))}
              className="w-full accent-white cursor-pointer" />
            <div className="flex justify-between text-xs text-purple-300 mt-1">
              <span>0.5%</span><span>10%</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-white text-sm font-semibold">Avg. Order Value</label>
              <span className="text-purple-200 font-bold">₹{orderValue.toLocaleString()}</span>
            </div>
            <input type="range" min={100} max={50000} step={100} value={orderValue}
              onChange={e => setOrderValue(Number(e.target.value))}
              className="w-full accent-white cursor-pointer" />
            <div className="flex justify-between text-xs text-purple-300 mt-1">
              <span>₹100</span><span>₹50,000</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="text-center">
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20 mb-4">
            <div className="text-purple-200 text-sm mb-1">Monthly Revenue Potential</div>
            <div className="text-5xl font-extrabold text-white mb-1">{fmt(monthly)}</div>
            <div className="text-purple-300 text-xs">{visitors} visitors × {conversion}% × ₹{orderValue.toLocaleString()}</div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="text-purple-200 text-xs mb-1">Yearly Revenue</div>
              <div className="text-2xl font-extrabold text-white">{fmt(yearly)}</div>
            </div>
            <div className="bg-green-400/20 rounded-xl p-4 border border-green-400/30">
              <div className="text-green-200 text-xs mb-1">ROI vs ₹9,999</div>
              <div className="text-2xl font-extrabold text-green-300 flex items-center justify-center gap-1">
                <TrendingUp className="w-5 h-5" />{roi > 0 ? `${roi}%` : '—'}
              </div>
            </div>
          </div>

          <Link href="/order" className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-6 py-3 rounded-xl hover:bg-purple-50 transition-colors w-full justify-center">
            Get My Website — ₹9,999 <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-purple-300 text-xs mt-2">These are estimates. Actual results vary by industry and effort.</p>
        </div>
      </div>
    </div>
  )
}
