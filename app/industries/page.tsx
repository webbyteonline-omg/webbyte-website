import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Website Templates by Industry | WebByte',
  description: 'See live website demos for 50+ Indian business types — restaurant, clinic, hotel, salon, coaching and more. Get yours built in 7 days.',
}

const phase1 = [
  { name: 'Restaurant',         slug: 'restaurant',   emoji: '🍽️', desc: 'With QR ordering & digital waiter',   color: 'from-orange-500 to-red-500',    badge: '🔥 Most Popular' },
  { name: 'Clinic / Doctor',    slug: 'clinic',        emoji: '🏥', desc: 'Appointments, patient portal, OPD',   color: 'from-blue-500 to-cyan-600',    badge: null },
  { name: 'Hotel / Resort',     slug: 'hotel',         emoji: '🏨', desc: 'Room booking, gallery, packages',     color: 'from-yellow-500 to-orange-500', badge: null },
  { name: 'Coaching Institute', slug: 'coaching',      emoji: '📚', desc: 'Courses, results, admission form',    color: 'from-purple-500 to-indigo-600', badge: null },
  { name: 'Real Estate',        slug: 'real-estate',   emoji: '🏠', desc: 'Listings, builder profile, EMI calc', color: 'from-green-500 to-teal-600',   badge: null },
  { name: 'Salon & Spa',        slug: 'salon',         emoji: '💇', desc: 'Services, pricing, slot booking',     color: 'from-pink-500 to-rose-600',    badge: null },
  { name: 'CA / Accountant',    slug: 'ca',            emoji: '📊', desc: 'Services, GST, client inquiry',       color: 'from-slate-500 to-gray-700',   badge: null },
  { name: 'E-commerce Store',   slug: 'ecommerce',     emoji: '🛒', desc: 'Products, cart, Razorpay checkout',   color: 'from-purple-500 to-pink-500',  badge: '⚡ New' },
]

const comingSoon = [
  { name: 'Dhaba / Cloud Kitchen', emoji: '🥘' },
  { name: 'Bakery & Cafe',         emoji: '☕' },
  { name: 'Catering Service',      emoji: '🍱' },
  { name: 'Dental Clinic',         emoji: '🦷' },
  { name: 'Pharmacy',              emoji: '💊' },
  { name: 'Gym / Fitness Center',  emoji: '💪' },
  { name: 'Yoga Studio',           emoji: '🧘' },
  { name: 'Physiotherapy',         emoji: '🩺' },
  { name: 'Ayurveda Center',       emoji: '🌿' },
  { name: 'PG / Hostel',           emoji: '🏠' },
  { name: 'Homestay',              emoji: '🛖' },
  { name: 'Travel Agency',         emoji: '✈️' },
  { name: 'Tour Operator',         emoji: '🗺️' },
  { name: 'Cab / Taxi Service',    emoji: '🚕' },
  { name: 'School / College',      emoji: '🏫' },
  { name: 'Dance Academy',         emoji: '💃' },
  { name: 'Music School',          emoji: '🎸' },
  { name: 'Tuition Center',        emoji: '✏️' },
  { name: 'Law Firm / Lawyer',     emoji: '⚖️' },
  { name: 'Architect',             emoji: '📐' },
  { name: 'Interior Designer',     emoji: '🛋️' },
  { name: 'Photographer',          emoji: '📸' },
  { name: 'Wedding Planner',       emoji: '💒' },
  { name: 'Event Management',      emoji: '🎉' },
  { name: 'Clothing Boutique',     emoji: '👗' },
  { name: 'Jewellery Shop',        emoji: '💍' },
  { name: 'Electronics Store',     emoji: '📱' },
  { name: 'Grocery / Kirana',      emoji: '🛍️' },
  { name: 'Medical Store',         emoji: '🏪' },
  { name: 'Furniture Shop',        emoji: '🪑' },
  { name: 'Book Store',            emoji: '📖' },
  { name: 'Builder / Developer',   emoji: '🏗️' },
  { name: 'Property Dealer',       emoji: '🔑' },
  { name: 'Car Dealer',            emoji: '🚗' },
  { name: 'Bike Showroom',         emoji: '🏍️' },
  { name: 'Auto Service Center',   emoji: '🔧' },
  { name: 'Driving School',        emoji: '🚦' },
  { name: 'Tattoo Studio',         emoji: '🎨' },
  { name: 'Packers & Movers',      emoji: '📦' },
  { name: 'Pest Control',          emoji: '🐛' },
  { name: 'Electrician / Plumber', emoji: '⚡' },
  { name: 'Home Cleaning',         emoji: '🧹' },
  { name: 'Manufacturing Unit',    emoji: '🏭' },
  { name: 'Import / Export',       emoji: '🌐' },
  { name: 'NGO / Trust',           emoji: '🤝' },
  { name: 'Freelancer / Agency',   emoji: '💻' },
]

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-white pt-16">

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="badge mx-auto mb-4">Website Templates</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            See Your Website Before You Order
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
            Browse live demos for 50+ Indian business types. Click your industry, see exactly how your website will look, then order in 5 minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-500">
            {['Live demos for every industry', 'Delivered in 7 days', 'Starting ₹9,999'].map(t => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phase 1 — Ready to preview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <h2 className="text-2xl font-extrabold text-gray-900">Live Demos — Click to Preview</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {phase1.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {ind.badge && (
                  <div className="absolute top-3 right-3 bg-purple-700 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
                    {ind.badge}
                  </div>
                )}
                <div className={`bg-gradient-to-br ${ind.color} h-28 flex items-center justify-center`}>
                  <span className="text-5xl">{ind.emoji}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-extrabold text-gray-900 mb-1">{ind.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{ind.desc}</p>
                  <div className="flex items-center gap-1 text-purple-700 text-xs font-semibold group-hover:gap-2 transition-all">
                    Preview Website <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-extrabold text-gray-900">More Coming Soon</h2>
            <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">{comingSoon.length}+ industries</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {comingSoon.map((ind) => (
              <div
                key={ind.name}
                className="bg-white rounded-xl border border-gray-100 p-3 text-center opacity-70 hover:opacity-100 transition-opacity cursor-default"
              >
                <div className="text-2xl mb-1.5">{ind.emoji}</div>
                <div className="text-xs font-semibold text-gray-600 leading-tight">{ind.name}</div>
                <div className="text-xs text-gray-400 mt-1">Coming Soon</div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-500 mb-4">Don't see your industry? We build for any business type.</p>
            <Link href="/order" className="btn-primary">
              Order Custom Website <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
