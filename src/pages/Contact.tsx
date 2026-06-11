import React from 'react';
import { SEO } from '../components/SEO';
import { BookingForm } from '../components/forms/BookingForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Contact() {
  return (
    <div className="flex flex-col">
      <SEO 
        title="Contact Us" 
        description="Get in touch with [CLINIC NAME]. Find our address, phone number, business hours, and an easy way to send us a message online."
      />

      <section className="bg-[#F8FBFC] py-16 md:py-24 text-center border-b border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A4B56] mb-6">Contact Us</h1>
          <p className="text-xl text-[#64748B]">
            We're here to answer your questions and help you schedule your next visit. We look forward to hearing from you!
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Contact Info & Map */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-serif font-bold text-[#1A4B56] mb-8">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#F0FDFA] p-3 rounded-xl shrink-0 mr-4 text-[#0D9488]">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A4B56] text-lg">Location</h3>
                      <p className="text-[#64748B] mt-1">[ADDRESS]<br />[CITY], [STATE] [ZIP]</p>
                      <p className="text-sm text-[#0D9488] mt-2 italic">Free parking available in the building lot.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#F0FDFA] p-3 rounded-xl shrink-0 mr-4 text-[#0D9488]">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A4B56] text-lg">Phone</h3>
                      <p className="text-[#64748B] mt-1"><a href="tel:[PHONE]" className="hover:text-[#0D9488] font-semibold transition-colors">[PHONE]</a></p>
                      <p className="text-sm text-[#64748B] mt-1">For dental emergencies, please call same number.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#F0FDFA] p-3 rounded-xl shrink-0 mr-4 text-[#0D9488]">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A4B56] text-lg">Email</h3>
                      <p className="text-[#64748B] mt-1"><a href="mailto:contact@clinic.com" className="hover:text-[#0D9488] font-semibold transition-colors">contact@clinic.com</a></p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#F0FDFA] p-3 rounded-xl shrink-0 mr-4 text-[#0D9488]">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div className="w-full">
                      <h3 className="font-bold text-[#1A4B56] text-lg mb-2">Office Hours</h3>
                      <div className="space-y-2 text-[#64748B]">
                        <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                          <span>Monday - Thursday</span>
                          <span className="font-bold text-[#1A4B56]">8:00 AM - 5:00 PM</span>
                        </div>
                        <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                          <span>Friday</span>
                          <span className="font-bold text-[#1A4B56]">8:00 AM - 2:00 PM</span>
                        </div>
                        <div className="flex justify-between pb-2">
                          <span>Saturday - Sunday</span>
                          <span className="font-bold text-[#1A4B56]">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-[#F8FBFC] rounded-3xl overflow-hidden shadow-sm h-64 border border-[#E2E8F0]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000.000000000000!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzEwLjAiVw!5e0!3m2!1sen!2sus!4v1" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Clinic Location Map"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <BookingForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
