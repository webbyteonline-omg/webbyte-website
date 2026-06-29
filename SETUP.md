# WebByte Website — Setup Guide

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
# Edit .env.local and fill in your actual keys (see below)

# 3. Set up database
npx prisma generate
npx prisma db push

# 4. Run development server
npm run dev
```

Visit `http://localhost:3000`

---

## Environment Variables to Configure

Open `.env.local` and update these:

### Razorpay (India payments)
1. Go to https://dashboard.razorpay.com
2. Create account → Test Mode → API Keys
3. Copy Key ID and Key Secret into `.env.local`

### Stripe (International payments)
1. Go to https://dashboard.stripe.com
2. Developers → API Keys
3. Copy Publishable Key and Secret Key

### NextAuth Secret
Run this to generate a secure secret:
```bash
openssl rand -base64 32
```
Paste it as `NEXTAUTH_SECRET`

---

## Making Yourself Admin

After registering on the site, run:

```bash
npx prisma studio
```

Open Users table → find your email → change `role` from `CLIENT` to `ADMIN` → Save.

Then access `/admin` for the admin panel.

---

## Deploying to Production

### Recommended: Vercel (free tier)
1. Push code to GitHub
2. Go to vercel.com → Import project
3. Add environment variables in Vercel dashboard
4. Change `DATABASE_URL` to a PostgreSQL URL (Supabase/Neon free tier)
5. Update `NEXTAUTH_URL` to your production domain

### Database (Production)
Replace SQLite with PostgreSQL in `prisma/schema.prisma`:
```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Free PostgreSQL options:
- Supabase: https://supabase.com (free tier)
- Neon: https://neon.tech (free tier)

---

## Tech Stack
- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS (Purple theme)
- **Auth**: NextAuth.js (credentials-based)
- **Database**: Prisma ORM + SQLite (dev) / PostgreSQL (prod)
- **Payments**: Razorpay + Stripe
- **SEO**: Sitemap, robots.txt, OG tags, per-page metadata

## File Structure
```
app/
  page.tsx           — Home page
  products/          — Products & pricing
  order/             — Order form + checkout
  blog/              — Blog listing
  login/             — Sign in
  register/          — Sign up
  dashboard/         — Client order tracker
  admin/             — Admin order management
  api/
    auth/            — NextAuth + register
    orders/          — CRUD for orders
    payment/         — Razorpay verify + Stripe webhook
components/
  Navbar.tsx
  Footer.tsx
  AuthProvider.tsx
lib/
  prisma.ts          — Database client
  auth.ts            — NextAuth config
prisma/
  schema.prisma      — Database schema
```
