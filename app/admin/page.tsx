'use client'
import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  LayoutDashboard, Package, LayoutGrid, Users, TrendingUp, FileText,
  LogOut, RefreshCw, Search, X, CheckCircle2, Clock, Loader2, Calendar,
  MessageCircle, Phone, BarChart3, ShieldCheck, Filter, Menu, Save,
  AlertCircle, ArrowRight, IndianRupee, Mail, Target, Check, Copy,
  ExternalLink, Download, Printer, Plus, Eye, EyeOff, Pencil, Trash2,
  Globe, Tag, Sparkles, Percent, Gift, Image as ImageIcon, ToggleLeft,
  ToggleRight, Zap, PaintBucket, AlignLeft, Link, BadgePercent, Layers,
  SlidersHorizontal, ChevronDown, ChevronUp, Star
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────
type Tab = 'dashboard' | 'orders' | 'pipeline' | 'customers' | 'revenue' | 'offers' | 'banners' | 'pricing' | 'blog'

interface Offer {
  id: string; title: string; code: string; discountType: string; discountValue: number
  description: string | null; minOrderValue: number | null; maxUses: number | null
  usedCount: number; active: boolean; expiresAt: string | null; createdAt: string
}

interface SiteBanner {
  id: string; title: string; subtitle: string | null; badge: string | null
  ctaText: string | null; ctaLink: string | null; gradient: string; position: string
  style: string; active: boolean; priority: number; startsAt: string | null; endsAt: string | null
  createdAt: string
}

interface ProductConfig {
  id: string; productId: string; productName: string; category: string
  basePrice: number; salePrice: number | null; active: boolean; updatedAt: string
}

interface Order {
  id: string; orderNumber: string; customerName: string; customerEmail: string
  customerPhone: string; productId: string; productName: string; productPrice: number
  requirements: string | null; status: string; paymentStatus: string
  paymentMethod: string | null; paymentId: string | null
  deliveryDate: string | null; notes: string | null
  createdAt: string; updatedAt: string
}

interface BlogPost {
  id: string; title: string; slug: string; excerpt: string; content: string
  coverImage: string | null; tags: string | null; published: boolean
  publishedAt: string | null; createdAt: string; updatedAt: string
}

// ── Constants ──────────────────────────────────────────────────────────────
const STATUS_OPTS  = ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']
const PAYMENT_OPTS = ['UNPAID', 'PARTIAL', 'PAID', 'REFUNDED']
const KANBAN_COLS  = ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED']
const KANBAN_LABEL: Record<string, string> = { PENDING: 'Pending', CONFIRMED: 'Confirmed', IN_PROGRESS: 'In Progress', COMPLETED: 'Completed' }

const STATUS_CLS: Record<string, string> = {
  PENDING:     'bg-amber-50 text-amber-700 border-amber-200',
  CONFIRMED:   'bg-blue-50 text-blue-700 border-blue-200',
  IN_PROGRESS: 'bg-violet-50 text-violet-700 border-violet-200',
  COMPLETED:   'bg-green-50 text-green-700 border-green-200',
  CANCELLED:   'bg-red-50 text-red-600 border-red-200',
}
const STATUS_DOT: Record<string, string> = {
  PENDING: 'bg-amber-500', CONFIRMED: 'bg-blue-500', IN_PROGRESS: 'bg-violet-500', COMPLETED: 'bg-green-500', CANCELLED: 'bg-red-500',
}
const PAY_CLS: Record<string, string> = {
  PAID:     'bg-green-50 text-green-700 border border-green-200',
  UNPAID:   'bg-red-50 text-red-600 border border-red-200',
  PARTIAL:  'bg-amber-50 text-amber-700 border border-amber-200',
  REFUNDED: 'bg-gray-100 text-gray-500 border border-gray-200',
}

// ── Helpers ────────────────────────────────────────────────────────────────
const fmt      = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })
const money    = (n: number) => `₹${n.toLocaleString('en-IN')}`
const waLink   = (p: string) => `https://wa.me/${p.replace(/\D/g, '').replace(/^(?!91)(\d{10})$/, '91$1')}`
const slugify  = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const daysLeft = (d: string | null): number | null => d ? Math.ceil((new Date(d).getTime() - Date.now()) / 86400000) : null

const printInvoice = (o: Order) => {
  const win = window.open('', '_blank')
  if (!win) return
  win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Invoice #${o.orderNumber} | WebByte</title>
  <style>*{box-sizing:border-box}body{font-family:Arial,sans-serif;max-width:620px;margin:40px auto;color:#111;padding:0 20px}
  .logo{font-size:26px;font-weight:900;color:#7c3aed}.sub{font-size:12px;color:#888;margin-top:2px}
  .divider{border:none;border-top:3px solid #7c3aed;margin:20px 0}
  .row{display:flex;justify-content:space-between;gap:20px;margin-bottom:20px}
  .lbl{font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px}
  .val{font-size:14px;font-weight:600}table{width:100%;border-collapse:collapse;margin-top:16px}
  th{padding:10px;text-align:left;font-size:11px;color:#888;text-transform:uppercase;background:#f9f0ff}
  td{padding:12px 10px;border-bottom:1px solid #eee;font-size:14px}
  .amt{text-align:right;font-weight:700}.total{font-size:28px;font-weight:900;color:#7c3aed}
  .badge{display:inline-block;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:700}
  .PAID{background:#d1fae5;color:#065f46}.UNPAID{background:#fee2e2;color:#991b1b}.PARTIAL{background:#fef3c7;color:#92400e}
  .footer{margin-top:40px;border-top:1px solid #eee;padding-top:16px;text-align:center;font-size:12px;color:#aaa}
  .print-btn{margin-top:20px;padding:10px 24px;background:#7c3aed;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-size:14px}
  @media print{.print-btn{display:none}}</style></head><body>
  <div class="logo">WebByte</div><div class="sub">webbyte.online · support@webbyte.online</div>
  <hr class="divider"/>
  <div class="row">
    <div><div class="lbl">Invoice</div><div style="font-size:22px;font-weight:900">#${o.orderNumber}</div></div>
    <div style="text-align:right"><div class="lbl">Date</div><div class="val">${new Date(o.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</div>
    <div style="margin-top:6px"><span class="badge ${o.paymentStatus}">${o.paymentStatus}</span></div></div>
  </div>
  <div class="row">
    <div><div class="lbl">Bill To</div><div class="val" style="font-size:16px">${o.customerName}</div>
    <div style="color:#555;font-size:13px">${o.customerEmail}</div><div style="color:#555;font-size:13px">${o.customerPhone}</div></div>
    ${o.deliveryDate ? `<div style="text-align:right"><div class="lbl">Delivery By</div><div class="val">${new Date(o.deliveryDate).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</div></div>` : ''}
  </div>
  <table><thead><tr><th>Description</th><th class="amt">Amount</th></tr></thead><tbody>
  <tr><td><strong>${o.productName}</strong>${o.requirements ? `<br/><span style="color:#888;font-size:12px">${o.requirements.slice(0,120)}</span>` : ''}</td>
  <td class="amt">₹${o.productPrice.toLocaleString('en-IN')}</td></tr></tbody></table>
  <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:20px;border-top:2px solid #eee;padding-top:16px">
    <div><div class="lbl">Total Amount</div><div class="total">₹${o.productPrice.toLocaleString('en-IN')}</div></div>
    ${o.paymentMethod ? `<div style="text-align:right"><div class="lbl">Payment Method</div><div class="val">${o.paymentMethod}</div>${o.paymentId ? `<div style="font-size:11px;color:#aaa;font-family:monospace">${o.paymentId}</div>` : ''}</div>` : ''}
  </div>
  ${o.notes ? `<div style="margin-top:20px;background:#f9f9f9;border-left:3px solid #7c3aed;padding:12px;font-size:13px;color:#555;border-radius:4px"><strong>Notes:</strong> ${o.notes}</div>` : ''}
  <div class="footer">Thank you for choosing WebByte. Source code included · 1 month support included.<br/>For support: support@webbyte.online</div>
  <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
  </body></html>`)
  win.document.close()
}

const exportCSV = (orders: Order[]) => {
  const header = ['Order #', 'Date', 'Customer', 'Email', 'Phone', 'Product', 'Amount', 'Payment Status', 'Order Status', 'Delivery Date', 'Notes']
  const rows   = orders.map(o => [
    o.orderNumber, fmt(o.createdAt), o.customerName, o.customerEmail, o.customerPhone,
    o.productName, o.productPrice, o.paymentStatus, o.status,
    o.deliveryDate ? fmt(o.deliveryDate) : '', o.notes || '',
  ])
  const csv  = [header, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = `webbyte-orders-${new Date().toISOString().slice(0, 10)}.csv`; a.click()
  URL.revokeObjectURL(url)
}

// ── Component ──────────────────────────────────────────────────────────────
export default function AdminPage() {
  // Core
  const [tab,         setTab]        = useState<Tab>('dashboard')
  const [orders,      setOrders]     = useState<Order[]>([])
  const [loading,     setLoading]    = useState(true)
  const [refreshing,  setRefreshing] = useState(false)
  const [sidebarOpen, setSidebar]    = useState(false)

  // Orders tab
  const [search,      setSearch]      = useState('')
  const [statusFilter,setStatusFilter]= useState('ALL')
  const [dateFrom,    setDateFrom]    = useState('')
  const [dateTo,      setDateTo]      = useState('')

  // Order drawer
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selOrder,   setSelOrder]   = useState<Order | null>(null)
  const [eStatus,    setEStatus]    = useState('')
  const [ePayStatus, setEPayStatus] = useState('')
  const [eNotes,     setENotes]     = useState('')
  const [eDelivery,  setEDelivery]  = useState('')
  const [saving,     setSaving]     = useState(false)
  const [saved,      setSaved]      = useState(false)
  const [copied,     setCopied]     = useState(false)

  // Blog tab
  const [blogPosts,    setBlogPosts]    = useState<BlogPost[]>([])
  const [blogLoading,  setBlogLoading]  = useState(false)
  const [blogDrawer,   setBlogDrawer]   = useState(false)
  const [editPost,     setEditPost]     = useState<BlogPost | null>(null)
  const [bTitle,       setBTitle]       = useState('')
  const [bSlug,        setBSlug]        = useState('')
  const [bExcerpt,     setBExcerpt]     = useState('')
  const [bContent,     setBContent]     = useState('')
  const [bCover,       setBCover]       = useState('')
  const [bTags,        setBTags]        = useState('')
  const [bSaving,      setBSaving]      = useState(false)
  const [bSaved,       setBSaved]       = useState(false)
  const [bError,       setBError]       = useState('')
  const [deleteConfirm,setDeleteConfirm]= useState<string | null>(null)

  // Offers tab
  const [offers,       setOffers]      = useState<Offer[]>([])
  const [offersLoad,   setOffersLoad]  = useState(false)
  const [offerForm,    setOfferForm]   = useState(false)
  const [oTitle,       setOTitle]      = useState('')
  const [oCode,        setOCode]       = useState('')
  const [oType,        setOType]       = useState<'PERCENTAGE'|'FIXED'>('PERCENTAGE')
  const [oValue,       setOValue]      = useState('')
  const [oDesc,        setODesc]       = useState('')
  const [oMin,         setOMin]        = useState('')
  const [oMaxUses,     setOMaxUses]    = useState('')
  const [oExpiry,      setOExpiry]     = useState('')
  const [oSaving,      setOSaving]     = useState(false)
  const [oError,       setOError]      = useState('')

  // Banners tab
  const [banners,      setBanners]     = useState<SiteBanner[]>([])
  const [bannersLoad,  setBannersLoad] = useState(false)
  const [bannerForm,   setBannerForm]  = useState(false)
  const [editBanner,   setEditBanner]  = useState<SiteBanner | null>(null)
  const [bnTitle,      setBnTitle]     = useState('')
  const [bnSub,        setBnSub]       = useState('')
  const [bnBadge,      setBnBadge]     = useState('')
  const [bnCta,        setBnCta]       = useState('')
  const [bnLink,       setBnLink]      = useState('')
  const [bnGrad,       setBnGrad]      = useState('from-purple-600 to-indigo-700')
  const [bnPos,        setBnPos]       = useState('homepage')
  const [bnStyle,      setBnStyle]     = useState('strip')
  const [bnPriority,   setBnPriority]  = useState('0')
  const [bnStart,      setBnStart]     = useState('')
  const [bnEnd,        setBnEnd]       = useState('')
  const [bnSaving,     setBnSaving]    = useState(false)
  const [bnError,      setBnError]     = useState('')
  const [bnSaved,      setBnSaved]     = useState(false)

  // Pricing tab
  const [configs,      setConfigs]     = useState<ProductConfig[]>([])
  const [configsLoad,  setConfigsLoad] = useState(false)
  const [editingPrice, setEditingPrice]= useState<string | null>(null)
  const [pBase,        setPBase]       = useState('')
  const [pSale,        setPSale]       = useState('')
  const [pSaving,      setPSaving]     = useState(false)

  // ── Fetches ─────────────────────────────────────────────────────────────
  const fetchOrders = useCallback(async (silent = false) => {
    silent ? setRefreshing(true) : setLoading(true)
    try { const r = await fetch('/api/admin/orders'); const j = await r.json(); setOrders(j.orders || []) }
    catch (e) { console.error(e) }
    finally { setLoading(false); setRefreshing(false) }
  }, [])

  const fetchBlog = useCallback(async () => {
    setBlogLoading(true)
    try { const r = await fetch('/api/admin/blog'); const j = await r.json(); setBlogPosts(j.posts || []) }
    catch (e) { console.error(e) }
    finally { setBlogLoading(false) }
  }, [])

  const fetchOffers = useCallback(async () => {
    setOffersLoad(true)
    try { const r = await fetch('/api/admin/offers'); const j = await r.json(); setOffers(j.offers || []) }
    catch (e) { console.error(e) }
    finally { setOffersLoad(false) }
  }, [])

  const fetchBanners = useCallback(async () => {
    setBannersLoad(true)
    try { const r = await fetch('/api/admin/banners'); const j = await r.json(); setBanners(j.banners || []) }
    catch (e) { console.error(e) }
    finally { setBannersLoad(false) }
  }, [])

  const fetchConfigs = useCallback(async () => {
    setConfigsLoad(true)
    try { const r = await fetch('/api/admin/pricing'); const j = await r.json(); setConfigs(j.configs || []) }
    catch (e) { console.error(e) }
    finally { setConfigsLoad(false) }
  }, [])

  useEffect(() => { fetchOrders() }, [fetchOrders])
  useEffect(() => { if (tab === 'blog')    fetchBlog()    }, [tab, fetchBlog])
  useEffect(() => { if (tab === 'offers')  fetchOffers()  }, [tab, fetchOffers])
  useEffect(() => { if (tab === 'banners') fetchBanners() }, [tab, fetchBanners])
  useEffect(() => { if (tab === 'pricing') fetchConfigs() }, [tab, fetchConfigs])

  // ── Order drawer ─────────────────────────────────────────────────────────
  const openDrawer = (o: Order) => {
    setSelOrder(o); setEStatus(o.status); setEPayStatus(o.paymentStatus)
    setENotes(o.notes || ''); setEDelivery(o.deliveryDate ? o.deliveryDate.slice(0, 10) : '')
    setDrawerOpen(true); setSaved(false)
  }
  const closeDrawer = () => { setDrawerOpen(false); setSelOrder(null) }
  const saveDrawer  = async () => {
    if (!selOrder) return
    setSaving(true)
    await fetch(`/api/admin/orders/${selOrder.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: eStatus, paymentStatus: ePayStatus, notes: eNotes, deliveryDate: eDelivery || null }),
    })
    await fetchOrders(true)
    setSelOrder(p => p ? { ...p, status: eStatus, paymentStatus: ePayStatus, notes: eNotes, deliveryDate: eDelivery || null } : null)
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000)
  }
  const copyNum = (n: string) => { navigator.clipboard.writeText(n); setCopied(true); setTimeout(() => setCopied(false), 1500) }

  // ── Blog drawer ──────────────────────────────────────────────────────────
  const openBlogCreate = () => {
    setEditPost(null); setBTitle(''); setBSlug(''); setBExcerpt(''); setBContent(''); setBCover(''); setBTags('')
    setBError(''); setBSaved(false); setBlogDrawer(true)
  }
  const openBlogEdit = (p: BlogPost) => {
    setEditPost(p); setBTitle(p.title); setBSlug(p.slug); setBExcerpt(p.excerpt); setBContent(p.content)
    setBCover(p.coverImage || ''); setBTags(p.tags || ''); setBError(''); setBSaved(false); setBlogDrawer(true)
  }
  const saveBlog = async () => {
    if (!bTitle.trim() || !bSlug.trim()) { setBError('Title and slug are required'); return }
    setBSaving(true); setBError('')
    const url    = editPost ? `/api/admin/blog/${editPost.id}` : '/api/admin/blog'
    const method = editPost ? 'PATCH' : 'POST'
    const r      = await fetch(url, {
      method, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: bTitle, slug: bSlug, excerpt: bExcerpt, content: bContent, coverImage: bCover || null, tags: bTags || null }),
    })
    if (!r.ok) { const j = await r.json(); setBError(j.error || 'Save failed'); setBSaving(false); return }
    await fetchBlog(); setBSaving(false); setBSaved(true); setTimeout(() => { setBSaved(false); setBlogDrawer(false) }, 1000)
  }
  const togglePublish = async (p: BlogPost) => {
    await fetch(`/api/admin/blog/${p.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !p.published }) })
    await fetchBlog()
  }
  const deletePost = async (id: string) => {
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' }); setDeleteConfirm(null); await fetchBlog()
  }

  const logout = async () => { await fetch('/api/admin/logout', { method: 'POST' }); window.location.href = '/admin/login' }

  // ── Derived data ─────────────────────────────────────────────────────────
  const paidOrders   = useMemo(() => orders.filter(o => o.paymentStatus === 'PAID'), [orders])
  const totalRevenue = useMemo(() => paidOrders.reduce((s, o) => s + o.productPrice, 0), [paidOrders])
  const unpaidOrders = useMemo(() => orders.filter(o => o.paymentStatus !== 'PAID' && o.status !== 'CANCELLED'), [orders])
  const outstanding  = useMemo(() => unpaidOrders.reduce((s, o) => s + o.productPrice, 0), [unpaidOrders])
  const overdueOrders= useMemo(() => orders.filter(o => o.deliveryDate && daysLeft(o.deliveryDate) !== null && (daysLeft(o.deliveryDate) as number) < 0 && o.status !== 'COMPLETED' && o.status !== 'CANCELLED'), [orders])

  const now   = new Date()
  const thisMonthPaid = useMemo(() => paidOrders.filter(o => { const d = new Date(o.createdAt); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() }), [paidOrders])
  const lastMonthPaid = useMemo(() => {
    let m = now.getMonth() - 1, y = now.getFullYear(); if (m < 0) { m = 11; y-- }
    return paidOrders.filter(o => { const d = new Date(o.createdAt); return d.getMonth() === m && d.getFullYear() === y })
  }, [paidOrders])

  const monthlyRevenue = useMemo(() => Array.from({ length: 6 }, (_, i) => {
    const d  = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    const mo = paidOrders.filter(o => { const od = new Date(o.createdAt); return od.getMonth() === d.getMonth() && od.getFullYear() === d.getFullYear() })
    return { month: d.toLocaleDateString('en-IN', { month: 'short' }), revenue: mo.reduce((s, o) => s + o.productPrice, 0), count: mo.length }
  }), [paidOrders])

  const maxRev = useMemo(() => Math.max(...monthlyRevenue.map(m => m.revenue), 1), [monthlyRevenue])

  const customers = useMemo(() => {
    const map = new Map<string, { name: string; email: string; phone: string; count: number; spent: number; lastOrder: string; products: Set<string> }>()
    orders.forEach(o => {
      const ex = map.get(o.customerEmail)
      if (ex) { ex.count++; if (o.paymentStatus === 'PAID') ex.spent += o.productPrice; if (o.createdAt > ex.lastOrder) ex.lastOrder = o.createdAt; ex.products.add(o.productName) }
      else map.set(o.customerEmail, { name: o.customerName, email: o.customerEmail, phone: o.customerPhone, count: 1, spent: o.paymentStatus === 'PAID' ? o.productPrice : 0, lastOrder: o.createdAt, products: new Set([o.productName]) })
    })
    return Array.from(map.values()).sort((a, b) => b.spent - a.spent)
  }, [orders])

  const productMix = useMemo(() => {
    const map = new Map<string, { name: string; count: number; revenue: number }>()
    orders.forEach(o => { const ex = map.get(o.productName); if (ex) { ex.count++; if (o.paymentStatus === 'PAID') ex.revenue += o.productPrice } else map.set(o.productName, { name: o.productName, count: 1, revenue: o.paymentStatus === 'PAID' ? o.productPrice : 0 }) })
    return Array.from(map.values()).sort((a, b) => b.count - a.count)
  }, [orders])

  const filteredOrders = useMemo(() => {
    let list = statusFilter === 'ALL' ? orders : orders.filter(o => o.status === statusFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(o => o.customerName.toLowerCase().includes(q) || o.customerEmail.toLowerCase().includes(q) || o.orderNumber.toLowerCase().includes(q) || o.productName.toLowerCase().includes(q) || o.customerPhone.includes(q))
    }
    if (dateFrom) list = list.filter(o => o.createdAt >= dateFrom)
    if (dateTo)   list = list.filter(o => o.createdAt <= dateTo + 'T23:59:59')
    return list
  }, [orders, statusFilter, search, dateFrom, dateTo])

  // ── Nav ──────────────────────────────────────────────────────────────────
  type NavSection = { section: string; items: { id: Tab; label: string; Icon: any; badge?: number }[] }
  const navSections: NavSection[] = [
    { section: 'OPERATIONS', items: [
      { id: 'dashboard', label: 'Dashboard',  Icon: LayoutDashboard },
      { id: 'orders',    label: 'Orders',     Icon: Package,    badge: orders.filter(o => o.status === 'PENDING').length || undefined },
      { id: 'pipeline',  label: 'Pipeline',   Icon: LayoutGrid, badge: orders.filter(o => o.status === 'IN_PROGRESS').length || undefined },
    ]},
    { section: 'GROWTH', items: [
      { id: 'customers', label: 'Customers',  Icon: Users },
      { id: 'revenue',   label: 'Revenue',    Icon: TrendingUp },
    ]},
    { section: 'MARKETING', items: [
      { id: 'offers',    label: 'Offers & Coupons', Icon: BadgePercent, badge: offers.filter(o => o.active).length || undefined },
      { id: 'banners',   label: 'Banners',          Icon: Layers,       badge: banners.filter(b => b.active).length || undefined },
      { id: 'pricing',   label: 'Pricing',          Icon: SlidersHorizontal },
    ]},
    { section: 'CONTENT', items: [
      { id: 'blog',      label: 'Blog',       Icon: FileText,   badge: blogPosts.filter(p => !p.published).length || undefined },
    ]},
  ]
  // flat list for header title lookup
  const navItems = navSections.flatMap(s => s.items)

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center"><Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-3" /><p className="text-gray-500 text-sm">Loading dashboard…</p></div>
    </div>
  )

  // ── Dashboard ─────────────────────────────────────────────────────────────
  const renderDashboard = () => {
    const thisRev   = thisMonthPaid.reduce((s, o) => s + o.productPrice, 0)
    const lastRev   = lastMonthPaid.reduce((s, o) => s + o.productPrice, 0)
    const momChange = lastRev > 0 ? Math.round((thisRev - lastRev) / lastRev * 100) : null

    const statCards = [
      { label: 'Total Orders',     value: orders.length,                                         sub: 'all time',          Icon: Package,      clr: 'text-purple-600', bg: 'bg-purple-100', border: 'border-l-4 border-l-purple-500 border-gray-200' },
      { label: 'Pending Review',   value: orders.filter(o => o.status === 'PENDING').length,     sub: 'need action now',   Icon: Clock,        clr: 'text-amber-600',  bg: 'bg-amber-100',  border: 'border-l-4 border-l-amber-500 border-gray-200'  },
      { label: 'Active Projects',  value: orders.filter(o => o.status === 'IN_PROGRESS').length, sub: 'in development',    Icon: Target,       clr: 'text-blue-600',   bg: 'bg-blue-100',   border: 'border-l-4 border-l-blue-500 border-gray-200'   },
      { label: 'Delivered',        value: orders.filter(o => o.status === 'COMPLETED').length,   sub: 'happy clients',     Icon: CheckCircle2, clr: 'text-green-600',  bg: 'bg-green-100',  border: 'border-l-4 border-l-green-500 border-gray-200'  },
      { label: 'Revenue Collected',value: money(totalRevenue),                                   sub: 'all time paid',     Icon: IndianRupee,  clr: 'text-purple-600', bg: 'bg-purple-100', border: 'border-l-4 border-l-purple-500 border-gray-200' },
      { label: 'Outstanding',      value: money(outstanding),                                    sub: `${unpaidOrders.length} unpaid`, Icon: AlertCircle, clr: 'text-red-600', bg: 'bg-red-100', border: 'border-l-4 border-l-red-500 border-gray-200' },
    ]

    return (
      <div className="space-y-6">
        {/* Alert: overdue deliveries */}
        {overdueOrders.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-red-700">⚠️ {overdueOrders.length} project{overdueOrders.length > 1 ? 's are' : ' is'} past delivery deadline</div>
              <div className="text-xs text-red-500 mt-0.5">{overdueOrders.map(o => o.customerName).join(', ')}</div>
            </div>
            <button onClick={() => setTab('pipeline')} className="ml-auto text-xs text-red-600 hover:text-red-700 font-semibold whitespace-nowrap">View Pipeline →</button>
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {statCards.map(c => (
            <div key={c.label} className={`bg-white rounded-2xl p-5 border shadow-sm ${c.border}`}>
              <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center mb-3`}>
                <c.Icon className={`w-4 h-4 ${c.clr}`} />
              </div>
              <div className="text-2xl font-extrabold text-gray-900">{c.value}</div>
              <div className="text-xs font-semibold text-gray-500 mt-0.5">{c.label}</div>
              <div className="text-xs text-gray-500">{c.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Monthly Revenue</h3>
                <p className="text-xs text-gray-500 mt-0.5">Paid orders · last 6 months</p>
              </div>
              {momChange !== null && (
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${momChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  {momChange >= 0 ? '+' : ''}{momChange}% MoM
                </span>
              )}
            </div>
            <div className="flex items-end gap-3 h-32">
              {monthlyRevenue.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-500 text-center leading-tight">{m.revenue > 0 ? money(m.revenue) : ''}</span>
                  <div className="w-full rounded-t-lg transition-all" style={{ height: `${Math.max((m.revenue / maxRev) * 100, m.revenue > 0 ? 8 : 2)}%`, background: i === 5 ? '#7c3aed' : '#e9d5ff' }} />
                  <span className="text-xs text-gray-500">{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* This month snapshot */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-gray-900">This Month</h3>
            <div>
              <div className="text-3xl font-extrabold text-purple-600">{money(thisRev)}</div>
              <div className="text-xs text-gray-500 mt-0.5">{thisMonthPaid.length} paid orders</div>
            </div>
            <div className="space-y-3 flex-1">
              {STATUS_OPTS.map(s => {
                const cnt = orders.filter(o => o.status === s).length
                return (
                  <div key={s}>
                    <div className="flex justify-between text-xs mb-1"><span className="text-gray-500">{s.replace('_', ' ')}</span><span className="text-gray-500 font-semibold">{cnt}</span></div>
                    <div className="h-1.5 bg-gray-100 rounded-full"><div className={`h-full rounded-full ${STATUS_DOT[s]}`} style={{ width: `${orders.length ? cnt / orders.length * 100 : 0}%` }} /></div>
                  </div>
                )
              })}
            </div>
            <div className="text-center pt-2 border-t border-gray-100">
              <div className="text-xs text-gray-500">Conversion rate</div>
              <div className="text-lg font-extrabold text-gray-900">
                {orders.length ? Math.round(orders.filter(o => o.status === 'COMPLETED').length / orders.length * 100) : 0}%
              </div>
            </div>
          </div>
        </div>

        {/* Recent + unpaid side by side */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Recent Orders</h3>
              <button onClick={() => setTab('orders')} className="text-xs text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1">All <ArrowRight className="w-3 h-3" /></button>
            </div>
            {orders.slice(0, 5).map(o => (
              <div key={o.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors" onClick={() => { setTab('orders'); openDrawer(o) }}>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_DOT[o.status]}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">{o.customerName}</div>
                  <div className="text-xs text-gray-500 truncate">{o.productName}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold text-gray-900">{money(o.productPrice)}</div>
                  <div className="text-xs text-gray-500">{fmt(o.createdAt)}</div>
                </div>
              </div>
            ))}
            {orders.length === 0 && <div className="py-10 text-center text-gray-500 text-sm">No orders yet.</div>}
          </div>

          {/* Chase list */}
          <div className={`rounded-2xl border shadow-sm overflow-hidden ${unpaidOrders.length > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-red-100">
              <div className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-500" /><h3 className="text-sm font-bold text-gray-900">Payment Chase List</h3></div>
              {unpaidOrders.length > 0 && <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">{money(outstanding)}</span>}
            </div>
            {unpaidOrders.length === 0
              ? <div className="py-10 text-center text-green-600 text-sm font-semibold">🎉 All payments collected!</div>
              : unpaidOrders.slice(0, 5).map(o => (
                <div key={o.id} className="flex items-center gap-3 px-5 py-3 border-b border-red-100 last:border-0">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">{o.customerName}</div>
                    <div className="text-xs text-gray-500">#{o.orderNumber} · {o.productName.slice(0, 25)}</div>
                  </div>
                  <div className="text-sm font-bold text-red-600 flex-shrink-0">{money(o.productPrice)}</div>
                  <a href={waLink(o.customerPhone)} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="flex-shrink-0 text-xs bg-green-600 hover:bg-green-700 text-white px-2.5 py-1.5 rounded-lg font-bold transition-colors">
                    WA
                  </a>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }

  // ── Orders Tab ────────────────────────────────────────────────────────────
  const renderOrders = () => (
    <div className="space-y-4">
      {/* Search row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
          <input type="text" placeholder="Search name, email, order #, product…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-100" />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"><X className="w-4 h-4" /></button>}
        </div>
        <button onClick={() => exportCSV(filteredOrders)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-500 hover:border-purple-600 hover:text-gray-900 transition-colors whitespace-nowrap">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Date range + status filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-3 py-2">
          <Calendar className="w-3.5 h-3.5 text-gray-600" />
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
            className="bg-transparent text-xs text-gray-500 focus:outline-none w-28" />
          <span className="text-gray-500 text-xs">to</span>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
            className="bg-transparent text-xs text-gray-500 focus:outline-none w-28" />
          {(dateFrom || dateTo) && <button onClick={() => { setDateFrom(''); setDateTo('') }} className="text-gray-600 hover:text-gray-900"><X className="w-3.5 h-3.5" /></button>}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-gray-600" />
          {['ALL', ...STATUS_OPTS].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${statusFilter === s ? 'bg-purple-600 text-white' : 'bg-white border border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-900'}`}>
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-500">{filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} {(dateFrom || dateTo || search || statusFilter !== 'ALL') ? '(filtered)' : ''}</div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                {['Order #', 'Customer', 'Product', 'Amount', 'Payment', 'Status', 'Date', 'Delivery'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map(o => {
                const dl = daysLeft(o.deliveryDate)
                return (
                  <tr key={o.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => openDrawer(o)}>
                    <td className="px-4 py-3.5 font-mono text-xs text-purple-600 font-bold whitespace-nowrap">#{o.orderNumber}</td>
                    <td className="px-4 py-3.5"><div className="font-semibold text-gray-900 text-sm">{o.customerName}</div><div className="text-xs text-gray-600">{o.customerEmail}</div></td>
                    <td className="px-4 py-3.5 max-w-[160px]"><div className="text-sm text-gray-200 truncate">{o.productName}</div>{o.requirements && <div className="text-xs text-gray-500 truncate">{o.requirements.slice(0, 35)}…</div>}</td>
                    <td className="px-4 py-3.5 font-bold text-gray-900 whitespace-nowrap">{money(o.productPrice)}</td>
                    <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${PAY_CLS[o.paymentStatus]}`}>{o.paymentStatus}</span></td>
                    <td className="px-4 py-3.5"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${STATUS_CLS[o.status]}`}><span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[o.status]}`} />{o.status.replace('_', ' ')}</span></td>
                    <td className="px-4 py-3.5 text-xs text-gray-600 whitespace-nowrap">{fmt(o.createdAt)}</td>
                    <td className="px-4 py-3.5">
                      {o.deliveryDate
                        ? <div className={`text-xs font-semibold ${dl !== null && dl < 0 ? 'text-red-400' : dl !== null && dl <= 3 ? 'text-amber-400' : 'text-gray-500'}`}>
                            {dl !== null && dl < 0 ? `${Math.abs(dl)}d late` : dl === 0 ? 'Today' : `${dl}d left`}
                            <div className="text-gray-500 font-normal">{fmt(o.deliveryDate)}</div>
                          </div>
                        : <span className="text-gray-800 text-xs">—</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filteredOrders.length === 0 && <div className="py-14 text-center text-gray-500 text-sm">No orders match your filter.</div>}
        </div>
      </div>
    </div>
  )

  // ── Pipeline Kanban ───────────────────────────────────────────────────────
  const renderPipeline = () => (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-sm font-bold text-gray-900">Project Pipeline</h2>
        <span className="text-xs text-gray-600">{orders.filter(o => !['CANCELLED', 'COMPLETED'].includes(o.status)).length} active</span>
        {overdueOrders.length > 0 && <span className="text-xs font-bold bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">{overdueOrders.length} overdue</span>}
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {KANBAN_COLS.map(col => {
          const colOrders = orders.filter(o => o.status === col)
          const colValue  = colOrders.reduce((s, o) => s + o.productPrice, 0)
          return (
            <div key={col} className="flex flex-col gap-3">
              <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl border ${STATUS_CLS[col]}`}>
                <div className="flex items-center gap-1.5"><div className={`w-2 h-2 rounded-full ${STATUS_DOT[col]}`} /><span className="text-xs font-bold">{KANBAN_LABEL[col]}</span></div>
                <span className="text-xs font-bold opacity-70">{colOrders.length}</span>
              </div>
              {colOrders.length > 0 && <div className="text-xs text-gray-500 text-center -mt-1">{money(colValue)}</div>}
              <div className="space-y-2.5 min-h-[80px]">
                {colOrders.map(o => {
                  const dl = daysLeft(o.deliveryDate)
                  const overdue = dl !== null && dl < 0 && o.status !== 'COMPLETED'
                  return (
                    <div key={o.id} onClick={() => openDrawer(o)}
                      className={`bg-white rounded-xl p-3.5 cursor-pointer border transition-all hover:bg-gray-100 ${overdue ? 'border-red-700/50 hover:border-red-600/60' : 'border-gray-200 hover:border-gray-600'}`}>
                      <div className="text-xs font-mono text-purple-600 mb-1">#{o.orderNumber}</div>
                      <div className="text-sm font-semibold text-gray-900 leading-snug mb-0.5">{o.customerName}</div>
                      <div className="text-xs text-gray-600 mb-2 truncate">{o.productName}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900">{money(o.productPrice)}</span>
                        {o.deliveryDate && (
                          <span className={`text-xs font-bold ${overdue ? 'text-red-400' : dl !== null && dl <= 3 ? 'text-amber-400' : 'text-gray-600'}`}>
                            {overdue ? `${Math.abs(dl!)}d late` : `${dl}d`}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${PAY_CLS[o.paymentStatus]}`}>{o.paymentStatus}</span>
                        {o.notes && <span className="text-xs bg-gray-100text-gray-500 px-1.5 py-0.5 rounded">📝</span>}
                        {overdue && <span className="text-xs bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-bold">LATE</span>}
                      </div>
                    </div>
                  )
                })}
                {colOrders.length === 0 && <div className="border-2 border-dashed border-gray-200 rounded-xl h-16 flex items-center justify-center text-xs text-gray-800">Empty</div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  // ── Customers Tab ─────────────────────────────────────────────────────────
  const renderCustomers = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-900">{customers.length} unique customers</h2>
        <div className="text-xs text-gray-600">Lifetime: {money(customers.reduce((s, c) => s + c.spent, 0))}</div>
      </div>
      {customers.length >= 3 && (
        <div className="grid grid-cols-3 gap-3">
          {customers.slice(0, 3).map((c, i) => (
            <div key={c.email} className={`rounded-2xl p-4 border text-center ${i === 0 ? 'bg-amber-500/10 border-amber-500/30' : i === 1 ? 'bg-gray-100 border-gray-700' : 'bg-orange-950/20 border-orange-900/30'}`}>
              <div className="text-2xl mb-1">{['🥇', '🥈', '🥉'][i]}</div>
              <div className="text-sm font-bold text-gray-900 truncate">{c.name}</div>
              <div className="text-xs text-gray-600 truncate">{c.email}</div>
              <div className={`text-sm font-extrabold mt-1.5 ${i === 0 ? 'text-amber-400' : 'text-gray-600'}`}>{money(c.spent)}</div>
              <div className="text-xs text-gray-600">{c.count} order{c.count !== 1 ? 's' : ''}</div>
            </div>
          ))}
        </div>
      )}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                {['Customer', 'Contact', 'Orders', 'Spent', 'Last Order', 'Reach Out'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map(c => (
                <tr key={c.email} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5"><div className="font-semibold text-gray-900">{c.name}</div><div className="text-xs text-gray-600 truncate max-w-[180px]">{[...c.products].join(', ')}</div></td>
                  <td className="px-4 py-3.5"><div className="text-xs text-gray-500">{c.email}</div><div className="text-xs text-gray-600">{c.phone}</div></td>
                  <td className="px-4 py-3.5 font-bold text-gray-900">{c.count}</td>
                  <td className="px-4 py-3.5 font-bold text-purple-600">{money(c.spent)}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-600">{fmt(c.lastOrder)}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <a href={waLink(c.phone)} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-green-600/20 hover:bg-green-600/40 text-green-600 transition-colors" title="WhatsApp"><MessageCircle className="w-3.5 h-3.5" /></a>
                      <a href={`mailto:${c.email}`} className="p-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-600 transition-colors" title="Email"><Mail className="w-3.5 h-3.5" /></a>
                      <a href={`tel:${c.phone}`} className="p-1.5 rounded-lg bg-gray-100hover:bg-gray-200 text-gray-500 transition-colors" title="Call"><Phone className="w-3.5 h-3.5" /></a>
                    </div>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && <tr><td colSpan={6} className="py-12 text-center text-gray-500 text-sm">No customers yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  // ── Revenue Tab ───────────────────────────────────────────────────────────
  const renderRevenue = () => {
    const maxProd    = Math.max(...productMix.map(p => p.count), 1)
    const payMethods = orders.reduce((acc, o) => { const m = o.paymentMethod || 'Unknown'; acc[m] = (acc[m] || 0) + 1; return acc }, {} as Record<string, number>)
    const avgOrder   = paidOrders.length ? Math.round(totalRevenue / paidOrders.length) : 0
    const thisRev    = thisMonthPaid.reduce((s, o) => s + o.productPrice, 0)
    const lastRev    = lastMonthPaid.reduce((s, o) => s + o.productPrice, 0)

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Revenue',   value: money(totalRevenue),                              color: 'text-purple-600' },
            { label: 'This Month',      value: money(thisRev),                                   color: 'text-blue-600'   },
            { label: 'Last Month',      value: money(lastRev),                                   color: 'text-gray-500'   },
            { label: 'Avg Order Value', value: money(avgOrder),                                  color: 'text-green-600'  },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-5">Revenue by Month (Paid)</h3>
            <div className="flex items-end gap-3 h-36">
              {monthlyRevenue.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-500 leading-tight text-center">{m.revenue > 0 ? money(m.revenue) : ''}</span>
                  <div className="w-full rounded-t-lg" style={{ height: `${Math.max((m.revenue / maxRev) * 100, m.revenue > 0 ? 6 : 2)}%`, background: i === 5 ? '#7c3aed' : '#e9d5ff' }} />
                  <span className="text-xs text-gray-500">{m.month}</span>
                  <span className="text-xs text-gray-800">{m.count > 0 ? `${m.count}✓` : ''}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-5">Product Mix</h3>
            <div className="space-y-3">
              {productMix.slice(0, 6).map(p => (
                <div key={p.name}>
                  <div className="flex justify-between text-xs mb-1.5"><span className="text-gray-600 truncate max-w-[60%]">{p.name}</span><span className="text-gray-600 flex-shrink-0">{p.count} · {money(p.revenue)}</span></div>
                  <div className="h-1.5 bg-gray-100 rounded-full"><div className="h-full bg-purple-600 rounded-full" style={{ width: `${(p.count / maxProd) * 100}%` }} /></div>
                </div>
              ))}
              {productMix.length === 0 && <div className="text-sm text-gray-500">No data yet.</div>}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Payment Methods</h3>
            <div className="space-y-3">
              {Object.entries(payMethods).map(([method, count]) => (
                <div key={method} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                  <span className="text-sm text-gray-600 capitalize">{method.toLowerCase()}</span>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-600">{count} orders</span>
                    <span className="font-bold text-gray-900 w-10 text-right">{Math.round(count / orders.length * 100)}%</span>
                  </div>
                </div>
              ))}
              {Object.keys(payMethods).length === 0 && <div className="text-sm text-gray-500">No orders yet.</div>}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900">Outstanding Payments</h3>
              <span className="text-sm font-extrabold text-red-400">{money(outstanding)}</span>
            </div>
            {unpaidOrders.length === 0
              ? <div className="py-6 text-center text-green-600 text-sm font-semibold">🎉 All collected!</div>
              : <div className="space-y-2">
                  {unpaidOrders.slice(0, 5).map(o => (
                    <div key={o.id} className="flex items-center gap-3 py-2 border-b border-gray-200 last:border-0">
                      <div className="flex-1 min-w-0"><div className="text-sm text-gray-900 font-semibold truncate">{o.customerName}</div><div className="text-xs text-gray-500">#{o.orderNumber}</div></div>
                      <div className="text-sm font-bold text-red-300 flex-shrink-0">{money(o.productPrice)}</div>
                      <a href={waLink(o.customerPhone)} target="_blank" rel="noopener noreferrer"
                        className="flex-shrink-0 text-xs bg-green-700 hover:bg-green-600 text-white px-2.5 py-1.5 rounded-lg font-bold transition-colors">Chase</a>
                    </div>
                  ))}
                </div>
            }
          </div>
        </div>
      </div>
    )
  }

  // ── Blog Tab ──────────────────────────────────────────────────────────────
  const renderBlog = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-900">{blogPosts.length} posts</h2>
          <p className="text-xs text-gray-600 mt-0.5">{blogPosts.filter(p => p.published).length} published · {blogPosts.filter(p => !p.published).length} drafts</p>
        </div>
        <button onClick={openBlogCreate} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {blogLoading
        ? <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-purple-600" /></div>
        : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-100">
              {blogPosts.map(p => (
                <div key={p.id} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                  {p.coverImage && <img src={p.coverImage} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0 bg-gray-100" onError={e => (e.currentTarget.style.display = 'none')} />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-sm font-bold text-gray-900 truncate">{p.title}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${p.published ? 'bg-green-500/20 text-green-600' : 'bg-gray-700 text-gray-500'}`}>{p.published ? 'Published' : 'Draft'}</span>
                    </div>
                    <div className="text-xs text-gray-600 truncate mb-1">{p.excerpt}</div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>/{p.slug}</span>
                      {p.tags && <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{p.tags}</span>}
                      <span>{fmt(p.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {p.published && (
                      <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-gray-100hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors" title="View post"><Globe className="w-3.5 h-3.5" /></a>
                    )}
                    <button onClick={() => openBlogEdit(p)} className="p-1.5 rounded-lg bg-gray-100hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors" title="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => togglePublish(p)} className={`p-1.5 rounded-lg transition-colors ${p.published ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400' : 'bg-green-500/20 hover:bg-green-500/30 text-green-600'}`} title={p.published ? 'Unpublish' : 'Publish'}>
                      {p.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => setDeleteConfirm(p.id)} className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
              {blogPosts.length === 0 && !blogLoading && (
                <div className="py-16 text-center">
                  <FileText className="w-8 h-8 text-gray-500 mx-auto mb-3" />
                  <div className="text-sm text-gray-600">No blog posts yet.</div>
                  <button onClick={openBlogCreate} className="mt-4 text-sm text-purple-600 hover:text-purple-300">Write your first post →</button>
                </div>
              )}
            </div>
          </div>
        )
      }

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <div className="text-base font-bold text-gray-900 mb-2">Delete this post?</div>
            <div className="text-sm text-gray-500 mb-5">This is permanent and cannot be undone.</div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => deletePost(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // ── Order Drawer ──────────────────────────────────────────────────────────
  const renderOrderDrawer = () => {
    if (!selOrder) return null
    const o  = selOrder
    const dl = daysLeft(o.deliveryDate)
    return (
      <>
        <div className="fixed inset-0 bg-black/60 z-40" onClick={closeDrawer} />
        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-gray-200 z-50 overflow-y-auto flex flex-col shadow-2xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-purple-600 font-bold">#{o.orderNumber}</span>
                <button onClick={() => copyNum(o.orderNumber)} className="text-gray-500 hover:text-gray-500 transition-colors">
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="text-xs text-gray-600 mt-0.5">{fmt(o.createdAt)}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => printInvoice(o)} title="Print Invoice"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100hover:bg-gray-200 text-gray-500 hover:text-gray-900 text-xs transition-colors">
                <Printer className="w-3.5 h-3.5" /> Invoice
              </button>
              <button onClick={closeDrawer} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"><X className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex-1 p-5 space-y-4">
            {/* Customer */}
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Customer</div>
              <div className="text-base font-extrabold text-gray-900 mb-2">{o.customerName}</div>
              <div className="space-y-1.5">
                <a href={`mailto:${o.customerEmail}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"><Mail className="w-3.5 h-3.5 flex-shrink-0" />{o.customerEmail}</a>
                <a href={`tel:${o.customerPhone}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"><Phone className="w-3.5 h-3.5 flex-shrink-0" />{o.customerPhone}</a>
              </div>
              <a href={waLink(o.customerPhone)} target="_blank" rel="noopener noreferrer"
                className="mt-3 w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm font-bold py-2 rounded-xl transition-colors">
                <MessageCircle className="w-4 h-4" /> Message on WhatsApp
              </a>
            </div>

            {/* Product + payment */}
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Order</div>
              <div className="text-sm font-bold text-gray-900 mb-1">{o.productName}</div>
              <div className="text-2xl font-extrabold text-purple-600 mb-2">{money(o.productPrice)}</div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${PAY_CLS[o.paymentStatus]}`}>{o.paymentStatus}</span>
                {o.paymentMethod && <span className="text-xs text-gray-600">via {o.paymentMethod}</span>}
              </div>
              {o.paymentId && <div className="text-xs text-gray-500 font-mono mt-1 truncate">Ref: {o.paymentId}</div>}
            </div>

            {/* Requirements */}
            {o.requirements && (
              <div className="bg-gray-100 rounded-xl p-4">
                <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Client Requirements</div>
                <p className="text-sm text-gray-600 leading-relaxed">{o.requirements}</p>
              </div>
            )}

            {/* Update form */}
            <div className="bg-gray-100 rounded-xl p-4 space-y-4">
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Update Order</div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Project Status</label>
                <select value={eStatus} onChange={e => setEStatus(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-100">
                  {STATUS_OPTS.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Payment Status</label>
                <select value={ePayStatus} onChange={e => setEPayStatus(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-100">
                  {PAYMENT_OPTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Delivery Deadline</label>
                <input type="date" value={eDelivery} onChange={e => setEDelivery(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-100" />
                {eDelivery && (() => {
                  const d = daysLeft(eDelivery)
                  return <div className={`text-xs mt-1.5 ${d !== null && d < 0 ? 'text-red-400' : d !== null && d <= 3 ? 'text-amber-400' : 'text-gray-600'}`}>
                    {d !== null && d < 0 ? `${Math.abs(d)} days overdue` : d === 0 ? 'Due today' : `${d} days remaining`}
                  </div>
                })()}
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Internal Notes</label>
                <textarea value={eNotes} onChange={e => setENotes(e.target.value)} rows={3} placeholder="Add notes for your team…"
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-100 resize-none" />
              </div>
              <button onClick={saveDrawer} disabled={saving}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl transition-colors">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4 text-green-300" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  // ── Blog Drawer ───────────────────────────────────────────────────────────
  const renderBlogDrawer = () => (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setBlogDrawer(false)} />
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white border-l border-gray-200 z-50 overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-sm font-bold text-gray-900">{editPost ? 'Edit Post' : 'New Blog Post'}</h3>
          <button onClick={() => setBlogDrawer(false)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"><X className="w-4 h-4" /></button>
        </div>

        <div className="flex-1 p-5 space-y-4">
          {bError && <div className="bg-red-500/20 border border-red-500/30 text-red-300 text-sm px-4 py-3 rounded-xl">{bError}</div>}

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Title *</label>
            <input value={bTitle} onChange={e => { setBTitle(e.target.value); if (!editPost) setBSlug(slugify(e.target.value)) }}
              placeholder="How we built a restaurant website in 7 days"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500" />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Slug (URL) *</label>
            <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-purple-600">
              <span className="text-xs text-gray-600 mr-1 flex-shrink-0">/blog/</span>
              <input value={bSlug} onChange={e => setBSlug(slugify(e.target.value))} placeholder="restaurant-website-7-days"
                className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Excerpt (shown in list)</label>
            <textarea value={bExcerpt} onChange={e => setBExcerpt(e.target.value)} rows={2} placeholder="Short summary…"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none" />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Cover Image URL</label>
            <input value={bCover} onChange={e => setBCover(e.target.value)} placeholder="https://images.unsplash.com/…"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500" />
            {bCover && <img src={bCover} alt="cover preview" className="mt-2 h-20 w-full object-cover rounded-xl bg-gray-100" onError={e => (e.currentTarget.style.display = 'none')} />}
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Tags (comma separated)</label>
            <input value={bTags} onChange={e => setBTags(e.target.value)} placeholder="web development, restaurant, india"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500" />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Content (Markdown supported)</label>
            <textarea value={bContent} onChange={e => setBContent(e.target.value)} rows={12} placeholder="Write your blog post here…"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none font-mono" />
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => setBlogDrawer(false)} className="flex-1 py-2.5 rounded-xl bg-gray-100text-gray-500 text-sm font-semibold hover:bg-gray-200 transition-colors">Cancel</button>
            <button onClick={saveBlog} disabled={bSaving}
              className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl transition-colors">
              {bSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : bSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {bSaving ? 'Saving…' : bSaved ? 'Saved!' : editPost ? 'Update Post' : 'Save Draft'}
            </button>
          </div>
        </div>
      </div>
    </>
  )

  // ── Random coupon code generator ─────────────────────────────────────────
  const genCode = () => {
    const words  = ['WEB','BYTE','DEAL','SAVE','GET','WIN','OFFER','SALE','BEST','PRO']
    const nums   = Math.floor(Math.random() * 80 + 10)
    const prefix = words[Math.floor(Math.random() * words.length)]
    setOCode(`${prefix}${nums}`)
  }

  // ── Offers tab ────────────────────────────────────────────────────────────
  const saveOffer = async () => {
    if (!oTitle || !oCode || !oValue) { setOError('Title, code and value are required'); return }
    setOSaving(true); setOError('')
    const r = await fetch('/api/admin/offers', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: oTitle, code: oCode, discountType: oType, discountValue: Number(oValue), description: oDesc || null, minOrderValue: oMin ? Number(oMin) : null, maxUses: oMaxUses ? Number(oMaxUses) : null, expiresAt: oExpiry || null }),
    })
    if (!r.ok) { const j = await r.json(); setOError(j.error || 'Error saving'); setOSaving(false); return }
    await fetchOffers(); setOSaving(false); setOfferForm(false)
    setOTitle(''); setOCode(''); setOValue(''); setODesc(''); setOMin(''); setOMaxUses(''); setOExpiry('')
  }
  const toggleOffer = async (o: Offer) => {
    await fetch(`/api/admin/offers/${o.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !o.active }) })
    await fetchOffers()
  }
  const deleteOffer = async (id: string) => {
    await fetch(`/api/admin/offers/${id}`, { method: 'DELETE' }); await fetchOffers()
  }
  const copyCode = (code: string) => { navigator.clipboard.writeText(code) }

  const renderOffers = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900">Offers & Coupons</h2>
          <p className="text-xs text-gray-500 mt-0.5">{offers.filter(o => o.active).length} active · {offers.length} total</p>
        </div>
        <button onClick={() => { setOfferForm(true); setOError('') }} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> New Offer
        </button>
      </div>

      {offerForm && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-gray-900">Create Offer</h3>
            <button onClick={() => setOfferForm(false)} className="text-gray-600 hover:text-gray-500"><X className="w-4 h-4" /></button>
          </div>
          {oError && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">{oError}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">Offer Title</label>
              <input value={oTitle} onChange={e => setOTitle(e.target.value)} placeholder="Diwali Special 30% Off"
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Coupon Code</label>
              <div className="flex gap-2">
                <input value={oCode} onChange={e => setOCode(e.target.value.toUpperCase())} placeholder="DIWALI30"
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 font-mono" />
                <button onClick={genCode} className="px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-600 rounded-xl text-xs font-bold border border-purple-600/30 transition-colors whitespace-nowrap">
                  <Zap className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Discount Type</label>
              <select value={oType} onChange={e => setOType(e.target.value as any)}
                className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500">
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FIXED">Fixed Amount (₹)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Discount Value</label>
              <input type="number" value={oValue} onChange={e => setOValue(e.target.value)} placeholder={oType === 'PERCENTAGE' ? '30' : '500'}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Min Order Value (₹)</label>
              <input type="number" value={oMin} onChange={e => setOMin(e.target.value)} placeholder="Leave blank for none"
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Max Uses</label>
              <input type="number" value={oMaxUses} onChange={e => setOMaxUses(e.target.value)} placeholder="Leave blank for unlimited"
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Expires At</label>
              <input type="date" value={oExpiry} onChange={e => setOExpiry(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">Description (shown to customer)</label>
              <input value={oDesc} onChange={e => setODesc(e.target.value)} placeholder="Get 30% off on all website packages this Diwali!"
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500" />
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <button onClick={() => setOfferForm(false)} className="flex-1 py-2.5 rounded-xl bg-gray-100text-gray-500 text-sm font-semibold hover:bg-gray-200 transition-colors">Cancel</button>
            <button onClick={saveOffer} disabled={oSaving} className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl transition-colors">
              {oSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Gift className="w-4 h-4" />} {oSaving ? 'Saving…' : 'Create Offer'}
            </button>
          </div>
        </div>
      )}

      {offersLoad ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-purple-600" /></div>
      ) : offers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Gift className="w-10 h-10 text-gray-500 mb-3" /><p className="text-gray-500">No offers yet. Create your first coupon!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {offers.map(o => {
            const usagePct = o.maxUses ? Math.round(o.usedCount / o.maxUses * 100) : null
            const expired  = o.expiresAt ? new Date(o.expiresAt) < new Date() : false
            return (
              <div key={o.id} className={`bg-gray-50 border rounded-2xl p-4 space-y-3 transition-all ${o.active && !expired ? 'border-gray-700' : 'border-gray-200 opacity-60'}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{o.title}</p>
                    {o.description && <p className="text-xs text-gray-500 truncate mt-0.5">{o.description}</p>}
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button onClick={() => copyCode(o.code)} title="Copy code" className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-500 hover:text-gray-900 transition-colors"><Copy className="w-3 h-3" /></button>
                    <button onClick={() => toggleOffer(o)} title={o.active ? 'Deactivate' : 'Activate'} className={`p-1.5 rounded-lg transition-colors ${o.active ? 'bg-green-500/20 text-green-600 hover:bg-green-500/30' : 'bg-gray-700 text-gray-500 hover:bg-gray-600'}`}>
                      {o.active ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => deleteOffer(o.id)} className="p-1.5 rounded-lg bg-gray-700 hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold bg-purple-600/20 text-purple-300 border border-purple-600/30 px-2.5 py-1 rounded-lg">{o.code}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${o.discountType === 'PERCENTAGE' ? 'bg-blue-500/20 text-blue-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                    {o.discountType === 'PERCENTAGE' ? `${o.discountValue}% OFF` : `₹${o.discountValue} OFF`}
                  </span>
                  {expired && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Expired</span>}
                  {!o.active && !expired && <span className="text-xs bg-gray-600/30 text-gray-500 px-2 py-0.5 rounded-full">Inactive</span>}
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  {o.minOrderValue && <span>Min ₹{o.minOrderValue.toLocaleString('en-IN')}</span>}
                  {o.expiresAt && <span>Expires {fmt(o.expiresAt)}</span>}
                </div>
                {o.maxUses !== null && (
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Usage</span><span>{o.usedCount}/{o.maxUses}</span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${(usagePct ?? 0) > 80 ? 'bg-red-500' : 'bg-purple-500'}`} style={{ width: `${usagePct ?? 0}%` }} />
                    </div>
                  </div>
                )}
                {o.maxUses === null && <p className="text-xs text-gray-600">Used {o.usedCount} times · Unlimited uses</p>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )

  // ── Banners tab ───────────────────────────────────────────────────────────
  const GRADIENT_PRESETS = [
    { label: 'Purple–Indigo', value: 'from-purple-600 to-indigo-700' },
    { label: 'Pink–Rose',     value: 'from-pink-500 to-rose-600' },
    { label: 'Amber–Orange',  value: 'from-amber-500 to-orange-600' },
    { label: 'Teal–Cyan',     value: 'from-teal-500 to-cyan-600' },
    { label: 'Green–Emerald', value: 'from-green-500 to-emerald-700' },
    { label: 'Blue–Violet',   value: 'from-blue-600 to-violet-700' },
    { label: 'Slate–Gray',    value: 'from-slate-700 to-gray-800' },
    { label: 'Red–Pink',      value: 'from-red-500 to-pink-600' },
  ]
  const POSITIONS = [
    { value: 'top-strip',  label: 'Top Strip', desc: 'Across entire site header' },
    { value: 'homepage',   label: 'Homepage',  desc: 'Main homepage section' },
    { value: 'industries', label: 'Industries',desc: 'Industries/services page' },
    { value: 'order',      label: 'Order Page',desc: 'Checkout/order form page' },
  ]
  const STYLES = [
    { value: 'strip',    label: 'Strip',    desc: 'Thin dismissible top bar' },
    { value: 'card',     label: 'Card',     desc: 'Prominent card section' },
    { value: 'floating', label: 'Floating', desc: 'Corner popup widget' },
  ]

  const openBannerCreate = () => {
    setEditBanner(null); setBnTitle(''); setBnSub(''); setBnBadge(''); setBnCta(''); setBnLink('')
    setBnGrad('from-purple-600 to-indigo-700'); setBnPos('homepage'); setBnStyle('strip')
    setBnPriority('0'); setBnStart(''); setBnEnd(''); setBnError(''); setBnSaved(false); setBannerForm(true)
  }
  const openBannerEdit = (b: SiteBanner) => {
    setEditBanner(b); setBnTitle(b.title); setBnSub(b.subtitle || ''); setBnBadge(b.badge || '')
    setBnCta(b.ctaText || ''); setBnLink(b.ctaLink || ''); setBnGrad(b.gradient)
    setBnPos(b.position); setBnStyle(b.style); setBnPriority(String(b.priority))
    setBnStart(b.startsAt ? b.startsAt.slice(0, 10) : ''); setBnEnd(b.endsAt ? b.endsAt.slice(0, 10) : '')
    setBnError(''); setBnSaved(false); setBannerForm(true)
  }
  const saveBanner = async () => {
    if (!bnTitle) { setBnError('Title is required'); return }
    setBnSaving(true); setBnError('')
    const url    = editBanner ? `/api/admin/banners/${editBanner.id}` : '/api/admin/banners'
    const method = editBanner ? 'PATCH' : 'POST'
    const r = await fetch(url, {
      method, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: bnTitle, subtitle: bnSub || null, badge: bnBadge || null, ctaText: bnCta || null, ctaLink: bnLink || null, gradient: bnGrad, position: bnPos, style: bnStyle, priority: Number(bnPriority), startsAt: bnStart || null, endsAt: bnEnd || null }),
    })
    if (!r.ok) { const j = await r.json(); setBnError(j.error || 'Error saving'); setBnSaving(false); return }
    await fetchBanners(); setBnSaving(false); setBnSaved(true); setTimeout(() => { setBnSaved(false); setBannerForm(false) }, 800)
  }
  const toggleBanner = async (b: SiteBanner) => {
    await fetch(`/api/admin/banners/${b.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !b.active }) })
    await fetchBanners()
  }
  const deleteBanner = async (id: string) => {
    await fetch(`/api/admin/banners/${id}`, { method: 'DELETE' }); await fetchBanners()
  }

  const renderBanners = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900">Banners</h2>
          <p className="text-xs text-gray-500 mt-0.5">{banners.filter(b => b.active).length} live · {banners.length} total</p>
        </div>
        <button onClick={openBannerCreate} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> New Banner
        </button>
      </div>

      {/* Banner Builder Form */}
      {bannerForm && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900">{editBanner ? 'Edit Banner' : 'Create Banner'}</h3>
            <button onClick={() => setBannerForm(false)} className="text-gray-600 hover:text-gray-500"><X className="w-4 h-4" /></button>
          </div>
          {bnError && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">{bnError}</p>}

          {/* Live Preview */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Live Preview</p>
            <div className={`bg-gradient-to-r ${bnGrad} rounded-xl overflow-hidden`}>
              {bnStyle === 'strip' ? (
                <div className="flex items-center justify-between px-4 py-2.5 gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    {bnBadge && <span className="text-xs font-bold bg-white/20 text-white px-2 py-0.5 rounded-full whitespace-nowrap">{bnBadge}</span>}
                    <span className="text-white text-sm font-semibold truncate">{bnTitle || 'Your banner title here'}</span>
                    {bnSub && <span className="text-white/70 text-xs truncate hidden sm:block">{bnSub}</span>}
                  </div>
                  {bnCta && <span className="text-xs font-bold bg-white/20 text-white px-3 py-1.5 rounded-lg whitespace-nowrap">{bnCta} →</span>}
                </div>
              ) : bnStyle === 'card' ? (
                <div className="p-6 text-center">
                  {bnBadge && <span className="inline-block text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full mb-3">{bnBadge}</span>}
                  <h3 className="text-xl font-extrabold text-gray-900 mb-1">{bnTitle || 'Banner Title'}</h3>
                  {bnSub && <p className="text-white/80 text-sm mb-4">{bnSub}</p>}
                  {bnCta && <span className="inline-block bg-white text-gray-900 font-bold text-sm px-5 py-2 rounded-xl">{bnCta}</span>}
                </div>
              ) : (
                <div className="p-4 max-w-xs">
                  {bnBadge && <span className="text-xs font-bold bg-white/20 text-white px-2 py-0.5 rounded-full mb-2 inline-block">{bnBadge}</span>}
                  <p className="text-white text-sm font-bold">{bnTitle || 'Banner Title'}</p>
                  {bnSub && <p className="text-white/70 text-xs mt-1">{bnSub}</p>}
                  {bnCta && <span className="inline-block mt-3 bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg">{bnCta}</span>}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">Title *</label>
              <input value={bnTitle} onChange={e => setBnTitle(e.target.value)} placeholder="🎉 Diwali Offer — Get 30% Off All Websites!"
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Subtitle</label>
              <input value={bnSub} onChange={e => setBnSub(e.target.value)} placeholder="Limited time. Use code DIWALI30"
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Badge / Label</label>
              <input value={bnBadge} onChange={e => setBnBadge(e.target.value)} placeholder="🔥 LIMITED OFFER"
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">CTA Button Text</label>
              <input value={bnCta} onChange={e => setBnCta(e.target.value)} placeholder="Grab This Deal"
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">CTA Link</label>
              <input value={bnLink} onChange={e => setBnLink(e.target.value)} placeholder="/order"
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Position</label>
              <select value={bnPos} onChange={e => setBnPos(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500">
                {POSITIONS.map(p => <option key={p.value} value={p.value}>{p.label} — {p.desc}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Style</label>
              <select value={bnStyle} onChange={e => setBnStyle(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500">
                {STYLES.map(s => <option key={s.value} value={s.value}>{s.label} — {s.desc}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Priority (higher = shown first)</label>
              <input type="number" value={bnPriority} onChange={e => setBnPriority(e.target.value)} placeholder="0"
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Start Date</label>
              <input type="date" value={bnStart} onChange={e => setBnStart(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">End Date</label>
              <input type="date" value={bnEnd} onChange={e => setBnEnd(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500" />
            </div>
          </div>

          {/* Gradient picker */}
          <div>
            <label className="text-xs text-gray-500 mb-2 block">Gradient Color</label>
            <div className="grid grid-cols-4 gap-2">
              {GRADIENT_PRESETS.map(g => (
                <button key={g.value} onClick={() => setBnGrad(g.value)} title={g.label}
                  className={`h-8 rounded-lg bg-gradient-to-r ${g.value} border-2 transition-all ${bnGrad === g.value ? 'border-white scale-105' : 'border-transparent hover:border-gray-500'}`} />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button onClick={() => setBannerForm(false)} className="flex-1 py-2.5 rounded-xl bg-gray-100text-gray-500 text-sm font-semibold hover:bg-gray-200 transition-colors">Cancel</button>
            <button onClick={saveBanner} disabled={bnSaving}
              className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl transition-colors">
              {bnSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : bnSaved ? <Check className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
              {bnSaving ? 'Saving…' : bnSaved ? 'Saved!' : editBanner ? 'Update Banner' : 'Create Banner'}
            </button>
          </div>
        </div>
      )}

      {bannersLoad ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-purple-600" /></div>
      ) : banners.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Layers className="w-10 h-10 text-gray-500 mb-3" /><p className="text-gray-500">No banners yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {banners.map(b => {
            const expired  = b.endsAt ? new Date(b.endsAt) < new Date() : false
            const posLabel = POSITIONS.find(p => p.value === b.position)?.label ?? b.position
            const styleLabel = STYLES.find(s => s.value === b.style)?.label ?? b.style
            return (
              <div key={b.id} className={`border rounded-2xl overflow-hidden transition-all ${b.active && !expired ? 'border-gray-700' : 'border-gray-200 opacity-60'}`}>
                {/* Mini preview */}
                <div className={`bg-gradient-to-r ${b.gradient} px-4 py-2.5 flex items-center justify-between gap-3`}>
                  <div className="flex items-center gap-2 min-w-0">
                    {b.badge && <span className="text-xs font-bold bg-white/20 text-white px-2 py-0.5 rounded-full whitespace-nowrap">{b.badge}</span>}
                    <span className="text-white text-sm font-bold truncate">{b.title}</span>
                    {b.subtitle && <span className="text-white/70 text-xs truncate hidden sm:block">{b.subtitle}</span>}
                  </div>
                  {b.ctaText && <span className="text-xs font-bold bg-white/20 text-white px-2.5 py-1 rounded-lg whitespace-nowrap">{b.ctaText}</span>}
                </div>
                {/* Meta row */}
                <div className="bg-gray-50 px-4 py-3 flex items-center gap-3 flex-wrap">
                  <span className="text-xs text-gray-500 font-medium">{posLabel}</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-xs text-gray-500">{styleLabel}</span>
                  {b.endsAt && <><span className="text-gray-500">·</span><span className="text-xs text-gray-500">Until {fmt(b.endsAt)}</span></>}
                  {expired && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Expired</span>}
                  {!b.active && !expired && <span className="text-xs bg-gray-600/30 text-gray-500 px-2 py-0.5 rounded-full">Inactive</span>}
                  {b.active && !expired && <span className="text-xs bg-green-500/20 text-green-600 px-2 py-0.5 rounded-full">● Live</span>}
                  <div className="ml-auto flex items-center gap-1.5">
                    <button onClick={() => openBannerEdit(b)} className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-500 hover:text-gray-900 transition-colors"><Pencil className="w-3 h-3" /></button>
                    <button onClick={() => toggleBanner(b)} className={`p-1.5 rounded-lg transition-colors ${b.active ? 'bg-green-500/20 text-green-600' : 'bg-gray-700 text-gray-500 hover:bg-gray-600'}`}>
                      {b.active ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => deleteBanner(b.id)} className="p-1.5 rounded-lg bg-gray-700 hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )

  // ── Pricing tab ───────────────────────────────────────────────────────────
  const startEditPrice = (c: ProductConfig) => {
    setEditingPrice(c.id); setPBase(String(c.basePrice)); setPSale(c.salePrice !== null ? String(c.salePrice) : '')
  }
  const savePrice = async (c: ProductConfig) => {
    setPSaving(true)
    await fetch(`/api/admin/pricing/${c.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ basePrice: Number(pBase), salePrice: pSale ? Number(pSale) : null }),
    })
    await fetchConfigs(); setPSaving(false); setEditingPrice(null)
  }
  const toggleConfig = async (c: ProductConfig) => {
    await fetch(`/api/admin/pricing/${c.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !c.active }) })
    await fetchConfigs()
  }

  const renderPricing = () => (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-extrabold text-gray-900">Pricing</h2>
        <p className="text-xs text-gray-500 mt-0.5">Edit prices in real-time — changes reflect on the order page instantly</p>
      </div>

      {configsLoad ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-purple-600" /></div>
      ) : (
        <>
          {/* Website products */}
          {['website', 'billing'].map(cat => {
            const list = configs.filter(c => c.category === cat)
            if (!list.length) return null
            return (
              <div key={cat}>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  {cat === 'website' ? '🌐 Website Packages' : '🧾 Billing Software'}
                </h3>
                <div className="space-y-2">
                  {list.map(c => {
                    const editing  = editingPrice === c.id
                    const discount = c.salePrice ? Math.round((1 - c.salePrice / c.basePrice) * 100) : null
                    return (
                      <div key={c.id} className={`bg-gray-50 border rounded-xl p-4 transition-all ${c.active ? 'border-gray-700' : 'border-gray-200 opacity-60'}`}>
                        {editing ? (
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-900 mb-2">{c.productName}</p>
                              <div className="flex items-center gap-2 flex-wrap">
                                <div>
                                  <label className="text-xs text-gray-500 mb-1 block">Base Price (₹)</label>
                                  <input type="number" value={pBase} onChange={e => setPBase(e.target.value)} autoFocus
                                    className="w-32 bg-white border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:border-purple-500" />
                                </div>
                                <div>
                                  <label className="text-xs text-gray-500 mb-1 block">Sale Price (₹) — optional</label>
                                  <input type="number" value={pSale} onChange={e => setPSale(e.target.value)} placeholder="Leave blank to remove"
                                    className="w-44 bg-white border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500" />
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2 self-end">
                              <button onClick={() => setEditingPrice(null)} className="px-3 py-1.5 rounded-lg bg-gray-700 text-gray-500 text-xs font-semibold hover:bg-gray-600 transition-colors">Cancel</button>
                              <button onClick={() => savePrice(c)} disabled={pSaving}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-bold transition-colors">
                                {pSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />} Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <p className="text-sm font-semibold text-gray-900 truncate">{c.productName}</p>
                                {discount && <span className="text-xs bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded-full font-bold">{discount}% OFF</span>}
                                {!c.active && <span className="text-xs bg-gray-600/30 text-gray-500 px-1.5 py-0.5 rounded-full">Hidden</span>}
                              </div>
                              <div className="flex items-baseline gap-2">
                                {c.salePrice ? (
                                  <>
                                    <span className="text-base font-extrabold text-gray-900">₹{c.salePrice.toLocaleString('en-IN')}</span>
                                    <span className="text-xs text-gray-600 line-through">₹{c.basePrice.toLocaleString('en-IN')}</span>
                                  </>
                                ) : (
                                  <span className="text-base font-extrabold text-gray-900">₹{c.basePrice.toLocaleString('en-IN')}</span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => startEditPrice(c)} className="p-1.5 rounded-lg bg-gray-700 hover:bg-purple-600/20 text-gray-500 hover:text-purple-600 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                              <button onClick={() => toggleConfig(c)} title={c.active ? 'Hide' : 'Show'} className={`p-1.5 rounded-lg transition-colors ${c.active ? 'bg-green-500/20 text-green-600' : 'bg-gray-700 text-gray-500 hover:bg-gray-600'}`}>
                                {c.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )

  // ── Main Render ───────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen bg-gray-50">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebar(false)} />}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 h-screen w-56 bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-200 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0"><ShieldCheck className="w-4 h-4 text-white" /></div>
            <div><div className="text-sm font-extrabold text-gray-900">Web<span className="text-purple-600">Byte</span></div><div className="text-xs text-gray-500">Admin Console</div></div>
          </div>
        </div>

        <nav className="flex-1 p-2.5 overflow-y-auto space-y-4">
          {navSections.map(({ section, items }) => (
            <div key={section}>
              <p className="text-[10px] font-bold text-gray-500 tracking-widest px-3 mb-1">{section}</p>
              <div className="space-y-0.5">
                {items.map(({ id, label, Icon, badge }) => (
                  <button key={id} onClick={() => { setTab(id); setSidebar(false) }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${tab === id ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1 text-left">{label}</span>
                    {badge !== undefined && <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${tab === id ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'}`}>{badge}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-2.5 border-t border-gray-100 space-y-0.5">
          <a href="/" target="_blank" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">
            <ExternalLink className="w-4 h-4" /> View Site
          </a>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-5 py-3.5 flex items-center gap-3 shadow-sm">
          <button className="md:hidden text-gray-500 hover:text-gray-900" onClick={() => setSidebar(true)}><Menu className="w-5 h-5" /></button>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-extrabold text-gray-900">{navItems.find(n => n.id === tab)?.label}</h1>
            <p className="text-xs text-gray-500">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <button onClick={() => fetchOrders(true)} disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 text-xs font-medium transition-colors">
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </header>

        <div className="flex-1 overflow-auto p-5 lg:p-6">
          {tab === 'dashboard' && renderDashboard()}
          {tab === 'orders'    && renderOrders()}
          {tab === 'pipeline'  && renderPipeline()}
          {tab === 'customers' && renderCustomers()}
          {tab === 'revenue'   && renderRevenue()}
          {tab === 'offers'    && renderOffers()}
          {tab === 'banners'   && renderBanners()}
          {tab === 'pricing'   && renderPricing()}
          {tab === 'blog'      && renderBlog()}
        </div>
      </main>

      {drawerOpen  && renderOrderDrawer()}
      {blogDrawer  && renderBlogDrawer()}
    </div>
  )
}
