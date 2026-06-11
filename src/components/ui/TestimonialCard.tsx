import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#E2E8F0] flex flex-col h-full relative">
      {/* Decorative quote mark */}
      <span className="absolute top-4 right-6 text-6xl text-[#E0F2F1] font-serif leading-none italic pointer-events-none -mt-2">"</span>
      
      <div className="flex mb-4 relative z-10">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < testimonial.rating ? 'text-[#0D9488] fill-current' : 'text-[#CBD5E1]'}`} 
          />
        ))}
      </div>
      <p className="text-[#64748B] mb-6 flex-grow leading-relaxed relative z-10">{testimonial.text}</p>
      <div className="mt-auto relative z-10">
        <p className="font-bold text-[#1A4B56] text-sm uppercase tracking-wider">{testimonial.patientName}</p>
      </div>
    </div>
  );
}
