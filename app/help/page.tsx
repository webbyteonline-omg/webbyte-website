import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle, Mail, Phone, ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Help Center',
  description: 'Get answers to common questions about WebByte products and services.',
}

const faqs = [
  {
    q: 'How long does it take to deliver my order?',
    a: 'BillPro and InvoiceX are delivered within 3–5 business days. Custom websites typically take 7–14 business days depending on complexity. You\'ll receive updates via email throughout the process.',
  },
  {
    q: 'Can I request changes after delivery?',
    a: 'Yes. Each product includes a set number of revision rounds (specified on the product page). Additional revisions are available at ₹999 per round.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept UPI, credit/debit cards, netbanking, and EMI via Razorpay (India). International payments are supported via Stripe.',
  },
  {
    q: 'Is my payment secure?',
    a: 'Yes. All payments are processed by Razorpay and Stripe — both PCI-DSS compliant gateways. We never store your card details on our servers.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Full refunds are available within 48 hours of payment if work hasn\'t started. Partial refunds apply for work in progress. See our Refund Policy for full details.',
  },
  {
    q: 'Do I own the source code?',
    a: 'Yes. Upon full payment, you receive complete ownership of all delivered code and assets.',
  },
  {
    q: 'How do I track my order?',
    a: 'Log in to your dashboard to view real-time status updates for all your orders. You\'ll also receive email notifications at each stage.',
  },
  {
    q: 'What if I need something custom not listed on your products page?',
    a: 'Select "Custom / Enterprise Quote" when placing your order and describe your requirements. We\'ll send you a tailored quote within 24 hours.',
  },
]

export default function HelpPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="badge mx-auto mb-4">Help Center</div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">How can we help?</h1>
          <p className="text-gray-500 text-lg">Find answers to common questions, or reach out to our team directly.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-gray-900 hover:text-purple-700 transition-colors">
                  {q}
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact options */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">Still need help?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Mail,          label: 'Email Us',      desc: 'hello@webbyte.online',   href: 'mailto:hello@webbyte.online' },
              { icon: Phone,         label: 'Call Us',       desc: '+91 98765 43210',        href: 'tel:+919876543210' },
              { icon: MessageCircle, label: 'Live Chat',     desc: 'Mon–Sat, 9am–7pm IST',  href: '/contact' },
            ].map(({ icon: Icon, label, desc, href }) => (
              <a key={label} href={href}
                className="bg-white rounded-2xl p-6 border border-purple-100 text-center hover:border-purple-400 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-700 transition-colors">
                  <Icon className="w-6 h-6 text-purple-700 group-hover:text-white transition-colors" />
                </div>
                <div className="font-bold text-gray-900 mb-1">{label}</div>
                <div className="text-sm text-gray-500">{desc}</div>
              </a>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">
            Average response time: <span className="font-semibold text-gray-600">under 2 hours</span> on business days.
          </p>
        </div>
      </section>

    </div>
  )
}
