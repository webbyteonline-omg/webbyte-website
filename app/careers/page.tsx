import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock, Briefcase } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers at WebByte',
  description: 'Join the WebByte team. We\'re building digital products for Indian businesses. See open roles.',
}

const openings = [
  {
    title: 'Full Stack Developer',
    type: 'Full-time',
    location: 'Remote (India)',
    desc: 'Build and maintain Next.js + Supabase applications. Strong TypeScript and React skills required.',
  },
  {
    title: 'UI/UX Designer',
    type: 'Full-time',
    location: 'Remote (India)',
    desc: 'Design clean, conversion-focused interfaces for our web products. Figma proficiency required.',
  },
  {
    title: 'Business Development Executive',
    type: 'Full-time',
    location: 'Remote (India)',
    desc: 'Drive outreach and sales for WebByte products to SMBs across India. Strong communication skills essential.',
  },
]

export default function CareersPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="badge mx-auto mb-4">We're Hiring</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Build the Future of<br />
            <span className="gradient-text">Digital India With Us</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            We're a small, focused team building real products that help Indian businesses thrive online. If that excites you, we'd love to meet you.
          </p>
        </div>
      </section>

      {/* Culture */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">Why Work at WebByte?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: 'Remote-first',     desc: 'Work from anywhere in India. We care about output, not hours at a desk.' },
              { title: 'Real ownership',    desc: 'Small team means big impact. Your work ships to real customers fast.' },
              { title: 'Growth culture',   desc: 'We invest in learning. Books, courses, and conferences — on us.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="font-extrabold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Open Positions</h2>
          <div className="space-y-4">
            {openings.map(({ title, type, location, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:border-purple-300 transition-all">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-lg font-extrabold text-gray-900 mb-1">{title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" />{type}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{location}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{desc}</p>
                  </div>
                  <a
                    href={`mailto:hello@webbyte.online?subject=Application: ${encodeURIComponent(title)}`}
                    className="btn-primary whitespace-nowrap"
                  >
                    Apply <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-purple-50 rounded-2xl p-8 border border-purple-100 text-center">
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Don't see your role?</h3>
            <p className="text-gray-500 mb-5">We're always open to exceptional talent. Send us your CV and tell us how you'd contribute.</p>
            <a href="mailto:hello@webbyte.online?subject=Open Application — WebByte" className="btn-primary">
              Send Open Application <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
