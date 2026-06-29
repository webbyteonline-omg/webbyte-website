import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, ArrowRight, CheckCircle2, Phone } from 'lucide-react'
import DemoBanner from '@/components/DemoBanner'

export const metadata: Metadata = {
  title: 'Dr. Priya Sharma Clinic | WebByte Demo',
  description: 'Clinic website demo with online appointment booking, patient portal, and automated reminders.',
}

const services = [
  { name: 'General Consultation', price: '₹500',   time: '20 min', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&q=80' },
  { name: 'Full Body Checkup',    price: '₹1,500', time: '45 min', img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=120&q=80' },
  { name: 'Video Consultation',   price: '₹300',   time: '15 min', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=120&q=80' },
  { name: 'Follow-up Visit',      price: '₹200',   time: '10 min', img: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=120&q=80' },
]

const features = [
  { emoji: '📅', title: 'Online Booking',       desc: 'Real-time slot availability. Patients book in 60 seconds — no calls.' },
  { emoji: '📱', title: 'WhatsApp Reminders',   desc: 'Auto reminder 2 hours before. Reduces no-shows by up to 60%.' },
  { emoji: '💊', title: 'Digital Prescriptions',desc: 'Patients access their prescription history from a secure portal.' },
  { emoji: '📊', title: 'Clinic Dashboard',     desc: 'See today\'s appointments, revenue, and patient flow at a glance.' },
]

export default function ClinicDemo() {
  return (
    <div className="min-h-screen bg-white">
      <DemoBanner industry="Clinic / Doctor" price="₹9,999" />

      <nav className="sticky top-9 z-40 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&q=80" alt="doctor" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-extrabold text-gray-900">Dr. Priya Sharma</div>
              <div className="text-xs text-gray-400">MBBS, MD · General Physician · 15 yrs exp.</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {['Services', 'About', 'Book'].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-blue-600 transition-colors">{l}</a>)}
          </div>
          <a href="#book" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">Book Now</a>
        </div>
      </nav>

      {/* Hero — split layout */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full mb-6">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
              <span className="ml-1">4.9 · 800+ patients</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              Caring for Your<br />Health <span className="text-blue-600">24/7</span>
            </h1>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">15+ years in general medicine. Compassionate, evidence-based care. Available Monday to Saturday. Book an appointment online in under a minute.</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#book" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3 rounded-xl transition-colors">Book Appointment</a>
              <a href="tel:+919876543210" className="border-2 border-blue-200 text-blue-700 font-bold px-7 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              {['Mon–Sat 9AM–8PM', 'Emergency 24/7', 'Video consult available', 'Same-day appointments'].map(f => (
                <div key={f} className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" />{f}</div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80"
              alt="Doctor"
              className="rounded-3xl w-full h-96 object-cover shadow-xl"
            />
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-lg">✅</div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Today's slots available</div>
                  <div className="text-xs text-gray-400">Next: 11:30 AM · 3:00 PM</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-blue-600 rounded-2xl shadow-lg p-4 text-white text-center">
              <div className="text-2xl font-extrabold">800+</div>
              <div className="text-xs text-blue-200">Patients served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-blue-600 py-10">
        <div className="max-w-5xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ emoji, title, desc }) => (
            <div key={title} className="text-center text-white">
              <div className="text-3xl mb-2">{emoji}</div>
              <div className="font-bold mb-1">{title}</div>
              <div className="text-blue-100 text-xs leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Services & Fees</h2>
            <p className="text-gray-500">Transparent pricing. No surprise billing.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map(s => (
              <div key={s.name} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md hover:border-blue-100 transition-all">
                <img src={s.img} alt={s.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-bold text-gray-900">{s.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">⏱ {s.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-blue-600">{s.price}</div>
                  <a href="#book" className="text-xs text-blue-500 hover:underline mt-0.5 block">Book →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center text-white">
            <div>
              <h2 className="text-3xl font-extrabold mb-4">Book Your Appointment</h2>
              <p className="text-blue-100 mb-6">Pick your slot. Get confirmed on WhatsApp in seconds. No phone calls, no waiting.</p>
              {['Real-time slot availability', 'WhatsApp confirmation immediately', 'Free cancellation up to 2 hours', 'Video consult option available'].map(f => (
                <div key={f} className="flex items-center gap-2 text-blue-100 text-sm mb-2"><CheckCircle2 className="w-4 h-4 text-green-300" />{f}</div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-5 text-gray-900 space-y-3">
              {['Patient Name', 'Phone Number', 'Reason for Visit'].map(f => (
                <div key={f}><label className="text-xs font-semibold text-gray-500 block mb-1">{f}</label><div className="input-field bg-gray-50 text-gray-400 text-sm">{f}…</div></div>
              ))}
              <div className="grid grid-cols-2 gap-2">
                <div><label className="text-xs font-semibold text-gray-500 block mb-1">Date</label><div className="input-field bg-gray-50 text-gray-400 text-sm">Pick date</div></div>
                <div><label className="text-xs font-semibold text-gray-500 block mb-1">Time</label><div className="input-field bg-gray-50 text-gray-400 text-sm">10:00 AM</div></div>
              </div>
              <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-blue-700 transition-colors">Confirm Appointment</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-gray-50 text-center">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Want This for Your Clinic?</h2>
        <p className="text-gray-500 mb-6 text-sm">Online booking · Reminders · Patient portal · Services page · Reviews</p>
        <Link href="/order" className="btn-primary">Get My Clinic Website — ₹9,999 <ArrowRight className="w-4 h-4" /></Link>
      </section>
    </div>
  )
}
