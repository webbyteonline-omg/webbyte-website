import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, ExternalLink, Star, TrendingUp, Clock, CheckCircle2,
  BarChart3, ShoppingCart, FileText, AlertCircle, Users, Package,
  Calendar, Printer, Code2, Shield
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Work — Portfolio | WebByte',
  description: 'See live websites, billing software, and SaaS products built by WebByte for Indian businesses.',
}

const projects = [
  {
    id: 1,
    name:      'RajBros Kirana — POS & Billing',
    category:  'BillPro — Billing Software',
    client:    'Rajesh Agarwal, Delhi',
    desc:      'Full-featured GST billing and inventory management system for a 3-branch kirana chain. Handles 200+ daily invoices, auto-generates GST reports, and tracks stock across all locations.',
    tags:      ['GST Billing', 'Inventory', 'Multi-branch', 'UPI Payments'],
    results:   ['80% faster invoicing', '₹2L/month in recovered dues', '3 branches synced live'],
    color:     'from-orange-500 to-red-500',
    letter:    'R',
    duration:  '5 days',
    rating:    5,
    live:      true,
  },
  {
    id: 2,
    name:      'VastraKart — Fashion E-commerce',
    category:  'Custom Website',
    client:    'Priya Mehta, Surat',
    desc:      'Custom e-commerce website for ethnic wear brand with WhatsApp ordering, Razorpay integration, size guides, and SEO-optimized product catalog. Ranks #1 on Google for local searches.',
    tags:      ['E-commerce', 'Razorpay', 'WhatsApp Integration', 'SEO'],
    results:   ['₹4.2L in first-month revenue', '2,800+ monthly visitors', 'Page 1 Google ranking'],
    color:     'from-pink-500 to-purple-600',
    letter:    'V',
    duration:  '10 days',
    rating:    5,
    live:      true,
  },
  {
    id: 3,
    name:      'TechFlow Consultancy — Corporate Site',
    category:  'Custom Website',
    client:    'Amit Singh, Pune',
    desc:      'Professional corporate website with lead capture forms, case studies, team profiles, and a blog. Integrated with Google Analytics and automated email follow-ups via form submissions.',
    tags:      ['Corporate', 'Lead Gen', 'Blog', 'Analytics'],
    results:   ['40% increase in inquiries', '5.2 min avg session time', '12 leads/month via website'],
    color:     'from-blue-500 to-cyan-500',
    letter:    'T',
    duration:  '7 days',
    rating:    5,
    live:      true,
  },
  {
    id: 4,
    name:      'InvoiceEase — Freelancer Tool',
    category:  'InvoiceX — Invoice Manager',
    client:    'Deepa Nair, Bangalore',
    desc:      'Lightweight invoice management tool for a solo CA managing 60+ clients. One-click PDF invoice generation, payment reminders, overdue tracking, and client portal for payment status.',
    tags:      ['Invoice PDF', 'Client Portal', 'Reminders', 'CA Tool'],
    results:   ['60 clients managed', '90% on-time payments', '6hrs/week saved'],
    color:     'from-green-500 to-teal-500',
    letter:    'I',
    duration:  '4 days',
    rating:    5,
    live:      true,
  },
  {
    id: 5,
    name:      'SpiceRoute Restaurant — Menu & Orders',
    category:  'Custom Website',
    client:    'Mohammed Rafi, Hyderabad',
    desc:      'Digital menu and online ordering system for a popular restaurant. QR code table ordering, kitchen dashboard, daily revenue reports, and Zomato/Swiggy-style order tracking.',
    tags:      ['QR Menu', 'Online Ordering', 'Kitchen Dashboard', 'Analytics'],
    results:   ['35% more table orders', '₹80K extra revenue/month', '4.8★ Google rating'],
    color:     'from-yellow-500 to-orange-500',
    letter:    'S',
    duration:  '12 days',
    rating:    5,
    live:      true,
  },
  {
    id: 6,
    name:      'ClearDerm Clinic — Patient Portal',
    category:  'Custom Website',
    client:    'Dr. Kavita Shah, Mumbai',
    desc:      'Medical clinic website with appointment booking, patient portal, doctor profiles, and treatment pages. HIPAA-compliant data handling, WhatsApp appointment reminders.',
    tags:      ['Appointment Booking', 'Patient Portal', 'WhatsApp', 'Medical'],
    results:   ['120+ appointments/month online', '60% fewer no-shows', '4.9★ on Google'],
    color:     'from-purple-500 to-indigo-600',
    letter:    'C',
    duration:  '14 days',
    rating:    5,
    live:      true,
  },
]

const stats = [
  { value: '50+',  label: 'Projects Delivered' },
  { value: '₹2Cr+', label: 'Revenue Generated for Clients' },
  { value: '4.9★', label: 'Average Client Rating' },
  { value: '7 days', label: 'Average Delivery Time' },
]

// ── RetailPOS Case Study Data ───────────────────────────────────────────────
const retailposMetrics = [
  { label: 'Bills Generated',           value: '138+',    sub: 'in first month' },
  { label: 'Monthly Revenue Tracked',   value: '₹7.5L+',  sub: 'via live dashboard' },
  { label: 'Products in Inventory',     value: '760+',    sub: 'with stock alerts' },
  { label: 'Time Saved',                value: '4 hrs/day', sub: 'vs manual billing' },
]

const retailposFeatures = [
  { icon: BarChart3,   title: 'Live Dashboard',           desc: 'Real-time sales, outstanding dues, payment status (Paid/Unpaid/Partial), top-selling products, and 7-day revenue chart.' },
  { icon: ShoppingCart, title: 'Smart POS Terminal',      desc: 'Create a bill in under 60 seconds. Product search, size/base variants, colorant add-ons, per-item discounts, automatic GST. MRP & DPL modes.' },
  { icon: FileText,    title: 'Bill History & Search',    desc: 'Full history with date-range, status filter, and search by customer/phone/bill no. One-click print and reprint.' },
  { icon: AlertCircle, title: 'Outstanding Tracker',      desc: 'Unpaid bills with overdue days highlighted. Quick Pay/Update flow. WhatsApp reminder integration.' },
  { icon: Users,       title: 'Customer Directory',       desc: 'Auto-saved customer profiles with full billing history, total spend, and last-visit date.' },
  { icon: Package,     title: 'Stock Management',         desc: '760+ SKUs tracked. Low-stock (< 5) and out-of-stock colour alerts. Auto-deducted on every bill.' },
  { icon: Calendar,    title: 'Day Book',                 desc: 'Daily ledger with prev/next navigation. Total sales, bills count, collected vs unpaid. One-click print.' },
  { icon: Printer,     title: 'Professional Print Bills', desc: 'Thermal & A4 ready. Business logo, GST breakdown, itemised products, payment summary.' },
]

const retailposTechStack = [
  { name: 'Next.js 15', cat: 'Frontend' }, { name: 'React 19', cat: 'Frontend' },
  { name: 'TypeScript', cat: 'Language' }, { name: 'Tailwind CSS', cat: 'Styling' },
  { name: 'Prisma ORM', cat: 'Database' }, { name: 'PostgreSQL', cat: 'Database' },
  { name: 'Supabase',   cat: 'Hosting'  }, { name: 'NextAuth.js', cat: 'Auth'    },
  { name: 'Vercel',     cat: 'Deploy'   },
]

// ── Mock UI screens (no real client data) ──────────────────────────────────

function MockDashboard() {
  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 text-xs select-none shadow-md">
      <div className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
        <span className="text-teal-600 font-bold text-sm">RetailPOS Terminal</span>
        <span className="text-gray-400 text-[10px]">Dashboard Overview</span>
      </div>
      <div className="grid grid-cols-4 gap-2 p-3">
        {[
          { label: "Today's Sales", value: '₹██,███',  color: 'text-gray-900' },
          { label: 'Monthly Sales', value: '₹█,██,███', color: 'text-gray-900' },
          { label: 'Outstanding',   value: '₹█,██,███', color: 'text-red-500'  },
          { label: 'Bills/Month',   value: '1██',        color: 'text-gray-900' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
            <p className="text-[9px] text-gray-400 mb-0.5">{s.label}</p>
            <p className={`font-bold ${s.color} text-[11px]`}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 px-3 pb-3">
        <div className="bg-white rounded-lg p-2.5 border border-gray-100 shadow-sm">
          <p className="text-[9px] text-gray-500 mb-2 font-semibold">Last 7 Days Sales</p>
          <div className="flex items-end gap-1 h-14">
            {[70,35,55,45,80,60,10].map((h,i) => (
              <div key={i} className="flex-1 rounded-t" style={{ height:`${h}%`, background:'#14b8a6' }} />
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg p-2.5 border border-gray-100 shadow-sm">
          <p className="text-[9px] text-gray-500 mb-2 font-semibold">Payment Status</p>
          {[['Paid',77,'bg-green-500'],['Unpaid',14,'bg-red-400'],['Partial',9,'bg-yellow-400']].map(([l,p,c]) => (
            <div key={l as string} className="mb-1.5">
              <div className="flex justify-between mb-0.5">
                <span className="text-[8px] text-gray-500">{l as string}</span>
                <span className="text-[8px] text-gray-400">{p as number}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full">
                <div className={`h-1.5 rounded-full ${c as string}`} style={{ width:`${p as number}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MockBilling() {
  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 text-xs select-none shadow-md">
      <div className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-teal-600 font-bold text-sm">New Bill</span>
          <span className="text-[9px] bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full border border-teal-200">HP-S-XXX</span>
        </div>
        <div className="flex gap-1.5">
          <button className="text-[9px] border border-gray-200 px-2 py-0.5 rounded text-gray-500">MRP</button>
          <button className="text-[9px] bg-teal-500 text-white px-2 py-0.5 rounded">DPL</button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2 p-3">
        <div className="col-span-3 space-y-2">
          <div className="bg-white rounded-lg p-2.5 border border-gray-100 shadow-sm">
            <p className="text-[9px] font-semibold text-gray-500 mb-1.5">Customer Details</p>
            <div className="grid grid-cols-2 gap-1">
              {['Customer Name *','Phone Number *','Address (Opt.)','Staff Name'].map(f => (
                <div key={f} className="h-5 bg-gray-50 border border-gray-200 rounded px-1.5 flex items-center">
                  <span className="text-[7px] text-gray-300">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg p-2.5 border border-gray-100 shadow-sm">
            <p className="text-[9px] font-semibold text-gray-500 mb-1.5">Products</p>
            <div className="text-[7px] text-gray-400 grid grid-cols-5 gap-1 pb-1 mb-1 border-b border-gray-100">
              <span className="col-span-2">PRODUCT</span><span>SIZE</span><span>QTY</span><span>PRICE</span>
            </div>
            <div className="grid grid-cols-5 gap-1 items-center">
              <div className="col-span-2 h-5 bg-gray-50 border border-gray-200 rounded px-1 flex items-center">
                <span className="text-[7px] text-gray-300">🔍 Search...</span>
              </div>
              <div className="h-5 bg-gray-50 border border-gray-200 rounded" />
              <div className="h-5 bg-gray-50 border border-gray-200 rounded flex items-center justify-center text-[8px] text-gray-400">1</div>
              <div className="h-5 bg-gray-50 border border-gray-200 rounded" />
            </div>
            <p className="text-[8px] text-teal-500 mt-1.5">+ Add Another Product</p>
          </div>
        </div>
        <div className="col-span-2 space-y-2">
          <div className="bg-white rounded-lg p-2.5 border border-gray-100 shadow-sm">
            <p className="text-[9px] font-semibold text-gray-500 mb-1">Global GST</p>
            <div className="flex gap-1 flex-wrap">
              {['0%','+5%','-5%','+18%'].map(g => (
                <span key={g} className="text-[7px] border border-gray-200 px-1 py-0.5 rounded text-gray-500">{g}</span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg p-2.5 border border-gray-100 shadow-sm">
            {['Subtotal','Discount','GST Total'].map(l => (
              <div key={l} className="flex justify-between mb-0.5">
                <span className="text-[8px] text-gray-400">{l}</span>
                <span className="text-[8px] text-gray-500">₹0.00</span>
              </div>
            ))}
            <div className="border-t border-gray-100 pt-1 flex justify-between mt-1">
              <span className="text-[9px] font-bold text-gray-700">GRAND TOTAL</span>
              <span className="text-[9px] font-bold text-teal-600">₹0.00</span>
            </div>
          </div>
          <button className="w-full bg-teal-500 text-white text-[9px] font-bold py-1.5 rounded-lg">🖨 Save & Print Bill</button>
        </div>
      </div>
    </div>
  )
}

function MockUnpaid() {
  const rows = [
    { name:'Customer A', bill:'HP-S-XXX', amount:'₹█,███',  days:'1 day overdue'  },
    { name:'Customer B', bill:'HP-S-XXX', amount:'₹██,███', days:'2 days overdue' },
    { name:'Customer C', bill:'HP-S-XXX', amount:'₹█,███',  days:'3 days overdue' },
    { name:'Customer D', bill:'HP-S-XXX', amount:'₹██,███', days:'4 days overdue' },
  ]
  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 text-xs select-none shadow-md">
      <div className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
        <span className="text-teal-600 font-bold text-sm">Unpaid Bills</span>
        <div className="h-5 w-36 bg-gray-100 rounded border border-gray-200 flex items-center px-2">
          <span className="text-[9px] text-gray-300">Search customer...</span>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <div className="bg-red-50 border border-red-100 rounded-lg p-2 flex items-center gap-2">
          <span className="text-base">⚠️</span>
          <div>
            <p className="text-[9px] text-gray-400">Total Outstanding</p>
            <p className="text-sm font-bold text-red-500">₹█,██,███.00</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-5 px-2.5 py-1 bg-gray-50 border-b border-gray-100 text-[8px] text-gray-400 uppercase">
            <span className="col-span-2">Customer</span><span>Amount</span><span className="col-span-1">Status</span><span>Action</span>
          </div>
          {rows.map((r,i) => (
            <div key={i} className="grid grid-cols-5 px-2.5 py-1.5 border-b border-gray-50 items-center">
              <div className="col-span-2">
                <p className="text-[9px] font-medium text-gray-700">{r.name}</p>
                <p className="text-[8px] text-gray-400">{r.bill}</p>
              </div>
              <span className="text-[9px] font-semibold text-red-500">{r.amount}</span>
              <span className="text-[7px] bg-red-50 text-red-400 px-1 py-0.5 rounded-full border border-red-100 col-span-1 whitespace-nowrap">{r.days}</span>
              <button className="text-[8px] bg-teal-500 text-white px-1.5 py-0.5 rounded">Pay</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  return (
    <div className="pt-20 pb-20 min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="badge mx-auto mb-4">Our Work</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Real Projects.<br />
            <span className="gradient-text">Real Results.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
            Every project we deliver is a growth story. Here are some of the businesses we've helped go digital and scale.
          </p>
          <Link href="/order" className="btn-primary text-base px-8 py-3">
            Start Your Project <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-purple-700 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-extrabold mb-1">{value}</div>
                <div className="text-purple-200 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Real Case Study: RetailPOS ──────────────────────────────── */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section label */}
          <div className="flex items-center gap-3 mb-10">
            <span className="bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">✦ Real Client Work</span>
            <span className="text-gray-400 text-sm">Paint & Hardware Retailer · Jharkhand, India · 2026</span>
          </div>

          {/* Hero row */}
          <div className="flex flex-col lg:flex-row gap-10 items-start mb-14">
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                Custom Retail POS &amp; Billing System
              </h2>
              <p className="text-lg text-gray-500 mb-6 max-w-2xl">
                From manual ledger books to a fully digital billing operation — delivered in <strong className="text-gray-800">12 days</strong>.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-teal-500" /> Delivered in 12 days
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
                  <Shield className="w-3.5 h-3.5 text-purple-500" /> Client name withheld by request
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:w-72 shrink-0">
              {retailposMetrics.map(m => (
                <div key={m.label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-2xl font-extrabold text-gray-900">{m.value}</p>
                  <p className="text-xs font-semibold text-gray-600 mt-0.5">{m.label}</p>
                  <p className="text-[11px] text-gray-400">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Overview */}
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-7 mb-14">
            <h3 className="text-base font-bold text-gray-900 mb-3">The Challenge</h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              A growing paint and hardware retailer was managing hundreds of bills manually using ledger books.
              Collections were hard to track, stock was a guessing game, and generating GST-compliant bills
              took 10+ minutes per customer.
            </p>
            <p className="text-gray-600 leading-relaxed">
              WebByte built a complete custom RetailPOS system — tailored for paint retail, with paint-specific
              features like colorant add-ons, MRP vs DPL pricing, and size/base product variants.
            </p>
          </div>

          {/* UI Mockup Screens */}
          <div className="mb-14">
            <h3 className="text-xl font-extrabold text-gray-900 mb-1">UI Previews</h3>
            <p className="text-gray-400 text-sm mb-8">All data shown is illustrative — real client data is private.</p>
            <div className="space-y-12">
              {/* Dashboard */}
              <div className="grid lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-3"><MockDashboard /></div>
                <div className="lg:col-span-2">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Live Dashboard</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">Sales analytics, payment status breakdown (Paid / Unpaid / Partial), top-selling products, and a 7-day revenue chart — all in real time.</p>
                </div>
              </div>
              {/* Billing */}
              <div className="grid lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-3 lg:order-2"><MockBilling /></div>
                <div className="lg:col-span-2 lg:order-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Smart POS Terminal</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">Create a bill in under 60 seconds. Product search, size/base/colorant variants, per-item discounts, automatic GST, and one-click Save &amp; Print.</p>
                </div>
              </div>
              {/* Unpaid */}
              <div className="grid lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-3"><MockUnpaid /></div>
                <div className="lg:col-span-2">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Outstanding Tracker</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">Every unpaid bill with overdue days calculated automatically. Colour-coded urgency, per-customer history, and a quick Pay/Update flow.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-14">
            <h3 className="text-xl font-extrabold text-gray-900 mb-6">What We Built</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {retailposFeatures.map(f => (
                <div key={f.title} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center mb-3">
                    <f.icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1.5">{f.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-14">
            <h3 className="text-xl font-extrabold text-gray-900 mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2.5">
              {retailposTechStack.map(t => (
                <div key={t.name} className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3.5 py-1.5 shadow-sm">
                  <Code2 className="w-3.5 h-3.5 text-purple-500" />
                  <span className="text-sm font-semibold text-gray-700">{t.name}</span>
                  <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-full">{t.cat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Quote */}
          <div className="relative rounded-2xl p-8 bg-gradient-to-br from-teal-500 to-emerald-600 overflow-hidden">
            <div className="absolute top-2 left-5 text-white/20 text-8xl font-serif leading-none select-none">"</div>
            <blockquote className="relative z-10 text-white text-xl font-semibold leading-relaxed mb-4 max-w-2xl">
              Pehle ek bill banane mein 10 minute lagte the. Ab 1 minute mein ho jaata hai aur sab kuch digital hai.
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm">S</div>
              <div>
                <p className="text-white font-semibold text-sm">Store Owner</p>
                <p className="text-white/70 text-xs">Paint &amp; Hardware Retailer, Jharkhand</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group">

                {/* Visual header */}
                <div className={`bg-gradient-to-br ${p.color} h-40 flex items-center justify-center relative`}>
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-white text-4xl font-extrabold">
                    {p.letter}
                  </div>
                  {p.live && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      Live
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {p.duration}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs text-purple-600 font-semibold mb-1">{p.category}</div>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-1">{p.name}</h3>
                  <p className="text-xs text-gray-400 mb-3">{p.client}</p>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{p.desc}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map(t => (
                      <span key={t} className="text-xs bg-gray-50 text-gray-600 border border-gray-100 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                    <p className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> Results
                    </p>
                    <ul className="space-y-1">
                      {p.results.map(r => (
                        <li key={r} className="text-xs text-green-700 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 flex-shrink-0" /> {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(p.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">Client rating</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Rajesh Agarwal', role: 'Owner, RajBros Kirana', quote: 'WebByte delivered in 5 days what I thought would take months. The billing software is exactly what my business needed.' },
              { name: 'Priya Mehta',    role: 'Founder, VastraKart',   quote: 'My website now brings 40+ orders per week. WebByte understood what I needed and delivered beyond expectations.' },
              { name: 'Amit Singh',     role: 'CEO, TechFlow',         quote: 'Professional team, clean delivery, zero hassles. Our new website has completely transformed our lead generation.' },
              { name: 'Dr. Kavita Shah', role: 'ClearDerm Clinic',    quote: 'The patient portal they built saves us 3 hours daily. Best investment I made for my clinic this year.' },
            ].map(({ name, role, quote }) => (
              <div key={name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"{quote}"</p>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{name}</div>
                  <div className="text-xs text-gray-400">{role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-purple-700">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Want results like these?</h2>
          <p className="text-purple-200 mb-8 text-lg">Join 50+ businesses that trusted WebByte to power their digital growth.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="bg-white text-purple-700 font-bold px-8 py-4 rounded-xl hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              Talk to Us First
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
