import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog — Tips, Guides & Insights',
  description: 'Expert tips on website development, billing software, digital marketing, and growing your business online. Free guides from the WebByte team.',
}

const posts = [
  {
    slug:    'why-your-business-needs-a-website-in-2025',
    title:   'Why Every Indian Business Needs a Website in 2025',
    excerpt: 'Over 70% of Indian consumers research online before buying. If your business isn\'t online, you\'re invisible to them. Here\'s why a website is no longer optional.',
    cover:   'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    tags:    ['Website', 'Digital Marketing'],
    date:    '2025-06-15',
    readTime: '5 min',
    featured: true,
  },
  {
    slug:    'gst-billing-software-guide',
    title:   'Complete Guide to GST Billing Software for Small Businesses',
    excerpt: 'GST compliance can be complex. The right billing software automates CGST, SGST, and IGST calculations so you focus on growing your business, not paperwork.',
    cover:   'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    tags:    ['Billing', 'GST', 'Software'],
    date:    '2025-06-01',
    readTime: '7 min',
    featured: false,
  },
  {
    slug:    'how-to-rank-on-google-local-seo',
    title:   'How to Rank Your Business on Google in 2025 (Local SEO)',
    excerpt: 'Local SEO is the most cost-effective way to get customers from Google. We break down exactly what to do to appear in the top 3 local results.',
    cover:   'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80',
    tags:    ['SEO', 'Digital Marketing'],
    date:    '2025-05-20',
    readTime: '8 min',
    featured: false,
  },
  {
    slug:    'invoice-management-best-practices',
    title:   'Invoice Management Best Practices to Get Paid Faster',
    excerpt: 'Late payments kill cash flow. These invoice management strategies — automated reminders, payment links, and clear terms — help you get paid on time, every time.',
    cover:   'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80',
    tags:    ['Invoicing', 'Finance'],
    date:    '2025-05-05',
    readTime: '6 min',
    featured: false,
  },
  {
    slug:    'website-speed-optimization-guide',
    title:   'How Website Speed Affects Your Sales (And How to Fix It)',
    excerpt: 'A 1-second delay in page load time can reduce conversions by 7%. Here\'s how to audit your website speed and optimize it for maximum performance.',
    cover:   'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    tags:    ['Website', 'Performance'],
    date:    '2025-04-18',
    readTime: '6 min',
    featured: false,
  },
  {
    slug:    'razorpay-vs-stripe-india',
    title:   'Razorpay vs Stripe for Indian Businesses — Which to Choose?',
    excerpt: 'Both are excellent payment gateways, but one is clearly better for Indian customers. We compare fees, features, and integration difficulty to help you decide.',
    cover:   'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    tags:    ['Payments', 'Tech'],
    date:    '2025-04-02',
    readTime: '5 min',
    featured: false,
  },
]

export default function BlogPage() {
  const [featured, ...rest] = posts

  return (
    <div className="pt-16 overflow-x-hidden">
      {/* Header */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="badge mx-auto mb-4">WebByte Blog</div>
          <h1 className="section-title mb-4">Tips, Guides & Insights</h1>
          <p className="section-subtitle mx-auto">
            Expert advice on websites, billing software, SEO, and growing your business online — all free.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Featured post */}
        <div className="mb-16">
          <Link href={`/blog/${featured.slug}`} className="group">
            <div className="grid lg:grid-cols-2 gap-8 card overflow-hidden hover:border-purple-200 transition-colors">
              <div className="aspect-video lg:aspect-auto overflow-hidden">
                <img
                  src={featured.cover}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge text-xs">✨ Featured</span>
                  {featured.tags.map(t => (
                    <span key={t} className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(featured.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime} read</span>
                </div>
                <div className="mt-6 flex items-center gap-1 text-purple-700 text-sm font-semibold group-hover:gap-2 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group card overflow-hidden hover:border-purple-200 transition-colors">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.cover}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {post.tags.map(t => (
                    <span key={t} className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-medium">{t}</span>
                  ))}
                </div>
                <h2 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-purple-700 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-20 bg-cta-gradient rounded-3xl p-12 text-center text-white">
          <h2 className="text-2xl font-extrabold mb-3">Get the Latest Tips in Your Inbox</h2>
          <p className="text-purple-200 mb-6">Join 500+ business owners who get weekly digital growth tips from WebByte.</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
            <button className="px-6 py-3 bg-white text-purple-700 font-bold rounded-xl hover:bg-purple-50 transition-colors flex-shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
