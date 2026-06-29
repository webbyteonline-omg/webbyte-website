# Admin Subdomain Setup Guide
# admin.webbyte.online → WebByte Admin Panel

---

## STEP 1 — Supabase: Create Admin User

1. Go to **Supabase → SQL Editor → New Query**
2. Paste the contents of `supabase/admin-user.sql` and click **Run**
3. You should see a row returned: `admin@webbyte.online | ADMIN`

Credentials:
- Email:    `admin@webbyte.online`
- Password: `webbyte123`

---

## STEP 2 — Vercel: Add Environment Variables

Go to **Vercel → Your Project → Settings → Environment Variables**

Add/update these (all environments: Production, Preview, Development):

| Key | Value |
|-----|-------|
| `NEXTAUTH_URL` | `https://webbyte.online` |
| `NEXTAUTH_SECRET` | `PpwQVrUx2G7a2StoPetDlXmctn9n/UNMFTmQZh3+9y8=` |

> The same secret must be used locally (already updated in `.env.local`).

---

## STEP 3 — Vercel: Add admin.webbyte.online Domain

1. Go to **Vercel → Project → Settings → Domains**
2. Click **Add Domain**
3. Type `admin.webbyte.online` → click **Add**
4. Vercel will show you the DNS record required (usually a CNAME)

---

## STEP 4 — DNS: Add CNAME Record

In your domain registrar (GoDaddy / Namecheap / Cloudflare / wherever webbyte.online is):

| Type  | Host    | Value                    | TTL  |
|-------|---------|--------------------------|------|
| CNAME | `admin` | `cname.vercel-dns.com`   | Auto |

> If you're using Cloudflare, set **Proxy status = DNS only (grey cloud)** — Vercel needs direct resolution.

Wait 5–15 minutes for DNS to propagate.

---

## STEP 5 — Push Code to GitHub (triggers Vercel redeploy)

```bash
cd "/Users/sachinkumar/Desktop/WebByte Website/WebCube"

git add .
git commit -m "feat: admin subdomain routing + admin login page"
git push
```

Vercel auto-deploys on push. Watch the build at vercel.com/dashboard.

---

## STEP 6 — Verify

1. Open `https://admin.webbyte.online`
2. You should see the **WebByte Admin** login screen (dark purple)
3. Login with:
   - Email: `admin@webbyte.online`
   - Password: `webbyte123`
4. You should land on the Admin Panel dashboard

---

## How Subdomain Routing Works (for reference)

`middleware.ts` detects the `host` header:
- `admin.webbyte.online` → enforces ADMIN role, redirects to `/admin/login` if not authenticated
- `webbyte.online` → normal site with client auth protection on `/dashboard`, `/orders`

No separate Vercel project needed — same deployment, same database.

---

## Local Testing (optional)

To test the admin subdomain locally, add to `/etc/hosts`:
```
127.0.0.1  admin.localhost
```

Then update `.env.local` temporarily:
```
NEXTAUTH_URL=http://localhost:3000
```

And access `http://admin.localhost:3000/admin/login`.

---

## Security Notes

- Admin password is stored as bcrypt hash (12 rounds) in Supabase — never plain text
- `NEXTAUTH_SECRET` is in `.env.local` which is gitignored — safe
- `RAZORPAY_KEY_SECRET` never reaches frontend — server-side only
- Middleware double-checks `role === 'ADMIN'` on every admin route request
