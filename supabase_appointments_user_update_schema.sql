-- Step 1: Add user_id column to appointments table
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

-- Step 2: Policy for authenticated user to read their own appointments
DROP POLICY IF EXISTS "Allow authenticated users to read own appointments" ON appointments;
CREATE POLICY "Allow authenticated users to read own appointments" ON appointments
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Keep anonymous read so admin backend (using anon key) can still read all 
-- (Alternatively, we'd have to rewrite the backend admin to use a service role key)
DROP POLICY IF EXISTS "Allow anonymous reading of all appointments" ON appointments;
CREATE POLICY "Allow anonymous reading of all appointments" ON appointments
  FOR SELECT TO anon
  USING (true);

-- Anonymous inserts can carry user_id if supplied by backend securely
DROP POLICY IF EXISTS "Allow anonymous appointment inserts" ON appointments;
CREATE POLICY "Allow anonymous appointment inserts" ON appointments
  FOR INSERT
  WITH CHECK (true);
