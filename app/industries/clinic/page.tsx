import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, MapPin, Phone, Clock, ArrowRight, CheckCircle2, CalendarCheck, FileText, Shield, Users } from 'lucide-react'
import DemoBanner from '@/components/DemoBanner'

export const metadata: Metadata = {
  title: 'Clinic / Doctor Website Demo | WebByte',
  description: 'See how your clinic or doctor website will look — with online appointment booking, patient portal, and more.',
}

const services = [
  { name: 'General Consultation', price: '₹500', time: '15–20 min' },
  { name: 'Full Body Checkup',    price: '₹1,500', time: '45 min' },
  { name: 'Online Video Consult', price: '₹300', time: '10–15 min' },
  { name: 'Follow-up Visit',      price: '₹200', time: '10 min' },
]

const features = [
  { icon: CalendarCheck, title: 'Online Appointment Booking',  desc: 'Patients book slots directly from your website. No phone calls, no double bookings. Auto WhatsApp confirmation.' },
  { icon: FileText,      title: 'Digital Prescription Portal', desc: 'Patients view prescriptions, reports, and visit history from a secure patient login. No paper needed.' },
  { icon: Shield,        title: 'Automated Reminders',         desc: 'WhatsApp reminder 2 hours before appointment. Reduces no-shows by up to 60%.' },
  { icon: Users,         title: 'Patient Management',          desc: 'Track patient history, recurring visits, and follow-ups — all in one dashboard.' },
]

export default function ClinicDemo() {
  return (
    <div className="min-h-screen bg-white">
      <DemoBanner industry="Clinic / Doctor" price="₹9,999" />

      {/* Fake clinic nav */}
      <nav className="sticky top-9 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-lg">🏥</div>
            <div>
              <div className="font-extrabold text-gray-900 text-base leading-tight">Dr. Priya Sharma</div>
              <div className="text-xs text-gray-400">MBBS, MD · General Physician</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#services" className="hover:text-blue-600">Services</a>
            <a href="#book" className="hover:text-blue-600">Book Appointment</a>
            <a href="#about" className="hover:text-blue-600">About</a>
          </div>
          <a href="#book" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
            Book Now
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700 text-white py-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" /> 4.9 Rating · 800+ Patients
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight">
              Your Health,<br />Our Priority
            </h1>
            <p className="text-blue-100 text-lg mb-8">15+ years of experience in general medicine. Compassionate care. Available 6 days a week.</p>
            <div className="flex flex-wrap gap-4">
              <a href="#book" className="bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">Book Appointment</a>
              <a href="tel:+919876543210" className="border-2 border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">Call Now</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-blue-100">
              {['Mon–Sat: 9AM–8PM', 'Emergency: 24/7', 'Video consult available'].map(f => (
                <div key={f} className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-300" />{f}</div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[['800+','Patients'], ['15+','Years Exp.'], ['4.9★','Rating'], ['24/7','Emergency']].map(([v,l]) => (
              <div key={l} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20">
                <div className="text-3xl font-extrabold text-white">{v}</div>
                <div className="text-blue-200 text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">What's Included in Your Clinic Website</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">Our Services</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <div key={s.name} className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{s.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">⏱ {s.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-blue-600">{s.price}</div>
                  <a href="#book" className="text-xs text-blue-500 hover:underline">Book →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking form (static demo) */}
      <section id="book" className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-extrabold mb-4">Book Appointment Online</h2>
              <p className="text-blue-100 mb-6">No waiting. Choose your slot, get instant WhatsApp confirmation.</p>
              {['Instant slot availability', 'WhatsApp confirmation', 'Free cancellation up to 2 hrs before', 'Video consult option'].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-blue-100 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-green-300" /> {f}
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 text-gray-900">
              <div className="space-y-3">
                {['Patient Name', 'Phone Number', 'Reason for Visit'].map(p => (
                  <div key={p}>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">{p}</label>
                    <div className="input-field bg-gray-50 text-gray-400 text-sm">{p}…</div>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">Date</label>
                    <div className="input-field bg-gray-50 text-gray-400 text-sm">Pick date</div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">Time Slot</label>
                    <div className="input-field bg-gray-50 text-gray-400 text-sm">10:00 AM</div>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-blue-700 transition-colors">
                  Confirm Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white text-center">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Want This for Your Clinic?</h2>
        <p className="text-gray-500 mb-6 text-sm">Appointment booking · Patient portal · Automated reminders · Digital prescriptions</p>
        <Link href="/order" className="btn-primary">Get My Clinic Website — ₹9,999 <ArrowRight className="w-4 h-4" /></Link>
      </section>
    </div>
  )
}
