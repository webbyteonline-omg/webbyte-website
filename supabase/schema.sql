-- ============================================================
-- WebByte — Supabase PostgreSQL Schema
-- Run this entire file in: Supabase → SQL Editor → New Query
-- ============================================================


-- ============================================================
-- STEP 1: ENUMS
-- ============================================================

CREATE TYPE user_role AS ENUM ('ADMIN', 'CLIENT');

CREATE TYPE order_status AS ENUM (
  'PENDING',
  'CONFIRMED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED'
);

CREATE TYPE payment_status AS ENUM (
  'UNPAID',
  'PARTIAL',
  'PAID',
  'REFUNDED'
);


-- ============================================================
-- STEP 2: USERS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
  id             TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name           TEXT,
  email          TEXT        UNIQUE NOT NULL,
  email_verified TIMESTAMPTZ,
  password       TEXT,
  image          TEXT,
  role           user_role   NOT NULL DEFAULT 'CLIENT',
  phone          TEXT,
  company        TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- STEP 3: NEXTAUTH TABLES (accounts, sessions, verification_tokens)
-- ============================================================

CREATE TABLE IF NOT EXISTS accounts (
  id                  TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id             TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type                TEXT NOT NULL,
  provider            TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  refresh_token       TEXT,
  access_token        TEXT,
  expires_at          BIGINT,
  token_type          TEXT,
  scope               TEXT,
  id_token            TEXT,
  session_state       TEXT,
  UNIQUE (provider, provider_account_id)
);

CREATE TABLE IF NOT EXISTS sessions (
  id            TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  session_token TEXT        UNIQUE NOT NULL,
  user_id       TEXT        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires       TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier TEXT        NOT NULL,
  token      TEXT        UNIQUE NOT NULL,
  expires    TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (identifier, token)
);


-- ============================================================
-- STEP 4: ORDERS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS orders (
  id             TEXT           PRIMARY KEY DEFAULT gen_random_uuid()::text,
  order_number   TEXT           UNIQUE NOT NULL,
  user_id        TEXT           REFERENCES users(id) ON DELETE SET NULL,
  customer_name  TEXT           NOT NULL,
  customer_email TEXT           NOT NULL,
  customer_phone TEXT           NOT NULL,
  product_id     TEXT           NOT NULL,
  product_name   TEXT           NOT NULL,
  product_price  NUMERIC(10,2)  NOT NULL,
  requirements   TEXT,
  status         order_status   NOT NULL DEFAULT 'PENDING',
  payment_status payment_status NOT NULL DEFAULT 'UNPAID',
  payment_method TEXT,
  payment_id     TEXT,
  delivery_date  TIMESTAMPTZ,
  notes          TEXT,
  created_at     TIMESTAMPTZ    NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ    NOT NULL DEFAULT now()
);

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- STEP 5: BLOG POSTS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS blog_posts (
  id           TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title        TEXT        NOT NULL,
  slug         TEXT        UNIQUE NOT NULL,
  excerpt      TEXT        NOT NULL,
  content      TEXT        NOT NULL,
  cover_image  TEXT,
  tags         TEXT,
  published    BOOLEAN     NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- STEP 6: INDEXES (for performance)
-- ============================================================

-- Users
CREATE INDEX IF NOT EXISTS idx_users_email        ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role         ON users(role);

-- Accounts
CREATE INDEX IF NOT EXISTS idx_accounts_user_id   ON accounts(user_id);

-- Sessions
CREATE INDEX IF NOT EXISTS idx_sessions_user_id   ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token     ON sessions(session_token);

-- Orders
CREATE INDEX IF NOT EXISTS idx_orders_user_id     ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status      ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment     ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_email       ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at  ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_number      ON orders(order_number);

-- Blog
CREATE INDEX IF NOT EXISTS idx_blog_slug          ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published     ON blog_posts(published, published_at DESC);


-- ============================================================
-- STEP 7: ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE users              ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts           ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions           ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders             ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts         ENABLE ROW LEVEL SECURITY;

-- NOTE: Our app uses the service_role key via Prisma (server-side),
-- which bypasses RLS entirely. The policies below are for any
-- direct Supabase client (anon) access — they keep data private.

-- USERS: No direct anon access
CREATE POLICY "No anon access to users"
  ON users FOR ALL TO anon USING (false);

CREATE POLICY "No anon access to users (insert)"
  ON users FOR INSERT TO anon WITH CHECK (false);

-- ACCOUNTS: No direct anon access
CREATE POLICY "No anon access to accounts"
  ON accounts FOR ALL TO anon USING (false);

-- SESSIONS: No direct anon access
CREATE POLICY "No anon access to sessions"
  ON sessions FOR ALL TO anon USING (false);

-- VERIFICATION TOKENS: No direct anon access
CREATE POLICY "No anon access to verification_tokens"
  ON verification_tokens FOR ALL TO anon USING (false);

-- ORDERS: No direct anon access
CREATE POLICY "No anon access to orders"
  ON orders FOR ALL TO anon USING (false);

-- BLOG POSTS: Public can read published posts
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts FOR SELECT TO anon
  USING (published = true);

CREATE POLICY "No anon write to blog posts"
  ON blog_posts FOR INSERT TO anon WITH CHECK (false);

CREATE POLICY "No anon update to blog posts"
  ON blog_posts FOR UPDATE TO anon USING (false);


-- ============================================================
-- STEP 8: SEED DATA (optional — adds your 3 products as reference)
-- ============================================================

-- Sample admin user (change the email & use a hashed password in production)
-- Password hash below = 'admin123' — CHANGE THIS before going live!
-- To generate a proper hash: use bcrypt with 12 rounds
INSERT INTO users (id, name, email, password, role, phone, company)
VALUES (
  'admin-webbyte-001',
  'Sachin Kumar',
  'maheshsubhsafal1234@gmail.com',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TgKyqKqKqKqKqKqKqKqKqKqKqKq',  -- placeholder, reset via app
  'ADMIN',
  '+91 98765 43210',
  'WebByte'
) ON CONFLICT (email) DO NOTHING;

-- Sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, tags, published, published_at)
VALUES
(
  'Why Every Indian Business Needs a Website in 2025',
  'why-your-business-needs-a-website-in-2025',
  'Over 70% of Indian consumers research online before buying. If your business isn''t online, you''re invisible to them.',
  'Full article content goes here...',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
  'Website,Digital Marketing',
  true,
  '2025-06-15'::timestamptz
),
(
  'Complete Guide to GST Billing Software for Small Businesses',
  'gst-billing-software-guide',
  'GST compliance can be complex. The right billing software automates CGST, SGST, and IGST calculations so you focus on growing.',
  'Full article content goes here...',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
  'Billing,GST,Software',
  true,
  '2025-06-01'::timestamptz
),
(
  'How to Rank Your Business on Google in 2025 (Local SEO)',
  'how-to-rank-on-google-local-seo',
  'Local SEO is the most cost-effective way to get customers from Google. Here''s exactly what to do.',
  'Full article content goes here...',
  'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80',
  'SEO,Digital Marketing',
  true,
  '2025-05-20'::timestamptz
)
ON CONFLICT (slug) DO NOTHING;


-- ============================================================
-- STEP 9: USEFUL VIEWS (for admin queries)
-- ============================================================

-- Order summary view
CREATE OR REPLACE VIEW order_summary AS
SELECT
  o.id,
  o.order_number,
  o.customer_name,
  o.customer_email,
  o.customer_phone,
  o.product_name,
  o.product_price,
  o.status,
  o.payment_status,
  o.payment_method,
  o.requirements,
  o.created_at,
  u.name   AS user_name,
  u.company AS user_company
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
ORDER BY o.created_at DESC;

-- Revenue stats view
CREATE OR REPLACE VIEW revenue_stats AS
SELECT
  COUNT(*)                                              AS total_orders,
  COUNT(*) FILTER (WHERE status = 'PENDING')            AS pending_orders,
  COUNT(*) FILTER (WHERE status = 'IN_PROGRESS')        AS active_orders,
  COUNT(*) FILTER (WHERE status = 'COMPLETED')          AS completed_orders,
  COUNT(*) FILTER (WHERE payment_status = 'PAID')       AS paid_orders,
  COALESCE(SUM(product_price) FILTER (WHERE payment_status = 'PAID'), 0) AS total_revenue,
  COALESCE(SUM(product_price) FILTER (WHERE payment_status = 'UNPAID'), 0) AS pending_revenue
FROM orders;


-- ============================================================
-- DONE! Your database is ready.
-- Next: copy the DATABASE_URL from Supabase → Settings → Database
-- and add it to your .env.local file.
-- ============================================================
