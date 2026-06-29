import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const host     = req.headers.get('host') || ''
  const { pathname } = req.nextUrl

  const isAdminSubdomain =
    host === 'admin.webbyte.online' ||
    host === 'admin.webbyte.tech'   ||
    host.startsWith('admin.localhost')

  // ── ADMIN SUBDOMAIN ─────────────────────────────────────────────────────────
  if (isAdminSubdomain) {
    // API routes pass through as-is
    if (pathname.startsWith('/api/')) return NextResponse.next()

    // Rewrite: admin.webbyte.online/* → /admin/*
    const url = req.nextUrl.clone()
    if (!pathname.startsWith('/admin')) {
      url.pathname = '/admin' + (pathname === '/' ? '' : pathname)
    }

    // Pass custom header so root layout knows this is admin context
    const reqHeaders = new Headers(req.headers)
    reqHeaders.set('x-is-admin', '1')

    return NextResponse.rewrite(url, { request: { headers: reqHeaders } })
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
