import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Default product catalog (used as seed when table is empty)
const DEFAULT_PRODUCTS = [
  { productId: 'website',   productName: 'Custom Website',              category: 'website', basePrice: 9999 },
  { productId: 'billpro',   productName: 'BillPro — Billing Software',  category: 'billing', basePrice: 4999 },
  { productId: 'invoicex',  productName: 'InvoiceX — Invoice Manager',  category: 'billing', basePrice: 2999 },
  { productId: 'restaurant',productName: 'Restaurant Website',          category: 'website', basePrice: 9999 },
  { productId: 'clinic',    productName: 'Clinic & Doctor Website',     category: 'website', basePrice: 9999 },
  { productId: 'hotel',     productName: 'Hotel & Resort Website',      category: 'website', basePrice: 12999 },
  { productId: 'ecommerce', productName: 'E-Commerce Store',           category: 'website', basePrice: 14999 },
  { productId: 'grocery-billing',   productName: 'Grocery Billing Software',   category: 'billing', basePrice: 7999 },
  { productId: 'medical-billing',   productName: 'Medical Billing Software',   category: 'billing', basePrice: 9999 },
  { productId: 'hardware-billing',  productName: 'Hardware Billing Software',  category: 'billing', basePrice: 7999 },
]

export async function GET() {
  try {
    let configs = await prisma.productConfig.findMany({ orderBy: { category: 'asc' } })

    // Seed defaults on first run
    if (configs.length === 0) {
      await prisma.productConfig.createMany({
        data: DEFAULT_PRODUCTS.map(p => ({ ...p, updatedAt: new Date() })),
        skipDuplicates: true,
      })
      configs = await prisma.productConfig.findMany({ orderBy: { category: 'asc' } })
    }

    return NextResponse.json({ configs })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const config = await prisma.productConfig.upsert({
      where: { productId: body.productId },
      update: { productName: body.productName, category: body.category, basePrice: Number(body.basePrice), salePrice: body.salePrice ? Number(body.salePrice) : null, active: body.active ?? true, updatedAt: new Date() },
      create: { productId: body.productId, productName: body.productName, category: body.category || 'website', basePrice: Number(body.basePrice), salePrice: body.salePrice ? Number(body.salePrice) : null, updatedAt: new Date() },
    })
    return NextResponse.json({ config }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
