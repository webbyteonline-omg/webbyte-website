'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, ChevronDown, Globe, LogOut, User, LayoutDashboard, ShoppingBag } from 'lucide-react'

const navLinks = [
  { label: 'Home',       href: '/'           },
  { label: 'Industries', href: '/industries' },
  { label: 'Products',   href: '/products'   },
  { label: 'Portfolio',  href: '/portfolio'  },
  { label: 'Blog',       href: '/blog'       },
]

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenu, setUserMenu] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close menus on route change
  useEffect(() => { setIsOpen(false); setUserMenu(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 bg-purple-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-gray-900">
              Web<span className="text-purple-700">Byte</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'text-purple-700 bg-purple-50'
                      : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-purple-50 transition-colors text-sm font-medium text-gray-700"
                >
                  <div className="w-7 h-7 bg-purple-700 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span>{session.user?.name?.split(' ')[0]}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${userMenu ? 'rotate-180' : ''}`} />
                </button>

                {userMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenu(false)} />
                    <div className="absolute right-0 top-12 w-52 bg-white rounded-xl border border-gray-100 shadow-xl py-1.5 z-50">
                      <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="text-sm font-semibold text-gray-800 truncate">{session.user?.name}</p>
                      </div>
                      <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700" onClick={() => setUserMenu(false)}>
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link href="/orders" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700" onClick={() => setUserMenu(false)}>
                        <ShoppingBag className="w-4 h-4" /> My Orders
                      </Link>
                      <div className="border-t border-gray-50 mt-1 pt-1">
                        <button
                          onClick={() => { signOut({ callbackUrl: '/' }); setUserMenu(false) }}
                          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link href="/signin" className="text-sm font-medium text-gray-600 hover:text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
                  Sign In
                </Link>
                <Link href="/order" className="btn-primary !py-2 !px-5 text-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-purple-50 transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 bg-white">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-1 ${
                    active ? 'text-purple-700 bg-purple-50' : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2 px-4">
              {session ? (
                <>
                  <Link href="/orders" className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-purple-50 rounded-lg" onClick={() => setIsOpen(false)}>
                    <ShoppingBag className="w-4 h-4" /> My Orders
                  </Link>
                  <button onClick={() => { signOut({ callbackUrl: '/' }) }} className="btn-secondary w-full justify-center text-sm">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/signin" className="btn-secondary w-full text-center text-sm" onClick={() => setIsOpen(false)}>Sign In</Link>
                  <Link href="/order"  className="btn-primary w-full text-center text-sm"   onClick={() => setIsOpen(false)}>Get Started</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
