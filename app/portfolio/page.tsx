import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Star, TrendingUp, Clock, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Work — Portfolio | WebByte',
  description: 'See live websites, billing software, and SaaS products built by WebByte for Indian businesses.',
}

const projects = [
  {
    id: 1,
    name:      'RajBros Kirana — POS & Billing',
    category:  'BillPro — Billing Software',
    client:    'Rajesh Agarwal, Delhi',
    desc:      'Full-featured GST billing and inventory management system for a 3-branch kirana chain. Handles 200+ daily invoices, auto-generates GST reports, and tracks stock across all locations.',
    tags:      ['GST Billing', 'Inventory', 'Multi-branch', 'UPI Payments'],
    results:   ['80% faster invoicing', '₹2L/month in recovered dues', '3 branches synced live'],
    color:     'from-orange-500 to-red-500',
    letter:    'R',
    duration:  '5 days',
    rating:    5,
    live:      true,
  },
  {
    id: 2,
    name:      'VastraKart — Fashion E-commerce',
    category:  'Custom Website',
    client:    'Priya Mehta, Surat',
    desc:      'Custom e-commerce website for ethnic wear brand with WhatsApp ordering, Razorpay integration, size guides, and SEO-optimized product catalog. Ranks #1 on Google for local searches.',
    tags:      ['E-commerce', 'Razorpay', 'WhatsApp Integration', 'SEO'],
    results:   ['₹4.2L in first-month revenue', '2,800+ monthly visitors', 'Page 1 Google ranking'],
    color:     'from-pink-500 to-purple-600',
    letter:    'V',
    duration:  '10 days',
    rating:    5,
    live:      true,
  },
  {
    id: 3,
    name:      'TechFlow Consultancy — Corporate Site',
    category:  'Custom Website',
    client:    'Amit Singh, Pune',
    desc:      'Professional corporate website with lead capture forms, case studies, team profiles, and a blog. Integrated with Google Analytics and automated email follow-ups via form submissions.',
    tags:      ['Corporate', 'Lead Gen', 'Blog', 'Analytics'],
    results:   ['40% increase in inquiries', '5.2 min avg session time', '12 leads/month via website'],
    color:     'from-blue-500 to-cyan-500',
    letter:    'T',
    duration:  '7 days',
    rating:    5,
    live:      true,
  },
  {
    id: 4,
    name:      'InvoiceEase — Freelancer Tool',
    category:  'InvoiceX — Invoice Manager',
    client:    'Deepa Nair, Bangalore',
    desc:      'Lightweight invoice management tool for a solo CA managing 60+ clients. One-click PDF invoice generation, payment reminders, overdue tracking, and client portal for payment status.',
    tags:      ['Invoice PDF', 'Client Portal', 'Reminders', 'CA Tool'],
    results:   ['60 clients managed', '90% on-time payments', '6hrs/week saved'],
    color:     'from-green-500 to-teal-500',
    letter:    'I',
    duration:  '4 days',
    rating:    5,
    live:      true,
  },
  {
    id: 5,
    name:      'SpiceRoute Restaurant — Menu & Orders',
    category:  'Custom Website',
    client:    'Mohammed Rafi, Hyderabad',
    desc:      'Digital menu and online ordering system for a popular restaurant. QR code table ordering, kitchen dashboard, daily revenue reports, and Zomato/Swiggy-style order tracking.',
    tags:      ['QR Menu', 'Online Ordering', 'Kitchen Dashboard', 'Analytics'],
    results:   ['35% more table orders', '₹80K extra revenue/month', '4.8★ Google rating'],
    color:     'from-yellow-500 to-orange-500',
    letter:    'S',
    duration:  '12 days',
    rating:    5,
    live:      true,
  },
  {
    id: 6,
    name:      'ClearDerm Clinic — Patient Portal',
    category:  'Custom Website',
    client:    'Dr. Kavita Shah, Mumbai',
    desc:      'Medical clinic website with appointment booking, patient portal, doctor profiles, and treatment pages. HIPAA-compliant data handling, WhatsApp appointment reminders.',
    tags:      ['Appointment Booking', 'Patient Portal', 'WhatsApp', 'Medical'],
    results:   ['120+ appointments/month online', '60% fewer no-shows', '4.9★ on Google'],
    color:     'from-purple-500 to-indigo-600',
    letter:    'C',
    duration:  '14 days',
    rating:    5,
    live:      true,
  },
]

const stats = [
  { value: '50+',  label: 'Projects Delivered' },
  { value: '₹2Cr+', label: 'Revenue Generated for Clients' },
  { value: '4.9★', label: 'Average Client Rating' },
  { value: '7 days', label: 'Average Delivery Time' },
]

export default function PortfolioPage() {
  return (
    <div className="pt-20 pb-20 min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="badge mx-auto mb-4">Our Work</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Real Projects.<br />
            <span className="gradient-text">Real Results.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
            Every project we deliver is a growth story. Here are some of the businesses we've helped go digital and scale.
          </p>
          <Link href="/order" className="btn-primary text-base px-8 py-3">
            Start Your Project <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-purple-700 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-extrabold mb-1">{value}</div>
                <div className="text-purple-200 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group">

                {/* Visual header */}
                <div className={`bg-gradient-to-br ${p.color} h-40 flex items-center justify-center relative`}>
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-white text-4xl font-extrabold">
                    {p.letter}
                  </div>
                  {p.live && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      Live
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {p.duration}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs text-purple-600 font-semibold mb-1">{p.category}</div>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-1">{p.name}</h3>
                  <p className="text-xs text-gray-400 mb-3">{p.client}</p>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{p.desc}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map(t => (
                      <span key={t} className="text-xs bg-gray-50 text-gray-600 border border-gray-100 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                    <p className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> Results
                    </p>
                    <ul className="space-y-1">
                      {p.results.map(r => (
                        <li key={r} className="text-xs text-green-700 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 flex-shrink-0" /> {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(p.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">Client rating</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Rajesh Agarwal', role: 'Owner, RajBros Kirana', quote: 'WebByte delivered in 5 days what I thought would take months. The billing software is exactly what my business needed.' },
              { name: 'Priya Mehta',    role: 'Founder, VastraKart',   quote: 'My website now brings 40+ orders per week. WebByte understood what I needed and delivered beyond expectations.' },
              { name: 'Amit Singh',     role: 'CEO, TechFlow',         quote: 'Professional team, clean delivery, zero hassles. Our new website has completely transformed our lead generation.' },
              { name: 'Dr. Kavita Shah', role: 'ClearDerm Clinic',    quote: 'The patient portal they built saves us 3 hours daily. Best investment I made for my clinic this year.' },
            ].map(({ name, role, quote }) => (
              <div key={name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"{quote}"</p>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{name}</div>
                  <div className="text-xs text-gray-400">{role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-purple-700">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Want results like these?</h2>
          <p className="text-purple-200 mb-8 text-lg">Join 50+ businesses that trusted WebByte to power their digital growth.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="bg-white text-purple-700 font-bold px-8 py-4 rounded-xl hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              Talk to Us First
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
