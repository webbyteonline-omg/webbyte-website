import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { getToken } from 'next-auth/jwt'

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)

async function verifyAdminToken(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as { id: string; email: string; role: string }
  } catch {
    return null
  }
}

export async function middleware(req: NextRequest) {
  const host      = req.headers.get('host') || ''
  const { pathname } = req.nextUrl

  const isAdminSubdomain =
    host === 'admin.webbyte.online' ||
    host === 'admin.webbyte.tech'   ||
    host.startsWith('admin.localhost')

  // ── ADMIN SUBDOMAIN ────────────────────────────────────────────────────────
  if (isAdminSubdomain) {
    // Always let API routes through (login endpoint, NextAuth, etc.)
    if (pathname.startsWith('/api/')) return NextResponse.next()

    const admin = await verifyAdminToken(req)

    if (!admin || admin.role !== 'ADMIN') {
      // Not authenticated → redirect to admin login
      if (pathname !== '/admin/login') {
        const url = req.nextUrl.clone()
        url.pathname = '/admin/login'
        return NextResponse.redirect(url)
      }
      return NextResponse.next()
    }

    // Authenticated ADMIN — if they hit /admin/login, send them to dashboard
    if (pathname === '/admin/login') {
      const url = req.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  }

  // ── MAIN DOMAIN — protect client routes with NextAuth ──────────────────────
  const protectedPaths = ['/dashboard', '/orders', '/profile']
  const isProtected    = protectedPaths.some(p => pathname.startsWith(p))

  if (isProtected) {
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
