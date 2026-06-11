import React from 'react';
import { TeamMember } from '../../types';

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="bg-[#F8FBFC] rounded-3xl shadow-sm border border-[#E2E8F0] overflow-hidden text-center hover:shadow-md transition-shadow duration-200">
      <div className="aspect-w-3 aspect-h-4 bg-[#E2E8F0]">
        <img 
          src={member.imageUrl} 
          alt={`Photo of ${member.name}`} 
          className="w-full h-72 object-cover object-top"
          loading="lazy"
        />
      </div>
      <div className="p-8 flex flex-col items-center">
        <h3 className="text-xl font-bold text-[#1A4B56] mb-1">{member.name}</h3>
        <p className="text-[#0D9488] font-bold text-xs uppercase tracking-widest mb-4">{member.role}</p>
        <p className="text-[#64748B] text-sm leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
}
