import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle2, Globe, Zap, Shield, Headphones,
  Star, TrendingUp, Users, Award, Code2, BarChart3, FileText
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'WebByte — Professional Websites, SaaS & Billing Software',
  description: 'WebByte builds professional websites, SaaS products, and billing software for Indian businesses. SEO-ready, modern, and delivered fast. Order online now.',
}

const stats = [
  { label: 'Projects Delivered', value: '50+', icon: Award },
  { label: 'Happy Clients', value: '40+', icon: Users },
  { label: 'Years Experience', value: '3+', icon: TrendingUp },
  { label: 'Support Hours', value: '24/7', icon: Headphones },
]

const features = [
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'We deliver your project on time, every time. No delays, no excuses. Your deadline is our deadline.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'All products are built with security-first approach — SSL, data encryption, and regular backups included.',
  },
  {
    icon: Globe,
    title: 'SEO Ready',
    description: 'Every website we build is fully optimized for Google. Get discovered by your customers organically.',
  },
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Built with modern tech stacks. Fast, scalable, and maintainable code you can build on top of.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Built-in',
    description: 'Track your visitors, conversions, and revenue from day one. Data-driven decisions from the start.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'We don\'t disappear after delivery. Ongoing support, bug fixes, and updates are always available.',
  },
]

const products = [
  {
    icon: FileText,
    name: 'BillPro',
    tagline: 'Billing Software',
    desc: 'Complete billing solution for retail, wholesale, and service businesses. GST-ready, multi-user, fast.',
    price: '₹4,999',
    href: '/products#billpro',
    badge: 'Bestseller',
  },
  {
    icon: BarChart3,
    name: 'InvoiceX',
    tagline: 'Invoice Manager',
    desc: 'Create, send, and track invoices professionally. Auto-reminders, payment tracking, and PDF export.',
    price: '₹2,999',
    href: '/products#invoicex',
    badge: 'Popular',
  },
  {
    icon: Globe,
    name: 'Custom Website',
    tagline: 'Professional Website',
    desc: 'A fully custom, SEO-optimized website built for your brand. Responsive, fast, and conversion-focused.',
    price: '₹9,999',
    href: '/products#website',
    badge: 'Custom',
  },
]

const testimonials = [
  {
    name: 'Rajesh Sharma',
    role: 'Owner, Sharma Enterprises',
    content: 'WebByte delivered our billing software in just 10 days. It handles all our GST billing perfectly. Best investment we made!',
    rating: 5,
  },
  {
    name: 'Priya Mehta',
    role: 'Founder, StyleHub',
    content: 'Our new website from WebByte looks amazing and we started getting Google traffic within 2 months. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Amit Kumar',
    role: 'Director, Kumar & Sons',
    content: 'The InvoiceX software has saved us hours every week. Clean UI, easy to use, and the support team is always responsive.',
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-white via-purple-50 to-white">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300 rounded-full opacity-20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-100 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="badge mb-6 text-sm">
                🚀 Now Accepting Orders Online
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.05] mb-6">
                Build Your{' '}
                <span className="gradient-text">Digital</span>{' '}
                Presence
              </h1>
              <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-xl">
                Professional websites, SaaS products, and billing software for growing Indian businesses.
                Modern. Fast. SEO-ready. Delivered on time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/order" className="btn-primary text-lg px-8 py-4">
                  Order Now <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/products" className="btn-secondary text-lg px-8 py-4">
                  View Products
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap gap-6">
                {['GST-Ready Software', 'SEO Optimized', 'Secure Payments', '24/7 Support'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="hidden lg:block animate-slide-up">
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-purple-lg p-8 border border-purple-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                    <div className="flex-1 h-6 bg-gray-100 rounded-full px-3 flex items-center text-xs text-gray-400">
                      webbyte.online
                    </div>
                  </div>
                  {/* Mock website preview */}
                  <div className="space-y-3">
                    <div className="h-32 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Your Website Here</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="h-16 bg-purple-50 rounded-lg border border-purple-100" />
                      ))}
                    </div>
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                    <div className="h-8 bg-purple-600 rounded-lg w-28" />
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-purple-md px-4 py-2 flex items-center gap-2 border border-purple-100">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-gray-700">Live in 7 Days</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-purple-md px-4 py-2 flex items-center gap-2 border border-purple-100">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-gray-700">+180% Traffic</span>
                </div>
              </div>
            </div>
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

      {/* Products Preview */}
      <section className="section bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <div className="badge mx-auto mb-4">Our Products</div>
            <h2 className="section-title">Everything You Need to Go Digital</h2>
            <p className="section-subtitle mx-auto">
              From billing software to custom websites — we build digital products that drive results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.name} className="card p-8 group hover:border-purple-200 transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-700 transition-colors">
                    <product.icon className="w-7 h-7 text-purple-700 group-hover:text-white transition-colors" />
                  </div>
                  <span className="badge text-xs">{product.badge}</span>
                </div>
                <div className="mb-1 text-xs font-semibold text-purple-600 uppercase tracking-wide">{product.tagline}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{product.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-gray-900">
                    {product.price}
                  </span>
                  <Link href={product.href} className="btn-outline text-sm !px-4 !py-2">
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/order" className="btn-primary text-lg px-10 py-4">
              Place Your Order <ArrowRight className="w-5 h-5" />
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
            <p className="section-subtitle mx-auto">
              We don't just build software — we build digital businesses. Here's what sets us apart.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-purple-200 hover:shadow-purple-sm transition-all group">
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

      {/* Testimonials */}
      <section className="section bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <div className="badge mx-auto mb-4">Testimonials</div>
            <h2 className="section-title">Loved by Indian Businesses</h2>
            <p className="section-subtitle mx-auto">
              Don't take our word for it — here's what our clients say.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-8">
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

      {/* CTA */}
      <section className="section bg-cta-gradient">
        <div className="container-max text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Ready to Go Digital?
          </h2>
          <p className="text-purple-200 text-xl mb-10 max-w-2xl mx-auto">
            Join 40+ businesses that trust WebByte for their digital products. Place your order today and go live in days, not months.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/order" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-purple-700 font-bold rounded-xl hover:bg-purple-50 transition-colors text-lg shadow-purple-lg">
              Start Your Order <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/products" className="inline-flex items-center gap-2 px-10 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors text-lg border border-white/20">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
