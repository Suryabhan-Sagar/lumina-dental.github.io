import React, { useState, useEffect } from 'react';
import { Shield, Lock, User, LayoutDashboard, LogOut, CheckCircle, Clock, Calendar, BarChart2, PieChart as PieChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { SEO } from '../components/SEO';

export function Admin() {
  const [view, setView] = useState<'loading' | 'dashboard' | 'login' | 'setup' | 'missing_table'>('loading');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Dashboard state
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    checkStatus();
  }, []);

  const getAuthHeaders = () => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('admin_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  const checkStatus = async () => {
    try {
      const authRes = await fetch('/api/admin/auth-check', {
        headers: getAuthHeaders()
      });
      if (authRes.ok) {
        setView('dashboard');
        fetchAppointments();
        return;
      }
      
      const statusRes = await fetch('/api/admin/status');
      const statusData = await statusRes.json();

      if (!statusData.isSetup) {
        setView('setup');
      } else {
        setView('login');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load admin module.');
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/admin/appointments', {
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        if (res.status === 401) {
           setView('login');
           return;
        }
        throw new Error('Failed to load');
      }
      const json = await res.json();
      setAppointments(json.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        if (data.token) {
          localStorage.setItem('admin_token', data.token);
        }
        setView('dashboard');
        fetchAppointments();
      } else {
        setError(data.error || 'Failed to setup admin.');
      }
    } catch (err) {
      setError('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        if (data.token) {
          localStorage.setItem('admin_token', data.token);
        }
        setView('dashboard');
        fetchAppointments();
      } else {
        setError(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { 
        method: 'POST',
        headers: getAuthHeaders()
      });
      localStorage.removeItem('admin_token');
      setView('login');
      setUsername('');
      setPassword('');
      setAppointments([]);
    } catch (err) {
      console.error(err);
    }
  };

  if (view === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0D9488]"></div>
      </div>
    );
  }

  if (view === 'setup' || view === 'login') {
    const isSetup = view === 'setup';
    return (
      <div className="py-20 px-4">
        <SEO title={`${isSetup ? 'Admin Setup' : 'Admin Login'} - Lumina Dental`} description="Admin secure login and setup area" />
        
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
          <div className="bg-[#1A4B56] p-8 text-center text-white">
            {isSetup ? (
              <Shield className="w-12 h-12 mx-auto mb-4 text-[#2DD4BF]" />
            ) : (
              <Lock className="w-12 h-12 mx-auto mb-4 text-[#2DD4BF]" />
            )}
            <h1 className="text-2xl font-bold mb-2">{isSetup ? 'Create Admin Account' : 'Admin Login'}</h1>
            <p className="text-[#94A3B8]">
              {isSetup 
                ? 'Create the single admin account. This slot is only available once.' 
                : 'Enter your credentials to access the secure admin dashboard.'}
            </p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={isSetup ? handleSetup : handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Username / Email</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all outline-none"
                    placeholder="Enter username or email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all outline-none"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-xl font-bold transition-colors disabled:opacity-70"
              >
                {isSubmitting ? 'Processing...' : (isSetup ? 'Create Account' : 'Secure Login')}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const COLORS = ['#0D9488', '#14B8A6', '#2DD4BF', '#5EEAD4', '#0F766E', '#115E59'];

  const getDailyVolumeData = () => {
    const counts: Record<string, number> = {};
    appointments.forEach(apt => {
      const date = apt.appointment_date;
      if (date) {
        counts[date] = (counts[date] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .slice(-14)
      .map(([date, count]) => ({ date, count }));
  };

  const getDepartmentData = () => {
    const counts: Record<string, number> = {};
    appointments.forEach(apt => {
      const dept = apt.department || 'Other';
      counts[dept] = (counts[dept] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value }));
  };

  const dailyVolumeData = getDailyVolumeData();
  const departmentData = getDepartmentData();

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO title="Admin Dashboard - Lumina Dental" description="Secure dashboard to manage Lumina Dental appointments" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center text-[#0D9488]">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your clinic bookings securely.</p>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors border border-gray-200"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Appointment Volume Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0]">
            <div className="flex items-center gap-2 mb-6">
              <BarChart2 className="w-5 h-5 text-[#0D9488]" />
              <h2 className="text-lg font-bold text-gray-900">Daily Appointment Volume</h2>
            </div>
            <div className="h-[300px] w-full">
              {appointments.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyVolumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                    <RechartsTooltip 
                      cursor={{ fill: '#F1F5F9' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="count" fill="#0D9488" radius={[4, 4, 0, 0]} barSize={32} name="Appointments" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">No data available</div>
              )}
            </div>
          </div>

          {/* Service Requests Distribution */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0]">
            <div className="flex items-center gap-2 mb-6">
              <PieChartIcon className="w-5 h-5 text-[#0D9488]" />
              <h2 className="text-lg font-bold text-gray-900">Service Requests</h2>
            </div>
            <div className="h-[300px] w-full">
              {appointments.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">No data available</div>
              )}
            </div>
          </div>
        </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Appointments</h2>
          <span className="bg-[#0D9488]/10 text-[#0D9488] px-3 py-1 rounded-full text-xs font-bold">
            {appointments.length} Total
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Patient</th>
                <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Contact</th>
                <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Appointment</th>
                <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Department / Doctor</th>
                <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Status / Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 px-6 text-center text-gray-500">
                    No appointments booked yet.
                  </td>
                </tr>
              ) : (
                appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">{apt.name}</div>
                      <div className="text-xs text-gray-500 mt-1">DOB: {apt.date_of_birth}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-gray-800">{apt.phone}</div>
                      <div className="text-xs text-gray-500 mt-1">{apt.email}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-800 mb-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {apt.appointment_date}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {apt.time_slot}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-gray-800">{apt.department}</div>
                      <div className="text-xs text-gray-500 mt-1">{apt.doctor}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mb-2">
                        <CheckCircle className="w-3 h-3" />
                        {apt.status}
                      </div>
                      <div className="text-sm text-gray-600 line-clamp-2 max-w-[200px]" title={apt.reason}>
                        {apt.reason}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
