import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID || 'wbqumzsaljqdbjykodpt';
const SUPABASE_URL = SUPABASE_PROJECT_ID.startsWith('http') 
  ? SUPABASE_PROJECT_ID 
  : `https://${SUPABASE_PROJECT_ID}.supabase.co`;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_KPxRfZyjV5cW_hppi5Ci9Q_BWFODrsp';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
