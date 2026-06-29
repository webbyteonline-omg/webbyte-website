import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { amount, currency = 'INR', receipt } = body

    // Validate amount — Razorpay minimum is 100 paise (₹1)
    if (!amount || typeof amount !== 'number' || amount < 100) {
      return NextResponse.json(
        { error: 'Invalid amount. Minimum is 100 paise (₹1).' },
        { status: 400 }
      )
    }

    const order = await razorpay.orders.create({
      amount,           // already in paise
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
    })

    return NextResponse.json({
      order_id: order.id,
      amount:   order.amount,
      currency: order.currency,
    })
  } catch (err: any) {
    console.error('[Razorpay create-order]', err)

    // Razorpay auth failure
    if (err?.statusCode === 401) {
      return NextResponse.json({ error: 'Razorpay authentication failed. Check your API keys.' }, { status: 401 })
    }

    return NextResponse.json(
      { error: err?.error?.description || err.message || 'Failed to create Razorpay order' },
      { status: 500 }
    )
  }
}
