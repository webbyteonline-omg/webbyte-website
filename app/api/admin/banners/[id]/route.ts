import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body   = await req.json()

    const banner = await prisma.siteBanner.update({
      where: { id },
      data: {
        ...(body.title    !== undefined && { title: body.title }),
        ...(body.subtitle !== undefined && { subtitle: body.subtitle || null }),
        ...(body.badge    !== undefined && { badge: body.badge || null }),
        ...(body.ctaText  !== undefined && { ctaText: body.ctaText || null }),
        ...(body.ctaLink  !== undefined && { ctaLink: body.ctaLink || null }),
        ...(body.gradient !== undefined && { gradient: body.gradient }),
        ...(body.position !== undefined && { position: body.position }),
        ...(body.style    !== undefined && { style: body.style }),
        ...(body.priority !== undefined && { priority: Number(body.priority) }),
        ...(body.active   !== undefined && { active: body.active }),
        ...(body.startsAt !== undefined && { startsAt: body.startsAt ? new Date(body.startsAt) : null }),
        ...(body.endsAt   !== undefined && { endsAt: body.endsAt ? new Date(body.endsAt) : null }),
      },
    })
    return NextResponse.json({ banner })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.siteBanner.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
