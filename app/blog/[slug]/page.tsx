import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'

const posts = [
  {
    slug:    'why-your-business-needs-a-website-in-2025',
    title:   'Why Every Indian Business Needs a Website in 2025',
    excerpt: 'Over 70% of Indian consumers research online before buying. If your business isn\'t online, you\'re invisible to them.',
    cover:   'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    tags:    ['Website', 'Digital Marketing'],
    date:    '2025-06-15',
    readTime: '5 min',
    content: `
Over 70% of Indian consumers now research online before making a purchase decision. Whether they're looking for a local restaurant, a plumber, or a wholesale supplier — the first thing they do is Google it.

## The Reality for Indian Businesses

If your business doesn't have a website, you're essentially invisible to this massive pool of potential customers. Your competitors who do have websites are capturing those customers every single day.

## What a Website Does for Your Business

**1. 24/7 Visibility**
Unlike a physical shop that closes at night, your website works round the clock. A customer can find you, learn about your services, and even place an order at 2am.

**2. Build Trust**
A professional website instantly makes your business look more credible. Customers trust businesses with a clean, professional online presence.

**3. Reach Beyond Your City**
With a website, a small shop in Jaipur can sell to customers in Mumbai, Bangalore, or even internationally.

**4. Cost-Effective Marketing**
Compared to newspaper ads or hoardings, a website is far cheaper and delivers better ROI through SEO and Google visibility.

## What Kind of Website Do You Need?

- **Informational Site**: For service businesses (₹9,999–₹25,000)
- **E-commerce Store**: For product-based businesses (₹25,000–₹75,000)
- **Booking System**: For salons, clinics, hotels (₹15,000–₹40,000)

## Getting Started

At WebByte, we've helped 40+ Indian businesses build their digital presence. Our websites are SEO-ready, mobile-optimized, and delivered in just 7–14 days.

[Place your order today →](/order)
    `,
  },
  {
    slug:    'gst-billing-software-guide',
    title:   'Complete Guide to GST Billing Software for Small Businesses',
    excerpt: 'GST compliance can be complex. The right billing software automates CGST, SGST, and IGST calculations.',
    cover:   'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    tags:    ['Billing', 'GST', 'Software'],
    date:    '2025-06-01',
    readTime: '7 min',
    content: `
GST (Goods and Services Tax) has transformed how Indian businesses manage their finances. While the system has simplified the overall tax structure, compliance can still be challenging — especially for small businesses without a dedicated accountant.

## What is GST Billing Software?

GST billing software automates the complex calculations involved in GST — CGST, SGST, and IGST — and generates compliant invoices that can be directly uploaded to the GST portal.

## Key Features to Look For

**1. Automatic Tax Calculation**
Good software automatically applies the correct GST rate (5%, 12%, 18%, or 28%) based on the product or service, and splits it into CGST + SGST for intra-state or IGST for inter-state transactions.

**2. GST Returns Generation**
GSTR-1, GSTR-3B reports should be auto-generated. This saves hours of manual data entry every month.

**3. Multi-User Access**
If you have multiple billing counters or staff, multi-user support is essential. Each user should have appropriate access levels.

**4. Inventory Management**
Integrating billing with inventory means stock levels update automatically with every sale or purchase.

**5. Reports & Analytics**
Daily sales, profit/loss, top customers, pending payments — good billing software gives you these at a glance.

## BillPro — Our GST Billing Solution

BillPro is built specifically for Indian small and medium businesses. It handles:

- CGST, SGST, IGST calculations automatically
- HSN/SAC code management
- E-invoice generation
- Customer and vendor ledgers
- Multi-user with role-based access
- Export to Excel and PDF

Starting at just ₹4,999 (one-time), it's the most cost-effective GST billing solution for Indian businesses.

[Learn more about BillPro →](/products#billpro)
    `,
  },
  {
    slug:    'how-to-get-more-customers-online',
    title:   'How to Get More Customers Online for Your Local Business',
    excerpt: 'Practical digital marketing strategies that actually work for Indian local businesses.',
    cover:   'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=80',
    tags:    ['Marketing', 'SEO', 'Local Business'],
    date:    '2025-05-20',
    readTime: '6 min',
    content: `
Getting customers online doesn't require a massive budget. Here are practical strategies that work specifically for Indian local businesses.

## 1. Google My Business (Free)

This is the single most impactful thing you can do. A verified Google My Business profile makes your business appear in Google Maps and local search results. It's free and takes about 30 minutes to set up.

**Tips:**
- Add high-quality photos of your shop/products
- Collect and respond to reviews
- Keep your hours and contact info updated

## 2. WhatsApp Business

India has 500+ million WhatsApp users. WhatsApp Business lets you create a professional profile, set up automated greetings, and manage customer queries efficiently.

## 3. Local SEO

When someone searches "billing software in Jaipur" or "web design near me", local SEO determines if your website shows up. Key tactics:

- Include your city name in page titles and content
- Get listed on JustDial, IndiaMart, Sulekha
- Build backlinks from local directories and newspapers

## 4. Instagram & Facebook

For visual businesses (fashion, food, real estate, interior design), Instagram is incredibly powerful. Post consistently, use local hashtags, and engage with your community.

## 5. Customer Referrals

Your existing customers are your best marketing channel. A simple WhatsApp message offering 10% off for referrals can bring in high-quality leads at almost zero cost.

## The Foundation: Your Website

All digital marketing works best when you have a professional website to direct traffic to. Without it, you're building on rented land (social media can change algorithms, reduce reach, or shut down).

[Get your professional website →](/order?product=website)
    `,
  },
]

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = allPosts.find(p => p.slug === slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.cover] },
  }
}

const extraPosts = [
  {
    slug: 'how-to-rank-on-google-local-seo',
    title: 'How to Rank Your Business on Google in 2025 (Local SEO)',
    excerpt: 'Local SEO is the most cost-effective way to get customers from Google.',
    cover: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80',
    tags: ['SEO', 'Digital Marketing'],
    date: '2025-05-20',
    readTime: '8 min',
    content: `
Local SEO helps your business appear in Google Maps and local search results when customers nearby search for your products or services.

## Why Local SEO Matters

When someone searches "billing software in Delhi" or "web developer near me", Google shows local results first. These get 3x more clicks than regular results.

## Step 1: Google My Business

Claim and verify your Google My Business profile. This is the #1 factor for local rankings.

**What to do:**
- Add your business name, address, phone number
- Upload 10+ high-quality photos
- Choose the right business categories
- Collect reviews from happy customers

## Step 2: NAP Consistency

Your Name, Address, Phone must be identical across all directories — Google, JustDial, Sulekha, IndiaMart, Yellow Pages.

## Step 3: Local Keywords on Your Website

Include city-specific keywords naturally in your content. "GST billing software for Delhi businesses" ranks better than generic "billing software".

## Step 4: Get Local Backlinks

Get listed in local business directories and get mentions from local websites, newspapers, and industry associations.

## Step 5: Reviews Matter

Ask every satisfied customer for a Google review. Businesses with 50+ reviews rank significantly higher than those with fewer.

## How Long Does It Take?

Local SEO results typically show in 3–6 months with consistent effort. It's a long-term investment that keeps paying off.

[Get an SEO-ready website →](/order?product=website)
    `,
  },
  {
    slug: 'invoice-management-best-practices',
    title: 'Invoice Management Best Practices to Get Paid Faster',
    excerpt: 'Late payments kill cash flow. These strategies help you get paid on time, every time.',
    cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    tags: ['Invoicing', 'Finance'],
    date: '2025-05-05',
    readTime: '6 min',
    content: `
Getting paid on time is critical for any business. Yet most small businesses in India struggle with late payments. Here's how to fix it.

## 1. Send Invoices Immediately

Don't wait until end of month. Send your invoice the same day you complete work or deliver a product. The sooner the invoice, the sooner the payment.

## 2. Set Clear Payment Terms

Always specify payment due date on the invoice — "Payment due within 15 days" is far better than "Payment due upon receipt". Be specific.

## 3. Automated Payment Reminders

Set up automatic reminders:
- 7 days before due date (friendly reminder)
- 1 day before due date (gentle nudge)
- On due date (reminder with payment link)
- 3 days overdue (firm follow-up)

## 4. Make Payment Easy

Include a direct payment link (UPI, Razorpay) on every invoice. The fewer steps to pay, the faster you get paid.

## 5. Charge Late Fees

Mention a late fee clause (e.g., 2% per month after due date) in your invoice terms. Most clients will pay on time to avoid this.

## 6. Partial Upfront Payment

For larger projects, always collect 30–50% upfront before starting work. This filters serious clients and protects your cash flow.

## InvoiceX Makes This Automatic

Our InvoiceX software automates all of this — WhatsApp/email reminders, payment links, overdue tracking — so you never have to manually chase payments again.

[Try InvoiceX →](/order?product=invoicex)
    `,
  },
  {
    slug: 'website-speed-optimization-guide',
    title: 'How Website Speed Affects Your Sales (And How to Fix It)',
    excerpt: 'A 1-second delay in page load time can reduce conversions by 7%. Here\'s how to fix it.',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    tags: ['Website', 'Performance'],
    date: '2025-04-18',
    readTime: '6 min',
    content: `
Website speed isn't just a technical metric — it directly impacts your revenue. Research shows a 1-second delay reduces conversions by 7% and increases bounce rate by 11%.

## Why Speed Matters for Indian Businesses

Many Indian customers are on mobile connections (4G, sometimes 3G). A slow website means lost customers before they even see your products.

## How to Check Your Speed

Use Google PageSpeed Insights (free). Enter your website URL and you'll get a score from 0–100. Aim for 90+ on mobile.

## Quick Wins

**1. Compress Your Images**
Images are usually the biggest culprit. Use WebP format and compress before uploading. Tools: TinyPNG, Squoosh.

**2. Use a CDN**
A Content Delivery Network serves your website from servers closest to the user. Cloudflare has a free plan.

**3. Enable Caching**
Browser caching stores static files locally so repeat visitors load your site instantly.

**4. Remove Unused Plugins**
Every plugin adds weight. Audit and remove anything you don't actively use.

**5. Choose Good Hosting**
Cheap shared hosting is the #1 speed killer. Use cloud hosting (Vercel, Netlify for frontend; DigitalOcean for backend).

## What a 90+ Score Gets You

- Higher Google rankings (speed is a ranking factor)
- Lower bounce rate
- Higher conversion rate
- Better user experience = more trust

## All WebByte Websites Score 90+

Every website we build is optimized from the ground up — compressed images, CDN, minimal JavaScript, efficient code.

[Get your fast website →](/order?product=website)
    `,
  },
  {
    slug: 'razorpay-vs-stripe-india',
    title: 'Razorpay vs Stripe for Indian Businesses — Which to Choose?',
    excerpt: 'Both are excellent payment gateways, but one is clearly better for Indian customers.',
    cover: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    tags: ['Payments', 'Tech'],
    date: '2025-04-02',
    readTime: '5 min',
    content: `
Both Razorpay and Stripe are excellent payment gateways, but they serve different needs. Here's a clear comparison for Indian businesses.

## Razorpay

Razorpay is built specifically for India. It supports every Indian payment method natively.

**Pros:**
- UPI, IMPS, NEFT payments
- All Indian bank cards
- EMI options (no-cost EMI)
- NetBanking support
- Indian customer support
- INR settlements (T+2)

**Fees:** 2% per transaction (domestic)

**Best for:** Businesses primarily selling to Indian customers

## Stripe

Stripe is a global payment gateway, excellent for international payments.

**Pros:**
- International cards (Visa, Mastercard, Amex)
- 135+ currencies
- Excellent developer experience
- Global customer base

**Cons:**
- UPI not natively supported
- INR settlements take longer
- Customer support response time can be slow for India

**Fees:** 2.9% + ₹2 per transaction

**Best for:** SaaS businesses with international customers

## Our Recommendation

**For most Indian businesses: Use Razorpay**

- Your customers pay with UPI (most popular in India)
- Lower fees for domestic transactions
- Faster settlement to Indian bank accounts
- Better customer support in IST timezone

**Add Stripe if** you have international customers who need to pay with foreign cards.

## What WebByte Uses

On our platform, we support both — Razorpay for Indian customers and Stripe for international orders. You can choose at checkout.

[Place your order →](/order)
    `,
  },
]

const allPosts = [...posts, ...extraPosts]

export async function generateStaticParams() {
  return allPosts.map(p => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = allPosts.find(p => p.slug === slug)
  if (!post) notFound()

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Cover */}
        <div className="rounded-2xl overflow-hidden mb-8 aspect-video">
          <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              <Tag className="w-3 h-3" /> {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-10 pb-8 border-b border-gray-100">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> {post.readTime} read
          </span>
        </div>

        {/* Content */}
        <div className="prose prose-gray prose-headings:font-extrabold prose-headings:text-gray-900 prose-a:text-purple-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 max-w-none text-gray-600 leading-relaxed">
          {post.content.trim().split('\n').map((line, i) => {
            if (line.startsWith('## '))
              return <h2 key={i} className="text-xl font-extrabold text-gray-900 mt-8 mb-3">{line.replace('## ', '')}</h2>
            if (line.startsWith('**') && line.endsWith('**'))
              return <p key={i} className="font-bold text-gray-900 mt-4 mb-1">{line.replace(/\*\*/g, '')}</p>
            if (line.startsWith('- '))
              return <li key={i} className="ml-4 text-gray-600">{line.replace('- ', '')}</li>
            if (line.startsWith('[') && line.includes('→]('))
              return (
                <Link key={i} href={line.match(/\(([^)]+)\)/)?.[1] || '#'}
                  className="inline-flex items-center gap-2 mt-6 btn-primary text-sm">
                  {line.match(/\[([^\]]+)\]/)?.[1]}
                </Link>
              )
            if (line.trim() === '') return <br key={i} />
            return <p key={i} className="mb-4 text-gray-600">{line}</p>
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-br from-purple-700 to-purple-900 rounded-2xl p-8 text-white text-center">
          <h3 className="text-xl font-extrabold mb-2">Ready to grow your business?</h3>
          <p className="text-purple-200 text-sm mb-6">Get a professional website, billing software, or custom digital product — delivered in days.</p>
          <Link href="/order" className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-6 py-3 rounded-xl hover:bg-purple-50 transition-colors">
            Place Your Order →
          </Link>
        </div>

      </div>
    </div>
  )
}
