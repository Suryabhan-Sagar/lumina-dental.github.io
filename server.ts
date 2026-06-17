import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const resend = new Resend(process.env.RESEND_API_KEY);
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_change_in_prod';
const PORT = 3000;

// In-Memory DB
let appointments: any[] = [];
let adminUsers: any[] = [{
  id: 'mock-admin',
  username: 'luminadentalowner@gmail.com',
  password_hash: bcrypt.hashSync('lumident2026', 10)
}];

async function startServer() {
  const app = express();
  
  app.use(express.json());
  app.use(cookieParser());

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  const requireAdmin = (req: any, res: any, next: any) => {
    let token = req.cookies.admin_token;
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };

  app.get('/api/admin/status', async (req, res) => {
    return res.json({ isSetup: adminUsers.length > 0, tableExists: true });
  });

  app.post('/api/admin/setup', async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
      if (adminUsers.length > 0) return res.status(400).json({ error: 'Admin account already exists.' });

      const usernameTrimmed = username.trim();
      const passwordHash = await bcrypt.hash(password, 10);
      adminUsers.push({ id: Math.random().toString(), username: usernameTrimmed, password_hash: passwordHash });

      const token = jwt.sign({ username: usernameTrimmed }, JWT_SECRET, { expiresIn: '1d' });
      res.cookie('admin_token', token, { httpOnly: true, secure: true, sameSite: 'none' });
      return res.json({ success: true, message: 'Admin setup successful', token });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/admin/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const usernameTrimmed = username.trim();
      
      const user = adminUsers.find(u => u.username.toLowerCase() === usernameTrimmed.toLowerCase());
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1d' });
      res.cookie('admin_token', token, { httpOnly: true, secure: true, sameSite: 'none' });

      return res.json({ success: true, token });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/admin/auth-check', requireAdmin, (req, res) => {
    res.json({ authenticated: true });
  });

  app.post('/api/admin/logout', (req, res) => {
    res.clearCookie('admin_token', { httpOnly: true, secure: true, sameSite: 'none' });
    res.json({ success: true });
  });

  app.get('/api/admin/appointments', requireAdmin, async (req, res) => {
    res.json({ success: true, data: appointments });
  });

  app.post('/api/appointments', async (req, res) => {
    try {
      const formData = req.body;
      const newAppt = {
        id: Math.random().toString(),
        created_at: new Date().toISOString(),
        ...formData,
        appointment_date: formData.appointmentDate,
        time_slot: formData.timeSlot,
        user_id: formData.userId,
      };
      appointments.unshift(newAppt);

      if (process.env.RESEND_API_KEY) {
        // attempt to send email async
      }

      res.status(200).json({ success: true, data: [newAppt] });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/appointments', async (req, res) => {
    const userId = req.query.userId;
    let userApts = appointments;
    if (userId) userApts = appointments.filter(a => a.user_id === userId);
    res.status(200).json({ success: true, data: userApts });
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
