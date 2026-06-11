import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FaqItem } from '../../types';

interface AccordionProps {
  items: FaqItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="bg-white border text-left border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
        >
          <button
            className="w-full px-6 py-5 flex justify-between items-center focus:outline-none focus:bg-[#F8FBFC] hover:bg-[#F8FBFC] transition-colors"
            onClick={() => toggleItem(index)}
            aria-expanded={openIndex === index}
          >
            <span className="font-bold text-[#1A4B56] text-left">{item.question}</span>
            {openIndex === index ? (
              <ChevronUp className="h-5 w-5 text-[#0D9488] flex-shrink-0" />
            ) : (
              <ChevronDown className="h-5 w-5 text-[#94A3B8] flex-shrink-0" />
            )}
          </button>
          
          {openIndex === index && (
            <div className="px-6 pb-5">
              <p className="text-[#64748B] text-left leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
