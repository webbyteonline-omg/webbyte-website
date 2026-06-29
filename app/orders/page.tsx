'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShoppingBag, Clock, CheckCircle2, XCircle, Loader2, ArrowRight, Package, RefreshCw } from 'lucide-react'

interface Order {
  id:            string
  orderNumber:   string
  productName:   string
  productPrice:  number
  status:        string
  paymentStatus: string
  paymentMethod: string
  requirements:  string
  createdAt:     string
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  PENDING:     { label: 'Pending',     color: 'bg-yellow-50 text-yellow-700 border-yellow-200',  icon: Clock         },
  CONFIRMED:   { label: 'Confirmed',   color: 'bg-blue-50 text-blue-700 border-blue-200',        icon: CheckCircle2  },
  IN_PROGRESS: { label: 'In Progress', color: 'bg-purple-50 text-purple-700 border-purple-200',  icon: RefreshCw     },
  COMPLETED:   { label: 'Completed',   color: 'bg-green-50 text-green-700 border-green-200',     icon: CheckCircle2  },
  CANCELLED:   { label: 'Cancelled',  color: 'bg-red-50 text-red-700 border-red-200',            icon: XCircle       },
}

const paymentConfig: Record<string, { label: string; color: string }> = {
  UNPAID:   { label: 'Unpaid',   color: 'text-red-600'    },
  PAID:     { label: 'Paid',     color: 'text-green-600'  },
  PARTIAL:  { label: 'Partial',  color: 'text-yellow-600' },
  REFUNDED: { label: 'Refunded', color: 'text-gray-500'   },
}

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders,  setOrders]  = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin?callbackUrl=/orders')
    }
  }, [status, router])

  useEffect(() => {
    if (status !== 'authenticated') return
    fetch('/api/orders')
      .then(r => r.json())
      .then(d => setOrders(d.orders || []))
      .finally(() => setLoading(false))
  }, [status])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-700" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <ShoppingBag className="w-6 h-6 text-purple-700" />
            <h1 className="text-2xl font-extrabold text-gray-900">My Orders</h1>
          </div>
          <p className="text-gray-500">Track all your WebByte orders in one place.</p>
        </div>

        {/* Orders list */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <Package className="w-14 h-14 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-400 mb-6">Place your first order and it will appear here.</p>
            <Link href="/order" className="btn-primary">
              Place an Order <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const s = statusConfig[order.status]  || statusConfig.PENDING
              const p = paymentConfig[order.paymentStatus] || paymentConfig.UNPAID
              const StatusIcon = s.icon

              return (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-bold text-gray-900">{order.productName}</span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${s.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {s.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span>Order #{order.orderNumber}</span>
                        <span>·</span>
                        <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span>·</span>
                        <span className={`font-semibold ${p.color}`}>{p.label}</span>
                      </div>
                      {order.requirements && (
                        <p className="text-sm text-gray-400 mt-2 line-clamp-2">{order.requirements}</p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xl font-extrabold text-purple-700">
                        ₹{order.productPrice.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5 capitalize">{order.paymentMethod || 'razorpay'}</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      {['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED'].map((st, i, arr) => {
                        const currentIdx = arr.indexOf(order.status)
                        const isActive   = i <= currentIdx
                        return (
                          <div key={st} className="flex items-center gap-2 flex-1">
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? 'bg-purple-700' : 'bg-gray-200'}`} />
                            <div className={`text-xs ${isActive ? 'text-purple-700 font-medium' : 'text-gray-300'}`}>
                              {statusConfig[st]?.label}
                            </div>
                            {i < arr.length - 1 && (
                              <div className={`flex-1 h-0.5 ${isActive && i < currentIdx ? 'bg-purple-700' : 'bg-gray-100'}`} />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="text-center pt-4">
              <Link href="/order" className="btn-secondary">
                Place Another Order <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
