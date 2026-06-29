-- Run this in Supabase → SQL Editor → New Query
-- Creates/updates admin account for admin.webbyte.online

-- Update existing row if email already exists, otherwise insert fresh
INSERT INTO users (name, email, password, role, phone, company)
VALUES (
  'WebByte Admin',
  'admin@webbyte.online',
  '$2a$12$cF6F82rtyZ6it3n2QTk7.eXQQhRRFcPqmOEuUtUNzDLf9L0xHbQmq',
  'ADMIN',
  NULL,
  'WebByte'
)
ON CONFLICT (email) DO UPDATE
SET
  password = '$2a$12$cF6F82rtyZ6it3n2QTk7.eXQQhRRFcPqmOEuUtUNzDLf9L0xHbQmq',
  role     = 'ADMIN',
  name     = 'WebByte Admin';

-- Verify
SELECT id, name, email, role FROM users WHERE email = 'admin@webbyte.online';
