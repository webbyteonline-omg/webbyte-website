'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { ArrowRight, CreditCard, Smartphone, Globe, FileText, BarChart3, CheckCircle2, Loader2 } from 'lucide-react'

const products = [
  { id: 'billpro',  name: 'BillPro — Billing Software',    price: 4999,  icon: FileText },
  { id: 'invoicex', name: 'InvoiceX — Invoice Manager',     price: 2999,  icon: BarChart3 },
  { id: 'website',  name: 'Custom Website',                  price: 9999,  icon: Globe },
  { id: 'custom',   name: 'Custom / Enterprise Quote',       price: 0,     icon: Globe },
]

const schema = z.object({
  name:         z.string().min(2, 'Full name is required'),
  email:        z.string().email('Enter a valid email'),
  phone:        z.string().min(10, 'Enter a valid phone number'),
  company:      z.string().optional(),
  productId:    z.string().min(1, 'Please select a product'),
  requirements: z.string().min(10, 'Please describe your requirements (min 10 chars)'),
  paymentMethod: z.enum(['razorpay', 'stripe']),
})

type FormData = z.infer<typeof schema>

function OrderForm() {
  const searchParams = useSearchParams()
  const preselected = searchParams.get('product') || ''
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [orderId, setOrderId] = useState('')

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productId: preselected,
      paymentMethod: 'razorpay',
    },
  })

  useEffect(() => {
    if (preselected) setValue('productId', preselected)
  }, [preselected, setValue])

  const selectedProduct = products.find(p => p.id === watch('productId'))
  const paymentMethod = watch('paymentMethod')

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()

      if (!res.ok) throw new Error(json.error || 'Something went wrong')

      setOrderId(json.orderNumber)

      if (data.productId === 'custom' || !selectedProduct?.price) {
        setStep(3)
        return
      }

      if (data.paymentMethod === 'razorpay') {
        await initRazorpay(json.orderId, json.razorpayOrderId, data)
      } else {
        window.location.href = json.stripeUrl
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to place order. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const initRazorpay = async (orderId: string, razorpayOrderId: string, data: FormData) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: (selectedProduct?.price || 0) * 100,
      currency: 'INR',
      name: 'WebByte',
      description: selectedProduct?.name,
      order_id: razorpayOrderId,
      handler: async (response: any) => {
        await fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId, ...response }),
        })
        setStep(3)
        toast.success('Payment successful! 🎉')
      },
      prefill: { name: data.name, email: data.email, contact: data.phone },
      theme: { color: '#7c3aed' },
    }
    // @ts-ignore
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-purple-50 via-white to-white pb-24">
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="badge mx-auto mb-4">Secure Checkout</div>
          <h1 className="section-title mb-3">Place Your Order</h1>
          <p className="text-gray-500">Fill in the details below and we'll get started right away.</p>
        </div>

        {/* Progress */}
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

        {/* Step 3 — Success */}
        {step === 3 && (
          <div className="card p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Order Confirmed! 🎉</h2>
            <p className="text-gray-500 mb-4">
              Thank you! Your order <span className="font-bold text-purple-700">#{orderId}</span> has been placed.
            </p>
            <p className="text-gray-400 text-sm">
              We'll contact you at your email within 2 hours to get started. Meanwhile, check your inbox for confirmation.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a href="/dashboard" className="btn-primary">View Dashboard</a>
              <a href="/" className="btn-secondary">Back to Home</a>
            </div>
          </div>
        )}

        {/* Steps 1 & 2 */}
        {step < 3 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1 — Details */}
            {step === 1 && (
              <div className="card p-8 space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Your Details</h2>

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

                {/* Product Selection */}
                <div>
                  <label className="label">Select Product *</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {products.map((p) => {
                      const selected = watch('productId') === p.id
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setValue('productId', p.id)}
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

                {/* Requirements */}
                <div>
                  <label className="label">Your Requirements *</label>
                  <textarea
                    {...register('requirements')}
                    className="input-field resize-none"
                    rows={4}
                    placeholder="Describe what you need: business type, number of users, specific features, etc."
                  />
                  {errors.requirements && <p className="text-red-500 text-xs mt-1">{errors.requirements.message}</p>}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const vals = watch()
                    if (!vals.name || !vals.email || !vals.phone || !vals.productId || !vals.requirements || vals.requirements.length < 10) {
                      toast.error('Please fill all required fields')
                      return
                    }
                    setStep(2)
                  }}
                  className="btn-primary w-full justify-center text-base py-4"
                >
                  Continue to Payment <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Step 2 — Payment */}
            {step === 2 && (
              <div className="card p-8 space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Method</h2>

                {/* Order summary */}
                {selectedProduct && (
                  <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-500">Selected Product</div>
                        <div className="font-bold text-gray-900">{selectedProduct.name}</div>
                      </div>
                      <div className="text-2xl font-extrabold text-purple-700">
                        {selectedProduct.price > 0 ? `₹${selectedProduct.price.toLocaleString('en-IN')}` : 'Quote'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment method */}
                {selectedProduct && selectedProduct.price > 0 && (
                  <div>
                    <label className="label">Choose Payment Gateway</label>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { id: 'razorpay', label: 'Razorpay', icon: Smartphone, desc: 'UPI, Cards, Netbanking, EMI — India payments' },
                        { id: 'stripe',   label: 'Stripe',   icon: CreditCard, desc: 'International cards (Visa, Mastercard, Amex)' },
                      ].map((pm) => {
                        const selected = paymentMethod === pm.id
                        return (
                          <button
                            key={pm.id}
                            type="button"
                            onClick={() => setValue('paymentMethod', pm.id as any)}
                            className={`flex items-start gap-3 p-5 rounded-xl border-2 text-left transition-all ${
                              selected ? 'border-purple-700 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${selected ? 'bg-purple-700' : 'bg-gray-100'}`}>
                              <pm.icon className={`w-5 h-5 ${selected ? 'text-white' : 'text-gray-500'}`} />
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
                  All payments are 100% secure. Your financial details are never stored on our servers.
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center">
                    Back
                  </button>
                  <button type="submit" disabled={isLoading} className="btn-primary flex-1 justify-center text-base py-4">
                    {isLoading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                    ) : selectedProduct?.price ? (
                      <>Pay ₹{selectedProduct.price.toLocaleString('en-IN')} <ArrowRight className="w-5 h-5" /></>
                    ) : (
                      <>Submit Request <ArrowRight className="w-5 h-5" /></>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-gray-400">Loading...</div>}>
      <OrderForm />
    </Suspense>
  )
}
