import React from 'react';
import { SEO } from '../components/SEO';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import { CTAButton } from '../components/ui/CTAButton';

const allTestimonials = [
  {
    id: "1",
    patientName: "Sarah M.",
    text: "The most comfortable dental experience I've ever had. The staff is incredibly friendly and the equipment is state-of-the-art.",
    rating: 5
  },
  {
    id: "2",
    patientName: "David L.",
    text: "I appreciated how Dr. Smith explained everything so clearly. No pressure, just great care and honest advice.",
    rating: 5
  },
  {
    id: "3",
    patientName: "Emily R.",
    text: "Got me in right away for an emergency fix. They saved my vacation! Truly grateful for the entire team.",
    rating: 5
  },
  {
    id: "4",
    patientName: "Michael B.",
    text: "I used to have terrible dental anxiety, but this clinic completely changed that. Gentle, patient, and very professional.",
    rating: 5
  },
  {
    id: "5",
    patientName: "Jessica T.",
    text: "My family has been coming here for years. The front desk staff is always welcoming, and the hygienists are wonderful with my kids.",
    rating: 5
  },
  {
    id: "6",
    patientName: "Robert C.",
    text: "Just completed Invisalign treatment and couldn't be happier with the results. Highly recommend!",
    rating: 5
  }
];

export function Reviews() {
  return (
    <div className="flex flex-col">
      <SEO 
        title="Patient Reviews" 
        description="Read what our patients are saying about their experiences at [CLINIC NAME]. We pride ourselves on providing comfortable, high-quality dental care."
      />

      <section className="bg-[#F8FBFC] py-16 md:py-24 text-center border-b border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A4B56] mb-6">Patient Reviews</h1>
          <p className="text-xl text-[#64748B] mb-8">
            Your smile is our reputation. See why our community trusts us with their dental care.
          </p>
          <div className="flex justify-center space-x-2 mb-4">
             {/* 5 stars */}
             {[...Array(5)].map((_, i) => (
               <svg key={i} className="h-8 w-8 text-[#0D9488] fill-current" viewBox="0 0 20 20">
                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
               </svg>
             ))}
          </div>
          <p className="font-bold text-[#1A4B56]">4.9 Average Rating</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {allTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          
          <div className="bg-[#F8FBFC] border border-[#E2E8F0] shadow-sm rounded-3xl p-10 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-[#1A4B56] mb-4">Ready to schedule your visit?</h3>
            <p className="text-[#64748B] mb-8 leading-relaxed">
              Experience our top-rated care for yourself. We're currently accepting new patients.
            </p>
            <CTAButton to="/new-patients" className="px-8 py-4 w-full sm:w-auto shadow-lg text-lg">
              Book an Appointment
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
