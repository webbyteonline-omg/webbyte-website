'use client'
import { useState, useCallback, useEffect } from 'react'
import Script from 'next/script'
import toast from 'react-hot-toast'
import { Loader2, CreditCard } from 'lucide-react'

interface RazorpayButtonProps {
  /** Amount in RUPEES (not paise) */
  amount: number
  productName: string
  /** Internal DB order ID — used to update payment status after verification */
  orderId?: string
  /** Pre-fill customer info */
  prefill?: { name?: string; email?: string; contact?: string }
  /** Called after signature is verified successfully */
  onSuccess?: (data: { razorpay_payment_id: string; razorpay_order_id: string }) => void
  /** Called if payment fails or user dismisses the modal */
  onFailure?: (reason: string) => void
  className?: string
  children?: React.ReactNode
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function RazorpayButton({
  amount,
  productName,
  orderId,
  prefill,
  onSuccess,
  onFailure,
  className,
  children,
}: RazorpayButtonProps) {
  const [loading, setLoading] = useState(false)
  const [scriptReady, setScriptReady] = useState(false)

  // If Razorpay script is already loaded (e.g. loaded by another instance), mark ready immediately
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.Razorpay === 'function') {
      setScriptReady(true)
    }
  }, [])

  const handlePayment = useCallback(async () => {
    if (!scriptReady) {
      toast.error('Payment system is loading, please try again.')
      return
    }
    if (amount < 1) {
      toast.error('Invalid payment amount.')
      return
    }

    setLoading(true)
    try {
      // STEP 1 — Create Razorpay order on backend
      const orderRes = await fetch('/api/razorpay/create-order', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          amount:  amount * 100, // convert ₹ → paise
          currency: 'INR',
          receipt: orderId || `rcpt_${Date.now()}`,
        }),
      })
      const orderData = await orderRes.json()

      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Could not create payment order')
      }

      // STEP 2 — Open Razorpay checkout modal
      const options = {
        key:         process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount:      orderData.amount,
        currency:    orderData.currency,
        name:        'WebByte',
        description: productName,
        image:       '/logo.png',   // add your logo to /public/logo.png
        order_id:    orderData.order_id,

        // STEP 3 — On payment success: verify signature on backend
        handler: async (response: {
          razorpay_payment_id: string
          razorpay_order_id:   string
          razorpay_signature:  string
        }) => {
          try {
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method:  'POST',
              headers: { 'Content-Type': 'application/json' },
              body:    JSON.stringify(response),
            })
            const verifyData = await verifyRes.json()

            if (!verifyRes.ok) {
              throw new Error(verifyData.error || 'Payment verification failed')
            }

            // Also update our internal order record if orderId provided
            if (orderId) {
              await fetch('/api/payment/verify', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ orderId, ...response }),
              })
            }

            toast.success('Payment successful! 🎉')
            onSuccess?.({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id:   response.razorpay_order_id,
            })
          } catch (err: any) {
            toast.error(err.message || 'Payment verification failed')
            onFailure?.(err.message)
          }
        },

        prefill: {
          name:    prefill?.name    || '',
          email:   prefill?.email   || '',
          contact: prefill?.contact || '',
        },

        theme: { color: '#7c3aed' },

        modal: {
          // User closed the modal without paying
          ondismiss: () => {
            setLoading(false)
            toast('Payment cancelled', { icon: '⚠️' })
            onFailure?.('dismissed')
          },
          // Escape key and backdrop close
          escape:           true,
          backdropclose:    false,
          animation:        true,
        },
      }

      const rzp = new window.Razorpay(options)

      // payment.failed event — card declined, network error, etc.
      rzp.on('payment.failed', (response: any) => {
        setLoading(false)
        const reason =
          response?.error?.description ||
          response?.error?.reason      ||
          'Payment failed'
        toast.error(`Payment failed: ${reason}`)
        onFailure?.(reason)
      })

      rzp.open()
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong. Please try again.')
      onFailure?.(err.message)
    } finally {
      setLoading(false)
    }
  }, [scriptReady, amount, productName, orderId, prefill, onSuccess, onFailure])

  return (
    <>
      {/* Load Razorpay checkout.js via Next.js Script — correct way in Next.js App Router */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => setScriptReady(true)}
        onError={() => toast.error('Failed to load payment gateway. Check your internet connection.')}
      />

      <button
        onClick={handlePayment}
        disabled={loading || !scriptReady}
        className={className || 'btn-primary w-full justify-center'}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing…
          </>
        ) : !scriptReady ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading…
          </>
        ) : (
          children || (
            <>
              <CreditCard className="w-4 h-4" />
              Pay ₹{amount.toLocaleString('en-IN')}
            </>
          )
        )}
      </button>
    </>
  )
}
