import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight, FileText, BarChart3, Globe, Zap, Shield, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Products & Pricing',
  description: 'Explore WebByte\'s products: BillPro billing software, InvoiceX invoice manager, and custom website development. Transparent pricing, fast delivery.',
}

const products = [
  {
    id: 'billpro',
    icon: FileText,
    name: 'BillPro',
    tagline: 'Complete Billing Software',
    description: 'A powerful, GST-ready billing solution built for retail shops, wholesalers, and service businesses across India. Manage inventory, customers, and finances in one place.',
    price: 4999,
    originalPrice: 8999,
    badge: '🔥 Bestseller',
    color: 'purple',
    features: [
      'GST billing & invoicing (CGST, SGST, IGST)',
      'Inventory management with low-stock alerts',
      'Customer & vendor management',
      'Multiple payment modes (cash, card, UPI)',
      'Daily, weekly, monthly sales reports',
      'Multi-user access with role permissions',
      'Data backup & export to Excel/PDF',
      'Barcode scanner support',
      'Purchase order management',
      'Profit & loss statements',
    ],
    deliveryDays: 10,
    platforms: ['Windows', 'Web Browser'],
    support: '1 Year Free Support',
  },
  {
    id: 'invoicex',
    icon: BarChart3,
    name: 'InvoiceX',
    tagline: 'Smart Invoice Manager',
    description: 'Create professional invoices, track payments, and automate follow-ups. Built for freelancers, consultants, and small businesses who need a clean and simple invoicing tool.',
    price: 2999,
    originalPrice: 5999,
    badge: '⭐ Popular',
    color: 'blue',
    features: [
      'Professional invoice templates',
      'Automatic payment reminders via WhatsApp/Email',
      'Payment tracking & status dashboard',
      'PDF export with your logo & branding',
      'GST-compliant invoices',
      'Client management portal',
      'Recurring invoice automation',
      'Payment link generation',
      'Multi-currency support',
      'Tax calculation (GST / TDS)',
    ],
    deliveryDays: 7,
    platforms: ['Web Browser', 'Mobile PWA'],
    support: '6 Months Free Support',
  },
  {
    id: 'website',
    icon: Globe,
    name: 'Custom Website',
    tagline: 'Professional Business Website',
    description: 'A fully custom, SEO-optimized website tailored to your brand. Responsive design, fast loading, and built to convert visitors into customers. Perfect for any business.',
    price: 9999,
    originalPrice: 18999,
    badge: '✨ Custom',
    color: 'green',
    features: [
      'Fully custom design (no templates)',
      'Mobile-responsive on all devices',
      'SEO-optimized structure & metadata',
      'Google PageSpeed 90+ score',
      'Contact forms & WhatsApp integration',
      'Google Analytics & Search Console setup',
      'SSL certificate & security setup',
      'Up to 8 pages',
      '1 year free hosting guidance',
      '3 rounds of revisions included',
    ],
    deliveryDays: 14,
    platforms: ['All Browsers', 'Mobile'],
    support: '3 Months Free Support',
  },
]

const comparisons = [
  { feature: 'GST Billing', billpro: true, invoicex: true, website: false },
  { feature: 'Inventory Management', billpro: true, invoicex: false, website: false },
  { feature: 'Invoice Creation', billpro: true, invoicex: true, website: false },
  { feature: 'Payment Reminders', billpro: false, invoicex: true, website: false },
  { feature: 'SEO Optimization', billpro: false, invoicex: false, website: true },
  { feature: 'Customer-Facing Website', billpro: false, invoicex: false, website: true },
  { feature: 'Multi-User Access', billpro: true, invoicex: false, website: false },
  { feature: 'Reports & Analytics', billpro: true, invoicex: true, website: true },
]

export default function ProductsPage() {
  return (
    <div className="pt-16 overflow-x-hidden">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="badge mx-auto mb-4">Transparent Pricing</div>
          <h1 className="section-title mb-4">Our Products & Pricing</h1>
          <p className="section-subtitle mx-auto">
            No hidden charges. No subscriptions. Pay once, own forever.
            All products include free support and delivery.
          </p>
        </div>
      </section>

      {/* Product Cards */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {products.map((product, i) => (
            <div
              key={product.id}
              id={product.id}
              className={`grid lg:grid-cols-2 gap-12 items-start ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
            >
              {/* Info */}
              <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                <span className="badge mb-4 text-sm">{product.badge}</span>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <product.icon className="w-8 h-8 text-purple-700" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">{product.tagline}</p>
                    <h2 className="text-3xl font-extrabold text-gray-900">{product.name}</h2>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed mb-8">{product.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {product.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-purple-500" />
                    Delivery in {product.deliveryDays} days
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-purple-500" />
                    {product.support}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-purple-500" />
                    {product.platforms.join(' · ')}
                  </div>
                </div>
              </div>

              {/* Pricing card */}
              <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <div className="card p-8 border-2 border-purple-200 sticky top-24">
                  <div className="text-center mb-8">
                    <div className="text-sm text-gray-400 line-through mb-1">₹{product.originalPrice.toLocaleString('en-IN')}</div>
                    <div className="text-5xl font-extrabold text-gray-900 mb-1">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm text-gray-500">One-time payment • No subscription</div>
                    <div className="mt-3 inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({Math.round((1 - product.price / product.originalPrice) * 100)}% OFF)
                    </div>
                  </div>

                  <Link
                    href={`/order?product=${product.id}`}
                    className="btn-primary w-full justify-center text-base py-4 mb-4"
                  >
                    Order {product.name} <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/order" className="btn-secondary w-full justify-center text-sm py-3 mb-6">
                    Get a Custom Quote
                  </Link>

                  <div className="space-y-3 text-sm">
                    {[
                      '✅ Source code included',
                      '✅ Lifetime license',
                      '✅ Free installation & setup',
                      '✅ Training & documentation',
                      '✅ Razorpay / Stripe / UPI payment accepted',
                    ].map((item) => (
                      <div key={item} className="text-gray-600">{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Compare Products</h2>
            <p className="section-subtitle mx-auto">Not sure which to pick? Here's a quick comparison.</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-4 bg-purple-700 text-white text-sm font-semibold">
              <div className="px-6 py-4">Feature</div>
              <div className="px-6 py-4 text-center">BillPro</div>
              <div className="px-6 py-4 text-center">InvoiceX</div>
              <div className="px-6 py-4 text-center">Website</div>
            </div>
            {comparisons.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 text-sm border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <div className="px-6 py-4 text-gray-700 font-medium">{row.feature}</div>
                {(['billpro', 'invoicex', 'website'] as const).map((col) => (
                  <div key={col} className="px-6 py-4 text-center">
                    {row[col] ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-cta-gradient px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-extrabold mb-4">Still Have Questions?</h2>
          <p className="text-purple-200 text-lg mb-8">
            We offer custom quotes for enterprise needs. Reach out and we'll get back within 2 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/order" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-bold rounded-xl hover:bg-purple-50 transition-colors">
              Place Order <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="mailto:hello@webbyte.online" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/20">
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
