import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'WebByte Privacy Policy — how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: June 2025</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600">
          {[
            { title: '1. Information We Collect', body: 'We collect information you provide when placing orders: name, email, phone number, company name, and project requirements. We also collect payment information processed securely through Razorpay and Stripe — we never store your card details.' },
            { title: '2. How We Use Your Information', body: 'Your information is used to: process and deliver your order, send order confirmations and updates, provide customer support, and send occasional product updates (you can unsubscribe anytime).' },
            { title: '3. Data Sharing', body: 'We do not sell, trade, or transfer your personal information to third parties. We share data only with payment processors (Razorpay, Stripe) to complete transactions, and these are covered by their own privacy policies.' },
            { title: '4. Data Security', body: 'We use industry-standard encryption (SSL/TLS) for all data transmission. Our databases are secured and access is restricted to authorized personnel only.' },
            { title: '5. Cookies', body: 'We use essential cookies to maintain your session and preferences. We do not use advertising or tracking cookies.' },
            { title: '6. Your Rights', body: 'You have the right to access, correct, or delete your personal data. Contact us at hello@webbyte.online to exercise these rights.' },
            { title: '7. Contact', body: 'For privacy-related queries, email us at hello@webbyte.online. We will respond within 48 hours.' },
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
