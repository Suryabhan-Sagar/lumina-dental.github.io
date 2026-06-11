-- Run this script in your Supabase SQL Editor to create the appointments table

CREATE TABLE IF NOT EXISTS appointments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date_of_birth date,
  department text,
  doctor text,
  appointment_date date,
  time_slot text,
  reason text,
  status text DEFAULT 'upcoming',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (since we use the anon key on the frontend/backend)
DROP POLICY IF EXISTS "Allow anonymous appointment inserts" ON appointments;
CREATE POLICY "Allow anonymous appointment inserts" ON appointments
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reading all appointments (if you want the history page to fetch from Supabase later)
DROP POLICY IF EXISTS "Allow reading all appointments" ON appointments;
CREATE POLICY "Allow reading all appointments" ON appointments
  FOR SELECT
  USING (true);

-- Run this to create the admin_users table for the secure single-slot admin panel
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) for the admin_users table
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow reading the admin_users table to check if setup is needed
DROP POLICY IF EXISTS "Allow reading admin_users setup status" ON admin_users;
CREATE POLICY "Allow reading admin_users setup status" ON admin_users
  FOR SELECT
  USING (true);

-- Allow anonymous inserts to admin_users ONLY for setup (we handle 'single slot' logic in backend)
DROP POLICY IF EXISTS "Allow anon insert admin_users setup" ON admin_users;
CREATE POLICY "Allow anon insert admin_users setup" ON admin_users
  FOR INSERT
  WITH CHECK (true);

