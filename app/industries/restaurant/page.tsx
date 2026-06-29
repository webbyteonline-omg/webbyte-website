import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Star, MapPin, Phone, Clock, ArrowRight, CheckCircle2,
  QrCode, Smartphone, Monitor, CalendarCheck, TrendingUp,
  ChefHat, Bell, CreditCard, Utensils, Wifi, Users
} from 'lucide-react'
import DemoBanner from '@/components/DemoBanner'

export const metadata: Metadata = {
  title: 'Restaurant Website Demo | WebByte',
  description: 'See how your restaurant website will look — with QR table ordering, digital waiter system, online reservations and more.',
}

const menu = [
  { category: 'Starters',    items: [{ name: 'Paneer Tikka',    price: '₹299', tag: '⭐ Chef Special' }, { name: 'Veg Spring Roll', price: '₹199', tag: null }, { name: 'Dal Makhani Soup', price: '₹149', tag: null }] },
  { category: 'Main Course', items: [{ name: 'Butter Chicken',  price: '₹449', tag: '🔥 Bestseller' }, { name: 'Paneer Butter Masala', price: '₹389', tag: null }, { name: 'Dal Tadka',      price: '₹249', tag: null }] },
  { category: 'Breads',      items: [{ name: 'Garlic Naan',     price: '₹69',  tag: null }, { name: 'Tandoori Roti', price: '₹35', tag: null }, { name: 'Missi Roti', price: '₹45', tag: null }] },
  { category: 'Desserts',    items: [{ name: 'Gulab Jamun',     price: '₹119', tag: '❤️ Favourite' }, { name: 'Kulfi Falooda', price: '₹149', tag: null }, { name: 'Rasgulla', price: '₹99', tag: null }] },
]

const reviews = [
  { name: 'Rahul M.',     rating: 5, text: 'Best food in the area! The Butter Chicken is absolutely divine. QR ordering made the whole experience so smooth.' },
  { name: 'Priya S.',     rating: 5, text: 'Loved the ambiance and service. The digital menu is so convenient — no waiting for the waiter to take orders!' },
  { name: 'Anil Kumar',   rating: 4, text: 'Great value for money. Quality is consistently good. The table booking system on their website is very easy to use.' },
]

const techFeatures = [
  {
    icon: QrCode,
    title: 'QR Table Ordering',
    color: 'bg-orange-50 border-orange-200',
    iconColor: 'text-orange-600 bg-orange-100',
    desc: 'Each table has a unique QR code. Customer scans → views live menu → places order directly from their phone. No waiting for waiter.',
    steps: ['Customer scans table QR', 'Live menu opens on phone', 'Selects items & customizes', 'Order sent to kitchen instantly'],
  },
  {
    icon: Smartphone,
    title: 'Digital Waiter App',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600 bg-blue-100',
    desc: 'Waiter uses a tablet/phone app to take orders table-side. One tap sends the order directly to the kitchen — no paper, no confusion.',
    steps: ['Waiter opens table on app', 'Selects items from digital menu', 'Special notes / customization', 'Order fires to KDS instantly'],
  },
  {
    icon: Monitor,
    title: 'Kitchen Display System',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600 bg-green-100',
    desc: 'All orders appear on a screen in the kitchen. Chef marks each dish prepared. Waiter gets notified when food is ready — zero verbal communication.',
    steps: ['Order appears on kitchen screen', 'Colour-coded by urgency', 'Chef marks dishes as prepared', 'Waiter gets instant alert'],
  },
  {
    icon: CalendarCheck,
    title: 'Online Table Reservation',
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600 bg-purple-100',
    desc: 'Guests can book tables directly from the website. Auto-confirmation via WhatsApp. Reminder 1 hour before arrival. No call needed.',
    steps: ['Guest picks date, time, guests', 'Available tables shown live', 'Instant WhatsApp confirmation', 'Auto-reminder 1hr before'],
  },
  {
    icon: Bell,
    title: 'Live Order Tracking',
    color: 'bg-yellow-50 border-yellow-200',
    iconColor: 'text-yellow-600 bg-yellow-100',
    desc: 'Customer sees real-time status on their phone: Order Received → Being Prepared → Ready. No "where is my order?" moments.',
    steps: ['Order Received ✓', 'Being Prepared 🍳', 'Almost Ready ⏱️', 'Your food is here! 🎉'],
  },
  {
    icon: CreditCard,
    title: 'Payments at Table',
    color: 'bg-teal-50 border-teal-200',
    iconColor: 'text-teal-600 bg-teal-100',
    desc: 'Customer can pay directly from their phone via UPI, card, or wallet — right from the order screen. Waiter just confirms and prints receipt.',
    steps: ['Pay via UPI / Card / Wallet', 'Split bill with friends', 'Digital receipt via WhatsApp', 'No cash handling needed'],
  },
]

export default function RestaurantDemo() {
  return (
    <div className="min-h-screen bg-white">
      <DemoBanner industry="Restaurant" price="₹9,999" />

      {/* Fake Restaurant Navbar */}
      <nav className="sticky top-9 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white text-lg">
              🍽️
            </div>
            <div>
              <div className="font-extrabold text-gray-900 text-base leading-tight">Spice Garden</div>
              <div className="text-xs text-gray-400">Pure Veg · North Indian</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#menu" className="hover:text-orange-600">Menu</a>
            <a href="#features" className="hover:text-orange-600">Order Online</a>
            <a href="#about" className="hover:text-orange-600">About</a>
            <a href="#contact" className="hover:text-orange-600">Contact</a>
          </div>
          <a href="#reservation" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
            Book a Table
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 text-9xl">🌶️</div>
          <div className="absolute bottom-10 right-20 text-9xl">🍛</div>
          <div className="absolute top-1/2 left-1/2 text-9xl">🧅</div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" /> 4.8 on Google · 1,200+ reviews
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-5 leading-tight">
            Authentic Flavours<br />Since 1995
          </h1>
          <p className="text-orange-100 text-xl max-w-xl mx-auto mb-10">
            Pure vegetarian North Indian cuisine. Slow-cooked recipes. Fresh ingredients. Right in the heart of the city.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#menu" className="bg-white text-orange-600 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors">
              View Menu
            </a>
            <a href="#reservation" className="bg-orange-500 border-2 border-white/30 text-white font-bold px-8 py-3 rounded-xl hover:bg-orange-400 transition-colors">
              Book a Table
            </a>
          </div>
          {/* Quick stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[['50+', 'Dishes'], ['200+', 'Daily Covers'], ['28 yrs', 'Experience'], ['4.8★', 'Google Rating']].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="text-3xl font-extrabold text-white">{v}</div>
                <div className="text-orange-200 text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Restaurant Tech */}
      <section id="features" className="py-20 bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 text-sm font-bold px-4 py-2 rounded-full mb-5">
              ⚡ Smart Restaurant Technology
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-4">Your Restaurant Runs Itself</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We don't just build a website — we build a complete digital restaurant operations system. From the moment a guest arrives to the moment they pay, everything is seamless.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techFeatures.map(({ icon: Icon, title, color, iconColor, desc, steps }) => (
              <div key={title} className="bg-gray-900 rounded-2xl border border-gray-800 p-6 hover:border-orange-500/30 transition-colors group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-orange-500/20`}>
                  <Icon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-extrabold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{desc}</p>
                <div className="space-y-1.5">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-4 h-4 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs flex-shrink-0 font-bold">
                        {i + 1}
                      </div>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Flow diagram */}
          <div className="mt-14 bg-gray-900 rounded-2xl border border-gray-800 p-8">
            <h3 className="text-center text-white font-extrabold text-xl mb-8">How an Order Flows in Your Restaurant</h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { icon: '📱', label: 'Customer Scans QR',    sub: 'at table' },
                { icon: '📋', label: 'Views Live Menu',       sub: 'on phone' },
                { icon: '✅', label: 'Places Order',          sub: 'customised' },
                { icon: '🖥️', label: 'Kitchen Display',       sub: 'auto-shows order' },
                { icon: '👨‍🍳', label: 'Chef Prepares',         sub: 'marks ready' },
                { icon: '🔔', label: 'Waiter Alerted',        sub: 'auto notification' },
                { icon: '💳', label: 'Customer Pays',         sub: 'via UPI/card' },
              ].map((step, i, arr) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-1.5 border border-gray-700">
                      {step.icon}
                    </div>
                    <div className="text-white text-xs font-semibold">{step.label}</div>
                    <div className="text-gray-500 text-xs">{step.sub}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-orange-500 flex-shrink-0 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-400 text-sm mb-4">All of this is included in your restaurant website package.</p>
              <Link href="/order" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-3 rounded-xl transition-colors">
                Get This for My Restaurant <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-orange-600 font-semibold mb-2">
              <Utensils className="w-4 h-4" /> Our Menu
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Made Fresh, Every Day</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {menu.map((cat) => (
              <div key={cat.category} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-extrabold text-gray-900 text-lg mb-4 pb-3 border-b border-gray-200">{cat.category}</h3>
                <div className="space-y-4">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                        {item.tag && <div className="text-xs text-orange-600 mt-0.5">{item.tag}</div>}
                      </div>
                      <div className="font-extrabold text-orange-600">{item.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">* Menu updates instantly — no reprinting needed with digital system</p>
        </div>
      </section>

      {/* Online Reservation */}
      <section id="reservation" className="py-20 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-orange-600 font-semibold mb-2 flex items-center gap-2">
                <CalendarCheck className="w-4 h-4" /> Online Reservations
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Book Your Table in 30 Seconds</h2>
              <p className="text-gray-500 mb-6">No phone calls. Instant confirmation on WhatsApp. Reminder 1 hour before your visit.</p>
              <div className="space-y-3">
                {['Pick date, time and number of guests', 'See available tables in real time', 'Get instant WhatsApp confirmation', 'Auto-reminder 1 hour before arrival'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>
            {/* Fake booking form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <h3 className="font-extrabold text-gray-900 mb-5">Reserve a Table</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Date</label>
                  <div className="input-field bg-gray-50 text-gray-400 text-sm">Select date…</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Time</label>
                    <div className="input-field bg-gray-50 text-gray-400 text-sm">7:30 PM</div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Guests</label>
                    <div className="input-field bg-gray-50 text-gray-400 text-sm">2 Guests</div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Your Name</label>
                  <div className="input-field bg-gray-50 text-gray-400 text-sm">Rahul Sharma</div>
                </div>
                <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl text-sm hover:bg-orange-600 transition-colors">
                  Confirm Reservation
                </button>
                <p className="text-xs text-center text-gray-400">Confirmation will be sent on WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-3">
              {[['bg-orange-100', '🥘'], ['bg-red-100', '🫕'], ['bg-yellow-100', '🍛']].map(([bg, em], i) => (
                <div key={i} className={`${bg} rounded-2xl h-28 flex items-center justify-center text-5xl`}>{em}</div>
              ))}
            </div>
            <div>
              <div className="text-orange-600 font-semibold mb-2">Our Story</div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">28 Years of Pure Love for Food</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Spice Garden started as a small 20-seat dhaba in 1995. Today we serve 200+ covers daily, but our recipes remain exactly as Dadiji made them — slow-cooked, spice-balanced, and made with love.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6">
                We believe great food deserves a great experience. That's why we invested in technology that keeps the focus where it belongs — on the food and the company.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[['1995', 'Founded'], ['50+', 'Dishes'], ['4.8★', 'Rating']].map(([v, l]) => (
                  <div key={l} className="text-center bg-orange-50 rounded-xl p-3">
                    <div className="text-2xl font-extrabold text-orange-600">{v}</div>
                    <div className="text-xs text-gray-500">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">What Our Guests Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-1 mb-3">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="font-semibold text-gray-900 text-sm">— {r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-1">Location</div>
                <div className="text-gray-500 text-sm">12, Main Market Road, Near Bus Stand, Your City - 110001</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-1">Hours</div>
                <div className="text-gray-500 text-sm">Mon–Sun: 11:00 AM – 11:00 PM<br />Last order: 10:30 PM</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-1">Contact</div>
                <div className="text-gray-500 text-sm">+91 98765 43210<br />spicegarden@email.com</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-4xl mb-4">🍽️</div>
          <h2 className="text-3xl font-extrabold mb-3">Want This for Your Restaurant?</h2>
          <p className="text-orange-100 mb-2">QR ordering · Digital waiter · Kitchen display · Online reservations · Live tracking · Table payments</p>
          <p className="text-orange-200 text-sm mb-8">Complete restaurant website + tech system. Delivered in 7–10 days.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors inline-flex items-center justify-center gap-2">
              Order Now — ₹9,999 <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="https://wa.me/919876543210?text=Hi, I want a restaurant website with QR ordering" target="_blank" rel="noreferrer"
              className="bg-orange-500 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-400 transition-colors inline-flex items-center justify-center gap-2">
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
