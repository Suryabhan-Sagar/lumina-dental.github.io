import React from 'react';
import { SEO } from '../components/SEO';
import { ServiceCard } from '../components/ui/ServiceCard';
import { CTAButton } from '../components/ui/CTAButton';
import { 
  ShieldCheck, Star, Activity, Baby, Heart 
} from 'lucide-react';

const serviceCategories = [
  {
    id: "general",
    title: "General Dentistry",
    description: "Preventive care to maintain optimal oral health and detect issues early.",
    icon: <ShieldCheck className="h-6 w-6" />,
    items: ["Exams & Cleanings", "Digital X-Rays", "Oral Cancer Screenings", "Fluoride Treatments", "Sealants"]
  },
  {
    id: "cosmetic",
    title: "Cosmetic Dentistry",
    description: "Enhance the appearance of your smile with transformative treatments.",
    icon: <Star className="h-6 w-6" />,
    items: ["Teeth Whitening", "Porcelain Veneers", "Dental Bonding", "Invisalign® Clear Aligners", "Smile Makeovers"]
  },
  {
    id: "restorative",
    title: "Restorative Dentistry",
    description: "Repair and restore damaged or missing teeth for full functionality.",
    icon: <Activity className="h-6 w-6" />,
    items: ["Tooth-Colored Fillings", "Crowns & Bridges", "Dental Implants", "Root Canal Therapy", "Dentures & Partials"]
  },
  {
    id: "pediatric",
    title: "Pediatric Dentistry",
    description: "Gentle, specialized care for infants, children, and teenagers.",
    icon: <Baby className="h-6 w-6" />,
    items: ["First Dental Visits", "Kid-Friendly Exams", "Cavity Prevention", "Sports Mouthguards", "Space Maintainers"]
  },
  {
    id: "periodontal",
    title: "Periodontal Care",
    description: "Treatment and management of gum disease.",
    icon: <Heart className="h-6 w-6" />,
    items: ["Scaling & Root Planing", "Gum Infection Therapy", "Maintenance Cleanings"]
  }
];

export function Services() {
  return (
    <div className="flex flex-col">
      <SEO 
        title="Our Dental Services" 
        description="Comprehensive dental services in [CITY]. We offer general, cosmetic, restorative, and pediatric dentistry to meet all your family's needs."
      />

      {/* Hero Header */}
      <section className="bg-[#F8FBFC] py-16 md:py-24 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A4B56] mb-6">Our Services</h1>
          <p className="text-xl text-[#64748B]">
            We provide a comprehensive range of dental treatments tailored to your unique needs, using the latest technology for exceptional results.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                <div className="bg-[#F8FBFC] rounded-3xl shadow-sm border border-[#E2E8F0] p-8 h-full">
                  <div className="h-14 w-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-[#0D9488] mb-6">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-[#1A4B56] mb-3">{category.title}</h2>
                  <p className="text-[#64748B] mb-6 leading-relaxed">{category.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="mt-1 h-2 w-2 rounded-full bg-[#0D9488] mr-3 shrink-0 opacity-80"></div>
                        <span className="text-[#2D3748] text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1A4B56] text-white text-center rounded-t-[3rem] mt-[-3rem] relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold mb-6">Ready to improve your smile?</h2>
          <p className="text-[#8FB6BE] text-lg mb-8 leading-relaxed">
            Whether you need a routine checkup or a complete smile makeover, our team is here to help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <CTAButton to="/new-patients" className="bg-[#0D9488] text-white hover:bg-[#0F766E] shadow-xl border-none">
              Schedule Appointment
            </CTAButton>
            <CTAButton to="/contact" variant="outline" className="border-white text-white hover:bg-[#2D5B65]">
              Contact Us
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
