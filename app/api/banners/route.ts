// Public — fetch active banners by position
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const position = req.nextUrl.searchParams.get('position')
  const now      = new Date()

  try {
    const where: any = {
      active: true,
      AND: [
        { OR: [{ startsAt: null }, { startsAt: { lte: now } }] },
        { OR: [{ endsAt: null },   { endsAt: { gte: now } }] },
      ],
    }
    if (position) where.position = position

    const banners = await prisma.siteBanner.findMany({
      where,
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
    })
    return NextResponse.json({ banners })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
