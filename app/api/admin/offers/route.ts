import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const offers = await prisma.offer.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ offers })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, code, discountType, discountValue, description, minOrderValue, maxUses, expiresAt } = body
    if (!title || !code || !discountValue) return NextResponse.json({ error: 'title, code, discountValue required' }, { status: 400 })

    const offer = await prisma.offer.create({
      data: {
        title,
        code: code.toUpperCase().trim(),
        discountType: discountType || 'PERCENTAGE',
        discountValue: Number(discountValue),
        description: description || null,
        minOrderValue: minOrderValue ? Number(minOrderValue) : null,
        maxUses: maxUses ? Number(maxUses) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    })
    return NextResponse.json({ offer }, { status: 201 })
  } catch (err: any) {
    if (err.code === 'P2002') return NextResponse.json({ error: 'Code already exists' }, { status: 409 })
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
