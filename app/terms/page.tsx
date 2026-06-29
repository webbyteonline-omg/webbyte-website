import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'WebByte Terms of Service — rules and conditions for using our services.',
}

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: June 2025</p>

        <div className="space-y-8 text-gray-600">
          {[
            { title: '1. Services', body: 'WebByte provides digital products including billing software, invoice management tools, and custom website development. All products are delivered as described on our Products page.' },
            { title: '2. Payment', body: 'Full payment is required before project commencement. Prices are fixed as listed. We accept payments via Razorpay (UPI, cards, netbanking) and Stripe (international cards).' },
            { title: '3. Delivery', body: 'Delivery timelines are estimates and begin from the date of full payment and receipt of all required information from the client. Delays caused by client-side information gaps are not our responsibility.' },
            { title: '4. Revisions', body: 'Each product includes the number of revision rounds specified on the product page. Additional revisions may be charged at ₹999 per round.' },
            { title: '5. Intellectual Property', body: 'Upon full payment, you receive full ownership and rights to the delivered product, including source code. WebByte retains the right to showcase the work in our portfolio unless otherwise agreed.' },
            { title: '6. Support', body: 'Free support is provided for the duration specified per product. Support covers bug fixes and usage questions — not new features or modifications.' },
            { title: '7. Limitation of Liability', body: 'WebByte is not liable for any indirect, incidental, or consequential damages arising from use of our products. Our maximum liability is limited to the amount paid for the specific product.' },
            { title: '8. Governing Law', body: 'These terms are governed by the laws of India. Any disputes will be resolved in courts of jurisdiction in India.' },
            { title: '9. Contact', body: 'Questions about these terms? Email hello@webbyte.online' },
          ].map(({ title, body }) => (
            <div key={title}>
              <h2 className="text-xl font-extrabold text-gray-900 mb-3">{title}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
