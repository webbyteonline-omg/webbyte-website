// Dedicated admin order update endpoint — no auth required (temporary, auth added later)
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { status, paymentStatus, notes, deliveryDate } = await req.json()

    const order = await prisma.order.update({
      where: { id },
      data: {
        ...(status        && { status }),
        ...(paymentStatus && { paymentStatus }),
        ...(notes         && { notes }),
        ...(deliveryDate  && { deliveryDate: new Date(deliveryDate) }),
      },
    })

    return NextResponse.json({ order })
  } catch (err: any) {
    console.error('[Admin order PATCH]', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
