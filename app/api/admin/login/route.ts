import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Admin credentials come from Vercel env vars — not hardcoded in code
function checkCredentials(email: string, password: string) {
  const validEmail = process.env.ADMIN_EMAIL
  const validPass  = process.env.ADMIN_PASSWORD

  if (!validEmail || !validPass) return false

  // Constant-time comparison to prevent timing attacks
  const emailOk = crypto.timingSafeEqual(
    Buffer.from(email.toLowerCase()),
    Buffer.from(validEmail.toLowerCase())
  )
  const passOk = crypto.timingSafeEqual(
    Buffer.from(password),
    Buffer.from(validPass)
  )
  return emailOk && passOk
}

function signToken(email: string): string {
  const payload = Buffer.from(JSON.stringify({ email, role: 'ADMIN', exp: Date.now() + 7 * 86400000 })).toString('base64url')
  const sig     = crypto.createHmac('sha256', process.env.NEXTAUTH_SECRET || 'fallback-secret').update(payload).digest('base64url')
  return `${payload}.${sig}`
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required.' }, { status: 400 })
    }

    // Lengths must match for timingSafeEqual — handle mismatch gracefully
    let valid = false
    try {
      valid = checkCredentials(email.trim(), password)
    } catch {
      valid = false
    }

    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const token = signToken(email.trim())

    const res = NextResponse.json({ success: true })
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge:   60 * 60 * 24 * 7,
      path:     '/',
      domain:   process.env.NODE_ENV === 'production' ? '.webbyte.online' : undefined,
    })

    return res
  } catch (err: any) {
    console.error('[Admin login error]', err)
    return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 })
  }
}
