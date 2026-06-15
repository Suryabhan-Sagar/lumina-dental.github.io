import React, { useState } from 'react';
import { CTAButton } from '../ui/CTAButton';
import { Printer, Lock } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  department: string;
  doctor: string;
  appointmentDate: string;
  timeSlot: string;
  reason: string;
}

const departments = [
  'General Dentistry',
  'Cosmetic Dentistry',
  'Pediatric Dentistry',
  'Orthodontics',
  'Oral Surgery'
];

const doctorsByDepartment: Record<string, string[]> = {
  'General Dentistry': ['Dr. Sarah Jenkins', 'Dr. Michael Chen'],
  'Cosmetic Dentistry': ['Dr. Emily Carter'],
  'Pediatric Dentistry': ['Dr. David Wilson'],
  'Orthodontics': ['Dr. James Martinez'],
  'Oral Surgery': ['Dr. Robert Taylor']
};

const timeSlots = [
  '08:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM'
];

export function BookingForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<BookingFormData>({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    dateOfBirth: '',
    department: '',
    doctor: '',
    appointmentDate: '',
    timeSlot: '',
    reason: ''
  });
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null);

  const validate = () => {
    const newErrors: Partial<BookingFormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.doctor.trim()) newErrors.doctor = 'Doctor is required';
    if (!formData.appointmentDate.trim()) newErrors.appointmentDate = 'Appointment Date is required';
    if (!formData.timeSlot.trim()) newErrors.timeSlot = 'Time Slot is required';
    if (!formData.reason.trim()) newErrors.reason = 'Reason for Visit is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        const payload = {
          ...formData,
          userId: user?.id
        };
        const response = await fetch('/api/appointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to submit appointment');
        }
        
        setIsSubmitting(false);
        setIsSuccess(true);
        setSubmittedData(formData);
        setFormData({ name: user?.user_metadata?.full_name || '', email: user?.email || '', phone: '', dateOfBirth: '', department: '', doctor: '', appointmentDate: '', timeSlot: '', reason: '' });
      } catch (error: any) {
        console.error('Error submitting form:', error);
        alert(`There was an error booking your appointment:\n${error.message}`);
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      // Reset doctor if department changes
      if (name === 'department') {
        newData.doctor = '';
      }
      return newData;
    });
    if (errors[name as keyof BookingFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const downloadReceipt = () => {
    if (!submittedData) return;
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(26, 75, 86); // #1A4B56
    doc.text("Lumina Dental - Appointment Receipt", 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    let y = 40;
    doc.text(`Patient Name: ${submittedData.name}`, 20, y); y += 10;
    doc.text(`Email: ${submittedData.email}`, 20, y); y += 10;
    doc.text(`Phone: ${submittedData.phone}`, 20, y); y += 10;
    
    y += 10;
    doc.text(`Department: ${submittedData.department}`, 20, y); y += 10;
    doc.text(`Doctor: ${submittedData.doctor}`, 20, y); y += 10;
    
    y += 10;
    doc.text(`Appointment Date: ${submittedData.appointmentDate}`, 20, y); y += 10;
    doc.text(`Time Slot: ${submittedData.timeSlot}`, 20, y); y += 10;
    
    y += 10;
    doc.text(`Reason for Visit: ${submittedData.reason}`, 20, y);
    
    doc.save(`Appointment_${submittedData.name.replace(/\s+/g, '_')}.pdf`);
  };

  if (isSuccess) {
    return (
      <div className="bg-[#DCFCE7] border border-[#22C55E] rounded-3xl p-8 text-center h-full flex flex-col justify-center shadow-lg min-h-[400px]">
        <h3 className="text-xl font-bold text-[#065F46] mb-2">Appointment Requested!</h3>
        <p className="text-[#1A4B56]">
          Thank you for reaching out. We will get back to you shortly to confirm your appointment.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            type="button"
            onClick={downloadReceipt}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#065F46] border border-[#065F46] rounded-xl font-bold hover:bg-[#F0FDFA] transition-colors w-full sm:w-auto"
          >
            <Printer className="w-5 h-5" /> Print / Save PDF
          </button>
          <button 
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setSubmittedData(null);
            }}
            className="px-6 py-3 bg-[#065F46] text-white rounded-xl font-bold hover:bg-[#047857] transition-colors w-full sm:w-auto"
          >
            Book Another
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-[#E2E8F0] p-8 h-full flex flex-col justify-center items-center text-center min-h-[400px]">
        <div className="bg-orange-50 text-orange-600 p-4 rounded-full mb-6 relative">
          <Lock className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-[#1A4B56] mb-2">Login Required</h3>
        <p className="text-gray-500 mb-8 max-w-sm">
          Please log in to your account or sign up to book a dental appointment online.
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
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-[#E2E8F0] p-8">
      <h3 className="text-2xl font-bold text-[#1A4B56] mb-6">Book an Appointment</h3>
      
      <div className="space-y-4">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-[#1A4B56] mb-1">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-[#0D9488] focus:border-[#0D9488] ${errors.name ? 'border-red-500 bg-red-50' : 'border-[#CBD5E1] bg-[#F8FBFC]'}`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold text-[#1A4B56] mb-1">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="doctor@wecarehospital.in"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-[#0D9488] focus:border-[#0D9488] ${errors.email ? 'border-red-500 bg-red-50' : 'border-[#CBD5E1] bg-[#F8FBFC]'}`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-[#1A4B56] mb-1">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 731 000 0000"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-[#0D9488] focus:border-[#0D9488] ${errors.phone ? 'border-red-500 bg-red-50' : 'border-[#CBD5E1] bg-[#F8FBFC]'}`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-bold text-[#1A4B56] mb-1">Date of Birth *</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-[#0D9488] focus:border-[#0D9488] ${errors.dateOfBirth ? 'border-red-500 bg-red-50' : 'border-[#CBD5E1] bg-[#F8FBFC]'}`}
            />
            {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>}
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="department" className="block text-sm font-bold text-[#1A4B56] mb-1">Select Department *</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-[#0D9488] focus:border-[#0D9488] ${errors.department ? 'border-red-500 bg-red-50' : 'border-[#CBD5E1] bg-[#F8FBFC]'}`}
            >
              <option value="">-- Choose Department --</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && <p className="mt-1 text-sm text-red-500">{errors.department}</p>}
          </div>

          <div>
            <label htmlFor="doctor" className="block text-sm font-bold text-[#1A4B56] mb-1">Select Doctor *</label>
            <select
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              disabled={!formData.department}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-[#0D9488] focus:border-[#0D9488] disabled:opacity-50 ${errors.doctor ? 'border-red-500 bg-red-50' : 'border-[#CBD5E1] bg-[#F8FBFC]'}`}
            >
              <option value="">-- Select Department First --</option>
              {formData.department && doctorsByDepartment[formData.department]?.map((doc) => (
                <option key={doc} value={doc}>{doc}</option>
              ))}
            </select>
            {errors.doctor && <p className="mt-1 text-sm text-red-500">{errors.doctor}</p>}
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="appointmentDate" className="block text-sm font-bold text-[#1A4B56] mb-1">Preferred Appointment Date *</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-[#0D9488] focus:border-[#0D9488] ${errors.appointmentDate ? 'border-red-500 bg-red-50' : 'border-[#CBD5E1] bg-[#F8FBFC]'}`}
            />
            {errors.appointmentDate && <p className="mt-1 text-sm text-red-500">{errors.appointmentDate}</p>}
          </div>

          <div>
            <label htmlFor="timeSlot" className="block text-sm font-bold text-[#1A4B56] mb-1">Preferred Time Slot *</label>
            <select
              id="timeSlot"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-[#0D9488] focus:border-[#0D9488] ${errors.timeSlot ? 'border-red-500 bg-red-50' : 'border-[#CBD5E1] bg-[#F8FBFC]'}`}
            >
              <option value="">-- Choose Time Window --</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {errors.timeSlot && <p className="mt-1 text-sm text-red-500">{errors.timeSlot}</p>}
          </div>
        </div>

        {/* Row 5 */}
        <div>
          <label htmlFor="reason" className="block text-sm font-bold text-[#1A4B56] mb-1">Reason for Visit / Main Symptom *</label>
          <textarea
            id="reason"
            name="reason"
            rows={4}
            value={formData.reason}
            onChange={handleChange}
            placeholder="Briefly explain symptoms or routine wellness consulting checks…"
            className={`w-full px-4 py-3 border rounded-xl focus:ring-[#0D9488] focus:border-[#0D9488] ${errors.reason ? 'border-red-500 bg-red-50' : 'border-[#CBD5E1] bg-[#F8FBFC]'}`}
          />
          {errors.reason && <p className="mt-1 text-sm text-red-500">{errors.reason}</p>}
        </div>
        
        <CTAButton type="submit" className="w-full text-lg shadow-xl mt-6" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Confirm Appointment'}
        </CTAButton>
      </div>
    </form>
  );
}
