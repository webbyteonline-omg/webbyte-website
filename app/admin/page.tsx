'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  Package, Users, TrendingUp, DollarSign,
  Loader2, CheckCircle2, Clock, RefreshCw,
  XCircle, AlertCircle, Filter
} from 'lucide-react'

type Order = {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  productName: string
  productPrice: number
  status: string
  paymentStatus: string
  requirements: string
  createdAt: string
  paymentMethod: string
}

const STATUS_OPTIONS = ['PENDING','CONFIRMED','IN_PROGRESS','COMPLETED','CANCELLED']
const STATUS_STYLES: Record<string, string> = {
  PENDING:     'bg-yellow-100 text-yellow-700',
  CONFIRMED:   'bg-blue-100 text-blue-700',
  IN_PROGRESS: 'bg-purple-100 text-purple-700',
  COMPLETED:   'bg-green-100 text-green-700',
  CANCELLED:   'bg-red-100 text-red-700',
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders]     = useState<Order[]>([])
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState('ALL')
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (status === 'authenticated' && (session?.user as any)?.role !== 'ADMIN') {
      router.push('/dashboard')
    }
  }, [status, session, router])

  const fetchOrders = async () => {
    const res  = await fetch('/api/orders')
    const json = await res.json()
    setOrders(json.orders || [])
    setLoading(false)
  }

  useEffect(() => {
    if (status === 'authenticated') fetchOrders()
  }, [status])

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdating(orderId)
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    await fetchOrders()
    setUpdating(null)
  }

  const filtered = filter === 'ALL' ? orders : orders.filter(o => o.status === filter)
  const revenue  = orders.filter(o => o.paymentStatus === 'PAID').reduce((s, o) => s + o.productPrice, 0)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Admin Panel</h1>
            <p className="text-gray-500 text-sm">Manage all orders and customers</p>
          </div>
          <button onClick={fetchOrders} className="btn-outline flex items-center gap-2 text-sm">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders',  value: orders.length, icon: Package,    color: 'text-purple-600' },
            { label: 'Pending',       value: orders.filter(o => o.status === 'PENDING').length, icon: Clock, color: 'text-yellow-600' },
            { label: 'Completed',     value: orders.filter(o => o.status === 'COMPLETED').length, icon: CheckCircle2, color: 'text-green-600' },
            { label: 'Revenue (Paid)', value: `₹${revenue.toLocaleString('en-IN')}`, icon: TrendingUp, color: 'text-blue-600' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card p-5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Filter className="w-4 h-4 text-gray-400" />
          {['ALL', ...STATUS_OPTIONS].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                filter === s ? 'bg-purple-700 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'
              }`}
            >
              {s.replace('_',' ')}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Order', 'Customer', 'Product', 'Amount', 'Payment', 'Status', 'Date', 'Action'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 font-mono text-xs text-purple-700 font-semibold">
                      #{order.orderNumber}
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-xs text-gray-400">{order.customerEmail}</div>
                      <div className="text-xs text-gray-400">{order.customerPhone}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900 max-w-[160px] truncate">{order.productName}</div>
                      <div className="text-xs text-gray-400 max-w-[160px] truncate">{order.requirements}</div>
                    </td>
                    <td className="px-4 py-4 font-bold text-gray-900">
                      ₹{order.productPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.paymentStatus}
                      </span>
                      <div className="text-xs text-gray-400 mt-0.5">{order.paymentMethod}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[order.status]}`}>
                        {order.status.replace('_',' ')}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        disabled={updating === order.id}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s} value={s}>{s.replace('_',' ')}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-gray-400">No orders found for this filter.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
