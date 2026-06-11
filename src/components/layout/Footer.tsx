import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Smile } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A4B56] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Intro */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-[#0D9488] rounded-xl flex items-center justify-center text-white font-bold p-2">
                <Smile className="h-6 w-6" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Lumina<span className="font-light">Dental</span>
              </span>
            </Link>
            <p className="text-[#8FB6BE] mb-6 leading-relaxed">
              Providing compassionate, comprehensive dental care for patients of all ages in a modern, comfortable environment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] text-[#8FB6BE] font-bold uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-4 text-white">
              <li><Link to="/services" className="hover:text-[#0D9488] transition-colors">Our Services</Link></li>
              <li><Link to="/new-patients" className="hover:text-[#0D9488] transition-colors">New Patients</Link></li>
              <li><Link to="/reviews" className="hover:text-[#0D9488] transition-colors">Patient Reviews</Link></li>
              <li><Link to="/faq" className="hover:text-[#0D9488] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] text-[#8FB6BE] font-bold uppercase tracking-widest mb-4">Contact Us</h4>
            <ul className="space-y-4 text-white">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-[#0D9488] shrink-0" />
                <span className="text-sm">[ADDRESS]<br />[CITY], [STATE] [ZIP]</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-[#0D9488] shrink-0" />
                <a href="tel:[PHONE]" className="text-sm hover:text-[#0D9488] transition-colors">[PHONE]</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-[#0D9488] shrink-0" />
                <a href="mailto:contact@clinic.com" className="text-sm hover:text-[#0D9488] transition-colors">contact@clinic.com</a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-[10px] text-[#8FB6BE] font-bold uppercase tracking-widest mb-4">Business Hours</h4>
            <ul className="space-y-4 text-white text-sm">
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-3 mt-1 text-[#0D9488] shrink-0" />
                <div className="w-full">
                  <div className="flex justify-between border-b border-[#2D5B65] pb-2 mb-2">
                    <span>Mon - Thu</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2D5B65] pb-2 mb-2">
                    <span>Friday</span>
                    <span>8:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span>Sat - Sun</span>
                    <span>Closed</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2D5B65] pt-8 flex flex-col md:flex-row justify-between items-center text-[#8FB6BE] text-[10px]">
          <p>&copy; {currentYear} Lumina Dental Care. HIPAA Compliant.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 items-center">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link to="/admin" className="text-[#0D9488] hover:text-white transition-colors font-semibold">Admin Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
