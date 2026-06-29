import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })

    // Constant-time: check password even if user not found to avoid timing attacks
    const hash = user?.password || '$2a$12$invalidhashpadding000000000000000000000000000000000000'
    const valid = await bcrypt.compare(password, hash)

    if (!user || !valid || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    // Sign JWT
    const token = await new SignJWT({ id: user.id, email: user.email, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(secret)

    const res = NextResponse.json({ success: true })

    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge:   60 * 60 * 24 * 7, // 7 days
      path:     '/',
      // shared across admin.webbyte.online and webbyte.online
      domain:   process.env.NODE_ENV === 'production' ? '.webbyte.online' : undefined,
    })

    return res
  } catch (err: any) {
    console.error('[Admin login]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
