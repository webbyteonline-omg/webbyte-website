import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const schema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters'),
  phone:    z.string().min(10, 'Enter a valid phone number').max(15),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  company:  z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    // Check if phone already registered
    const existing = await prisma.user.findFirst({ where: { phone: data.phone } })
    if (existing) {
      return NextResponse.json({ error: 'This phone number is already registered. Please sign in.' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(data.password, 12)

    // Use synthetic email since Prisma adapter requires unique email
    const syntheticEmail = `${data.phone}@webbyte.user`

    const user = await prisma.user.create({
      data: {
        name:     data.name,
        phone:    data.phone,
        email:    syntheticEmail,
        password: hashed,
        company:  data.company,
        role:     'CLIENT',
      },
    })

    return NextResponse.json({ id: user.id, name: user.name }, { status: 201 })
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return NextResponse.json({ error: err.errors[0]?.message || 'Invalid input' }, { status: 422 })
    }
    console.error('Register error:', err)
    return NextResponse.json({ error: err.message || 'Registration failed' }, { status: 500 })
  }
}
