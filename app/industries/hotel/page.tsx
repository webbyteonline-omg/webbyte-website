import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, ArrowRight, CheckCircle2, Wifi, Coffee, Car } from 'lucide-react'
import DemoBanner from '@/components/DemoBanner'

export const metadata: Metadata = {
  title: 'The Royal Palace Hotel | WebByte Demo',
  description: 'Hotel website demo with room booking, photo gallery, packages, and online payments.',
}

const rooms = [
  { name: 'Deluxe Room',   price: '₹2,499', tag: 'City View', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80', amenities: ['AC', 'WiFi', 'Breakfast', 'Smart TV'] },
  { name: 'Premium Suite', price: '₹4,999', tag: 'Best Value', img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80', amenities: ['AC', 'WiFi', 'Breakfast', 'Jacuzzi', 'Balcony'] },
  { name: 'Family Room',   price: '₹3,499', tag: 'Garden View', img: 'https://images.unsplash.com/photo-1591088398332-8596b4f39dcd?w=400&q=80', amenities: ['AC', 'WiFi', 'Breakfast', '2 Beds'] },
]

const gallery = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80',
  'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=400&q=80',
]

export default function HotelDemo() {
  return (
    <div className="min-h-screen bg-white">
      <DemoBanner industry="Hotel / Resort" price="₹9,999" />

      <nav className="sticky top-9 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <div className="font-extrabold text-gray-900 text-lg">The Royal Palace</div>
            <div className="text-xs text-gray-400">★★★★ Hotel · Jaipur, Rajasthan</div>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
            {['Rooms', 'Gallery', 'Amenities', 'Book'].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-yellow-600 transition-colors">{l}</a>)}
          </div>
          <a href="#book" className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold px-5 py-2 rounded-xl transition-colors">Check Availability</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80" alt="Hotel" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 text-white">
          <div className="flex items-center gap-1 mb-4">
            {[1,2,3,4].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
            <span className="text-white/60 text-sm ml-2">500+ TripAdvisor reviews</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-5 leading-tight">
            Where Heritage<br /><span className="text-yellow-400">Meets Luxury</span>
          </h1>
          <p className="text-white/70 text-xl max-w-xl mb-10">42 elegantly appointed rooms. Award-winning restaurant. Infinity pool. In the heart of the Pink City.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#book" className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold px-8 py-3.5 rounded-xl transition-colors">Check Availability</a>
            <a href="#rooms" className="bg-white/10 border border-white/30 backdrop-blur-sm text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-colors">Explore Rooms</a>
          </div>
        </div>
        {/* Floating stats */}
        <div className="absolute bottom-8 right-8 flex gap-3 hidden md:flex">
          {[['42', 'Rooms'],['1995','Est.'],['4.7★','Rating']].map(([v,l]) => (
            <div key={l} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-center text-white">
              <div className="text-xl font-extrabold text-yellow-400">{v}</div>
              <div className="text-xs text-white/60">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities bar */}
      <section id="amenities" className="bg-yellow-500 py-5">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-white text-sm font-semibold">
          {['🍳 Free Breakfast', '📶 Free WiFi', '🚗 Free Parking', '🏊 Infinity Pool', '🍽️ Restaurant', '💆 Spa & Wellness'].map(f => <span key={f}>{f}</span>)}
        </div>
      </section>

      {/* Rooms */}
      <section id="rooms" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Our Rooms</h2>
            <p className="text-gray-500">Each room designed to blend heritage with modern comfort.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {rooms.map(r => (
              <div key={r.name} className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="relative h-52 overflow-hidden">
                  <img src={r.img} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{r.tag}</div>
                </div>
                <div className="p-5 bg-white">
                  <h3 className="font-extrabold text-gray-900 text-lg mb-2">{r.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {r.amenities.map(a => <span key={a} className="text-xs bg-yellow-50 text-yellow-700 border border-yellow-100 px-2 py-0.5 rounded-full">{a}</span>)}
                  </div>
                  <div className="flex items-center justify-between">
                    <div><div className="text-xl font-extrabold text-yellow-600">{r.price}</div><div className="text-xs text-gray-400">per night</div></div>
                    <a href="#book" className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">Book</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">Property Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {gallery.map((src, i) => <div key={i} className="rounded-xl overflow-hidden aspect-square"><img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" /></div>)}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="py-20 bg-gradient-to-br from-yellow-600 to-orange-700 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Check Availability</h2>
          <div className="bg-white rounded-2xl p-5 text-gray-900 grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {['Check-in', 'Check-out', 'Guests', 'Room Type'].map(l => (
              <div key={l}><label className="text-xs font-semibold text-gray-500 block mb-1">{l}</label><div className="input-field bg-gray-50 text-gray-400 text-sm">{l}…</div></div>
            ))}
          </div>
          <button className="bg-white text-yellow-700 font-bold px-10 py-3.5 rounded-xl hover:bg-yellow-50 w-full sm:w-auto transition-colors">Search Available Rooms</button>
        </div>
      </section>

      <section className="py-14 bg-white text-center">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Want This for Your Hotel?</h2>
        <p className="text-gray-500 mb-6 text-sm">Room booking · Gallery · Packages · Reviews · Online payments</p>
        <Link href="/order" className="btn-primary">Get My Hotel Website — ₹9,999 <ArrowRight className="w-4 h-4" /></Link>
      </section>
    </div>
  )
}
