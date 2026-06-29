import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ShoppingCart, Star, CheckCircle2, Truck, Shield, RefreshCw, Tag } from 'lucide-react'
import DemoBanner from '@/components/DemoBanner'

export const metadata: Metadata = {
  title: 'E-commerce Store Website Demo | WebByte',
  description: 'See how your online store will look — products, cart, Razorpay checkout, and order tracking.',
}

const products = [
  { name: 'Cotton Kurti Set',      price: '₹799',  old: '₹1,499', rating: 4.8, reviews: 234, badge: '🔥 Bestseller', emoji: '👗' },
  { name: 'Silk Saree',            price: '₹2,499', old: '₹4,999', rating: 4.9, reviews: 156, badge: '⭐ Top Rated',  emoji: '🥻' },
  { name: 'Embroidered Dupatta',   price: '₹349',  old: '₹699',   rating: 4.7, reviews: 89,  badge: null,           emoji: '🧣' },
  { name: 'Anarkali Suit',         price: '₹1,299', old: '₹2,499', rating: 4.8, reviews: 178, badge: '💥 Sale',      emoji: '👘' },
]

export default function EcommerceDemo() {
  return (
    <div className="min-h-screen bg-white">
      <DemoBanner industry="E-commerce Store" price="₹9,999" />

      <nav className="sticky top-9 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-lg">🛒</div>
            <div>
              <div className="font-extrabold text-gray-900 text-base">Vastra Boutique</div>
              <div className="text-xs text-gray-400">Premium Ethnic Wear Online</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#products" className="hover:text-purple-600">Shop</a>
            <a href="#features" className="hover:text-purple-600">Why Us</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">3</div>
            </div>
            <a href="#products" className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">Shop Now</a>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-700 text-white py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            <Tag className="w-4 h-4" /> Up to 50% off on selected items
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-5">Shop the<br />Latest Styles</h1>
          <p className="text-purple-100 text-xl max-w-xl mx-auto mb-10">Premium ethnic wear. Authentic fabrics. Delivered across India in 3–5 days. Free returns.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#products" className="bg-white text-purple-700 font-bold px-8 py-3 rounded-xl hover:bg-purple-50 transition-colors">Shop Now</a>
            <a href="#products" className="border-2 border-white/40 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">New Arrivals</a>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[['500+','Products'], ['10K+','Happy Buyers'], ['4.8★','Rating']].map(([v,l]) => (
              <div key={l}><div className="text-3xl font-extrabold">{v}</div><div className="text-purple-200 text-sm">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section id="features" className="py-8 bg-purple-50 border-b border-purple-100">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Truck,     label: 'Free Delivery',      sub: 'on orders ₹499+' },
            { icon: RefreshCw, label: 'Easy Returns',       sub: '7-day return policy' },
            { icon: Shield,    label: 'Secure Payments',    sub: 'Razorpay protected' },
            { icon: Star,      label: '100% Authentic',     sub: 'Quality guaranteed' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-purple-100">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">{label}</div>
                <div className="text-xs text-gray-400">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">Bestsellers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden group">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 h-40 flex items-center justify-center text-6xl relative">
                  {p.emoji}
                  {p.badge && <span className="absolute top-2 left-2 bg-purple-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">{p.badge}</span>}
                </div>
                <div className="p-4">
                  <h3 className="font-extrabold text-gray-900 text-sm mb-1">{p.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-gray-600">{p.rating} ({p.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-extrabold text-purple-700">{p.price}</span>
                    <span className="text-xs text-gray-400 line-through">{p.old}</span>
                  </div>
                  <button className="w-full bg-purple-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-1">
                    <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout flow preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Seamless Checkout Experience</h2>
          <p className="text-gray-500 mb-10 text-sm">UPI · Credit/Debit Card · Net Banking · Wallets — all powered by Razorpay</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[['🛒','Add to Cart'], ['📋','Enter Address'], ['💳','Pay via Razorpay'], ['📦','Order Confirmed'], ['🚚','Track Delivery']].map(([e, l], i, arr) => (
              <div key={l} className="flex items-center gap-3">
                <div className="text-center">
                  <div className="w-14 h-14 bg-white rounded-2xl border border-purple-100 flex items-center justify-center text-2xl mx-auto mb-1 shadow-sm">{e}</div>
                  <div className="text-xs font-semibold text-gray-700">{l}</div>
                </div>
                {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-purple-400 flex-shrink-0 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-white text-center">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Want This for Your Online Store?</h2>
        <p className="text-gray-500 mb-6 text-sm">Product listings · Cart · Razorpay checkout · Order tracking · Returns management</p>
        <Link href="/order" className="btn-primary">Get My E-commerce Store — ₹9,999 <ArrowRight className="w-4 h-4" /></Link>
      </section>
    </div>
  )
}
