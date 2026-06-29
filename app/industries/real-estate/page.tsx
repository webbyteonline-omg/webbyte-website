import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react'
import DemoBanner from '@/components/DemoBanner'

export const metadata: Metadata = {
  title: 'Aryan Realty Group | WebByte Demo',
  description: 'Real estate website demo with property listings, EMI calculator, and lead capture.',
}

const properties = [
  { name: '3 BHK Apartment', location: 'Sector 45, Gurugram', price: '₹1.2 Cr', area: '1450 sq ft', type: 'Ready to Move', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80', hot: true },
  { name: '2 BHK Smart Home', location: 'Whitefield, Bangalore', price: '₹72 L', area: '1050 sq ft', type: 'Under Construction', img: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&q=80', hot: false },
  { name: '4 BHK Villa', location: 'Banjara Hills, Hyderabad', price: '₹2.8 Cr', area: '2800 sq ft', type: 'Ready to Move', img: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=400&q=80', hot: false },
]

export default function RealEstateDemo() {
  return (
    <div className="min-h-screen bg-white">
      <DemoBanner industry="Real Estate" price="₹9,999" />

      <nav className="sticky top-9 z-40 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <div className="font-extrabold text-gray-900 text-lg">Aryan <span className="text-green-600">Realty</span></div>
            <div className="text-xs text-gray-400">Trusted Property Consultants · RERA Registered</div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {['Properties', 'EMI Calc', 'About', 'Contact'].map(l => <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} className="hover:text-green-600 transition-colors">{l}</a>)}
          </div>
          <a href="#contact" className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">Get Callback</a>
        </div>
      </nav>

      {/* Hero with background */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80" alt="Property" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 text-white">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-1.5 text-sm mb-6">🏆 500+ Families Found Their Dream Home</div>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-5 leading-tight">Find Your<br /><span className="text-green-400">Dream Home</span></h1>
          <p className="text-white/70 text-xl max-w-xl mb-10">Premium properties across India. RERA registered. Zero brokerage on select listings. Trusted since 2005.</p>
          {/* Search */}
          <div className="bg-white rounded-2xl p-3 max-w-2xl flex flex-col sm:flex-row gap-2">
            <input className="flex-1 px-4 py-2.5 text-gray-700 text-sm rounded-xl bg-gray-50 outline-none" placeholder="Search city, locality, project…" readOnly />
            <button className="bg-green-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-green-700 transition-colors">Search Properties</button>
          </div>
        </div>
      </section>

      {/* Properties */}
      <section id="properties" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">Featured Properties</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {properties.map(p => (
              <div key={p.name} className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {p.hot && <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">🔥 Hot Deal</div>}
                  <div className="absolute top-3 right-3 bg-white text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">{p.type}</div>
                </div>
                <div className="p-5 bg-white">
                  <h3 className="font-extrabold text-gray-900 mb-1">{p.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-3"><MapPin className="w-3.5 h-3.5" />{p.location}</div>
                  <div className="flex items-center justify-between">
                    <div><div className="text-xl font-extrabold text-green-700">{p.price}</div><div className="text-xs text-gray-400">{p.area}</div></div>
                    <button className="bg-green-50 text-green-700 border border-green-200 text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calc */}
      <section id="emi-calc" className="py-16 bg-green-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8"><h2 className="text-2xl font-extrabold text-gray-900 mb-2">EMI Calculator</h2><p className="text-gray-500 text-sm">Know your monthly payment before you decide.</p></div>
          <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              {[['Loan Amount', '₹60,00,000'], ['Interest Rate', '8.5%'], ['Tenure', '20 years']].map(([l, v]) => (
                <div key={l}><label className="text-xs font-semibold text-gray-500 block mb-1">{l}</label><div className="input-field bg-gray-50 text-gray-700 text-sm">{v}</div></div>
              ))}
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-100 flex items-center justify-between">
              <span className="font-semibold text-gray-700">Your Monthly EMI</span>
              <span className="text-2xl font-extrabold text-green-700">₹52,043</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-14 bg-white text-center">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Want This for Your Real Estate Business?</h2>
        <p className="text-gray-500 mb-6 text-sm">Property listings · EMI calculator · Lead capture · RERA badge · Map integration</p>
        <Link href="/order" className="btn-primary">Get My Real Estate Website — ₹9,999 <ArrowRight className="w-4 h-4" /></Link>
      </section>
    </div>
  )
}
