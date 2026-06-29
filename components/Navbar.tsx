'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, ChevronDown, Globe, LogOut, User, LayoutDashboard } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Order Now', href: '/order' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenu, setUserMenu] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-purple-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-gray-900">
              Web<span className="text-purple-700">Byte</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  link.label === 'Order Now'
                    ? 'btn-primary !py-2 !px-5 ml-2'
                    : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-purple-50 transition-colors text-sm font-medium text-gray-700"
                >
                  <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-purple-700" />
                  </div>
                  {session.user?.name?.split(' ')[0]}
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {userMenu && (
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-xl border border-gray-100 shadow-lg py-1 z-50">
                    <Link
                      href={session.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? '/admin' : '/dashboard'}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      onClick={() => setUserMenu(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { signOut(); setUserMenu(false) }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-purple-700 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary !py-2 !px-4 text-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-purple-50" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2 px-4">
              {session ? (
                <button onClick={() => signOut()} className="btn-secondary w-full justify-center text-sm">
                  Sign Out
                </button>
              ) : (
                <>
                  <Link href="/login" className="btn-secondary w-full text-center text-sm" onClick={() => setIsOpen(false)}>Sign In</Link>
                  <Link href="/register" className="btn-primary w-full text-center text-sm" onClick={() => setIsOpen(false)}>Get Started</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
