import React from 'react';
import { ShieldCheck, Clock, Award, Star } from 'lucide-react';
import { CTAButton } from '../components/ui/CTAButton';
import { ServiceCard } from '../components/ui/ServiceCard';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import { BookingForm } from '../components/forms/BookingForm';
import { SEO } from '../components/SEO';

const services = [
  {
    title: "General Dentistry",
    description: "Routine cleanings, exams, and preventive care to keep your smile healthy and bright.",
    icon: <ShieldCheck className="h-6 w-6" />,
    link: "/services#general"
  },
  {
    title: "Cosmetic Dentistry",
    description: "Teeth whitening, veneers, and complete smile makeovers for your confidence.",
    icon: <Star className="h-6 w-6" />,
    link: "/services#cosmetic"
  }
];

const testimonials = [
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
  }
];

export function Home() {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "[CLINIC NAME]",
    "image": "https://example.com/clinic-image.jpg",
    "url": "https://example.com",
    "telephone": "[PHONE]",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[ADDRESS]",
      "addressLocality": "[CITY]",
      "addressRegion": "[STATE]",
      "postalCode": "[ZIP]",
      "addressCountry": "US"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "08:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Friday",
        "opens": "08:00",
        "closes": "14:00"
      }
    ]
  });

  return (
    <div className="flex flex-col">
      <SEO 
        title="Modern & Gentle Dental Care" 
        description="Experience modern, gentle dental care at [CLINIC NAME] in [CITY]. We offer comprehensive, cosmetic, and emergency dentistry for the whole family."
        schema={schema}
      />

      {/* Hero Section */}
      <section className="relative bg-[#F8FBFC] py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-[#DCFCE7] text-[#065F46] font-bold text-xs uppercase tracking-widest mb-6">
                Now Accepting New Patients
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1A4B56] leading-[1.1] mb-6">
                A brighter smile starts with <span className="text-[#0D9488] italic">gentle</span> care.
              </h1>
              <p className="text-lg sm:text-xl text-[#64748B] mb-8 leading-relaxed">
                Experience personalized dental excellence in a calming, modern environment. We prioritize your comfort above all else.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton variant="secondary" to="/new-patients" className="font-semibold px-8 py-4">
                  See Our Services
                </CTAButton>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-[#E2E8F0] shadow-sm">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-200"></div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-green-200"></div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-yellow-200"></div>
                  </div>
                  <p className="text-xs font-semibold text-[#1A4B56]">450+ Happy Patients</p>
                </div>
              </div>
            </div>
            
            {/* Hero Image / Placeholder */}
            <div className="relative mt-10 lg:mt-0">
              <div className="absolute right-0 top-0 bottom-0 w-[120%] -mr-[20%] rounded-l-[120px] bg-gradient-to-br from-[#E0F2F1] to-[#F0FDFA] flex items-center justify-center border-l-4 border-white shadow-inner -z-10"></div>
              <div className="aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden shadow-2xl relative border border-[#CCFBF1]">
                <img 
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Patient smiling in dental chair" 
                  className="object-cover w-full h-full opacity-90"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1A4B56]/10 to-transparent"></div>
                
                {/* Embedded badge style */}
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white rounded-2xl flex justify-between items-center shadow-sm">
                  <div>
                    <h4 className="font-bold text-[#1A4B56]">New Patient Special</h4>
                    <p className="text-xs text-[#64748B]">Free teeth whitening with initial consultation</p>
                  </div>
                  <div className="text-[#0D9488] font-bold text-2xl">$99</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="py-16 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0]">
            <div className="p-6">
              <div className="mx-auto w-12 h-12 bg-[#F0FDFA] rounded-full flex items-center justify-center text-[#0D9488] mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1A4B56] mb-2">Advanced Technology</h3>
              <p className="text-[#64748B] text-sm">Digital X-rays and modern equipment for accurate, comfortable treatments.</p>
            </div>
            <div className="p-6">
              <div className="mx-auto w-12 h-12 bg-[#F0FDFA] rounded-full flex items-center justify-center text-[#0D9488] mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1A4B56] mb-2">Expert Care Team</h3>
              <p className="text-[#64748B] text-sm">Highly trained professionals dedicated to continuing education and excellence.</p>
            </div>
            <div className="p-6">
              <div className="mx-auto w-12 h-12 bg-[#F0FDFA] rounded-full flex items-center justify-center text-[#0D9488] mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1A4B56] mb-2">Timely Appointments</h3>
              <p className="text-[#64748B] text-sm">We respect your time. Short wait times and efficient, focused care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[#0D9488] text-xs font-bold uppercase tracking-widest mb-2">Our Expertise</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A4B56] mb-4">Comprehensive Care for All Ages</h2>
            <p className="text-lg text-[#64748B]">From routine cleanings to advanced restorative procedures, we offer a full spectrum of dental services under one roof.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <ServiceCard 
                key={idx}
                title={service.title}
                description={service.description}
                icon={service.icon}
                linkTo={service.link}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <CTAButton to="/services" variant="outline">View All Services</CTAButton>
          </div>
        </div>
      </section>

      {/* Split Section: Reviews & Booking */}
      <section className="py-20 bg-[#F8FBFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Reviews Side */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-[#1A4B56] mb-4">Why our patients love us</h2>
                <p className="text-[#64748B] mb-8">Don't just take our word for it. Read what our community has to say about their experiences.</p>
              </div>
              
              <div className="space-y-6">
                {testimonials.slice(0, 2).map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
              
              <div className="pt-4">
                <CTAButton to="/reviews" variant="outline">Read All Reviews</CTAButton>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-1"></div>

            {/* Booking Form Side */}
            <div className="lg:col-span-6 bg-[#E0F2F1] p-6 md:p-10 rounded-3xl relative">
              <BookingForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
