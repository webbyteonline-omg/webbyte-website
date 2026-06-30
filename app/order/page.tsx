'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { ArrowRight, CreditCard, Smartphone, Globe, FileText, BarChart3, CheckCircle2, Loader2, Tag, Check, X } from 'lucide-react'
import DynamicBanner from '@/components/DynamicBanner'
import RazorpayButton from '@/components/RazorpayButton'

const products = [
  { id: 'billpro',  name: 'BillPro — Billing Software',  price: 4999, icon: FileText  },
  { id: 'invoicex', name: 'InvoiceX — Invoice Manager',   price: 2999, icon: BarChart3 },
  { id: 'website',  name: 'Custom Website',                price: 9999, icon: Globe     },
  { id: 'custom',   name: 'Custom / Enterprise Quote',     price: 0,    icon: Globe     },
]

const schema = z.object({
  name:          z.string().min(2, 'Full name is required'),
  email:         z.string().email('Enter a valid email'),
  phone:         z.string().min(10, 'Enter a valid phone number'),
  company:       z.string().optional(),
  productId:     z.string().min(1, 'Please select a product'),
  requirements:  z.string().min(10, 'Please describe your requirements (min 10 chars)'),
  paymentMethod: z.enum(['razorpay', 'stripe']),
})

type FormData = z.infer<typeof schema>

interface PendingOrder {
  orderId:        string
  orderNumber:    string
  stripeUrl?:     string
}

function OrderForm() {
  const searchParams = useSearchParams()
  const preselected  = searchParams.get('product') || ''
  const [step, setStep]           = useState(1)
  const [isCreating, setIsCreating] = useState(false)
  const [pending, setPending]     = useState<PendingOrder | null>(null)

  // Coupon
  const [couponCode,     setCouponCode]     = useState('')
  const [couponLoading,  setCouponLoading]  = useState(false)
  const [couponApplied,  setCouponApplied]  = useState<{ code: string; discountType: string; discountValue: number; title: string } | null>(null)
  const [couponError,    setCouponError]    = useState('')

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { productId: preselected, paymentMethod: 'razorpay' },
  })

  useEffect(() => { if (preselected) setValue('productId', preselected) }, [preselected, setValue])

  const selectedProduct = products.find(p => p.id === watch('productId'))
  const paymentMethod   = watch('paymentMethod')

  // Derived price after coupon
  const basePrice = selectedProduct?.price ?? 0
  const finalPrice = couponApplied
    ? couponApplied.discountType === 'PERCENTAGE'
      ? Math.max(0, Math.round(basePrice - basePrice * couponApplied.discountValue / 100))
      : Math.max(0, basePrice - couponApplied.discountValue)
    : basePrice

  const applyCoupon = async () => {
    if (!couponCode.trim()) return
    setCouponLoading(true); setCouponError('')
    try {
      const r = await fetch(`/api/offers?code=${couponCode.trim().toUpperCase()}`)
      const j = await r.json()
      if (!r.ok || !j.valid) { setCouponError(j.error || 'Invalid or expired coupon'); setCouponApplied(null) }
      else { setCouponApplied({ code: j.offer.code, discountType: j.offer.discountType, discountValue: j.offer.discountValue, title: j.offer.title }); setCouponError('') }
    } catch { setCouponError('Could not validate coupon') }
    finally { setCouponLoading(false) }
  }
  const removeCoupon = () => { setCouponApplied(null); setCouponCode(''); setCouponError('') }

  const createOrder = async (data: FormData) => {
    setIsCreating(true)
    try {
      const res  = await fetch('/api/orders', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to create order')

      if (data.productId === 'custom' || !selectedProduct?.price) {
        setPending({ orderId: json.orderId, orderNumber: json.orderNumber })
        setStep(3)
        return
      }

      setPending({ orderId: json.orderId, orderNumber: json.orderNumber, stripeUrl: json.stripeUrl })
      setStep(2)
    } catch (err: any) {
      toast.error(err.message || 'Could not place order. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const goNext = () => {
    const v = watch()
    if (!v.name || !v.email || !v.phone || !v.productId || (v.requirements?.length ?? 0) < 10) {
      toast.error('Please fill all required fields correctly')
      return
    }
    handleSubmit(createOrder)()
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-purple-50 via-white to-white pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <div className="badge mx-auto mb-4">Secure Checkout</div>
          <h1 className="section-title mb-3">Place Your Order</h1>
          <p className="text-gray-500">Fill in the details below and we'll get started right away.</p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step >= s ? 'bg-purple-700 text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              {s < 3 && <div className={`w-16 h-0.5 ${step > s ? 'bg-purple-700' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-[4.5rem] text-xs text-gray-500 mb-12 -mt-6">
          <span className={step >= 1 ? 'text-purple-700 font-semibold' : ''}>Details</span>
          <span className={step >= 2 ? 'text-purple-700 font-semibold' : ''}>Payment</span>
          <span className={step >= 3 ? 'text-purple-700 font-semibold' : ''}>Confirm</span>
        </div>

        {/* STEP 3 — Success */}
        {step === 3 && (
          <div className="card p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Order Confirmed! 🎉</h2>
            <p className="text-gray-500 mb-4">
              Your order <span className="font-bold text-purple-700">#{pending?.orderNumber}</span> has been placed.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              We'll contact you within 2 hours. Check your inbox for a confirmation email.
            </p>
            <div className="flex justify-center gap-4">
              <a href="/dashboard" className="btn-primary">View Dashboard</a>
              <a href="/"          className="btn-secondary">Back to Home</a>
            </div>
          </div>
        )}

        {/* STEP 1 — Details */}
        {step === 1 && (
          <div className="card p-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Your Details</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="label">Full Name *</label>
                <input {...register('name')} className="input-field" placeholder="Sachin Kumar" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="label">Email Address *</label>
                <input {...register('email')} type="email" className="input-field" placeholder="you@example.com" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="label">Phone Number *</label>
                <input {...register('phone')} className="input-field" placeholder="+91 98765 43210" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="label">Company / Business Name</label>
                <input {...register('company')} className="input-field" placeholder="Your Company" />
              </div>
            </div>

            <div>
              <label className="label">Select Product *</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {products.map((p) => {
                  const selected = watch('productId') === p.id
                  return (
                    <button key={p.id} type="button" onClick={() => setValue('productId', p.id)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                        selected ? 'border-purple-700 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${selected ? 'bg-purple-700' : 'bg-gray-100'}`}>
                        <p.icon className={`w-5 h-5 ${selected ? 'text-white' : 'text-gray-500'}`} />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">{p.name}</div>
                        <div className="text-xs text-purple-600 font-bold">
                          {p.price > 0 ? `₹${p.price.toLocaleString('en-IN')}` : 'Get Quote'}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
              {errors.productId && <p className="text-red-500 text-xs mt-2">{errors.productId.message}</p>}
            </div>

            <div>
              <label className="label">Your Requirements *</label>
              <textarea {...register('requirements')} className="input-field resize-none" rows={4}
                placeholder="Business type, number of users, specific features, etc." />
              {errors.requirements && <p className="text-red-500 text-xs mt-1">{errors.requirements.message}</p>}
            </div>

            <button type="button" onClick={goNext} disabled={isCreating}
              className="btn-primary w-full justify-center text-base py-4">
              {isCreating
                ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating order…</>
                : <>Continue to Payment <ArrowRight className="w-5 h-5" /></>}
            </button>
          </div>
        )}

        {/* STEP 2 — Payment */}
        {step === 2 && pending && (
          <>
          <DynamicBanner position="order" className="rounded-2xl overflow-hidden mb-4" />
          <div className="card p-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>

            {selectedProduct && (
              <div className="bg-purple-50 rounded-xl p-5 border border-purple-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Selected Product</div>
                    <div className="font-bold text-gray-900">{selectedProduct.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">Order #{pending.orderNumber}</div>
                  </div>
                  <div className="text-right">
                    {couponApplied && basePrice > 0 ? (
                      <>
                        <div className="text-sm text-gray-400 line-through">₹{basePrice.toLocaleString('en-IN')}</div>
                        <div className="text-2xl font-extrabold text-purple-700">₹{finalPrice.toLocaleString('en-IN')}</div>
                        <div className="text-xs text-green-600 font-semibold">
                          {couponApplied.discountType === 'PERCENTAGE' ? `${couponApplied.discountValue}% OFF` : `₹${couponApplied.discountValue} OFF`} applied
                        </div>
                      </>
                    ) : (
                      <div className="text-2xl font-extrabold text-purple-700">
                        {basePrice > 0 ? `₹${basePrice.toLocaleString('en-IN')}` : 'Quote'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Coupon input */}
                {basePrice > 0 && (
                  <div>
                    {couponApplied ? (
                      <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="font-mono font-bold text-green-700 text-sm">{couponApplied.code}</span>
                          <span className="text-green-600 text-xs ml-2">— {couponApplied.title}</span>
                        </div>
                        <button onClick={removeCoupon} className="text-gray-400 hover:text-gray-600 p-1"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            value={couponCode} onChange={e => setCouponCode(e.target.value.toUpperCase())}
                            onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                            placeholder="COUPON CODE"
                            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm font-mono font-semibold placeholder-gray-300 focus:outline-none focus:border-purple-500 bg-white uppercase tracking-wider"
                          />
                        </div>
                        <button onClick={applyCoupon} disabled={couponLoading || !couponCode}
                          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-1.5">
                          {couponLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
                        </button>
                      </div>
                    )}
                    {couponError && <p className="text-xs text-red-500 mt-1.5">{couponError}</p>}
                  </div>
                )}
              </div>
            )}

            {selectedProduct && selectedProduct.price > 0 && (
              <div>
                <label className="label">Choose Payment Gateway</label>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { id: 'razorpay', label: 'Razorpay', icon: Smartphone, desc: 'UPI, Cards, Netbanking, EMI — India' },
                    { id: 'stripe',   label: 'Stripe',   icon: CreditCard,  desc: 'International cards (Visa, Mastercard)' },
                  ].map((pm) => {
                    const sel = paymentMethod === pm.id
                    return (
                      <button key={pm.id} type="button" onClick={() => setValue('paymentMethod', pm.id as any)}
                        className={`flex items-start gap-3 p-5 rounded-xl border-2 text-left transition-all ${
                          sel ? 'border-purple-700 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${sel ? 'bg-purple-700' : 'bg-gray-100'}`}>
                          <pm.icon className={`w-5 h-5 ${sel ? 'text-white' : 'text-gray-500'}`} />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">{pm.label}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{pm.desc}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              100% secure payment. Your financial details are never stored on our servers.
            </div>

            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center">
                Back
              </button>

              {/* Razorpay Standard Checkout — via RazorpayButton component */}
              {paymentMethod === 'razorpay' && selectedProduct && selectedProduct.price > 0 && (
                <RazorpayButton
                  amount={finalPrice}
                  productName={selectedProduct.name}
                  orderId={pending.orderId}
                  prefill={{ name: watch('name'), email: watch('email'), contact: watch('phone') }}
                  onSuccess={() => setStep(3)}
                  onFailure={(reason) => {
                    if (reason !== 'dismissed') {
                      toast.error('Payment failed. Please try again or choose a different method.')
                    }
                  }}
                  className="btn-primary flex-1 justify-center text-base py-4"
                >
                  <>Pay ₹{finalPrice.toLocaleString('en-IN')} <ArrowRight className="w-5 h-5 ml-1" /></>
                </RazorpayButton>
              )}

              {/* Stripe redirect */}
              {paymentMethod === 'stripe' && selectedProduct && selectedProduct.price > 0 && pending.stripeUrl && (
                <a href={pending.stripeUrl} className="btn-primary flex-1 justify-center text-base py-4 text-center">
                  Pay with Stripe <ArrowRight className="w-5 h-5" />
                </a>
              )}

              {/* Custom quote — no payment */}
              {selectedProduct && selectedProduct.price === 0 && (
                <button type="button" onClick={() => setStep(3)} className="btn-primary flex-1 justify-center text-base py-4">
                  Submit Request <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          </>
        )}

      </div>
    </div>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-gray-400">Loading…</div>}>
      <OrderForm />
    </Suspense>
  )
}
