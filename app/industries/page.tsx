'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, X, Monitor, Sparkles, ExternalLink } from 'lucide-react'

interface Industry {
  slug:        string
  name:        string
  emoji:       string
  image:       string
  tagline:     string
  description: string
  color:       string
  textColor:   string
  price:       string
  delivery:    string
  badge:       string | null
  features:    { icon: string; text: string }[]
}

const industries: Industry[] = [
  {
    slug:        'restaurant',
    name:        'Restaurant & Cafe',
    emoji:       '🍽️',
    image:       'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
    tagline:     'Complete Digital Restaurant System',
    description: 'Not just a website — a complete digital operations system. QR ordering, digital waiter, kitchen display, reservations, live tracking, and payments — all connected.',
    color:       'from-orange-500 to-red-600',
    textColor:   'text-orange-600',
    price:       '₹9,999',
    delivery:    '7–10 days',
    badge:       '🔥 Most Popular',
    features: [
      { icon: '📱', text: 'QR Code Table Ordering — customers order from their own phone' },
      { icon: '👨‍🍳', text: 'Digital Waiter App — tablet-based order taking, fires to kitchen' },
      { icon: '🖥️', text: 'Kitchen Display System — orders auto-appear on kitchen screen' },
      { icon: '📅', text: 'Online Table Reservation with WhatsApp confirmation' },
      { icon: '🔔', text: 'Live Order Tracking — customer sees status in real-time' },
      { icon: '💳', text: 'Payment at table — UPI, card, wallet from customer phone' },
      { icon: '📊', text: 'Daily revenue & bestseller analytics dashboard' },
      { icon: '⭐', text: 'Google Reviews & rating integration' },
    ],
  },
  {
    slug:        'clinic',
    name:        'Clinic & Doctor',
    emoji:       '🏥',
    image:       'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
    tagline:     'Modern Healthcare Digital Presence',
    description: 'A professional clinic website that works for you 24/7. Patients book appointments online, get reminders, access their prescriptions — all without a single phone call.',
    color:       'from-blue-500 to-cyan-600',
    textColor:   'text-blue-600',
    price:       '₹9,999',
    delivery:    '7 days',
    badge:       null,
    features: [
      { icon: '📅', text: 'Online appointment booking with real-time slot availability' },
      { icon: '📱', text: 'WhatsApp confirmation + reminder 2 hrs before appointment' },
      { icon: '💊', text: 'Digital prescription portal — patients view prescriptions online' },
      { icon: '🎥', text: 'Video consultation integration (optional)' },
      { icon: '⭐', text: 'Patient reviews & Google rating showcase' },
      { icon: '📋', text: 'Services & fees page with doctor profiles' },
      { icon: '🔒', text: 'Secure patient data — HIPAA-compliant handling' },
      { icon: '📊', text: 'Appointment analytics — track no-shows, busiest days' },
    ],
  },
  {
    slug:        'hotel',
    name:        'Hotel & Resort',
    emoji:       '🏨',
    image:       'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    tagline:     'Luxury Hospitality Web Experience',
    description: 'A premium hotel website that showcases your property beautifully and converts visitors into bookings. Room galleries, package deals, and seamless payment.',
    color:       'from-yellow-500 to-orange-500',
    textColor:   'text-yellow-600',
    price:       '₹9,999',
    delivery:    '10 days',
    badge:       null,
    features: [
      { icon: '🛏️', text: 'Room listing with photos, amenities, and pricing' },
      { icon: '📅', text: 'Live room availability checker and booking form' },
      { icon: '💳', text: 'Online payment — advance booking with Razorpay' },
      { icon: '📸', text: 'Full-screen photo gallery and virtual tour' },
      { icon: '🍽️', text: 'Restaurant & dining menu page' },
      { icon: '🎁', text: 'Special packages — honeymoon, family, corporate' },
      { icon: '⭐', text: 'TripAdvisor & Google reviews integration' },
      { icon: '🗺️', text: 'Location map with directions & nearby attractions' },
    ],
  },
  {
    slug:        'coaching',
    name:        'Coaching Institute',
    emoji:       '📚',
    image:       'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80',
    tagline:     'Results-Driven Education Website',
    description: 'A coaching website that showcases your results, attracts new students, and makes admissions effortless. Your toppers deserve to be seen.',
    color:       'from-purple-600 to-indigo-600',
    textColor:   'text-purple-600',
    price:       '₹9,999',
    delivery:    '7 days',
    badge:       null,
    features: [
      { icon: '🏆', text: 'Results showcase — photos, scores, college selections' },
      { icon: '📋', text: 'Course catalog with fees, duration, batch sizes' },
      { icon: '📝', text: 'Online admission/enquiry form with auto-response' },
      { icon: '👨‍🏫', text: 'Faculty profiles with qualifications & experience' },
      { icon: '📱', text: 'WhatsApp enquiry button & callback request' },
      { icon: '📅', text: 'Batch schedule & upcoming test dates' },
      { icon: '⭐', text: 'Student testimonials & video reviews' },
      { icon: '📊', text: 'Year-wise result statistics dashboard' },
    ],
  },
  {
    slug:        'real-estate',
    name:        'Real Estate',
    emoji:       '🏠',
    image:       'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    tagline:     'Property Sales & Lead Generation',
    description: 'A property listing website that generates leads on autopilot. Buyers browse your inventory, filter by budget, and contact you directly — 24/7.',
    color:       'from-green-600 to-teal-600',
    textColor:   'text-green-600',
    price:       '₹9,999',
    delivery:    '10 days',
    badge:       null,
    features: [
      { icon: '🏢', text: 'Property listings with photos, floor plans, and map' },
      { icon: '🔍', text: 'Search & filter by location, price, BHK type' },
      { icon: '🧮', text: 'Built-in EMI calculator — buyer sees monthly payment instantly' },
      { icon: '📞', text: 'Lead capture form with instant WhatsApp notification to you' },
      { icon: '✅', text: 'RERA registration badge & compliance info' },
      { icon: '🎥', text: 'Virtual site visit & video walkthrough embed' },
      { icon: '📊', text: 'Price trend charts for the locality' },
      { icon: '🗺️', text: 'Interactive map with nearby schools, hospitals, metro' },
    ],
  },
  {
    slug:        'salon',
    name:        'Salon & Spa',
    emoji:       '💇',
    image:       'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=80',
    tagline:     'Beauty & Wellness Booking Platform',
    description: 'A gorgeous salon website that fills your appointment calendar. Clients browse services, pick a stylist, and book their slot — without a single call.',
    color:       'from-pink-500 to-rose-600',
    textColor:   'text-pink-600',
    price:       '₹9,999',
    delivery:    '7 days',
    badge:       null,
    features: [
      { icon: '💈', text: 'Services menu with photos, descriptions & pricing' },
      { icon: '📅', text: 'Online slot booking with real-time availability' },
      { icon: '👩‍🎤', text: 'Choose preferred stylist / therapist' },
      { icon: '📱', text: 'WhatsApp reminder 1 hour before appointment' },
      { icon: '💅', text: 'Before & after gallery showcase' },
      { icon: '🎁', text: 'Gift vouchers & membership packages page' },
      { icon: '⭐', text: 'Google & Instagram reviews integration' },
      { icon: '📊', text: 'Booking analytics — track peak hours, popular services' },
    ],
  },
  {
    slug:        'ca',
    name:        'CA / Accountant',
    emoji:       '📊',
    image:       'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
    tagline:     'Professional Finance & Tax Website',
    description: 'A credibility-first website for CAs and accounting firms. Services clearly listed, qualifications displayed, and a consultation form that converts visitors into clients.',
    color:       'from-slate-600 to-gray-800',
    textColor:   'text-slate-700',
    price:       '₹9,999',
    delivery:    '7 days',
    badge:       null,
    features: [
      { icon: '📋', text: 'Services listing — GST, ITR, audit, payroll, company reg.' },
      { icon: '🎓', text: 'Qualifications, memberships & ICAI registration badge' },
      { icon: '📞', text: 'Free consultation booking form with callback' },
      { icon: '🔒', text: 'Client portal teaser — "Login to view your documents"' },
      { icon: '📰', text: 'Tax deadline calendar & blog for thought leadership' },
      { icon: '⭐', text: 'Client testimonials & company logos served' },
      { icon: '💼', text: 'Team / partner profiles with expertise areas' },
      { icon: '🧮', text: 'Tax calculator tool (income tax quick estimate)' },
    ],
  },
  {
    slug:        'ecommerce',
    name:        'E-commerce Store',
    emoji:       '🛒',
    image:       'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
    tagline:     'Sell Online with Razorpay Checkout',
    description: 'A full-featured online store — product catalog, cart, and Razorpay checkout. Built for Indian businesses selling fashion, food, gifts, or any physical product.',
    color:       'from-purple-600 to-pink-600',
    textColor:   'text-purple-600',
    price:       '₹12,999',
    delivery:    '10–14 days',
    badge:       '⚡ New',
    features: [
      { icon: '🛍️', text: 'Product catalog with categories, photos & variants' },
      { icon: '🛒', text: 'Add to cart, wishlist & checkout flow' },
      { icon: '💳', text: 'Razorpay checkout — UPI, cards, wallets, EMI' },
      { icon: '📦', text: 'Order management & shipping status updates' },
      { icon: '🔍', text: 'Product search & filter by category/price' },
      { icon: '📊', text: 'Sales analytics — top products, revenue, returns' },
      { icon: '🔖', text: 'Coupon codes & discount management' },
      { icon: '📱', text: 'WhatsApp order notifications to you & customer' },
    ],
  },
]

const comingSoon = [
  { name: 'Dhaba / Cloud Kitchen', emoji: '🥘' }, { name: 'Bakery & Cafe', emoji: '☕' },
  { name: 'Catering Service', emoji: '🍱' },       { name: 'Dental Clinic', emoji: '🦷' },
  { name: 'Pharmacy', emoji: '💊' },               { name: 'Gym / Fitness', emoji: '💪' },
  { name: 'Yoga Studio', emoji: '🧘' },            { name: 'Physiotherapy', emoji: '🩺' },
  { name: 'Ayurveda Center', emoji: '🌿' },        { name: 'PG / Hostel', emoji: '🏠' },
  { name: 'Travel Agency', emoji: '✈️' },           { name: 'Tour Operator', emoji: '🗺️' },
  { name: 'School / College', emoji: '🏫' },       { name: 'Dance Academy', emoji: '💃' },
  { name: 'Music School', emoji: '🎸' },           { name: 'Law Firm', emoji: '⚖️' },
  { name: 'Architect', emoji: '📐' },              { name: 'Interior Designer', emoji: '🛋️' },
  { name: 'Photographer', emoji: '📸' },           { name: 'Wedding Planner', emoji: '💒' },
  { name: 'Event Management', emoji: '🎉' },       { name: 'Clothing Boutique', emoji: '👗' },
  { name: 'Jewellery Shop', emoji: '💍' },         { name: 'Electronics Store', emoji: '📱' },
  { name: 'Kirana / Grocery', emoji: '🛍️' },       { name: 'Builder / Developer', emoji: '🏗️' },
  { name: 'Car Dealer', emoji: '🚗' },             { name: 'Bike Showroom', emoji: '🏍️' },
  { name: 'Auto Service', emoji: '🔧' },           { name: 'Driving School', emoji: '🚦' },
  { name: 'Packers & Movers', emoji: '📦' },       { name: 'Pest Control', emoji: '🐛' },
  { name: 'Electrician / Plumber', emoji: '⚡' },   { name: 'Manufacturing', emoji: '🏭' },
  { name: 'Import / Export', emoji: '🌐' },        { name: 'NGO / Trust', emoji: '🤝' },
  { name: 'Tattoo Studio', emoji: '🎨' },          { name: 'Cab Service', emoji: '🚕' },
]

export default function IndustriesPage() {
  const [selected,  setSelected]  = useState<Industry | null>(null)
  const [demoOpen,  setDemoOpen]  = useState(false)

  const openModal = (ind: Industry) => { setSelected(ind); setDemoOpen(false) }
  const closeAll  = () => { setSelected(null); setDemoOpen(false) }
  const openDemo  = () => setDemoOpen(true)

  return (
    <div className="min-h-screen bg-white pt-16">

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="badge mx-auto mb-4">50+ Business Types</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            See Your Website<br />Before You Order
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
            Click your industry. See a live demo of exactly how your website will look. Then order in 5 minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-500">
            {['Live previews for every industry', 'Delivered in 7 days', 'Fixed price · No surprises'].map(t => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <h2 className="text-2xl font-extrabold text-gray-900">Click any industry to preview</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.map((ind) => (
              <button
                key={ind.slug}
                onClick={() => openModal(ind)}
                className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden text-left"
              >
                {ind.badge && (
                  <div className="absolute top-3 right-3 z-10 bg-purple-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {ind.badge}
                  </div>
                )}
                {/* Card image */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={ind.image}
                    alt={ind.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-2xl">{ind.emoji}</div>
                </div>

                <div className="p-4">
                  <h3 className="font-extrabold text-gray-900 mb-0.5">{ind.name}</h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{ind.tagline}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-700">{ind.price}</span>
                    <div className="flex items-center gap-1 text-xs text-purple-600 font-semibold group-hover:gap-2 transition-all">
                      Preview <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </button>
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
              <div key={ind.name} className="bg-white rounded-xl border border-gray-100 p-3 text-center opacity-60 hover:opacity-90 transition-opacity">
                <div className="text-2xl mb-1.5">{ind.emoji}</div>
                <div className="text-xs font-semibold text-gray-600 leading-tight">{ind.name}</div>
                <div className="text-xs text-gray-400 mt-1">Soon</div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-gray-500 mb-4">Don't see your industry? We build for any business.</p>
            <Link href="/order" className="btn-primary">Order Custom Website <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* ─── INDUSTRY DETAILS MODAL ─── */}
      {selected && !demoOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeAll}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
          >
            {/* Modal header with image */}
            <div className="relative h-48 overflow-hidden">
              <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-br ${selected.color} opacity-80`} />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="text-4xl mb-2">{selected.emoji}</div>
                <h2 className="text-2xl font-extrabold text-white">{selected.name}</h2>
                <p className="text-white/80 text-sm">{selected.tagline}</p>
              </div>
              <button
                onClick={closeAll}
                className="absolute top-4 right-4 w-8 h-8 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{selected.description}</p>

              <h3 className="font-extrabold text-gray-900 mb-4">What's included in your website:</h3>
              <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                {selected.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-gray-50 rounded-xl p-3">
                    <span className="text-lg flex-shrink-0">{f.icon}</span>
                    <span className="text-sm text-gray-700 leading-snug">{f.text}</span>
                  </div>
                ))}
              </div>

              {/* Price + delivery */}
              <div className="flex items-center gap-4 bg-purple-50 rounded-2xl p-4 mb-6 border border-purple-100">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-0.5">Starting from</div>
                  <div className="text-3xl font-extrabold text-purple-700">{selected.price}</div>
                  <div className="text-xs text-gray-500">One-time · Source code included · No hidden fees</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-0.5">Delivery</div>
                  <div className="text-xl font-extrabold text-gray-900">{selected.delivery}</div>
                  <div className="text-xs text-gray-500">from order date</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={openDemo}
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-bold px-5 py-3.5 rounded-xl transition-colors"
                >
                  <Monitor className="w-4 h-4" />
                  Test Your Website Demo
                </button>
                <Link
                  href="/order"
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-5 py-3.5 rounded-xl transition-colors"
                  onClick={closeAll}
                >
                  Order Now — {selected.price} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-xs text-center text-gray-400 mt-3">
                48-hour refund if work hasn't started · Source code included · 1 month support
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── DEMO IFRAME OVERLAY ─── */}
      {selected && demoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          {/* Browser chrome toolbar */}
          <div className="w-full max-w-6xl bg-gray-100 rounded-t-2xl px-4 py-3 flex items-center gap-3 border-b border-gray-200">
            <div className="flex gap-1.5">
              <button onClick={closeAll} className="w-3.5 h-3.5 bg-red-400 rounded-full hover:bg-red-500 transition-colors" />
              <button onClick={() => setDemoOpen(false)} className="w-3.5 h-3.5 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-colors" />
              <div className="w-3.5 h-3.5 bg-green-400 rounded-full" />
            </div>
            <div className="flex-1 bg-white rounded-lg px-3 py-1.5 text-xs text-gray-500 border border-gray-200 font-mono">
              webbyte.online/industries/{selected.slug} — Demo Preview
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDemoOpen(false)}
                className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
              >
                ← Back to Details
              </button>
              <button
                onClick={closeAll}
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* iframe */}
          <div className="w-full max-w-6xl bg-white rounded-b-2xl overflow-hidden shadow-2xl" style={{ height: 'calc(90vh - 52px)' }}>
            <iframe
              src={`/industries/${selected.slug}`}
              className="w-full h-full border-0"
              title={`${selected.name} Demo`}
            />
          </div>

          {/* Bottom strip */}
          <div className="mt-3 flex items-center gap-4">
            <span className="text-white/60 text-xs">This is a live demo of your {selected.name} website</span>
            <Link
              href="/order"
              onClick={closeAll}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
            >
              Order This Website — {selected.price} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
