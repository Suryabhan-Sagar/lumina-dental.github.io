import React, { useEffect, useState } from 'react';
import { SEO } from '../components/SEO';
import { Calendar, Clock, FileText, CheckCircle, XCircle, AlertCircle, Printer, Loader, Lock } from 'lucide-react';
import { CTAButton } from '../components/ui/CTAButton';
import { jsPDF } from 'jspdf';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

interface Appointment {
  id: string;
  date: string;
  time: string;
  department: string;
  doctor: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  reason: string;
}

export function AppointmentHistory() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/appointments?userId=${user.id}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch appointments');
      }

      console.log('Fetched appointments from server:', result.data);

      const mappedData: Appointment[] = (result.data || []).map((item: any) => {
        const shortId = item.id.toString().replace('0.', '').substring(0, 8);
        return {
          id: `APT-${shortId}`,
          date: item.appointment_date,
          time: item.time_slot,
          department: item.department,
          doctor: item.doctor,
          status: item.status || 'upcoming',
          reason: item.reason
        };
      });

      setAppointments(mappedData);
    } catch (err: any) {
      console.error('Error fetching appointments:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const getStatusIcon = (status: Appointment['status']) => {
    switch (status) {
      case 'upcoming': return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled': return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'upcoming': return <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full uppercase tracking-wider">Upcoming</span>;
      case 'completed': return <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full uppercase tracking-wider">Completed</span>;
      case 'cancelled': return <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full uppercase tracking-wider">Cancelled</span>;
    }
  };

  const downloadReceipt = (apt: Appointment) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(26, 75, 86); // #1A4B56
    doc.text("Lumina Dental - Appointment Details", 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    let y = 40;
    doc.text(`Appointment ID: ${apt.id}`, 20, y); y += 10;
    doc.text(`Status: ${apt.status.toUpperCase()}`, 20, y); y += 10;
    
    y += 10;
    doc.text(`Department: ${apt.department}`, 20, y); y += 10;
    doc.text(`Doctor: ${apt.doctor}`, 20, y); y += 10;
    
    y += 10;
    doc.text(`Date: ${apt.date}`, 20, y); y += 10;
    doc.text(`Time: ${apt.time}`, 20, y); y += 10;
    
    y += 10;
    doc.text(`Reason for Visit: ${apt.reason}`, 20, y);
    
    doc.save(`${apt.id}_Details.pdf`);
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8FBFC]">
        <SEO 
          title="Appointment History" 
          description="View your past and upcoming dental appointments at Lumina Dental."
        />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl border border-[#E2E8F0] p-12 max-w-lg w-full text-center">
            <div className="bg-orange-50 text-orange-600 p-4 rounded-full mb-6 relative w-16 h-16 mx-auto flex items-center justify-center">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#1A4B56] mb-2">Login Required</h3>
            <p className="text-gray-500 mb-8">
              Please log in to your account to view your appointment history and manage your bookings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link to="/login" className="bg-[#1A4B56] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#133A43] transition-colors shadow-lg">
                Log In
              </Link>
              <Link to="/signup" className="bg-white text-[#1A4B56] border border-[#1A4B56] px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBFC]">
      <SEO 
        title="Appointment History" 
        description="View your past and upcoming dental appointments at Lumina Dental."
      />
      
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24 border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8">
          <div className="inline-flex items-center justify-center p-3 bg-[#F0FDFA] rounded-2xl mb-6 shadow-sm border border-[#CCFBF1]">
            <Calendar className="h-8 w-8 text-[#0D9488]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A4B56] mb-6 tracking-tight">Appointment History</h1>
          <p className="text-xl text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Manage your upcoming visits and view past treatment history all in one place.
          </p>
        </div>
      </section>

      {/* List Section */}
      <section className="py-16 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1A4B56]">Your Appointments</h2>
            <CTAButton to="/new-patients" variant="primary">Book New</CTAButton>
          </div>

          <div className="space-y-6">
            {loading && (
              <div className="flex items-center justify-center p-12">
                <Loader className="w-8 h-8 text-[#0D9488] animate-spin" />
                <span className="ml-3 text-[#1A4B56] font-medium">Loading appointments...</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-200 text-center">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <p className="font-medium">Failed to load appointments</p>
                <p className="text-sm mt-1">{error}</p>
                <button 
                  onClick={fetchAppointments} 
                  className="mt-4 px-4 py-2 bg-red-100 font-bold hover:bg-red-200 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && appointments.length === 0 && (
              <div className="text-center p-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <Calendar className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1A4B56] mb-2">No Appointments Yet</h3>
                <p className="text-[#64748B] mb-6">You haven't booked any dental appointments yet.</p>
                <CTAButton to="/new-patients" variant="primary">Book Your First Visit</CTAButton>
              </div>
            )}

            {!loading && !error && appointments.map((apt) => (
              <div key={apt.id} className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-6 transition-all hover:shadow-md">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-100 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(apt.status)}
                    <span className="font-bold text-[#1A4B56]">{apt.id}</span>
                  </div>
                  <div>
                    {getStatusBadge(apt.status)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-[#1A4B56] text-lg mb-1">{apt.department}</h3>
                    <p className="text-[#64748B] flex items-center gap-2">
                       <FileText className="h-4 w-4" /> {apt.doctor}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-[#1A4B56] flex items-center gap-2 font-medium">
                      <Calendar className="h-4 w-4 text-[#0D9488]" /> {apt.date}
                    </p>
                    <p className="text-[#64748B] flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#0D9488]" /> {apt.time}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-[#64748B]">
                    <span className="font-semibold text-[#1A4B56]">Reason for Visit:</span> {apt.reason}
                  </p>
                </div>
                
                <div className="mt-6 flex flex-wrap justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => downloadReceipt(apt)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Printer className="h-4 w-4" /> Print Details
                  </button>
                  {apt.status === 'upcoming' && (
                    <>
                      <button className="px-4 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                        Cancel
                      </button>
                      <button className="px-4 py-2 text-sm font-bold text-[#0D9488] bg-[#F0FDFA] hover:bg-[#CCFBF1] rounded-lg transition-colors">
                        Reschedule
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
