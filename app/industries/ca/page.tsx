import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, Shield, TrendingUp, Users } from 'lucide-react'
import DemoBanner from '@/components/DemoBanner'

export const metadata: Metadata = {
  title: 'CA / Accountant Website Demo | WebByte',
  description: 'See how your CA or accounting firm website will look — services, GST, ITR filing, client inquiry.',
}

const services = [
  { name: 'GST Registration & Filing', icon: '📋', desc: 'Monthly/quarterly GST returns, registration, and compliance.' },
  { name: 'Income Tax (ITR Filing)',    icon: '💼', desc: 'Individual & business ITR filing. Maximum refunds, zero penalties.' },
  { name: 'Company Registration',       icon: '🏢', desc: 'Pvt Ltd, LLP, OPC — end-to-end incorporation support.' },
  { name: 'Audit & Assurance',          icon: '🔍', desc: 'Statutory, internal, and tax audit for businesses of all sizes.' },
  { name: 'Payroll Management',         icon: '👥', desc: 'Monthly payroll, PF, ESI, TDS — fully managed for your team.' },
  { name: 'Business Advisory',          icon: '📊', desc: 'Financial planning, investment advisory, and business valuation.' },
]

export default function CADemo() {
  return (
    <div className="min-h-screen bg-white">
      <DemoBanner industry="CA / Accountant" price="₹9,999" />

      <nav className="sticky top-9 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-slate-600 to-gray-700 rounded-xl flex items-center justify-center text-white text-lg">📊</div>
            <div>
              <div className="font-extrabold text-gray-900 text-base">Sharma & Associates</div>
              <div className="text-xs text-gray-400">Chartered Accountants · Est. 2008</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#services" className="hover:text-slate-700">Services</a>
            <a href="#contact" className="hover:text-slate-700">Contact</a>
          </div>
          <a href="#contact" className="bg-slate-700 hover:bg-slate-800 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">Free Consultation</a>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 text-white py-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              🏆 15+ Years · 500+ Clients Served
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight">Your Finances.<br />Our Expertise.</h1>
            <p className="text-gray-300 text-lg mb-8">Expert CA services for businesses and individuals. GST, ITR, audits, company registration — all under one roof.</p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="bg-white text-slate-800 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors">Free Consultation</a>
              <a href="#services" className="border-2 border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">Our Services</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[['500+','Clients'], ['15 yrs','Experience'], ['100%','Compliance'], ['₹50Cr+','Tax Saved']].map(([v,l]) => (
              <div key={l} className="bg-white/10 rounded-2xl p-5 text-center border border-white/20">
                <div className="text-3xl font-extrabold text-white">{v}</div>
                <div className="text-gray-300 text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <div key={s.name} className="bg-gray-50 rounded-2xl border border-gray-100 p-5 hover:border-slate-300 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-extrabold text-gray-900 text-sm mb-2">{s.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-3">{s.desc}</p>
                <a href="#contact" className="text-xs text-slate-700 font-semibold hover:underline">Get Quote →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 bg-slate-800 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Book a Free Consultation</h2>
          <p className="text-gray-300 mb-8">Tell us your requirement. We'll call back within 2 hours.</p>
          <div className="bg-white rounded-2xl p-6 text-gray-900 space-y-3 text-left">
            {['Full Name', 'Business Name', 'Phone Number', 'Service Required'].map(f => (
              <div key={f}>
                <label className="text-xs font-semibold text-gray-500 block mb-1">{f}</label>
                <div className="input-field bg-gray-50 text-gray-400 text-sm">{f}…</div>
              </div>
            ))}
            <button className="w-full bg-slate-700 text-white font-bold py-3 rounded-xl text-sm hover:bg-slate-800 transition-colors">Submit Enquiry</button>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white text-center">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Want This for Your CA Firm?</h2>
        <p className="text-gray-500 mb-6 text-sm">Services · Lead capture · Client portal · Trust badges · Google reviews</p>
        <Link href="/order" className="btn-primary">Get My CA Website — ₹9,999 <ArrowRight className="w-4 h-4" /></Link>
      </section>
    </div>
  )
}
