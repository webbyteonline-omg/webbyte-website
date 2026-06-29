'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Package, Clock, CheckCircle2, XCircle, AlertCircle,
  ArrowRight, Loader2, RefreshCw, User
} from 'lucide-react'

type Order = {
  id: string
  orderNumber: string
  productName: string
  productPrice: number
  status: string
  paymentStatus: string
  requirements: string
  createdAt: string
}

const STATUS_STYLES: Record<string, string> = {
  PENDING:     'bg-yellow-100 text-yellow-700',
  CONFIRMED:   'bg-blue-100 text-blue-700',
  IN_PROGRESS: 'bg-purple-100 text-purple-700',
  COMPLETED:   'bg-green-100 text-green-700',
  CANCELLED:   'bg-red-100 text-red-700',
}

const STATUS_ICONS: Record<string, typeof Clock> = {
  PENDING:     Clock,
  CONFIRMED:   AlertCircle,
  IN_PROGRESS: RefreshCw,
  COMPLETED:   CheckCircle2,
  CANCELLED:   XCircle,
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/orders')
        .then(r => r.json())
        .then(d => { setOrders(d.orders || []); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [status])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  const total     = orders.length
  const active    = orders.filter(o => ['PENDING','CONFIRMED','IN_PROGRESS'].includes(o.status)).length
  const completed = orders.filter(o => o.status === 'COMPLETED').length
  const spent     = orders.filter(o => o.paymentStatus === 'PAID').reduce((s, o) => s + o.productPrice, 0)

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">My Dashboard</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Welcome back, {session?.user?.name?.split(' ')[0]} 👋
            </p>
          </div>
          <Link href="/order" className="btn-primary">
            New Order <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders',    value: total,     icon: Package,      color: 'text-purple-600' },
            { label: 'Active',          value: active,    icon: RefreshCw,    color: 'text-blue-600' },
            { label: 'Completed',       value: completed, icon: CheckCircle2, color: 'text-green-600' },
            { label: 'Total Spent',     value: `₹${spent.toLocaleString('en-IN')}`, icon: User, color: 'text-orange-600' },
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

        {/* Orders */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Your Orders</h2>
          </div>

          {loading ? (
            <div className="py-16 flex items-center justify-center text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="py-16 text-center">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No orders yet</p>
              <p className="text-gray-400 text-sm mb-6">Place your first order and track it here</p>
              <Link href="/order" className="btn-primary">Order Now</Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {orders.map((order) => {
                const StatusIcon = STATUS_ICONS[order.status] || Clock
                return (
                  <div key={order.id} className="px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-purple-700" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{order.productName}</div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          #{order.orderNumber} · {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">{order.requirements}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right hidden sm:block">
                        <div className="font-bold text-gray-900">₹{order.productPrice.toLocaleString('en-IN')}</div>
                        <div className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${
                          order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.paymentStatus}
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${STATUS_STYLES[order.status]}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
