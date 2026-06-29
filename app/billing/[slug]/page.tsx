'use client'
import { useState } from 'react'
import Link from 'next/link'
import { use } from 'react'
import {
  LayoutDashboard, Receipt, Package, BarChart3, Settings,
  TrendingUp, TrendingDown, AlertTriangle, Plus, Search,
  ArrowRight, CheckCircle2, Bell, ChevronRight, Printer
} from 'lucide-react'
import DemoBanner from '@/components/DemoBanner'
import { billingData } from '@/lib/billing-data'

type Tab = 'dashboard' | 'billing' | 'inventory' | 'reports'

const TAB_LABELS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard',  label: 'Dashboard',  icon: LayoutDashboard },
  { id: 'billing',    label: 'New Bill',   icon: Receipt         },
  { id: 'inventory',  label: 'Inventory',  icon: Package         },
  { id: 'reports',    label: 'Reports',    icon: BarChart3       },
]

export default function BillingDemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const shop = billingData.find(b => b.slug === slug)
  const [tab,       setTab]       = useState<Tab>('dashboard')
  const [billItems, setBillItems] = useState<{ name: string; price: number; qty: number }[]>([])
  const [search,    setSearch]    = useState('')

  if (!shop) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <div className="text-5xl mb-3">🔍</div>
        <h1 className="text-xl font-extrabold text-gray-900 mb-2">Demo Not Found</h1>
        <Link href="/industries#billing" className="bg-purple-600 text-white font-bold px-5 py-2 rounded-xl text-sm mt-3">← Back</Link>
      </div>
    )
  }

  const filteredProducts = shop.products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  )
  const billTotal   = billItems.reduce((s, i) => s + i.price * i.qty, 0)
  const gstAmt      = Math.round(billTotal * 0.05)
  const grandTotal  = billTotal + gstAmt

  const addToBill = (p: { name: string; price: number }) => {
    setBillItems(prev => {
      const existing = prev.find(i => i.name === p.name)
      if (existing) return prev.map(i => i.name === p.name ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { name: p.name, price: p.price, qty: 1 }]
    })
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <DemoBanner industry={shop.name} price={shop.price} type="billing" />

      {/* ── App shell ── */}
      <div className="flex flex-1 overflow-hidden mt-9">

        {/* Sidebar */}
        <aside className="w-52 bg-gray-900 text-white flex flex-col shrink-0">
          {/* Logo */}
          <div className="px-4 py-4 border-b border-gray-700">
            <div className="font-extrabold text-white text-sm">{shop.shopName}</div>
            <div className="text-gray-400 text-xs mt-0.5">{shop.shopSub}</div>
          </div>

          {/* Nav */}
          <nav className="flex-1 py-3 px-2 space-y-0.5">
            {TAB_LABELS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  tab === id ? `${shop.accentBg} text-white` : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </button>
            ))}
            <div className="pt-2 border-t border-gray-700 mt-2">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-800 hover:text-gray-300 transition-colors text-left">
                <Settings className="w-4 h-4" /> Settings
              </button>
            </div>
          </nav>

          {/* Plan badge */}
          <div className="px-4 py-3 border-t border-gray-700">
            <div className={`${shop.accentBg} rounded-lg p-2.5 text-center`}>
              <div className="text-white text-xs font-bold">WebByte Billing</div>
              <div className="text-white/70 text-xs mt-0.5">{shop.price}</div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">

          {/* ── DASHBOARD ── */}
          {tab === 'dashboard' && (
            <div className="p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h1 className="text-lg font-extrabold text-gray-900">Dashboard</h1>
                  <p className="text-xs text-gray-500">Today — {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setTab('billing')} className={`${shop.accentBg} ${shop.accentHover} text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors`}>
                    <Plus className="w-3.5 h-3.5" /> New Bill
                  </button>
                  <button className="bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-2 rounded-lg flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                {shop.stats.map(s => (
                  <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                    <div className="text-xl font-extrabold text-gray-900 mb-1">{s.value}</div>
                    <div className={`flex items-center gap-1 text-xs font-medium ${s.up ? 'text-green-600' : 'text-red-500'}`}>
                      {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {s.sub}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-4">
                {/* Recent bills */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                    <h2 className="font-bold text-sm text-gray-900">Recent Bills</h2>
                    <button onClick={() => setTab('billing')} className={`text-xs font-semibold ${shop.accentText} flex items-center gap-1`}>
                      New Bill <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {shop.recentBills.map(b => (
                      <div key={b.no} className="flex items-center px-4 py-2.5 gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-gray-900 truncate">{b.customer}</div>
                          <div className="text-xs text-gray-400">{b.no} · {b.items} items · {b.time}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm font-extrabold text-gray-900">{b.amount}</div>
                          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                            b.status === 'Paid'    ? 'bg-green-50 text-green-700' :
                            b.status === 'Credit'  ? 'bg-orange-50 text-orange-600' :
                            'bg-yellow-50 text-yellow-600'
                          }`}>{b.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Low stock + features */}
                <div className="space-y-3">
                  <div className="bg-white rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-50">
                      <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
                      <h2 className="font-bold text-sm text-gray-900">Low Stock Alert</h2>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {shop.products.filter(p => p.lowStock).slice(0, 3).map(p => (
                        <div key={p.name} className="px-4 py-2.5">
                          <div className="text-xs font-semibold text-gray-800 truncate">{p.name}</div>
                          <div className="text-xs text-orange-500 font-medium">{p.stock} {p.unit} left</div>
                        </div>
                      ))}
                      {shop.products.filter(p => p.lowStock).length === 0 && (
                        <div className="px-4 py-3 text-xs text-gray-400">All items well-stocked ✓</div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <h2 className="font-bold text-sm text-gray-900 mb-3">Key Features</h2>
                    <div className="space-y-2">
                      {shop.features.map(f => (
                        <div key={f.title} className="flex items-start gap-2">
                          <span className="text-base shrink-0">{f.icon}</span>
                          <div>
                            <div className="text-xs font-semibold text-gray-800">{f.title}</div>
                            <div className="text-xs text-gray-500 leading-relaxed">{f.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── NEW BILL ── */}
          {tab === 'billing' && (
            <div className="p-5 h-full">
              <h1 className="text-lg font-extrabold text-gray-900 mb-4">New Bill</h1>
              <div className="grid lg:grid-cols-5 gap-4 h-[calc(100%-3rem)]">
                {/* Product list */}
                <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 flex flex-col">
                  <div className="p-3 border-b border-gray-100">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:border-purple-400"
                        placeholder="Search products…"
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto flex-1">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="text-left px-3 py-2 text-gray-500 font-semibold">Product</th>
                          <th className="text-right px-3 py-2 text-gray-500 font-semibold">Price</th>
                          <th className="text-right px-3 py-2 text-gray-500 font-semibold">Stock</th>
                          <th className="px-2 py-2"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filteredProducts.map(p => (
                          <tr key={p.name} className="hover:bg-gray-50 transition-colors">
                            <td className="px-3 py-2">
                              <div className="font-semibold text-gray-800 truncate max-w-[180px]">{p.name}</div>
                              <div className="text-gray-400">{p.category} · {p.unit}</div>
                            </td>
                            <td className="px-3 py-2 text-right font-bold text-gray-900">₹{p.price}</td>
                            <td className={`px-3 py-2 text-right font-medium ${p.lowStock ? 'text-orange-500' : 'text-gray-500'}`}>
                              {p.stock} {p.unit}
                            </td>
                            <td className="px-2 py-2">
                              <button
                                onClick={() => addToBill(p)}
                                className={`${shop.accentBg} text-white rounded-lg px-2 py-1 text-xs font-bold hover:opacity-90 transition-opacity`}
                              >
                                Add
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Bill summary */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 flex flex-col">
                  <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-bold text-sm text-gray-900">Current Bill</h2>
                    <div className="text-xs text-gray-400">#{Math.floor(Math.random() * 9000 + 1000)}</div>
                  </div>

                  {/* Customer */}
                  <div className="p-3 border-b border-gray-100">
                    <input className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-purple-400" placeholder="Customer name (optional)" readOnly />
                  </div>

                  {/* Items */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {billItems.length === 0 && (
                      <div className="text-center py-8 text-gray-400 text-xs">Add products from the left →</div>
                    )}
                    {billItems.map(item => (
                      <div key={item.name} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-gray-800 truncate">{item.name}</div>
                          <div className="text-xs text-gray-500">₹{item.price} × {item.qty}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => setBillItems(p => p.map(i => i.name === item.name ? { ...i, qty: Math.max(1, i.qty - 1) } : i))}
                            className="w-5 h-5 bg-gray-200 rounded text-gray-700 text-xs font-bold flex items-center justify-center">−</button>
                          <span className="text-xs font-bold w-5 text-center">{item.qty}</span>
                          <button onClick={() => setBillItems(p => p.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i))}
                            className={`w-5 h-5 ${shop.accentBg} rounded text-white text-xs font-bold flex items-center justify-center`}>+</button>
                        </div>
                        <div className="text-xs font-extrabold text-gray-900 w-14 text-right">₹{item.price * item.qty}</div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="p-3 border-t border-gray-100 space-y-1.5">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Subtotal</span><span>₹{billTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>GST (5%)</span><span>₹{gstAmt.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold text-gray-900 border-t border-gray-200 pt-1.5">
                      <span>Grand Total</span><span>₹{grandTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button className="flex items-center justify-center gap-1 border border-gray-200 text-gray-700 text-xs font-bold py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <Printer className="w-3 h-3" /> Print
                      </button>
                      <button className={`${shop.accentBg} ${shop.accentHover} text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors`}>
                        Save Bill ✓
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── INVENTORY ── */}
          {tab === 'inventory' && (
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg font-extrabold text-gray-900">Inventory</h1>
                <div className="flex items-center gap-2">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-xs text-orange-600 font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {shop.products.filter(p => p.lowStock).length} items low
                  </div>
                  <button className={`${shop.accentBg} text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5`}>
                    <Plus className="w-3.5 h-3.5" /> Add Item
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Product Name', 'Category', 'Price', 'Stock', 'Unit', 'Status'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-gray-500 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {shop.products.map(p => (
                      <tr key={p.name} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-gray-900">{p.name}</td>
                        <td className="px-4 py-3 text-gray-500">{p.category}</td>
                        <td className="px-4 py-3 font-bold text-gray-900">₹{p.price}</td>
                        <td className={`px-4 py-3 font-bold ${p.lowStock ? 'text-orange-500' : 'text-gray-900'}`}>{p.stock}</td>
                        <td className="px-4 py-3 text-gray-500">{p.unit}</td>
                        <td className="px-4 py-3">
                          {p.lowStock
                            ? <span className="bg-orange-50 text-orange-600 font-semibold px-2 py-0.5 rounded-full">Low Stock</span>
                            : <span className="bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-full">OK</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── REPORTS ── */}
          {tab === 'reports' && (
            <div className="p-5">
              <h1 className="text-lg font-extrabold text-gray-900 mb-4">Reports</h1>

              {/* Quick stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                {[
                  { label: 'This Month Sales', value: '₹3,84,200', sub: 'vs ₹3,52,000 last month' },
                  { label: 'Total Bills',       value: '1,248',     sub: 'Monthly bills issued' },
                  { label: 'GST Payable',       value: '₹19,210',   sub: 'GSTR-1 due in 12 days' },
                  { label: 'Net Profit',        value: '₹58,430',   sub: '~15.2% margin this month' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                    <div className="text-lg font-extrabold text-gray-900 mb-0.5">{s.value}</div>
                    <div className="text-xs text-gray-400">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Sales bar chart — CSS only */}
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <h2 className="font-bold text-sm text-gray-900 mb-4">Daily Sales — This Week</h2>
                  <div className="flex items-end gap-2 h-28">
                    {[
                      { day: 'Mon', val: 62 }, { day: 'Tue', val: 78 }, { day: 'Wed', val: 55 },
                      { day: 'Thu', val: 85 }, { day: 'Fri', val: 92 }, { day: 'Sat', val: 100 }, { day: 'Sun', val: 43 },
                    ].map(d => (
                      <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className={`w-full rounded-t-md ${shop.accentBg} opacity-80`}
                          style={{ height: `${d.val}%` }}
                        />
                        <div className="text-xs text-gray-500">{d.day}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* GST summary */}
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <h2 className="font-bold text-sm text-gray-900 mb-4">GST Summary</h2>
                  <div className="space-y-3">
                    {[
                      { label: 'Total Taxable Sales', value: '₹3,84,200', note: 'This month' },
                      { label: 'CGST Collected',       value: '₹9,605',   note: '2.5%' },
                      { label: 'SGST Collected',       value: '₹9,605',   note: '2.5%' },
                      { label: 'Total GST Payable',    value: '₹19,210',  note: 'Due by 11th' },
                    ].map(r => (
                      <div key={r.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div>
                          <div className="text-xs font-semibold text-gray-700">{r.label}</div>
                          <div className="text-xs text-gray-400">{r.note}</div>
                        </div>
                        <div className="text-sm font-extrabold text-gray-900">{r.value}</div>
                      </div>
                    ))}
                  </div>
                  <button className={`w-full mt-3 ${shop.accentBg} text-white text-xs font-bold py-2 rounded-lg`}>
                    Export GSTR-1 →
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="bg-purple-700 text-white px-5 py-3 flex items-center justify-between shrink-0">
        <div className="text-sm font-semibold">
          🚀 Get <span className="font-extrabold">{shop.name} Billing Software</span> for your business — {shop.price}
        </div>
        <a href="/order" target="_top" className="bg-white text-purple-700 font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-purple-50 transition-colors">
          Order Now <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}
