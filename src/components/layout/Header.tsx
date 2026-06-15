import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Smile, LogOut, User } from 'lucide-react';
import { CTAButton } from '../ui/CTAButton';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Appointment History', path: '/appointment-history' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#0D9488] rounded-xl flex items-center justify-center text-white font-bold p-2">
              <Smile className="h-6 w-6" />
            </div>
            <span className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1A4B56]">
              Lumina<span className="font-light">Dental</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex flex-1 justify-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#0D9488] ${
                  location.pathname === link.path ? 'text-[#0D9488] border-b-2 border-[#0D9488]' : 'text-[#64748B]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                  <User className="w-4 h-4 text-[#0D9488]" />
                  {user.user_metadata?.full_name || user.email}
                </span>
                <button 
                  onClick={signOut}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center group"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-bold text-[#1A4B56] hover:text-[#0D9488] transition-colors">
                  Log In
                </Link>
                <Link to="/signup" className="text-sm font-bold text-[#0D9488] hover:text-[#0F766E] transition-colors border border-[#0D9488] px-4 py-2 rounded-xl">
                  Sign Up
                </Link>
              </div>
            )}
            <CTAButton to="/new-patients">Book Appointment</CTAButton>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-[#64748B] hover:text-[#0D9488] focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  location.pathname === link.path 
                    ? 'bg-[#F0FDFA] text-[#0D9488]' 
                    : 'text-[#64748B] hover:bg-[#F8FBFC] hover:text-[#0D9488]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 px-3 flex flex-col space-y-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-[#E0F2FE] text-[#0ea5e9] flex items-center justify-center rounded-full font-bold">
                      {(user.user_metadata?.full_name || user.email || '?')[0].toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">{user.user_metadata?.full_name || 'My Account'}</span>
                      <span className="text-xs text-gray-500 truncate w-48">{user.email}</span>
                    </div>
                  </div>
                  <button onClick={signOut} className="flex items-center justify-center w-full py-3 bg-gray-100 rounded-md font-medium text-gray-900 hover:bg-gray-200 hover:text-red-600 transition-colors">
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link to="/login" className="flex items-center justify-center w-full py-3 bg-gray-50 rounded-md font-medium text-gray-900 hover:bg-gray-100">
                    Log In
                  </Link>
                  <Link to="/signup" className="flex items-center justify-center w-full py-3 bg-[#E0F2FE] rounded-md font-medium text-[#0ea5e9] hover:bg-[#bae6fd]">
                    Sign Up
                  </Link>
                </div>
              )}
              <CTAButton to="/new-patients" className="w-full">
                Book Appointment
              </CTAButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
