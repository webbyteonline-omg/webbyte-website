import type { Metadata } from 'next'
import Link from 'next/link'
import { Users, Award, TrendingUp, Headphones, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'WebByte is a digital products company building websites, SaaS, and billing software for Indian businesses. Learn our story.',
}

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="badge mx-auto mb-4">About WebByte</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            We Build Digital Products<br />
            <span className="gradient-text">That Drive Real Results</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            WebByte is a digital products company founded with one mission: to help Indian businesses go digital without overspending or waiting months for delivery.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
            <p>We started WebByte after seeing how difficult and expensive it was for small Indian businesses to get professional digital products. Agencies charged lakhs and took months. Freelancers were unreliable. Templates looked generic.</p>
            <p>So we built a better way. Fixed prices, fast delivery, and products that actually work for Indian businesses — GST-compliant billing, UPI payments, and SEO built for the Indian market.</p>
            <p>Today, we've helped 40+ businesses across India launch their digital presence and automate their operations.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-purple-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {[
              { label: 'Projects Delivered', value: '50+', icon: Award },
              { label: 'Happy Clients',       value: '40+', icon: Users },
              { label: 'Years Experience',    value: '3+',  icon: TrendingUp },
              { label: 'Support',             value: '24/7',icon: Headphones },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label}>
                <Icon className="w-8 h-8 text-purple-200 mx-auto mb-3" />
                <div className="text-4xl font-extrabold">{value}</div>
                <div className="text-purple-200 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Speed', desc: 'We deliver in days, not months. Your time is money and we respect that.' },
              { title: 'Transparency', desc: 'Fixed prices, no hidden charges, no scope creep. What you see is what you pay.' },
              { title: 'Quality', desc: 'Every product is built to the same high standard we\'d want for our own business.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
                <h3 className="text-xl font-extrabold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Ready to work with us?</h2>
          <p className="text-gray-500 mb-8">Join 40+ businesses that chose WebByte to power their digital growth.</p>
          <Link href="/order" className="btn-primary text-lg px-10 py-4">
            Place Your Order <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
