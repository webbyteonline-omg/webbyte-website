import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'WebByte Refund Policy — clear and fair refund terms for all our products.',
}

export default function RefundPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Refund Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: June 2025</p>

        <div className="space-y-8 text-gray-600">
          {[
            { title: 'Our Commitment', body: 'We want you to be completely satisfied with your purchase. If you\'re not happy with what we deliver, we\'ll make it right.' },
            { title: 'Full Refund (Within 48 Hours)', body: 'If you change your mind within 48 hours of payment AND before we have started any work on your project, you are eligible for a full refund. No questions asked.' },
            { title: 'Partial Refund (Work In Progress)', body: 'If work has already begun, a partial refund may be issued based on the percentage of work remaining. The completed portion is non-refundable.' },
            { title: 'No Refund After Delivery', body: 'Once the final product has been delivered and approved, no refund will be issued. If you find issues post-delivery, we will fix them under our free support policy.' },
            { title: 'Revision Policy', body: 'Before requesting a refund, please allow us to address your concerns through our revision process. Most issues can be resolved quickly.' },
            { title: 'How to Request', body: 'Email hello@webbyte.online with your order number and reason for refund request. We will respond within 24 hours and process eligible refunds within 5–7 business days.' },
          ].map(({ title, body }) => (
            <div key={title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-extrabold text-gray-900 mb-2">{title}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-purple-50 rounded-2xl p-8 border border-purple-100 text-center">
          <h3 className="text-xl font-extrabold text-gray-900 mb-2">Need help with an order?</h3>
          <p className="text-gray-500 mb-4">Our team responds within 2 hours on business days.</p>
          <Link href="mailto:hello@webbyte.online" className="btn-primary">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
