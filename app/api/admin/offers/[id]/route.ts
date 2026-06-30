import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body   = await req.json()
    const offer  = await prisma.offer.update({
      where: { id },
      data: {
        ...(body.title         !== undefined && { title: body.title }),
        ...(body.code          !== undefined && { code: body.code.toUpperCase().trim() }),
        ...(body.discountType  !== undefined && { discountType: body.discountType }),
        ...(body.discountValue !== undefined && { discountValue: Number(body.discountValue) }),
        ...(body.description   !== undefined && { description: body.description }),
        ...(body.minOrderValue !== undefined && { minOrderValue: body.minOrderValue ? Number(body.minOrderValue) : null }),
        ...(body.maxUses       !== undefined && { maxUses: body.maxUses ? Number(body.maxUses) : null }),
        ...(body.expiresAt     !== undefined && { expiresAt: body.expiresAt ? new Date(body.expiresAt) : null }),
        ...(body.active        !== undefined && { active: body.active }),
        ...(body.usedCount     !== undefined && { usedCount: body.usedCount }),
      },
    })
    return NextResponse.json({ offer })
  } catch (err: any) {
    if (err.code === 'P2002') return NextResponse.json({ error: 'Code already exists' }, { status: 409 })
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.offer.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
