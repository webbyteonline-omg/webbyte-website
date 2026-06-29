# WebByte — Complete Deployment Guide
# Supabase + Vercel + webbyte.tech

---

## STEP 1 — SUPABASE SETUP

### 1.1 Create Project
1. Go to https://supabase.com → Sign up / Log in
2. Click **"New Project"**
3. Fill in:
   - **Name**: webbyte
   - **Database Password**: (save this — you'll need it)
   - **Region**: South Asia (ap-south-1) — closest to India
4. Click **"Create new project"** → wait ~2 minutes

---

### 1.2 Run the SQL Schema
1. In your Supabase project → left sidebar → **"SQL Editor"**
2. Click **"New Query"**
3. Open the file: `supabase/schema.sql` from your project folder
4. Copy everything → paste into the SQL Editor
5. Click **"Run"** (green button)
6. You should see: `Success. No rows returned`

---

### 1.3 Get Your Database URLs
1. Left sidebar → **"Project Settings"** → **"Database"**
2. Scroll down to **"Connection string"**
3. Select the **"URI"** tab
4. You'll see two modes — copy both:

**Transaction mode (port 6543)** → this is your `DATABASE_URL`
```
postgresql://postgres.YOURREF:YOURPASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
```

**Session mode (port 5432)** → this is your `DIRECT_URL`
```
postgresql://postgres.YOURREF:YOURPASSWORD@aws-0-ap-south-1.pooler.supabase.com:5432/postgres
```

5. Open your `.env.local` file and replace the placeholders with these URLs
6. Add `?pgbouncer=true` to the end of `DATABASE_URL` only

---

### 1.4 Make Yourself Admin
1. In Supabase → left sidebar → **"SQL Editor"** → **"New Query"**
2. First, register on your website (http://localhost:3000/register)
3. Then run this SQL to make yourself admin:

```sql
UPDATE users
SET role = 'ADMIN'
WHERE email = 'maheshsubhsafal1234@gmail.com';
```

4. Click **Run** → you'll see `1 row affected`
5. Now go to http://localhost:3000/admin — it will work ✅

---

### 1.5 Test Locally with Supabase
```bash
cd /Users/sachinkumar/Desktop/WebByte/WebByte
npx prisma generate
npx prisma db pull    # confirms connection works
npm run dev
```

---

## STEP 2 — VERCEL DEPLOYMENT

### 2.1 Push Code to GitHub
```bash
cd /Users/sachinkumar/Desktop/WebByte/WebByte

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit — WebByte website"

# Create a repo on github.com named "webbyte-website" (make it Private)
# Then:
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/webbyte-website.git
git branch -M main
git push -u origin main
```

---

### 2.2 Deploy to Vercel
1. Go to https://vercel.com → Sign up with GitHub
2. Click **"Add New Project"**
3. Import your `webbyte-website` repo
4. Framework will auto-detect as **Next.js** ✅
5. **Don't deploy yet** — first add environment variables (Step 2.3)

---

### 2.3 Add Environment Variables in Vercel
In the Vercel import screen → **"Environment Variables"** section, add ALL of these:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | your Supabase transaction URL (port 6543) + `?pgbouncer=true` |
| `DIRECT_URL` | your Supabase session URL (port 5432) |
| `NEXTAUTH_URL` | `https://webbyte.tech` |
| `NEXTAUTH_SECRET` | (run `openssl rand -base64 32` in terminal to generate) |
| `RAZORPAY_KEY_ID` | your Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | your Razorpay secret |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | same as RAZORPAY_KEY_ID |
| `STRIPE_SECRET_KEY` | your Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | get this after Step 2.5 |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | your Stripe publishable key |
| `NEXT_PUBLIC_APP_URL` | `https://webbyte.tech` |
| `NEXT_PUBLIC_COMPANY_NAME` | `WebByte` |
| `NEXT_PUBLIC_COMPANY_EMAIL` | `hello@webbyte.tech` |
| `NEXT_PUBLIC_COMPANY_PHONE` | your phone number |

6. Click **"Deploy"** → wait ~3 minutes
7. You'll get a URL like `webbyte-website.vercel.app` ✅

---

### 2.4 Connect webbyte.tech Domain
1. In Vercel → your project → **"Settings"** → **"Domains"**
2. Click **"Add Domain"** → type `webbyte.tech` → click Add
3. Also add `www.webbyte.tech`
4. Vercel will show you DNS records to add

**Go to your domain registrar (where you buy webbyte.tech):**
5. Add these DNS records:
   - **Type A** | **Name: @** | **Value: 76.76.21.21**
   - **Type CNAME** | **Name: www** | **Value: cname.vercel-dns.com**
6. Wait 5–30 minutes for DNS to propagate
7. Vercel will auto-issue SSL certificate (HTTPS) ✅

---

### 2.5 Set Up Stripe Webhook (for production payments)
1. Go to https://dashboard.stripe.com → **Developers** → **Webhooks**
2. Click **"Add endpoint"**
3. Endpoint URL: `https://webbyte.tech/api/payment/webhook`
4. Events to listen: `checkout.session.completed`
5. Click **"Add endpoint"**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Go back to Vercel → **Settings → Environment Variables**
8. Update `STRIPE_WEBHOOK_SECRET` with this value
9. Redeploy: Vercel dashboard → **Deployments** → **Redeploy**

---

### 2.6 Set Up Razorpay Webhook (optional but recommended)
1. Go to https://dashboard.razorpay.com → **Settings** → **Webhooks**
2. Click **"Add New Webhook"**
3. Webhook URL: `https://webbyte.tech/api/payment/verify`
4. Events: `payment.captured`
5. Click **Save**

---

## STEP 3 — POST-DEPLOYMENT CHECKLIST

After your site is live at webbyte.tech:

- [ ] Register at https://webbyte.tech/register with `maheshsubhsafal1234@gmail.com`
- [ ] Run the admin SQL in Supabase (Step 1.4 above)
- [ ] Test placing a test order
- [ ] Test Razorpay payment (use test keys first)
- [ ] Switch Razorpay to Live mode when ready
- [ ] Switch Stripe to Live mode when ready
- [ ] Update env vars in Vercel with live keys → Redeploy

---

## QUICK REFERENCE — Admin Access

**URL**: https://webbyte.tech/admin
**Email**: maheshsubhsafal1234@gmail.com
**Password**: whatever you set during registration

To reset password → Supabase SQL Editor:
```sql
-- First generate a hash at: https://bcrypt-generator.com (12 rounds)
UPDATE users
SET password = 'PASTE_BCRYPT_HASH_HERE'
WHERE email = 'maheshsubhsafal1234@gmail.com';
```

---

## GENERATE NEXTAUTH SECRET (run in your Terminal)

```bash
openssl rand -base64 32
```

Copy the output → paste as `NEXTAUTH_SECRET` in Vercel.
