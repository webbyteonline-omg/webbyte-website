import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const banners = await prisma.siteBanner.findMany({ orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }] })
    return NextResponse.json({ banners })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, subtitle, badge, ctaText, ctaLink, gradient, position, style, priority, startsAt, endsAt } = body
    if (!title) return NextResponse.json({ error: 'title required' }, { status: 400 })

    const banner = await prisma.siteBanner.create({
      data: {
        title,
        subtitle:  subtitle  || null,
        badge:     badge     || null,
        ctaText:   ctaText   || null,
        ctaLink:   ctaLink   || null,
        gradient:  gradient  || 'from-purple-600 to-indigo-700',
        position:  position  || 'homepage',
        style:     style     || 'strip',
        priority:  priority  ? Number(priority) : 0,
        startsAt:  startsAt  ? new Date(startsAt) : null,
        endsAt:    endsAt    ? new Date(endsAt)   : null,
      },
    })
    return NextResponse.json({ banner }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
