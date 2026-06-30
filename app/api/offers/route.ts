// Public — validate or list active offers
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const now  = new Date()

  try {
    if (code) {
      // Validate a specific coupon code
      const offer = await prisma.offer.findUnique({ where: { code: code.toUpperCase() } })
      if (!offer || !offer.active) return NextResponse.json({ valid: false, error: 'Coupon not found or inactive' })
      if (offer.expiresAt && offer.expiresAt < now) return NextResponse.json({ valid: false, error: 'Coupon has expired' })
      if (offer.maxUses && offer.usedCount >= offer.maxUses) return NextResponse.json({ valid: false, error: 'Coupon usage limit reached' })
      return NextResponse.json({ valid: true, offer: { id: offer.id, title: offer.title, code: offer.code, discountType: offer.discountType, discountValue: offer.discountValue, minOrderValue: offer.minOrderValue, description: offer.description } })
    }

    // Return all active offers (for display on site)
    const offers = await prisma.offer.findMany({
      where: { active: true, OR: [{ expiresAt: null }, { expiresAt: { gt: now } }] },
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, code: true, discountType: true, discountValue: true, description: true, expiresAt: true },
    })
    return NextResponse.json({ offers })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
