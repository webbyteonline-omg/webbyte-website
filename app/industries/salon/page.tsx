import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, ArrowRight, CheckCircle2 } from 'lucide-react'
import DemoBanner from '@/components/DemoBanner'

export const metadata: Metadata = {
  title: 'Glam Studio Salon | WebByte Demo',
  description: 'Premium salon & spa website demo with online slot booking, services menu, and stylist selection.',
}

const services = [
  { name: 'Haircut & Blow Dry',   price: '₹700',   time: '60 min',  img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&q=80', popular: true  },
  { name: 'Keratin Treatment',    price: '₹3,500', time: '180 min', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80', popular: false },
  { name: 'Gold Facial',          price: '₹1,200', time: '60 min',  img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=200&q=80', popular: true  },
  { name: 'Bridal Makeup',        price: '₹8,000', time: '180 min', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&q=80', popular: false },
  { name: 'Gel Nails',            price: '₹1,800', time: '90 min',  img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&q=80', popular: false },
  { name: 'Full Body Massage',    price: '₹2,500', time: '90 min',  img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&q=80', popular: true  },
]

const gallery = [
  'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&q=80',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80',
  'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80',
]

export default function SalonDemo() {
  return (
    <div className="min-h-screen bg-white">
      <DemoBanner industry="Salon & Spa" price="₹9,999" />

      <nav className="sticky top-9 z-40 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <div className="font-extrabold text-gray-900 text-lg tracking-tight">GLAM <span className="text-pink-500">STUDIO</span></div>
            <div className="text-xs text-gray-400">Premium Ladies Salon & Spa</div>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
            {['Services', 'Gallery', 'Book', 'About'].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-pink-500 transition-colors">{l}</a>)}
          </div>
          <a href="#book" className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold px-5 py-2 rounded-full transition-colors">Book Appointment</a>
        </div>
      </nav>

      {/* Hero — full image with overlay */}
      <section className="relative h-[90vh] min-h-[560px] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1560869713-7d0a29430803?w=1600&q=80" alt="Salon" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 text-white w-full">
          <div className="flex items-center gap-1 mb-4">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
            <span className="text-white/70 text-sm ml-2">4.9 · 2,000+ clients · Connaught Place, Delhi</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-5 leading-none">
            Look Good.<br /><span className="text-pink-400">Feel Amazing.</span>
          </h1>
          <p className="text-white/70 text-xl max-w-xl mb-10">Expert stylists. Premium products. A salon experience that feels personal, not rushed.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#book" className="bg-pink-500 hover:bg-pink-400 text-white font-bold px-8 py-3.5 rounded-full transition-colors">Book Your Slot</a>
            <a href="#services" className="bg-white/10 border border-white/30 backdrop-blur-sm text-white font-bold px-8 py-3.5 rounded-full hover:bg-white/20 transition-colors">Our Services</a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Services & Pricing</h2>
            <p className="text-gray-500">Every service performed by certified beauty professionals.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(s => (
              <div key={s.name} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="relative h-36 overflow-hidden">
                  <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {s.popular && <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Popular</div>}
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{s.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">⏱ {s.time}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-extrabold text-pink-600">{s.price}</div>
                    <a href="#book" className="text-xs text-pink-500 font-semibold hover:underline">Book →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-16 bg-pink-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">Our Work</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {gallery.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden aspect-square hover:scale-105 transition-transform">
                <img src={src} alt={`Gallery ${i+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Book Your Appointment</h2>
              <p className="text-gray-500 mb-6 leading-relaxed">Real-time availability. Pick your service and stylist. WhatsApp reminder 1 hour before.</p>
              {['Real-time slot availability', 'Choose your preferred stylist', 'WhatsApp reminder 1hr before', 'Free rescheduling up to 2 hours'].map(f => (
                <div key={f} className="flex items-center gap-2 text-gray-600 text-sm mb-2"><CheckCircle2 className="w-4 h-4 text-pink-500" />{f}</div>
              ))}
              <div className="mt-6 bg-pink-50 rounded-2xl p-4 border border-pink-100">
                <div className="text-xs font-semibold text-pink-600 mb-2">🎁 First-time client offer</div>
                <div className="font-bold text-gray-900 text-sm">20% off your first appointment</div>
                <div className="text-xs text-gray-400 mt-0.5">Valid for new customers only</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
              <div className="space-y-3">
                {['Your Name', 'Phone Number', 'Service'].map(f => (
                  <div key={f}><label className="text-xs font-semibold text-gray-500 block mb-1">{f}</label><div className="input-field bg-white text-gray-400 text-sm">{f}…</div></div>
                ))}
                <div><label className="text-xs font-semibold text-gray-500 block mb-1">Preferred Stylist</label><div className="input-field bg-white text-gray-400 text-sm">Any available</div></div>
                <div className="grid grid-cols-2 gap-2">
                  <div><label className="text-xs font-semibold text-gray-500 block mb-1">Date</label><div className="input-field bg-white text-gray-400 text-sm">Date</div></div>
                  <div><label className="text-xs font-semibold text-gray-500 block mb-1">Time</label><div className="input-field bg-white text-gray-400 text-sm">11:00 AM</div></div>
                </div>
                <button className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl text-sm hover:bg-pink-600 transition-colors">Confirm Booking</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-pink-600 text-center text-white">
        <h2 className="text-2xl font-extrabold mb-3">Want This for Your Salon?</h2>
        <p className="text-pink-100 mb-6 text-sm">Service menu · Slot booking · Gallery · Stylist profiles · Offers</p>
        <Link href="/order" className="inline-flex items-center gap-2 bg-white text-pink-600 font-bold px-8 py-3.5 rounded-xl hover:bg-pink-50 transition-colors">
          Get My Salon Website — ₹9,999 <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  )
}
