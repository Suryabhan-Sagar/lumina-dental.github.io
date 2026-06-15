-- Run this script in your Supabase SQL Editor to create the inquiries table

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (since we use the anon key on the frontend/backend)
DROP POLICY IF EXISTS "Allow anonymous inquiry inserts" ON inquiries;
CREATE POLICY "Allow anonymous inquiry inserts" ON inquiries
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reading all inquiries for admin
DROP POLICY IF EXISTS "Allow authenticated reading of inquiries" ON inquiries;
CREATE POLICY "Allow authenticated reading of inquiries" ON inquiries
  FOR SELECT
  USING (true);
