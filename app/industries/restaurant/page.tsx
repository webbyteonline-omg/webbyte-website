import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, MapPin, Phone, Clock, ArrowRight, CheckCircle2, QrCode, Smartphone, Monitor, CalendarCheck, Bell, CreditCard } from 'lucide-react'
import DemoBanner from '@/components/DemoBanner'

export const metadata: Metadata = {
  title: 'Spice Garden Restaurant | WebByte Demo',
  description: 'Restaurant website demo with QR ordering, digital waiter, kitchen display, online reservations.',
}

const menu = [
  { category: 'Chef Specials',  bg: 'bg-orange-50', items: [
    { name: 'Dum Biryani',        price: '₹349', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=120&q=80', tag: '⭐ #1 Dish' },
    { name: 'Butter Chicken',     price: '₹299', img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=120&q=80', tag: '🔥 Bestseller' },
    { name: 'Paneer Tikka',       price: '₹249', img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=120&q=80', tag: null },
  ]},
  { category: 'Main Course',    bg: 'bg-red-50', items: [
    { name: 'Dal Makhani',        price: '₹199', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=120&q=80', tag: null },
    { name: 'Shahi Paneer',       price: '₹229', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=120&q=80', tag: null },
    { name: 'Kadai Chicken',      price: '₹319', img: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=120&q=80', tag: null },
  ]},
]

const techFeatures = [
  { icon: QrCode,       color: 'bg-orange-500', title: 'QR Table Ordering',      desc: 'Customer scans → sees menu → orders from their phone. Reaches kitchen in seconds.', steps: ['Scan QR at table', 'Browse live menu', 'Place & customise order', 'Order fires to kitchen'] },
  { icon: Smartphone,   color: 'bg-blue-500',   title: 'Digital Waiter App',     desc: 'Waiter uses phone/tablet. One tap sends order to kitchen — no paper, no shouting.', steps: ['Open table on app', 'Select items', 'Add special notes', 'Fire to kitchen instantly'] },
  { icon: Monitor,      color: 'bg-green-500',  title: 'Kitchen Display System', desc: 'All orders on kitchen screen. Chef marks done. Waiter notified. Zero verbal chaos.', steps: ['Order appears on KDS', 'Colour-coded priority', 'Chef marks prepared', 'Waiter gets alert'] },
  { icon: CalendarCheck,color: 'bg-purple-500', title: 'Table Reservation',      desc: 'Online booking from website. WhatsApp confirmation. Auto-reminder before visit.', steps: ['Choose date & time', 'Pick table size', 'Instant WhatsApp confirm', 'Reminder 1hr before'] },
  { icon: Bell,         color: 'bg-yellow-500', title: 'Live Order Tracking',    desc: 'Customer sees: Received → Preparing → Ready. No more "where is my food?" calls.', steps: ['Order Received ✓', 'Being Prepared 🍳', 'Almost Ready ⏱', 'Your food is here! 🎉'] },
  { icon: CreditCard,   color: 'bg-teal-500',   title: 'Payment at Table',       desc: 'Customer pays via UPI/card on their phone. Split bill. Digital receipt. Done.', steps: ['Pay via UPI or Card', 'Split with friends', 'Receipt on WhatsApp', 'Waiter confirms'] },
]

export default function RestaurantDemo() {
  return (
    <div className="min-h-screen bg-white">
      <DemoBanner industry="Restaurant" price="₹9,999" />

      {/* Fake nav */}
      <nav className="sticky top-9 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=80&q=80" alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-extrabold text-gray-900">Spice Garden</div>
              <div className="text-xs text-gray-400">Pure Veg · North Indian · Jaipur</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
            {['Menu', 'Smart Ordering', 'About', 'Reserve'].map(l => <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} className="hover:text-orange-600 transition-colors">{l}</a>)}
          </div>
          <a href="#reserve" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">Book a Table</a>
        </div>
      </nav>

      {/* Hero — full bleed image */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
          alt="Restaurant"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 text-white">
          <div className="flex items-center gap-2 mb-4 text-sm">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
            <span className="text-white/80 ml-1">4.8 · 1,200+ reviews on Google</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-5 leading-tight">
            Flavours That<br />
            <span className="text-orange-400">Tell a Story</span>
          </h1>
          <p className="text-white/70 text-xl max-w-lg mb-10">Authentic North Indian cuisine. Slow-cooked recipes passed down three generations. In the heart of Jaipur since 1995.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#menu" className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-3.5 rounded-xl transition-colors">Explore Menu</a>
            <a href="#reserve" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-3.5 rounded-xl backdrop-blur-sm transition-colors">Reserve a Table</a>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white text-center hidden md:block">
          <div className="text-2xl font-extrabold text-orange-400">28 yrs</div>
          <div className="text-xs text-white/70">of authentic taste</div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="bg-orange-500 py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-white text-sm font-semibold">
          {['🕐 Open Today 11AM–11PM', '📍 3 Branches in Jaipur', '⭐ 4.8 Google Rating', '📱 Order via QR at Table'].map(t => <span key={t}>{t}</span>)}
        </div>
      </section>

      {/* Smart Tech Section */}
      <section id="smart-ordering" className="py-24 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 text-sm font-bold px-4 py-2 rounded-full mb-6">
              ⚡ Included in Your Restaurant Website
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Your Restaurant,<br />Runs Smarter</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">One system connects your tables, kitchen, and customers. Zero paper. Zero confusion. Maximum speed.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {techFeatures.map(({ icon: Icon, color, title, desc, steps }) => (
              <div key={title} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-orange-500/40 transition-all group">
                <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-extrabold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{desc}</p>
                <div className="space-y-1.5 pt-3 border-t border-gray-800">
                  {steps.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-4 h-4 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i+1}</div>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Order flow */}
          <div className="mt-14 bg-gray-900 rounded-2xl border border-gray-800 p-8">
            <p className="text-center text-gray-400 text-sm mb-6">Complete order flow — from scan to payment</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[['📱','Scan QR'],['📋','View Menu'],['✅','Place Order'],['🖥️','KDS Alert'],['👨‍🍳','Chef Cooks'],['🔔','Waiter Alert'],['💳','Customer Pays']].map(([e,l], i, arr) => (
                <div key={l} className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-800 rounded-xl border border-gray-700 flex items-center justify-center text-xl mx-auto mb-1">{e}</div>
                    <div className="text-white text-xs font-semibold">{l}</div>
                  </div>
                  {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-orange-500/60 flex-shrink-0 hidden sm:block" />}
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
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
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Our Menu</h2>
            <p className="text-gray-500">Made fresh, every single day. No shortcuts.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {menu.map(cat => (
              <div key={cat.category}>
                <h3 className="text-lg font-extrabold text-gray-900 mb-4 pb-2 border-b-2 border-orange-100">{cat.category}</h3>
                <div className="space-y-3">
                  {cat.items.map(item => (
                    <div key={item.name} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 hover:bg-orange-50 transition-colors">
                      <img src={item.img} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1">
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
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-3">
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" alt="food" className="rounded-2xl h-40 w-full object-cover" />
            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80" alt="food" className="rounded-2xl h-40 w-full object-cover" />
            <img src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80" alt="food" className="rounded-2xl h-40 w-full object-cover col-span-2" />
          </div>
          <div>
            <div className="text-orange-600 font-semibold text-sm mb-2 uppercase tracking-wide">Our Story</div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Three Generations.<br />One Kitchen.</h2>
            <p className="text-gray-500 leading-relaxed mb-4">Spice Garden started in 1995 with 12 tables and Dadiji's recipes. Today we serve 200+ covers daily — but the masalas are still ground by hand, and the dough is still made fresh every morning.</p>
            <p className="text-gray-500 leading-relaxed mb-6">We believe great food deserves a great experience. That's why we use technology to make service faster, so our team can spend more time where it matters — with you.</p>
            <div className="flex gap-6">
              {[['1995','Founded'],['28 yrs','Experience'],['4.8★','Rating']].map(([v,l]) => (
                <div key={l}>
                  <div className="text-2xl font-extrabold text-orange-600">{v}</div>
                  <div className="text-xs text-gray-500">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reservation */}
      <section id="reserve" className="py-20 bg-orange-500">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <h2 className="text-3xl font-extrabold mb-3">Reserve Your Table</h2>
              <p className="text-orange-100 mb-6">Book in 30 seconds. Instant WhatsApp confirmation. No phone call needed.</p>
              {['Real-time table availability', 'Instant WhatsApp confirmation', 'Free cancellation up to 2 hours', 'Pre-order your food too'].map(f => (
                <div key={f} className="flex items-center gap-2 text-orange-100 text-sm mb-2"><CheckCircle2 className="w-4 h-4 text-orange-200" />{f}</div>
              ))}
              <div className="flex items-center gap-3 mt-6">
                <Phone className="w-4 h-4 text-orange-200" />
                <span className="text-orange-100 text-sm">Or call: +91 98765 43210</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="font-extrabold text-gray-900 mb-4">Book a Table</h3>
              <div className="space-y-3">
                <div><label className="text-xs font-semibold text-gray-500 block mb-1">Your Name</label><div className="input-field bg-gray-50 text-gray-400 text-sm">Rahul Sharma</div></div>
                <div className="grid grid-cols-2 gap-2">
                  <div><label className="text-xs font-semibold text-gray-500 block mb-1">Date</label><div className="input-field bg-gray-50 text-gray-400 text-sm">Select date</div></div>
                  <div><label className="text-xs font-semibold text-gray-500 block mb-1">Time</label><div className="input-field bg-gray-50 text-gray-400 text-sm">7:30 PM</div></div>
                </div>
                <div><label className="text-xs font-semibold text-gray-500 block mb-1">Guests</label><div className="input-field bg-gray-50 text-gray-400 text-sm">2 Adults</div></div>
                <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl text-sm hover:bg-orange-600 transition-colors">Confirm Reservation</button>
                <p className="text-xs text-center text-gray-400">WhatsApp confirmation sent instantly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-14 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {[
            { icon: '📍', title: 'Find Us', lines: ['12, Main Market Road', 'Near Clock Tower, Jaipur - 302001'] },
            { icon: '🕐', title: 'Hours', lines: ['Monday – Sunday', '11:00 AM – 11:00 PM'] },
            { icon: '📞', title: 'Contact', lines: ['+91 98765 43210', 'info@spicegarden.com'] },
          ].map(({ icon, title, lines }) => (
            <div key={title} className="text-center">
              <div className="text-3xl mb-2">{icon}</div>
              <div className="font-bold text-white mb-1">{title}</div>
              {lines.map(l => <div key={l} className="text-gray-400 text-sm">{l}</div>)}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-red-700 text-white text-center">
        <div className="text-4xl mb-4">🍽️</div>
        <h2 className="text-3xl font-extrabold mb-3">Want This for Your Restaurant?</h2>
        <p className="text-orange-100 text-sm mb-8">QR ordering · Digital waiter · Kitchen display · Reservations · Tracking · Payments</p>
        <Link href="/order" className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors">
          Order Now — ₹9,999 <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  )
}
