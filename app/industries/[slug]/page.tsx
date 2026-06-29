import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Star, Phone } from 'lucide-react'
import DemoBanner from '@/components/DemoBanner'
import { newIndustries } from '@/lib/industries-data'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ind = newIndustries.find(i => i.slug === params.slug)
  if (!ind) return { title: 'Demo | WebByte' }
  return {
    title: `${ind.demoName} | WebByte Demo`,
    description: `${ind.name} website demo — ${ind.tagline}`,
  }
}

export function generateStaticParams() {
  return newIndustries.map(i => ({ slug: i.slug }))
}

export default function IndustryDemoPage({ params }: Props) {
  const ind = newIndustries.find(i => i.slug === params.slug)

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

  const reviewCount = Math.floor(Math.random() * 500 + 150)

  return (
    <div className="min-h-screen bg-white">
      <DemoBanner industry={ind.name} price={ind.price} />

      {/* ── Navbar ── */}
      <nav className="sticky top-9 z-40 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <div className="font-extrabold text-gray-900 text-lg">
              {ind.demoName.split(' ').slice(0, 1)}{' '}
              <span className={ind.accentText}>{ind.demoName.split(' ').slice(1).join(' ')}</span>
            </div>
            <div className="text-xs text-gray-400">{ind.demoSub}</div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {['Services', 'About', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className={`hover:${ind.accentText} transition-colors`}>{l}</a>
            ))}
          </div>
          <a href="#contact" className={`${ind.accentBg} ${ind.accentHover} text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors`}>
            Get In Touch
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-[72vh] flex items-center overflow-hidden">
        <img
          src={ind.heroImage}
          alt={ind.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 text-white">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-sm mb-5 backdrop-blur-sm`}>
            <span className="text-base">{ind.emoji}</span>
            <span>{ind.name} · {ind.badge ?? 'WebByte Demo'}</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-5 max-w-2xl">
            {ind.demoName}
          </h1>
          <p className="text-white/75 text-xl max-w-xl mb-3">{ind.demoSub}</p>
          <p className="text-white/60 max-w-xl mb-10 leading-relaxed">{ind.description}</p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className={`${ind.accentBg} ${ind.accentHover} text-white font-bold px-8 py-3.5 rounded-xl transition-colors`}>
              Book / Enquire Now
            </a>
            <a href="#services" className="bg-white/10 border border-white/30 backdrop-blur-sm text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-colors">
              See Services
            </a>
          </div>

          {/* Floating review badge */}
          <div className="mt-12 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="text-white/90 text-sm font-semibold">4.8 · {reviewCount}+ happy clients</span>
          </div>
        </div>
      </section>

      {/* ── Accent strip — key features ── */}
      <section className={`${ind.accentBg} py-6`}>
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 text-white text-sm font-semibold">
          {ind.features.map(f => (
            <span key={f.title} className="flex items-center gap-2">
              <span className="text-base">{f.emoji}</span> {f.title}
            </span>
          ))}
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section id="about" className={`py-20 ${ind.lightBg}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Why Clients Choose Us
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Trusted by hundreds of clients. Here's what sets us apart.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ind.features.map(f => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="text-4xl mb-4">{f.emoji}</div>
                <h3 className="font-extrabold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services / Pricing ── */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Services & Pricing
            </h2>
            <p className="text-gray-500">Transparent pricing. No hidden charges.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {ind.services.map((s, idx) => (
              <div
                key={s.name}
                className={`rounded-2xl border p-6 transition-all hover:shadow-lg hover:-translate-y-1 ${
                  idx === 1
                    ? `${ind.accentBg} text-white border-transparent`
                    : 'bg-white border-gray-100'
                }`}
              >
                {idx === 1 && (
                  <div className="text-xs font-bold bg-white/20 rounded-full px-3 py-1 inline-block mb-3">
                    Most Popular
                  </div>
                )}
                <h3 className={`font-extrabold text-lg mb-2 ${idx === 1 ? 'text-white' : 'text-gray-900'}`}>
                  {s.name}
                </h3>
                <p className={`text-sm mb-4 leading-relaxed ${idx === 1 ? 'text-white/80' : 'text-gray-500'}`}>
                  {s.desc}
                </p>
                <div className={`text-2xl font-extrabold mb-4 ${idx === 1 ? 'text-white' : ind.accentText}`}>
                  {s.price}
                </div>
                <a
                  href="#contact"
                  className={`block text-center text-sm font-bold py-2.5 rounded-xl transition-colors ${
                    idx === 1
                      ? 'bg-white/20 hover:bg-white/30 text-white'
                      : `${ind.lightBg} ${ind.accentText} hover:opacity-80 border border-current`
                  }`}
                >
                  Book This
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials strip ── */}
      <section className={`py-16 ${ind.lightBg}`}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">What Our Clients Say</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { name: 'Rahul Sharma',  loc: 'Delhi',     text: `Best ${ind.name.toLowerCase()} experience I've had. Highly professional and on time. Will definitely come back.` },
              { name: 'Priya Mehta',   loc: 'Mumbai',    text: `Transparent pricing, great service. ${ind.demoName.split(' ')[0]} exceeded my expectations completely.` },
              { name: 'Amit Verma',    loc: 'Bengaluru', text: `Found them on Google, booked the same day. Super smooth experience from start to finish.` },
            ].map(r => (
              <div key={r.name} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="font-bold text-gray-900 text-sm">{r.name}</div>
                <div className="text-xs text-gray-400">{r.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact / Booking form ── */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className={`rounded-3xl overflow-hidden border border-gray-100 shadow-lg grid md:grid-cols-2`}>
            {/* Left — info */}
            <div className={`bg-gradient-to-br ${ind.gradient} p-8 md:p-10 text-white flex flex-col justify-between`}>
              <div>
                <div className="text-4xl mb-4">{ind.emoji}</div>
                <h2 className="text-2xl font-extrabold mb-3">{ind.demoName}</h2>
                <p className="text-white/80 text-sm leading-relaxed mb-6">{ind.demoSub}</p>
                <div className="space-y-3">
                  {ind.modalFeatures.slice(0, 4).map(f => (
                    <div key={f.text} className="flex items-start gap-2 text-sm text-white/90">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-white/70 flex-shrink-0" />
                      <span>{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex items-center gap-3 bg-white/15 rounded-xl p-3">
                <Phone className="w-5 h-5 text-white/70" />
                <div>
                  <div className="text-xs text-white/60">Call us directly</div>
                  <div className="font-bold text-sm">+91 98765 43210</div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-gray-50 p-8 md:p-10">
              <h3 className="text-xl font-extrabold text-gray-900 mb-6">Send an Enquiry</h3>
              <div className="space-y-3">
                {['Your Name', 'Phone Number', 'Email (optional)'].map(f => (
                  <div key={f}>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">{f}</label>
                    <div className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-400 text-sm">
                      {f}…
                    </div>
                  </div>
                ))}
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">Service / Message</label>
                  <div className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-400 text-sm h-20">
                    Tell us what you need…
                  </div>
                </div>
                <button className={`w-full ${ind.accentBg} ${ind.accentHover} text-white font-bold py-3.5 rounded-xl transition-colors mt-2`}>
                  Send Enquiry →
                </button>
                <p className="text-xs text-gray-400 text-center">
                  We'll respond on WhatsApp within 30 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA — get your website ── */}
      <section className="py-16 bg-purple-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-3xl mb-3">🚀</div>
          <h2 className="text-2xl font-extrabold mb-3">
            Want This Website for Your {ind.name}?
          </h2>
          <p className="text-purple-200 mb-6 text-sm leading-relaxed">
            WebByte builds you a site just like this — with your branding, your services, your photos.
            Live in {ind.delivery}. Starting at {ind.price}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/order"
              className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-8 py-3.5 rounded-xl hover:bg-purple-50 transition-colors"
            >
              Get My {ind.name} Website — {ind.price} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/industries" className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">
              ← All Industries
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
