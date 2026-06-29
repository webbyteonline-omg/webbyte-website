import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, MapPin, IndianRupee, Home, Building2, TrendingUp } from 'lucide-react'
import DemoBanner from '@/components/DemoBanner'

export const metadata: Metadata = {
  title: 'Real Estate Website Demo | WebByte',
  description: 'See how your real estate or builder website will look — with property listings, EMI calculator, and lead generation.',
}

const properties = [
  { name: '3 BHK Premium Apartment', location: 'Sector 45, Gurugram', price: '₹1.2 Cr', type: 'Ready to Move', badge: '🔥 Hot Deal', area: '1450 sqft' },
  { name: '2 BHK Smart Home',        location: 'Whitefield, Bangalore', price: '₹72 L',  type: 'Under Construction', badge: null, area: '1050 sqft' },
  { name: '4 BHK Villa',             location: 'Banjara Hills, Hyderabad', price: '₹2.8 Cr', type: 'Ready to Move', badge: '⭐ Featured', area: '2800 sqft' },
  { name: '1 BHK Studio',            location: 'Andheri West, Mumbai', price: '₹58 L',  type: 'Ready to Move', badge: null, area: '580 sqft' },
]

export default function RealEstateDemo() {
  return (
    <div className="min-h-screen bg-white">
      <DemoBanner industry="Real Estate" price="₹9,999" />

      <nav className="sticky top-9 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center text-white text-lg">🏠</div>
            <div>
              <div className="font-extrabold text-gray-900 text-base">Aryan Realty Group</div>
              <div className="text-xs text-gray-400">Trusted Property Consultants Since 2005</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#listings" className="hover:text-green-600">Properties</a>
            <a href="#emi" className="hover:text-green-600">EMI Calculator</a>
            <a href="#contact" className="hover:text-green-600">Contact</a>
          </div>
          <a href="#contact" className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">Get Callback</a>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-green-700 via-teal-700 to-green-800 text-white py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            🏆 500+ Families Found Their Dream Home
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-5 leading-tight">Find Your<br />Dream Home</h1>
          <p className="text-green-100 text-xl max-w-xl mx-auto mb-10">Premium residential & commercial properties across India. RERA registered. Zero brokerage on select properties.</p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl p-3 max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
            <input className="flex-1 px-4 py-2 text-gray-700 text-sm rounded-xl bg-gray-50 outline-none" placeholder="Search city, locality, project…" readOnly />
            <select className="px-4 py-2 text-gray-500 text-sm rounded-xl bg-gray-50 border-none outline-none">
              <option>All Types</option>
            </select>
            <button className="bg-green-600 text-white font-bold px-6 py-2 rounded-xl text-sm hover:bg-green-700 transition-colors">Search</button>
          </div>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[['500+','Properties'], ['18 yrs','Experience'], ['RERA','Registered'], ['4.8★','Rating']].map(([v,l]) => (
              <div key={l}><div className="text-3xl font-extrabold">{v}</div><div className="text-green-200 text-sm">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">Featured Properties</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {properties.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden">
                <div className="bg-gradient-to-br from-green-100 to-teal-100 h-36 flex items-center justify-center text-5xl relative">
                  🏢
                  {p.badge && <span className="absolute top-2 left-2 bg-green-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">{p.badge}</span>}
                  <span className="absolute top-2 right-2 bg-white text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full border">{p.type}</span>
                </div>
                <div className="p-4">
                  <div className="font-extrabold text-gray-900 text-sm mb-1">{p.name}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-2"><MapPin className="w-3 h-3" />{p.location}</div>
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-green-700">{p.price}</div>
                    <div className="text-xs text-gray-400">{p.area}</div>
                  </div>
                  <button className="mt-3 w-full text-xs bg-green-50 text-green-700 border border-green-200 font-semibold py-1.5 rounded-lg hover:bg-green-100 transition-colors">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section id="emi" className="py-16 bg-green-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-3">EMI Calculator</h2>
          <p className="text-center text-gray-500 text-sm mb-8">Know your monthly EMI before you buy.</p>
          <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6 grid sm:grid-cols-3 gap-4">
            {['Loan Amount (₹)', 'Interest Rate (%)', 'Tenure (years)'].map(l => (
              <div key={l}>
                <label className="text-xs font-semibold text-gray-500 block mb-1">{l}</label>
                <div className="input-field bg-gray-50 text-gray-400 text-sm">{l === 'Loan Amount (₹)' ? '60,00,000' : l === 'Interest Rate (%)' ? '8.5' : '20'}</div>
              </div>
            ))}
            <div className="col-span-full flex items-center justify-between bg-green-50 rounded-xl p-4 border border-green-100">
              <span className="font-semibold text-gray-700">Monthly EMI</span>
              <span className="text-2xl font-extrabold text-green-700">₹52,043</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-14 bg-white text-center">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Want This for Your Real Estate Business?</h2>
        <p className="text-gray-500 mb-6 text-sm">Property listings · EMI calculator · Lead capture · RERA badges · Photo gallery</p>
        <Link href="/order" className="btn-primary">Get My Real Estate Website — ₹9,999 <ArrowRight className="w-4 h-4" /></Link>
      </section>
    </div>
  )
}
