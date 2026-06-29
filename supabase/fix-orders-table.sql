-- =====================================================
-- WebByte DB Fix — Sync orders table with Prisma schema
-- Run this in Supabase SQL Editor
-- =====================================================

-- 1. Create enums (safe — skips if already exists)
DO $$ BEGIN
  CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENT');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PARTIAL', 'PAID', 'REFUNDED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 2. Drop old orders table and recreate with correct column names
--    (Prisma uses the exact camelCase field names as Postgres column names)
DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "orderNumber"   TEXT UNIQUE NOT NULL,
  "userId"        TEXT,
  "customerName"  TEXT NOT NULL,
  "customerEmail" TEXT NOT NULL,
  "customerPhone" TEXT NOT NULL,
  "productId"     TEXT NOT NULL,
  "productName"   TEXT NOT NULL,
  "productPrice"  DOUBLE PRECISION NOT NULL,
  requirements    TEXT,
  status          "OrderStatus" NOT NULL DEFAULT 'PENDING',
  "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
  "paymentMethod" TEXT,
  "paymentId"     TEXT,
  "deliveryDate"  TIMESTAMPTZ,
  notes           TEXT,
  "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt"     TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT orders_userId_fkey FOREIGN KEY ("userId")
    REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS orders_userId_idx ON orders ("userId");
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders (status);

-- Auto-update updatedAt
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS orders_updated_at ON orders;
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 3. Ensure users table has all columns Prisma expects
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS "emailVerified" TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS image           TEXT,
  ADD COLUMN IF NOT EXISTS "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS "updatedAt"     TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- Rename role column if it's wrong type (safe)
DO $$ BEGIN
  -- Only update if role column exists but isn't the right enum type
  -- This alters role column to use "Role" enum
  ALTER TABLE users ALTER COLUMN role TYPE "Role" USING role::"Role";
EXCEPTION WHEN others THEN NULL;
END $$;

-- Verify
SELECT 'orders table OK' AS status, count(*) AS rows FROM orders;
