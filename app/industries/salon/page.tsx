import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, ArrowRight, CheckCircle2, Clock, CalendarCheck } from 'lucide-react'
import DemoBanner from '@/components/DemoBanner'

export const metadata: Metadata = {
  title: 'Salon & Spa Website Demo | WebByte',
  description: 'See how your salon or spa website will look — with services, pricing, and online slot booking.',
}

const services = [
  { category: 'Hair',  items: [{ name: 'Haircut (Ladies)', price: '₹400' }, { name: 'Blow Dry + Styling', price: '₹600' }, { name: 'Keratin Treatment', price: '₹3,500' }] },
  { category: 'Skin',  items: [{ name: 'Gold Facial',      price: '₹1,200' }, { name: 'Clean-up',          price: '₹700' }, { name: 'Detan',           price: '₹500' }] },
  { category: 'Nails', items: [{ name: 'Manicure',         price: '₹500' }, { name: 'Pedicure',           price: '₹600' }, { name: 'Gel Nails',        price: '₹1,800' }] },
]

export default function SalonDemo() {
  return (
    <div className="min-h-screen bg-white">
      <DemoBanner industry="Salon & Spa" price="₹9,999" />

      <nav className="sticky top-9 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-white text-lg">💇</div>
            <div>
              <div className="font-extrabold text-gray-900 text-base">Glam Studio</div>
              <div className="text-xs text-gray-400">Premium Ladies Salon & Spa</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#services" className="hover:text-pink-600">Services</a>
            <a href="#book" className="hover:text-pink-600">Book Appointment</a>
          </div>
          <a href="#book" className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">Book Slot</a>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700 text-white py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" /> 4.9 Rating · 2,000+ Happy Clients
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-5">Look Good.<br />Feel Amazing.</h1>
          <p className="text-pink-100 text-xl max-w-xl mx-auto mb-10">Premium beauty services by expert stylists. Walk in refreshed. Walk out gorgeous. Book your slot in 2 minutes.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#book" className="bg-white text-pink-600 font-bold px-8 py-3 rounded-xl hover:bg-pink-50 transition-colors">Book Appointment</a>
            <a href="#services" className="border-2 border-white/40 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">Our Services</a>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[['8 yrs','In Business'], ['2000+','Happy Clients'], ['4.9★','Google Rating']].map(([v,l]) => (
              <div key={l}><div className="text-3xl font-extrabold">{v}</div><div className="text-pink-200 text-sm">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">Our Services & Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((cat) => (
              <div key={cat.category} className="bg-pink-50 rounded-2xl border border-pink-100 p-5">
                <h3 className="font-extrabold text-pink-700 text-lg mb-4 pb-2 border-b border-pink-100">{cat.category}</h3>
                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{item.name}</span>
                      <span className="font-extrabold text-pink-600">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="py-16 bg-gradient-to-br from-pink-600 to-rose-700 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-extrabold mb-4">Book Your Appointment</h2>
              <p className="text-pink-100 mb-6">No waiting. Pick your slot, confirm in 1 click. Get WhatsApp reminder 1 hour before.</p>
              {['Real-time slot availability', 'WhatsApp reminder before appointment', 'No cancellation fee up to 2 hrs', 'Choose your preferred stylist'].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-pink-100 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-green-300" /> {f}
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 text-gray-900 space-y-3">
              {['Your Name', 'Phone Number', 'Service'].map(f => (
                <div key={f}>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">{f}</label>
                  <div className="input-field bg-gray-50 text-gray-400 text-sm">{f}…</div>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-semibold text-gray-500 block mb-1">Date</label><div className="input-field bg-gray-50 text-gray-400 text-sm">Pick date</div></div>
                <div><label className="text-xs font-semibold text-gray-500 block mb-1">Time Slot</label><div className="input-field bg-gray-50 text-gray-400 text-sm">11:00 AM</div></div>
              </div>
              <button className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl text-sm hover:bg-pink-600 transition-colors">Confirm Booking</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white text-center">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Want This for Your Salon?</h2>
        <p className="text-gray-500 mb-6 text-sm">Service menu · Slot booking · WhatsApp reminders · Gallery · Reviews</p>
        <Link href="/order" className="btn-primary">Get My Salon Website — ₹9,999 <ArrowRight className="w-4 h-4" /></Link>
      </section>
    </div>
  )
}
