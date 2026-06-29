import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with WebByte. We respond within 2 hours on business days.',
}

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-gradient-to-br from-purple-50 via-white to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <div className="badge mx-auto mb-4">Contact Us</div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-gray-500 text-lg">We respond to all inquiries within 2 hours on business days.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact info */}
          <div className="space-y-6">
            {[
              { icon: Mail,    label: 'Email',    value: 'hello@webbyte.online',  href: 'mailto:hello@webbyte.online' },
              { icon: Phone,   label: 'Phone',    value: '+91 98765 43210',        href: 'tel:+919876543210' },
              { icon: MapPin,  label: 'Location', value: 'India',                  href: null },
              { icon: Clock,   label: 'Hours',    value: 'Mon–Sat, 9am–7pm IST',  href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</div>
                  {href
                    ? <a href={href} className="text-lg font-semibold text-gray-900 hover:text-purple-700 transition-colors">{value}</a>
                    : <div className="text-lg font-semibold text-gray-900">{value}</div>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Quick contact form */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Send a Message</h2>
            <form action={`mailto:hello@webbyte.online`} method="post" encType="text/plain" className="space-y-4">
              <div>
                <label className="label">Your Name</label>
                <input type="text" name="name" className="input-field" placeholder="Sachin Kumar" required />
              </div>
              <div>
                <label className="label">Email</label>
                <input type="email" name="email" className="input-field" placeholder="you@example.com" required />
              </div>
              <div>
                <label className="label">Message</label>
                <textarea name="message" className="input-field resize-none" rows={4} placeholder="Tell us what you need..." required />
              </div>
              <a
                href="mailto:hello@webbyte.online?subject=Inquiry from Website"
                className="btn-primary w-full justify-center block text-center"
              >
                Send via Email
              </a>
              <p className="text-xs text-gray-400 text-center">Or WhatsApp us at +91 98765 43210 for instant response</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
