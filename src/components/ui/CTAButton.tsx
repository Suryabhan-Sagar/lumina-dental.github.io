import React from 'react';
import { Link } from 'react-router-dom';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  to?: string;
  className?: string;
}

export function CTAButton({ children, variant = 'primary', to, className = '', ...props }: CTAButtonProps) {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "text-white bg-[#0D9488] hover:bg-[#0F766E] focus:ring-[#0D9488] shadow-lg active:scale-95",
    secondary: "text-white bg-[#1A4B56] hover:bg-opacity-90 focus:ring-[#1A4B56] shadow-lg",
    outline: "text-[#0D9488] bg-transparent border-[#0D9488] hover:bg-[#F0FDFA] focus:ring-[#0D9488]",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
