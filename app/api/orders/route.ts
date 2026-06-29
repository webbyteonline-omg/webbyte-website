import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import Razorpay from 'razorpay'
import Stripe from 'stripe'

const schema = z.object({
  name:          z.string().min(2),
  email:         z.string().email(),
  phone:         z.string().min(10),
  company:       z.string().optional(),
  productId:     z.string(),
  requirements:  z.string().min(10),
  paymentMethod: z.enum(['razorpay', 'stripe']),
})

const PRODUCTS: Record<string, { name: string; price: number }> = {
  billpro:  { name: 'BillPro — Billing Software',    price: 4999  },
  invoicex: { name: 'InvoiceX — Invoice Manager',     price: 2999  },
  website:  { name: 'Custom Website',                  price: 9999  },
  custom:   { name: 'Custom / Enterprise Quote',       price: 0     },
}

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-02-24.acacia' })

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()
    const data = schema.parse(body)

    const product = PRODUCTS[data.productId]
    if (!product) return NextResponse.json({ error: 'Invalid product' }, { status: 400 })

    const orderNumber = `WC-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId:        session?.user ? (session.user as any).id : null,
        customerName:  data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
        productId:     data.productId,
        productName:   product.name,
        productPrice:  product.price,
        requirements:  data.requirements,
        paymentMethod: data.paymentMethod,
        status:        'PENDING',
        paymentStatus: 'UNPAID',
      },
    })

    // Custom/free quote — no payment
    if (product.price === 0) {
      return NextResponse.json({ orderNumber, orderId: order.id })
    }

    // Razorpay
    if (data.paymentMethod === 'razorpay') {
      const rzpOrder = await razorpay.orders.create({
        amount:   product.price * 100,
        currency: 'INR',
        receipt:  order.id,
      })
      return NextResponse.json({ orderNumber, orderId: order.id, razorpayOrderId: rzpOrder.id })
    }

    // Stripe
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order/success?order=${order.id}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/order`,
      customer_email: data.email,
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: { name: product.name, description: `WebByte — ${product.name}` },
          unit_amount: product.price * 100,
        },
        quantity: 1,
      }],
      metadata: { orderId: order.id, orderNumber },
    })

    return NextResponse.json({ orderNumber, orderId: order.id, stripeUrl: stripeSession.url })
  } catch (err: any) {
    console.error('Order error:', err)
    if (err.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input', details: err.errors }, { status: 422 })
    }
    return NextResponse.json({ error: err.message || 'Something went wrong' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const isAdmin = (session.user as any)?.role === 'ADMIN'
    const userId  = (session.user as any)?.id

    const orders = await prisma.order.findMany({
      where: isAdmin ? {} : { userId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ orders })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
