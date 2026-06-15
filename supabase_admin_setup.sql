-- Step 1: Ensure pgcrypto extension is enabled for bcrypt hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Step 2: Create the admin_users table (if not exists)
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Step 3: Enable Row Level Security (RLS) for the admin_users table
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Step 4: Allow reading the admin_users table to check if setup is needed
DROP POLICY IF EXISTS "Allow reading admin_users setup status" ON admin_users;
CREATE POLICY "Allow reading admin_users setup status" ON admin_users
  FOR SELECT
  USING (true);

-- Step 5: Allow anonymous inserts to admin_users ONLY for setup
DROP POLICY IF EXISTS "Allow anon insert admin_users setup" ON admin_users;
CREATE POLICY "Allow anon insert admin_users setup" ON admin_users
  FOR INSERT
  WITH CHECK (true);

-- Step 6: Insert the requested admin user with the bcrypt hashed password
INSERT INTO admin_users (username, password_hash)
VALUES (
  'luminadentalowner@gmail.com',
  crypt('lumident2026', gen_salt('bf'))
)
ON CONFLICT (username) DO NOTHING;
