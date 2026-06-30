import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body   = await req.json()

    const config = await prisma.productConfig.update({
      where: { id },
      data: {
        ...(body.productName !== undefined && { productName: body.productName }),
        ...(body.basePrice   !== undefined && { basePrice: Number(body.basePrice) }),
        ...(body.salePrice   !== undefined && { salePrice: body.salePrice ? Number(body.salePrice) : null }),
        ...(body.active      !== undefined && { active: body.active }),
        updatedAt: new Date(),
      },
    })
    return NextResponse.json({ config })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
