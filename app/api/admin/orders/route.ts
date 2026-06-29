// Dedicated admin orders endpoint — no auth required (temporary, auth added later)
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ orders })
  } catch (err: any) {
    console.error('[Admin orders GET]', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
