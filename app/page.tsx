import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle2, Globe, Zap, Shield, Headphones,
  Star, TrendingUp, Users, Award, Code2, BarChart3, FileText,
  Clock, Phone, MessageCircle, X, Check, Minus, IndianRupee,
  CalendarCheck, Layers, Sparkles, ExternalLink
} from 'lucide-react'
import ROICalculator from '@/components/ROICalculator'
import DynamicBanner from '@/components/DynamicBanner'

export const metadata: Metadata = {
  title: 'WebByte — Professional Websites, SaaS & Billing Software',
  description: 'WebByte builds professional websites, SaaS products, and billing software for Indian businesses. SEO-ready, modern, and delivered fast. Order online now.',
}

const stats = [
  { label: 'Projects Delivered', value: '50+',  icon: Award      },
  { label: 'Happy Clients',       value: '40+',  icon: Users      },
  { label: 'Revenue Generated',   value: '₹2Cr+', icon: IndianRupee },
  { label: 'Avg. Delivery',       value: '7 days', icon: Clock    },
]

const features = [
  { icon: Zap,        title: 'Fast Delivery',     description: 'Delivered in 5–14 days. No delays, no excuses. Most competitors take months.'         },
  { icon: Shield,     title: 'Secure & Reliable', description: 'SSL, data encryption, secure payments, and daily backups — security is non-negotiable.' },
  { icon: Globe,      title: 'SEO Ready',          description: 'Every website is structured and optimised for Google rankings from day one.'             },
  { icon: Code2,      title: 'Clean Code',         description: 'Modern tech stacks. Fast, scalable, maintainable — you own every line of code.'          },
  { icon: BarChart3,  title: 'Analytics Built-in', description: 'Track visitors, conversions, and revenue from day one. Data drives your growth.'         },
  { icon: Headphones, title: '24/7 Support',       description: 'We don\'t disappear post-delivery. Ongoing support, bug fixes, and updates always.'       },
]

const products = [
  { icon: FileText,  name: 'BillPro',        tagline: 'Billing Software',    desc: 'Complete billing solution for retail, wholesale, and service businesses. GST-ready, multi-user, fast.', price: '₹4,999', oldPrice: '₹8,999', href: '/products#billpro', badge: '🔥 Bestseller' },
  { icon: BarChart3, name: 'InvoiceX',       tagline: 'Invoice Manager',     desc: 'Create, send, and track invoices professionally. Auto-reminders, payment tracking, and PDF export.',   price: '₹2,999', oldPrice: '₹5,999', href: '/products#invoicex', badge: '⚡ Popular'   },
  { icon: Globe,     name: 'Custom Website', tagline: 'Professional Website', desc: 'A fully custom, SEO-optimised website built for your brand. Responsive, fast, and conversion-focused.', price: '₹9,999', oldPrice: '₹25,000', href: '/products#website', badge: '🎯 Custom' },
]

const testimonials = [
  { name: 'Rajesh Sharma',  role: 'Owner, Sharma Enterprises', content: 'WebByte delivered our billing software in just 10 days. It handles all our GST billing perfectly. Best investment we made!', rating: 5 },
  { name: 'Priya Mehta',    role: 'Founder, StyleHub',         content: 'Our new website from WebByte looks amazing and we started getting Google traffic within 2 months. Highly recommend!',        rating: 5 },
  { name: 'Amit Kumar',     role: 'Director, Kumar & Sons',    content: 'The InvoiceX software has saved us hours every week. Clean UI, easy to use, and the support team is always responsive.',      rating: 5 },
]

const portfolioPreview = [
  { name: 'RajBros Kirana', category: 'BillPro Billing',  result: '₹2L/month recovered',  color: 'from-orange-500 to-red-500',    letter: 'R' },
  { name: 'VastraKart',     category: 'Custom Website',   result: '₹4.2L first-month revenue', color: 'from-pink-500 to-purple-600', letter: 'V' },
  { name: 'TechFlow Consulting', category: 'Custom Website', result: '40% more leads',    color: 'from-blue-500 to-cyan-500',    letter: 'T' },
]

const process = [
  { step: '01', title: 'Place Your Order',    desc: 'Select a product, fill your details, and pay securely online. Takes 5 minutes.',    icon: CalendarCheck },
  { step: '02', title: 'Requirements Call',   desc: 'We schedule a 30-minute call to understand exactly what you need.',                  icon: Phone         },
  { step: '03', title: 'We Build It',         desc: 'Our team gets to work. You receive daily progress updates via WhatsApp.',            icon: Layers        },
  { step: '04', title: 'Review & Go Live',    desc: 'You review, we refine, then deploy. Most projects go live within 7–14 days.',        icon: Sparkles      },
]

const comparison = [
  { feature: 'Delivery time',          webbyte: '7–14 days', agency: '2–6 months', freelancer: '1–3 months' },
  { feature: 'Fixed pricing',          webbyte: true,         agency: false,         freelancer: false          },
  { feature: 'GST-ready billing',      webbyte: true,         agency: false,         freelancer: false          },
  { feature: 'Source code included',   webbyte: true,         agency: false,         freelancer: 'Sometimes'    },
  { feature: 'Post-delivery support',  webbyte: true,         agency: false,         freelancer: false          },
  { feature: 'SEO optimised',          webbyte: true,         agency: 'Extra cost',  freelancer: 'Rarely'       },
  { feature: 'Money-back guarantee',   webbyte: true,         agency: false,         freelancer: false          },
  { feature: 'Typical cost',           webbyte: '₹5K–₹10K', agency: '₹1L–₹5L',   freelancer: '₹20K–₹80K'  },
]

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-white via-purple-50 to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-purple-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                3 orders placed this week
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.05] mb-6">
                Build Your{' '}
                <span className="gradient-text">Digital</span>{' '}
                Presence
              </h1>
              <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-xl">
                Professional websites, SaaS products, and billing software for growing Indian businesses.
                Fixed price. Fast delivery. You own the code.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/order" className="btn-primary text-lg px-8 py-4">
                  Start Your Project <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/portfolio" className="btn-secondary text-lg px-8 py-4">
                  See Our Work
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-5">
                {['GST-Ready', 'Source Code Included', 'Money-Back Guarantee', 'No Hidden Fees'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-purple-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                    <div className="flex-1 h-6 bg-gray-100 rounded-full px-3 flex items-center text-xs text-gray-400">
                      yourwebsite.com
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-32 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Your Website Here</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1,2,3].map(i => <div key={i} className="h-16 bg-purple-50 rounded-lg border border-purple-100" />)}
                    </div>
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                    <div className="h-8 bg-purple-600 rounded-lg w-28" />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-2 flex items-center gap-2 border border-purple-100">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-gray-700">Live in 7 Days</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-2 flex items-center gap-2 border border-purple-100">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-gray-700">+180% Traffic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="bg-gray-900 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            {['Razorpay Integrated', 'Supabase Powered', 'Vercel Deployed', 'GST Compliant', 'ISO-grade Security'].map(item => (
              <div key={item} className="flex items-center gap-2 text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center text-white">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-purple-200" />
                  </div>
                </div>
                <div className="text-4xl font-extrabold">{value}</div>
                <div className="text-purple-200 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <div className="badge mx-auto mb-4">Our Products</div>
            <h2 className="section-title">Everything You Need to Go Digital</h2>
            <p className="section-subtitle mx-auto">Fixed price. No subscriptions. You own everything we build.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.name} className="card p-8 group hover:border-purple-200 transition-all relative">
                <div className="absolute -top-3 left-6">
                  <span className="bg-purple-700 text-white text-xs font-bold px-3 py-1 rounded-full">{product.badge}</span>
                </div>
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-700 transition-colors mt-3">
                  <product.icon className="w-7 h-7 text-purple-700 group-hover:text-white transition-colors" />
                </div>
                <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">{product.tagline}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{product.desc}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-extrabold text-gray-900">{product.price}</div>
                    <div className="text-sm text-gray-400 line-through">{product.oldPrice}</div>
                  </div>
                  <Link href={product.href} className="btn-outline text-sm !px-4 !py-2">Learn More</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/order" className="btn-primary text-lg px-10 py-4">
              Place Your Order <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-gray-400 text-sm mt-3">48-hour refund if we haven't started. No questions asked.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <div className="badge mx-auto mb-4">Process</div>
            <h2 className="section-title">From Order to Live in 4 Steps</h2>
            <p className="section-subtitle mx-auto">Simple, transparent, and fast. No agency jargon.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-purple-100 z-0" />
            {process.map(({ step, title, desc, icon: Icon }, i) => (
              <div key={step} className="relative z-10 text-center">
                <div className="w-20 h-20 bg-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <Icon className="w-9 h-9 text-white" />
                </div>
                <div className="text-xs font-bold text-purple-400 mb-1">STEP {step}</div>
                <h3 className="text-lg font-extrabold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/order" className="btn-primary">
              Get Started Today <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="section bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="badge mx-auto mb-4">Our Work</div>
            <h2 className="section-title">Real Projects, Real Results</h2>
            <p className="section-subtitle mx-auto">Every project we deliver comes with measurable business outcomes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {portfolioPreview.map((p) => (
              <div key={p.name} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className={`bg-gradient-to-br ${p.color} h-36 flex items-center justify-center`}>
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-white text-3xl font-extrabold">
                    {p.letter}
                  </div>
                </div>
                <div className="p-5 bg-white">
                  <div className="text-xs text-purple-600 font-semibold mb-1">{p.category}</div>
                  <h3 className="font-extrabold text-gray-900 mb-1">{p.name}</h3>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">{p.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/portfolio" className="btn-secondary">
              View All Projects <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <div className="badge mx-auto mb-4">Why WebByte</div>
            <h2 className="section-title">Built Different. Built Better.</h2>
            <p className="section-subtitle mx-auto">We don't just build software — we build digital businesses.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-purple-700 transition-colors">
                  <Icon className="w-6 h-6 text-purple-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="badge mx-auto mb-4">Comparison</div>
            <h2 className="section-title">WebByte vs. The Alternatives</h2>
            <p className="section-subtitle mx-auto">See why smart businesses choose WebByte over expensive agencies and unreliable freelancers.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full max-w-3xl mx-auto">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 text-gray-500 font-medium text-sm w-1/3">Feature</th>
                  <th className="py-4 px-4 text-center w-1/5">
                    <div className="bg-purple-700 text-white text-sm font-bold rounded-xl py-2 px-4 mx-auto inline-block">WebByte ✓</div>
                  </th>
                  <th className="py-4 px-4 text-center text-gray-500 font-medium text-sm w-1/5">Agency</th>
                  <th className="py-4 px-4 text-center text-gray-500 font-medium text-sm w-1/5">Freelancer</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(({ feature, webbyte, agency, freelancer }, i) => (
                  <tr key={feature} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-3.5 px-4 text-sm text-gray-700 font-medium rounded-l-xl">{feature}</td>
                    <td className="py-3.5 px-4 text-center">
                      {webbyte === true ? <Check className="w-5 h-5 text-green-600 mx-auto" /> :
                       webbyte === false ? <X className="w-5 h-5 text-red-400 mx-auto" /> :
                       <span className="text-sm font-bold text-purple-700">{webbyte}</span>}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {agency === true ? <Check className="w-5 h-5 text-green-600 mx-auto" /> :
                       agency === false ? <X className="w-5 h-5 text-red-400 mx-auto" /> :
                       <span className="text-sm text-gray-500">{agency}</span>}
                    </td>
                    <td className="py-3.5 px-4 text-center rounded-r-xl">
                      {freelancer === true ? <Check className="w-5 h-5 text-green-600 mx-auto" /> :
                       freelancer === false ? <X className="w-5 h-5 text-red-400 mx-auto" /> :
                       <span className="text-sm text-gray-500">{freelancer}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-10">
            <Link href="/order" className="btn-primary text-base px-8 py-3">
              Choose WebByte <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="section bg-gradient-to-br from-purple-700 to-purple-900">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <IndianRupee className="w-4 h-4" /> ROI Calculator
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-4">How Much Could Your Website Earn?</h2>
            <p className="text-purple-200 text-lg">Calculate your potential revenue from going digital.</p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <div className="badge mx-auto mb-4">Client Reviews</div>
            <h2 className="section-title">Loved by Indian Businesses</h2>
            <p className="section-subtitle mx-auto">4.9★ average rating across 40+ clients.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-8 hover:shadow-md transition-all">
                <div className="flex mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="py-14 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { emoji: '🔒', title: 'Secure Payments', desc: 'Razorpay & Stripe — PCI-DSS compliant. Your card details are never stored.' },
              { emoji: '💯', title: '48-Hour Refund',  desc: 'Changed your mind? Full refund within 48 hours if work hasn\'t started.' },
              { emoji: '🇮🇳', title: 'Made for India',  desc: 'GST-ready, UPI payments, Indian business context — we understand your market.' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="flex flex-col items-center">
                <div className="text-4xl mb-3">{emoji}</div>
                <h4 className="font-extrabold text-gray-900 mb-1">{title}</h4>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free consultation CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-purple-50 rounded-3xl p-10 border border-purple-100 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Not sure what you need?</h3>
              <p className="text-gray-500">Book a free 30-minute call with our team. We'll understand your business and recommend the right product — no sales pressure.</p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <a href="https://wa.me/919876543210?text=Hi WebByte, I'd like a free consultation" target="_blank" rel="noreferrer"
                className="btn-primary whitespace-nowrap">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
              <a href="mailto:hello@webbyte.online?subject=Free Consultation Request" className="btn-secondary whitespace-nowrap text-center">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic homepage banner (card style) — shown when active in admin */}
      <DynamicBanner position="homepage" />

      {/* Final CTA */}
      <section className="section bg-cta-gradient">
        <div className="container-max text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">Ready to Go Digital?</h2>
          <p className="text-purple-200 text-xl mb-4 max-w-2xl mx-auto">
            Join 40+ businesses that trust WebByte. Place your order today and go live within days.
          </p>
          <p className="text-purple-300 text-sm mb-10">Starting from ₹2,999 · Fixed price · No hidden fees · Source code included</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/order" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-purple-700 font-bold rounded-xl hover:bg-purple-50 transition-colors text-lg shadow-lg">
              Start Your Order <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/portfolio" className="inline-flex items-center gap-2 px-10 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors text-lg border border-white/20">
              See Our Work
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
