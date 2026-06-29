'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Globe, Phone, Lock, User, Briefcase, Eye, EyeOff, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

export default function SignUpPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', phone: '', password: '', company: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.password) { toast.error('Please fill all required fields'); return }
    if (form.phone.length < 10) { toast.error('Enter a valid 10-digit phone number'); return }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Registration failed')
        return
      }

      // Auto sign in after registration
      const result = await signIn('credentials', {
        phone: form.phone,
        password: form.password,
        redirect: false,
      })

      if (result?.ok) {
        toast.success('Account created! Welcome to WebByte 🎉')
        router.push('/dashboard')
        router.refresh()
      } else {
        toast.success('Account created! Please sign in.')
        router.push('/signin')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const perks = ['Track all your orders', 'Get priority support', 'Access product updates', 'Download invoices']

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-50 via-white to-white">

      {/* Left pane — benefits */}
      <div className="hidden lg:flex flex-col justify-center px-16 py-12 bg-purple-700 w-2/5 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 mb-12">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold text-white">WebByte</span>
        </Link>
        <h2 className="text-3xl font-extrabold text-white mb-4 leading-tight">Your digital growth starts here</h2>
        <p className="text-purple-200 mb-10">Join 200+ Indian businesses already using WebByte to go digital.</p>
        <ul className="space-y-4">
          {perks.map(p => (
            <li key={p} className="flex items-center gap-3 text-white">
              <CheckCircle2 className="w-5 h-5 text-purple-300 flex-shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Right pane — form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          <div className="text-center mb-8 lg:text-left">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 lg:hidden">
              <div className="w-9 h-9 bg-purple-700 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-gray-900">Web<span className="text-purple-700">Byte</span></span>
            </Link>
            <h1 className="text-2xl font-extrabold text-gray-900">Create your account</h1>
            <p className="text-gray-500 mt-1 text-sm">Track orders, get support, manage your products</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="label">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={form.name} onChange={set('name')} placeholder="Sachin Kumar" className="input-field pl-10" required />
                </div>
              </div>

              <div>
                <label className="label">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="tel" value={form.phone} onChange={set('phone')} placeholder="9876543210"
                    className="input-field pl-10" inputMode="numeric" maxLength={10} required />
                </div>
                <p className="text-xs text-gray-400 mt-1">This is your login ID — no OTP needed</p>
              </div>

              <div>
                <label className="label">Business Name <span className="text-gray-400 font-normal">(optional)</span></label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={form.company} onChange={set('company')} placeholder="Your Business" className="input-field pl-10" />
                </div>
              </div>

              <div>
                <label className="label">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={set('password')}
                    placeholder="Minimum 6 characters"
                    className="input-field pl-10 pr-10"
                    required
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-base py-3 mt-2">
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account…</>
                  : <>Create Account <ArrowRight className="w-4 h-4" /></>
                }
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              Already have an account?{' '}
              <Link href="/signin" className="text-purple-700 font-semibold hover:underline">Sign in</Link>
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            By creating an account you agree to our{' '}
            <Link href="/terms" className="hover:text-purple-700">Terms</Link> &{' '}
            <Link href="/privacy" className="hover:text-purple-700">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
