import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Star, Phone } from 'lucide-react'
import DemoBanner from '@/components/DemoBanner'
import { newIndustries } from '@/lib/industries-data'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ind = newIndustries.find(i => i.slug === slug)
  if (!ind) return { title: 'Demo | WebByte' }
  return {
    title: `${ind.demoName} | WebByte Demo`,
    description: `${ind.name} website demo — ${ind.tagline}`,
  }
}

export function generateStaticParams() {
  return newIndustries.map(i => ({ slug: i.slug }))
}

export default async function IndustryDemoPage({ params }: Props) {
  const { slug } = await params
  const ind = newIndustries.find(i => i.slug === slug)

  if (!ind) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Demo Not Found</h1>
        <p className="text-gray-500 mb-6">This industry demo is still being built.</p>
        <Link href="/industries" className="bg-purple-600 text-white font-bold px-6 py-3 rounded-xl">
          ← Back to Industries
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <DemoBanner industry={ind.name} price={ind.price} />

      {/* ── Navbar — always horizontal, no hamburger ── */}
      <nav className="sticky top-9 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <div className="font-extrabold text-gray-900">
              {ind.demoName.split(' ')[0]}{' '}
              <span className={ind.accentText}>{ind.demoName.split(' ').slice(1).join(' ')}</span>
            </div>
            <div className="text-xs text-gray-400 hidden sm:block">{ind.demoSub}</div>
          </div>
          {/* Always-visible nav links — no hamburger */}
          <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
            <a href="#services" className={`${ind.accentText} transition-colors hidden xs:block`}>Services</a>
            <a href="#about" className="hover:text-gray-900 transition-colors hidden sm:block">About</a>
            <a href="#contact" className={`${ind.accentBg} ${ind.accentHover} text-white font-bold px-4 py-2 rounded-xl transition-colors text-sm`}>
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <img
          src={ind.heroImage}
          alt={ind.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-sm mb-5">
            <span>{ind.emoji}</span>
            <span>{ind.name}</span>
            {ind.badge && <span className="bg-white/30 rounded-full px-2 py-0.5 text-xs">{ind.badge}</span>}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4 max-w-2xl">
            {ind.demoName}
          </h1>
          <p className="text-white/80 max-w-xl mb-3 text-lg">{ind.demoSub}</p>
          <p className="text-white/60 max-w-lg mb-8 text-sm leading-relaxed">{ind.description}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className={`${ind.accentBg} ${ind.accentHover} text-white font-bold px-6 py-3 rounded-xl transition-colors`}>
              Book / Enquire Now
            </a>
            <a href="#services" className="bg-white/15 border border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/25 transition-colors">
              See Services
            </a>
          </div>

          <div className="mt-10 inline-flex items-center gap-3 bg-white/15 border border-white/20 rounded-xl px-4 py-2.5">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="text-white/90 text-sm font-semibold">4.8 · 300+ happy clients</span>
          </div>
        </div>
      </section>

      {/* ── Features strip ── */}
      <section className={`${ind.accentBg} py-5`}>
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-5 text-white text-sm font-semibold">
          {ind.features.map(f => (
            <span key={f.title} className="flex items-center gap-1.5">
              <span>{f.emoji}</span> {f.title}
            </span>
          ))}
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section id="about" className={`py-16 ${ind.lightBg}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Why Clients Choose Us</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">Trusted by hundreds of clients. Here's what sets us apart.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ind.features.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="text-3xl mb-3">{f.emoji}</div>
                <h3 className="font-extrabold text-gray-900 mb-1.5 text-sm">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services / Pricing ── */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Services & Pricing</h2>
            <p className="text-gray-500 text-sm">Transparent pricing. No hidden charges.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {ind.services.map((s, idx) => (
              <div
                key={s.name}
                className={`rounded-2xl border p-5 ${
                  idx === 1
                    ? `${ind.accentBg} text-white border-transparent`
                    : 'bg-white border-gray-100'
                }`}
              >
                {idx === 1 && (
                  <div className="text-xs font-bold bg-white/20 rounded-full px-2.5 py-0.5 inline-block mb-2">
                    Most Popular
                  </div>
                )}
                <h3 className={`font-extrabold mb-1.5 ${idx === 1 ? 'text-white' : 'text-gray-900'}`}>{s.name}</h3>
                <p className={`text-xs mb-3 leading-relaxed ${idx === 1 ? 'text-white/80' : 'text-gray-500'}`}>{s.desc}</p>
                <div className={`text-xl font-extrabold mb-3 ${idx === 1 ? 'text-white' : ind.accentText}`}>{s.price}</div>
                <a
                  href="#contact"
                  className={`block text-center text-xs font-bold py-2 rounded-lg transition-colors ${
                    idx === 1
                      ? 'bg-white/20 hover:bg-white/30 text-white'
                      : `${ind.lightBg} ${ind.accentText} border border-current/20`
                  }`}
                >
                  Book This
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className={`py-14 ${ind.lightBg}`}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-8">What Our Clients Say</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: 'Rahul S.',   loc: 'Delhi',     text: `Great ${ind.name.toLowerCase()} experience. Very professional and on time. Highly recommend.` },
              { name: 'Priya M.',   loc: 'Mumbai',    text: 'Transparent pricing and excellent service quality. Will definitely come back.' },
              { name: 'Amit V.',    loc: 'Bengaluru', text: 'Found them on Google, booked same day. Super smooth from start to finish.' },
            ].map(r => (
              <div key={r.name} className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-600 text-xs leading-relaxed mb-3">"{r.text}"</p>
                <div className="font-bold text-gray-900 text-xs">{r.name} · <span className="text-gray-400 font-normal">{r.loc}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className={`rounded-2xl overflow-hidden grid md:grid-cols-2 border border-gray-100 shadow-sm`}>
            {/* Left */}
            <div className={`bg-gradient-to-br ${ind.gradient} p-7 text-white`}>
              <div className="text-3xl mb-3">{ind.emoji}</div>
              <h2 className="text-xl font-extrabold mb-2">{ind.demoName}</h2>
              <p className="text-white/75 text-sm mb-5">{ind.demoSub}</p>
              <div className="space-y-2.5 mb-6">
                {ind.modalFeatures.slice(0, 4).map(f => (
                  <div key={f.text} className="flex items-start gap-2 text-xs text-white/90">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 bg-white/15 rounded-xl p-3">
                <Phone className="w-4 h-4" />
                <div>
                  <div className="text-xs text-white/60">Call us</div>
                  <div className="font-bold text-sm">+91 98765 43210</div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-gray-50 p-7">
              <h3 className="text-lg font-extrabold text-gray-900 mb-5">Send an Enquiry</h3>
              <div className="space-y-3">
                {['Your Name', 'Phone Number', 'Email (optional)'].map(f => (
                  <div key={f}>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">{f}</label>
                    <div className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-400 text-sm">{f}…</div>
                  </div>
                ))}
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">Message</label>
                  <div className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-400 text-sm h-16">Tell us what you need…</div>
                </div>
                <button className={`w-full ${ind.accentBg} ${ind.accentHover} text-white font-bold py-3 rounded-xl transition-colors text-sm`}>
                  Send Enquiry →
                </button>
                <p className="text-xs text-gray-400 text-center">We respond on WhatsApp within 30 min.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="py-12 bg-purple-700 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-xl font-extrabold mb-2">Want This Website for Your {ind.name}?</h2>
          <p className="text-purple-200 text-sm mb-5">Your branding, your services, live in {ind.delivery}. Starting at {ind.price}.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/order" className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-6 py-3 rounded-xl hover:bg-purple-50 transition-colors text-sm">
              Get My Website — {ind.price} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/industries" className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm">
              ← All Industries
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
