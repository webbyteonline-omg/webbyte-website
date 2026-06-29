-- ============================================================
-- Run this in Supabase → SQL Editor → New Query
-- Creates admin@webbyte.online with password: webbyte123
-- ============================================================

-- Step 1: Check what's already in the table
SELECT id, name, email, role FROM users WHERE email = 'admin@webbyte.online';

-- Step 2: Force upsert — safe to run multiple times
INSERT INTO users (id, name, email, password, role, phone, company)
VALUES (
  gen_random_uuid()::text,
  'WebByte Admin',
  'admin@webbyte.online',
  '$2a$12$vmOF30k9wToBSgXV6HfEBeXlci7DDZiHUfyk6G1FwwAu8lpbs9VHy',
  'ADMIN',
  NULL,
  'WebByte'
)
ON CONFLICT (email) DO UPDATE
SET
  password = '$2a$12$vmOF30k9wToBSgXV6HfEBeXlci7DDZiHUfyk6G1FwwAu8lpbs9VHy',
  role     = 'ADMIN',
  name     = 'WebByte Admin';

-- Step 3: Confirm it worked
SELECT id, name, email, role FROM users WHERE email = 'admin@webbyte.online';
