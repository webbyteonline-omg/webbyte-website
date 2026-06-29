import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, MapPin, Phone, ArrowRight, CheckCircle2, Wifi, Coffee, Car, Utensils } from 'lucide-react'
import DemoBanner from '@/components/DemoBanner'

export const metadata: Metadata = {
  title: 'Hotel / Resort Website Demo | WebByte',
  description: 'See how your hotel or resort website will look — with room booking, photo gallery, and packages.',
}

const rooms = [
  { name: 'Deluxe Room',      price: '₹2,499/night', desc: 'City view, AC, King bed, Smart TV',  amenities: ['AC', 'WiFi', 'TV', 'Breakfast'] },
  { name: 'Suite',            price: '₹4,999/night', desc: 'Garden view, Jacuzzi, Living area',   amenities: ['AC', 'WiFi', 'TV', 'Breakfast', 'Jacuzzi'] },
  { name: 'Family Room',      price: '₹3,499/night', desc: '2 Queen beds, Extra space, Balcony',  amenities: ['AC', 'WiFi', 'TV', 'Breakfast', 'Balcony'] },
]

const amenities = [
  { icon: Wifi,     label: 'Free WiFi'      },
  { icon: Coffee,   label: 'Free Breakfast' },
  { icon: Car,      label: 'Free Parking'   },
  { icon: Utensils, label: 'Restaurant'     },
]

export default function HotelDemo() {
  return (
    <div className="min-h-screen bg-white">
      <DemoBanner industry="Hotel / Resort" price="₹9,999" />

      <nav className="sticky top-9 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-lg">🏨</div>
            <div>
              <div className="font-extrabold text-gray-900 text-base leading-tight">The Royal Palace Hotel</div>
              <div className="text-xs text-gray-400">4★ Hotel · Jaipur, Rajasthan</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#rooms" className="hover:text-yellow-600">Rooms</a>
            <a href="#amenities" className="hover:text-yellow-600">Amenities</a>
            <a href="#gallery" className="hover:text-yellow-600">Gallery</a>
          </div>
          <a href="#book" className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">Book Room</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-yellow-600 via-orange-600 to-red-700 text-white py-28">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" /> 4.7 on TripAdvisor · 500+ Reviews
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-6">Where Heritage<br />Meets Luxury</h1>
          <p className="text-yellow-100 text-xl max-w-xl mx-auto mb-10">A royal experience in the heart of Jaipur. 42 elegantly appointed rooms. Fine dining. Spa. Conference facilities.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#book" className="bg-white text-yellow-600 font-bold px-8 py-3 rounded-xl hover:bg-yellow-50 transition-colors">Check Availability</a>
            <a href="#rooms" className="border-2 border-white/40 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">Explore Rooms</a>
          </div>
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[['42', 'Rooms'], ['4★', 'Rating'], ['1995', 'Est.'], ['500+', 'Reviews']].map(([v,l]) => (
              <div key={l}><div className="text-3xl font-extrabold">{v}</div><div className="text-yellow-200 text-sm">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="py-10 bg-yellow-50 border-b border-yellow-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {amenities.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-yellow-100">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-yellow-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section id="rooms" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">Our Rooms</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room.name} className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-400 h-36 flex items-center justify-center text-6xl">🛏️</div>
                <div className="p-5">
                  <h3 className="font-extrabold text-gray-900 mb-1">{room.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{room.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {room.amenities.map(a => <span key={a} className="text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded-full">{a}</span>)}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-yellow-600">{room.price}</div>
                    <a href="#book" className="text-sm bg-yellow-500 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-yellow-600 transition-colors">Book</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="py-16 bg-gradient-to-br from-yellow-600 to-orange-700 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Check Availability</h2>
          <div className="bg-white rounded-2xl p-6 text-gray-900 grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {['Check-in', 'Check-out', 'Guests', 'Room Type'].map(l => (
              <div key={l}>
                <label className="text-xs font-semibold text-gray-500 block mb-1">{l}</label>
                <div className="input-field bg-gray-50 text-gray-400 text-sm">{l}…</div>
              </div>
            ))}
          </div>
          <button className="bg-white text-yellow-600 font-bold px-8 py-3 rounded-xl hover:bg-yellow-50 w-full sm:w-auto">Search Rooms</button>
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
