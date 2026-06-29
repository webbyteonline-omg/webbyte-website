import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    // Validate all required fields are present
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required fields: razorpay_order_id, razorpay_payment_id, razorpay_signature' },
        { status: 400 }
      )
    }

    // HMAC-SHA256 signature verification
    // Algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const sign          = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSign  = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(sign)
      .digest('hex')

    if (expectedSign !== razorpay_signature) {
      // Signature mismatch — do NOT mark as paid
      return NextResponse.json(
        { error: 'Payment verification failed. Signature mismatch.' },
        { status: 400 }
      )
    }

    // Signature is valid — payment is genuine
    return NextResponse.json({
      success:            true,
      razorpay_order_id,
      razorpay_payment_id,
    })
  } catch (err: any) {
    console.error('[Razorpay verify-payment]', err)
    return NextResponse.json(
      { error: err.message || 'Verification failed' },
      { status: 500 }
    )
  }
}
