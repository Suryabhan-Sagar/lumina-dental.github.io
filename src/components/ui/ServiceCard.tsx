import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo?: string;
}

export function ServiceCard({ title, description, icon, linkTo = '/services' }: ServiceCardProps) {
  return (
    <div className="bg-[#F8FBFC] rounded-3xl shadow-sm border border-[#E2E8F0] p-6 flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      <div className="h-12 w-12 bg-white shadow-sm rounded-xl flex items-center justify-center text-[#0D9488] mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#1A4B56] mb-2">{title}</h3>
      <p className="text-[#64748B] flex-grow mb-4 text-sm leading-relaxed">{description}</p>
      
      <Link 
        to={linkTo}
        className="inline-flex items-center text-[#0D9488] font-bold hover:text-[#0F766E] transition-colors mt-auto text-sm"
      >
        Learn more <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
}
