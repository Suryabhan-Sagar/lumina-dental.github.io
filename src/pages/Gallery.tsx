import React from 'react';
import { SEO } from '../components/SEO';
import { CTAButton } from '../components/ui/CTAButton';

const galleryItems = [
  {
    id: "1",
    title: "Porcelain Veneers",
    description: "Correction of spacing and discoloration for a unifed, bright smile.",
    before: "https://images.unsplash.com/photo-1598256989467-33e70d4c9cc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    after: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "2",
    title: "Invisalign® Treatment",
    description: "12-month clear aligner therapy to correct crowding.",
    before: "https://images.unsplash.com/photo-1598256989467-33e70d4c9cc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    after: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: "3",
    title: "Dental Implants & Crowns",
    description: "Restoration of a missing front tooth seamlessly matching natural teeth.",
    before: "https://images.unsplash.com/photo-1598256989467-33e70d4c9cc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    after: "https://images.unsplash.com/photo-1590620608754-db14757c2bd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: "4",
    title: "Professional Whitening",
    description: "In-office zoom whitening treatment, improving shade by 4 levels.",
    before: "https://images.unsplash.com/photo-1598256989467-33e70d4c9cc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    after: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
  }
];

export function Gallery() {
  return (
    <div className="flex flex-col">
      <SEO 
        title="Smile Gallery | Before & After" 
        description="View real before and after photos of cosmetic and restorative dental treatments performed by our team at [CLINIC NAME]."
      />

      <section className="bg-[#F8FBFC] py-16 md:py-24 text-center border-b border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A4B56] mb-6">Smile Gallery</h1>
          <p className="text-xl text-[#64748B]">
            Real patients. Real results. See how we've helped our patients achieve their dream smiles.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {galleryItems.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E2E8F0]">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img src={item.before} alt={`${item.title} Before`} className="w-full h-48 md:h-64 object-cover filter grayscale" />
                    <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg backdrop-blur-sm">Before</div>
                  </div>
                  <div className="relative border-l border-[#E2E8F0]">
                    <img src={item.after} alt={`${item.title} After`} className="w-full h-48 md:h-64 object-cover" />
                    <div className="absolute bottom-3 right-3 bg-[#0D9488]/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg backdrop-blur-sm">After</div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-[#1A4B56] mb-2">{item.title}</h3>
                  <p className="text-[#64748B] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center bg-[#F8FBFC] rounded-3xl p-10 border border-[#E2E8F0] shadow-sm">
            <h3 className="text-2xl font-serif font-bold text-[#1A4B56] mb-4">Want treatment like this?</h3>
            <p className="text-[#64748B] mb-8 max-w-2xl mx-auto leading-relaxed">
              Schedule a cosmetic consultation today. We'll discuss your goals and create a custom treatment plan just for you.
            </p>
            <CTAButton to="/contact" className="shadow-lg text-lg px-8">Book a Consultation</CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
