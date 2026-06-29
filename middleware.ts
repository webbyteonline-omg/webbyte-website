import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getToken } from 'next-auth/jwt'

function verifyAdminToken(token: string): { email: string; role: string } | null {
  try {
    const [payload, sig] = token.split('.')
    if (!payload || !sig) return null

    const expected = crypto
      .createHmac('sha256', process.env.NEXTAUTH_SECRET || 'fallback-secret')
      .update(payload)
      .digest('base64url')

    const sigOk = crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
    if (!sigOk) return null

    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    if (data.exp < Date.now()) return null   // expired

    return data
  } catch {
    return null
  }
}

export async function middleware(req: NextRequest) {
  const host     = req.headers.get('host') || ''
  const { pathname } = req.nextUrl

  const isAdminSubdomain =
    host === 'admin.webbyte.online' ||
    host === 'admin.webbyte.tech'   ||
    host.startsWith('admin.localhost')

  // ── ADMIN SUBDOMAIN ─────────────────────────────────────────────────────────
  if (isAdminSubdomain) {
    // Always let API routes through
    if (pathname.startsWith('/api/')) return NextResponse.next()

    const cookie = req.cookies.get('admin_token')?.value
    const admin  = cookie ? verifyAdminToken(cookie) : null

    if (!admin || admin.role !== 'ADMIN') {
      if (pathname !== '/admin/login') {
        const url = req.nextUrl.clone()
        url.pathname = '/admin/login'
        return NextResponse.redirect(url)
      }
      return NextResponse.next()
    }

    // Already logged in → skip login page
    if (pathname === '/admin/login') {
      const url = req.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  }

  // ── MAIN DOMAIN — protect client routes ─────────────────────────────────────
  const protectedPaths = ['/dashboard', '/orders', '/profile']
  if (protectedPaths.some(p => pathname.startsWith(p))) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|icons|public).*)'],
}
