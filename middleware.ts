import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const host      = req.headers.get('host') || ''
  const { pathname } = req.nextUrl

  const isAdminSubdomain =
    host === 'admin.webbyte.online' ||
    host === 'admin.webbyte.tech'   ||
    host.startsWith('admin.')       // catches localhost:3001 admin testing

  // ── ADMIN SUBDOMAIN ROUTING ────────────────────────────────────────────────
  if (isAdminSubdomain) {
    // Let NextAuth API routes through (needed for login to work)
    if (pathname.startsWith('/api/auth')) return NextResponse.next()

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    // Not logged in → redirect to admin login page
    if (!token) {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      if (pathname !== '/admin/login') return NextResponse.redirect(loginUrl)
      return NextResponse.next()
    }

    // Logged in but not ADMIN → redirect to admin login
    if (token.role !== 'ADMIN') {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      return NextResponse.redirect(loginUrl)
    }

    // ADMIN user — let through
    return NextResponse.next()
  }

  // ── MAIN DOMAIN — CLIENT AUTH PROTECTION ───────────────────────────────────
  const protectedPaths = ['/dashboard', '/orders', '/profile']
  const isProtected    = protectedPaths.some(p => pathname.startsWith(p))

  if (isProtected) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token) {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/login'
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip static files and Next internals
    '/((?!_next/static|_next/image|favicon.ico|images|icons|public).*)',
  ],
}
