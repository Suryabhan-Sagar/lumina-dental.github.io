import React from 'react';
import { SEO } from '../components/SEO';
import { FileText, CreditCard, ShieldCheck } from 'lucide-react';
import { CTAButton } from '../components/ui/CTAButton';
import { BookingForm } from '../components/forms/BookingForm';

export function NewPatients() {
  return (
    <div className="flex flex-col">
      <SEO 
        title="New Patient Information" 
        description="Welcome to Lumina Dental. Find out what to expect on your first visit and download our new patient forms."
      />

      <section className="bg-[#F8FBFC] py-16 md:py-24 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A4B56] mb-6">Welcome to Our Practice</h1>
          <p className="text-xl text-[#64748B]">
            We are thrilled to have you join our dental family. Here is everything you need to know before your first visit.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* What to Expect */}
            <div>
              <p className="text-[#0D9488] text-xs font-bold uppercase tracking-widest mb-2">First Visit</p>
              <h2 className="text-3xl font-serif font-bold text-[#1A4B56] mb-6">What to Expect</h2>
              <div className="prose prose-lg text-[#64748B]">
                <p>
                  Your first visit is all about getting to know you and your oral health needs. We want to ensure you feel comfortable and understand every step of your care.
                </p>
                <div className="space-y-6 mt-8">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#E0F2F1] text-[#0D9488] font-bold shadow-sm border border-[#E0F2F1]">1</div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A4B56]">Comprehensive Exam</h4>
                      <p className="mt-1 text-[#64748B]">A thorough evaluation of your teeth, gums, and bite, along with an oral cancer screening.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#E0F2F1] text-[#0D9488] font-bold shadow-sm border border-[#E0F2F1]">2</div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A4B56]">Digital X-Rays</h4>
                      <p className="mt-1 text-[#64748B]">Low-radiation digital imaging to uncover any hidden issues beneath the surface.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#E0F2F1] text-[#0D9488] font-bold shadow-sm border border-[#E0F2F1]">3</div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A4B56]">Professional Cleaning</h4>
                      <p className="mt-1 text-[#64748B]">Removal of plaque and tartar, followed by polishing for a fresh, clean smile.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#E0F2F1] text-[#0D9488] font-bold shadow-sm border border-[#E0F2F1]">4</div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A4B56]">Treatment Plan</h4>
                      <p className="mt-1 text-[#64748B]">A clear, customized plan discussing any recommended procedures and associated costs.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Forms and Booking Form */}
            <div>
              <div className="bg-[#F8FBFC] rounded-3xl p-8 mb-8 border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-[#0D9488] mr-3" />
                  <h3 className="text-xl font-bold text-[#1A4B56]">Patient Forms</h3>
                </div>
                <p className="text-[#64748B] mb-6">
                  Save time in the waiting room by filling out your new patient paperwork online before your appointment.
                </p>
                <CTAButton variant="outline" className="w-full sm:w-auto bg-white border-[#CBD5E1] text-[#64748B] hover:bg-[#F8FBFC]">
                  Fill Out Forms Online
                </CTAButton>
              </div>

              <div>
                <BookingForm />
              </div>
            </div>
          </div>

          <hr className="border-[#E2E8F0] mb-20" />

          {/* Payment & Financing */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#F8FBFC] rounded-3xl shadow-sm border border-[#E2E8F0] p-8 text-center">
              <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-[#3B82F6] mb-6 shadow-sm border border-[#BFDBFE] mx-auto">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A4B56] mb-4">Payment & Financing</h3>
              <p className="text-[#64748B] mb-6 leading-relaxed">
                We believe everyone deserves access to great dental care. We accept cash, check, and major credit cards. 
              </p>
              <h4 className="font-bold text-[#1A4B56] mb-2">Financing Options</h4>
              <p className="text-[#64748B] mb-6 leading-relaxed">
                We partner with CareCredit to offer flexible, low-to-no interest monthly payment plans.
              </p>
              <CTAButton variant="outline">Learn About CareCredit</CTAButton>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
