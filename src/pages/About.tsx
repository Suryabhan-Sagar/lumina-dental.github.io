import React from 'react';
import { SEO } from '../components/SEO';
import { TeamMemberCard } from '../components/ui/TeamMemberCard';
import { Award, Heart, Users } from 'lucide-react';

const teamMembers = [
  {
    id: "1",
    name: "Dr. Jane Smith",
    role: "Lead Dentist & Founder",
    bio: "Dr. Smith has over 15 years of experience in restorative and cosmetic dentistry. She is passionate about creating anxiety-free experiences for every patient.",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    role: "Associate Dentist",
    bio: "Specializing in family dentistry, Dr. Chen loves working with children and focuses on preventative care to maintain long-term oral health.",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    name: "Sarah Johnson, RDH",
    role: "Lead Hygienist",
    bio: "Sarah brings a gentle touch and over a decade of hygiene experience, ensuring your routine cleanings are both thorough and comfortable.",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export function About() {
  return (
    <div className="flex flex-col">
      <SEO 
        title="About Our Dental Clinic" 
        description="Meet the experienced and caring dental team at [CLINIC NAME]. Learn about our practice's history, our approach to care, and our credentials."
      />

      <section className="bg-[#F8FBFC] py-16 md:py-24 text-center border-b border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A4B56] mb-6">About Our Practice</h1>
          <p className="text-xl text-[#64748B]">
            Dedicated to providing exceptional dental care in a comfortable, welcoming environment for the entire family.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#0D9488] text-xs font-bold uppercase tracking-widest mb-2">Our Story</p>
              <h2 className="text-3xl font-serif font-bold text-[#1A4B56] mb-6">A New Standard of Dental Care</h2>
              <div className="prose prose-lg text-[#64748B]">
                <p>
                  At Lumina Dental, we believe that going to the dentist shouldn't be a source of stress. Our practice was founded on a simple principle: treat every patient the way we would want our own family to be treated.
                </p>
                <p>
                  We focus on patient education, helping you understand your oral health so you can make informed decisions. We never push unnecessary treatments, and we always take the time to answer your questions thoroughly.
                </p>
                <p>
                  Our office is equipped with the latest dental technology to ensure precise diagnostics and comfortable treatments. From digital impressions to low-radiation X-rays, modern dentistry is here to make your visit better.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Clinic interior" className="rounded-2xl shadow-md object-cover h-48 w-full border border-[#E2E8F0]" />
                <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Dental equipment" className="rounded-2xl shadow-md object-cover h-64 w-full border border-[#E2E8F0]" />
              </div>
              <div className="space-y-4 mt-8">
                <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80" alt="Modern dental clinic" className="rounded-2xl shadow-md object-cover h-64 w-full border border-[#E2E8F0]" />
                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Consultation" className="rounded-2xl shadow-md object-cover h-48 w-full border border-[#E2E8F0]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-[#F8FBFC] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#E2E8F0]">
              <div className="h-16 w-16 bg-[#F0FDFA] rounded-2xl flex items-center justify-center text-[#0D9488] mx-auto mb-6">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1A4B56] mb-2">Excellence</h3>
              <p className="text-[#64748B] text-sm">Commitment to the highest clinical standards and continuous education.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#E2E8F0]">
              <div className="h-16 w-16 bg-[#F0FDFA] rounded-2xl flex items-center justify-center text-[#0D9488] mx-auto mb-6">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1A4B56] mb-2">Compassion</h3>
              <p className="text-[#64748B] text-sm">Gentle, judgment-free care tailored to your individual comfort needs.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#E2E8F0]">
              <div className="h-16 w-16 bg-[#F0FDFA] rounded-2xl flex items-center justify-center text-[#0D9488] mx-auto mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1A4B56] mb-2">Community</h3>
              <p className="text-[#64748B] text-sm">Building lasting relationships with our patients and families.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[#0D9488] text-xs font-bold uppercase tracking-widest mb-2">Our Staff</p>
            <h2 className="text-3xl font-serif font-bold text-[#1A4B56] mb-4">Meet Our Team</h2>
            <p className="text-lg text-[#64748B]">Our experienced professionals are dedicated to making your visit as pleasant and effective as possible.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
