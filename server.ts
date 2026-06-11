import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

// User provided credentials
const SUPABASE_PROJECT_ID = process.env.SUPABASE_PROJECT_ID || 'wbqumzsaljqdbjykodpt';
const SUPABASE_URL = SUPABASE_PROJECT_ID.startsWith('http') 
  ? SUPABASE_PROJECT_ID 
  : `https://${SUPABASE_PROJECT_ID}.supabase.co`;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_KPxRfZyjV5cW_hppi5Ci9Q_BWFODrsp';

console.log('Initializing Supabase with URL:', SUPABASE_URL);

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_change_in_prod';
const PORT = 3000;

async function startServer() {
  const app = express();
  
  // Parse JSON bodies and Cookies
  app.use(express.json());
  app.use(cookieParser());

  // API constraints check / test connection
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Admin Middleware
  const requireAdmin = (req: any, res: any, next: any) => {
    let token = req.cookies.admin_token;
    
    // Fallback to Bearer token
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    console.log('[Auth Middleware] Checking token. Has token:', !!token);
    if (!token) {
      console.log('[Auth Middleware] Unauthorized: No token');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('[Auth Middleware] Token verified for:', (decoded as any).username);
      next();
    } catch (err) {
      console.log('[Auth Middleware] Invalid token error:', err);
      res.status(401).json({ error: 'Invalid token' });
    }
  };

  // --- Admin API Routes ---

  // 1. Check if admin is set up
  app.get('/api/admin/status', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .limit(1);

      // If the table doesn't exist, it will return an error (usually 42P01)
      if (error) {
        return res.json({ isSetup: false, tableExists: false });
      }

      const isSetup = data && data.length > 0;
      return res.json({ isSetup, tableExists: true });
    } catch (err) {
      return res.json({ isSetup: false, tableExists: false });
    }
  });

  // 2. Setup Admin (Single Slot)
  app.post('/api/admin/setup', async (req, res) => {
    try {
      console.log('[Setup Route] Received setup request');
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
      }

      // Check if already set up
      const { data: existing, error: checkError } = await supabase
        .from('admin_users')
        .select('id')
        .limit(1);

      if (checkError) {
        console.error('[Setup Route] Database check failed:', checkError);
        return res.status(500).json({ error: 'Database check failed. Have you run the SQL script to create admin_users?' });
      }

      if (existing && existing.length > 0) {
        console.log('[Setup Route] Account already exists.');
        return res.status(400).json({ error: 'Admin account already exists.' });
      }

      const usernameTrimmed = username.trim();
      const passwordHash = await bcrypt.hash(password, 10);
      console.log('[Setup Route] Password hashed successfully');

      const { error: insertError } = await supabase
        .from('admin_users')
        .insert([{ username: usernameTrimmed, password_hash: passwordHash }]);

      if (insertError) {
        console.error('[Setup Route] Error inserting user:', insertError);
        return res.status(500).json({ error: insertError.message });
      }

      console.log('[Setup Route] Setup successful. Generating token...');
      // Automatically login after setup
      const token = jwt.sign({ username: usernameTrimmed }, JWT_SECRET, { expiresIn: '1d' });
      res.cookie('admin_token', token, { 
        httpOnly: true, 
        secure: true,
        sameSite: 'none'
      });
      
      return res.json({ success: true, message: 'Admin setup successful', token });
    } catch (err: any) {
      console.error('[Setup Route] Server exception:', err);
      return res.status(500).json({ error: err.message });
    }
  });

  // 3. Login Admin
  app.post('/api/admin/login', async (req, res) => {
    try {
      console.log('[Login Route] Received login request');
      const { username, password } = req.body;
      console.log('[Login Route] Username:', username);

      const usernameTrimmed = username.trim();
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, username, password_hash')
        .ilike('username', usernameTrimmed)
        .maybeSingle();
      
      console.log('[Login Route] Supabase query complete', { hasData: !!data, error });

      if (error || !data) {
        console.log('[Login Route] Invalid credentials - user not found or db error', error);
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, data.password_hash);
      console.log('[Login Route] Password match result:', isMatch);

      if (!isMatch) {
         console.log('[Login Route] Invalid credentials - password mismatch');
         return res.status(401).json({ error: 'Invalid credentials' });
      }

      console.log('[Login Route] Login successful. Generating token...');
      const token = jwt.sign({ username: data.username }, JWT_SECRET, { expiresIn: '1d' });
      
      res.cookie('admin_token', token, { 
        httpOnly: true, 
        secure: true,
        sameSite: 'none'
      });

      return res.json({ success: true, token });
    } catch (err: any) {
      console.error('[Login Route] Server exception:', err);
      return res.status(500).json({ error: err.message });
    }
  });

  // 4. Check Auth Status (used for client-side routing)
  app.get('/api/admin/auth-check', requireAdmin, (req, res) => {
    res.json({ authenticated: true });
  });

  // 5. Logout Admin
  app.post('/api/admin/logout', (req, res) => {
    res.clearCookie('admin_token', { 
        httpOnly: true, 
        secure: true,
        sameSite: 'none'
    });
    res.json({ success: true });
  });

  // 6. Fetch detailed appointments (Admin only)
  app.get('/api/admin/appointments', requireAdmin, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Appointment API
  app.post('/api/appointments', async (req, res) => {
    try {
      const formData = req.body;
      console.log('Received appointment insertion payload:', formData);
      
      const { data, error } = await supabase
        .from('appointments')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            date_of_birth: formData.dateOfBirth,
            department: formData.department,
            doctor: formData.doctor,
            appointment_date: formData.appointmentDate,
            time_slot: formData.timeSlot,
            reason: formData.reason,
          }
        ])
        .select();

      if (error) {
        console.error('Supabase insertion error:', error);
        return res.status(500).json({ error: error.message });
      }

      try {
        if (process.env.RESEND_API_KEY) {
          const { error: emailError } = await resend.emails.send({
            from: 'Lumina Dental <onboarding@resend.dev>',
            to: formData.email,
            subject: 'Lumina Dental - Appointment Confirmation',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
                <h1 style="color: #0D9488;">Appointment Confirmed!</h1>
                <p>Hi ${formData.name},</p>
                <p>Your dental appointment has been successfully booked. Here are your details:</p>
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <ul style="list-style: none; padding: 0; margin: 0; font-size: 16px; line-height: 1.5;">
                    <li><strong>Department:</strong> ${formData.department}</li>
                    <li><strong>Doctor:</strong> ${formData.doctor}</li>
                    <li><strong>Date:</strong> ${formData.appointmentDate}</li>
                    <li><strong>Time:</strong> ${formData.timeSlot}</li>
                    <li><strong>Reason:</strong> ${formData.reason}</li>
                  </ul>
                </div>
                <p>If you need to change your appointment, please contact us.</p>
                <p>Best Regards,<br/><strong>The Lumina Dental Team</strong></p>
              </div>
            `,
          });
          if (emailError) {
             if (emailError.name === 'validation_error' && emailError.message.includes('API key')) {
               console.error('Email not sent: You need to set a valid RESEND_API_KEY in your environment variables. Current key is invalid.');
             } else {
               console.error('Error sending confirmation email:', emailError.name, emailError.message);
               if (emailError.name === 'validation_error') {
                 console.error('NOTE: With a free Resend testing domain (onboarding@resend.dev), you can only send emails to the email address registered with your Resend account. You tried to send to:', formData.email);
               }
             }
          } else {
             console.log('Confirmation email successfully dispatched to', formData.email);
          }
        } else {
          console.log('RESEND_API_KEY is not defined. Skipping email confirmation to:', formData.email);
        }
      } catch (emailEx) {
        console.error('Exception during email send:', emailEx);
      }

      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error('Server error submitting appointment:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Fetch appointments API
  app.get('/api/appointments', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch error:', error);
        return res.status(500).json({ error: error.message });
      }

      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error('Server error fetching appointments:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
