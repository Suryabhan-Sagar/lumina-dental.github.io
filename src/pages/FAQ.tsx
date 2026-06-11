import React from 'react';
import { SEO } from '../components/SEO';
import { Accordion } from '../components/ui/Accordion';
import { CTAButton } from '../components/ui/CTAButton';

const faqs = [
  {
    question: "Do you accept new patients?",
    answer: "Yes! We are always welcoming new patients to our practice. You can easily schedule your first visit by calling us or using our online booking form."
  },
  {
    question: "What should I expect during my first visit?",
    answer: "Your first visit involves a comprehensive exam, digital X-rays, an oral cancer screening, and a thorough cleaning. The dentist will discuss your oral health goals and create a personalized treatment plan if necessary. Please allow about 60-90 minutes for this initial appointment."
  },
  {
    question: "At what age should I bring my child for their first visit?",
    answer: "The American Academy of Pediatric Dentistry recommends bringing your child when their first tooth appears, or no later than their first birthday. Early visits help children get comfortable with the dentist and allow us to monitor development."
  },
  {
    question: "What if I experience a dental emergency after hours?",
    answer: "If you are an active patient of record, please call our main office number and follow the prompts to leave an urgent message for the doctor on call. We will get back to you as soon as possible."
  },
  {
    question: "Do you offer payment plans or financing?",
    answer: "Yes, we believe dental care should be accessible. We offer flexible payment options including CareCredit, allowing you to pay for treatments over time."
  },
  {
    question: "How often should I have a dental exam and cleaning?",
    answer: "For most people, we recommend visiting every 6 months. However, depending on your individual oral health needs (such as a history of periodontal disease), we may recommend more frequent visits."
  }
];

export function FAQ() {
  return (
    <div className="flex flex-col">
      <SEO 
        title="Frequently Asked Questions" 
        description="Find answers to common questions about your dental visit, basic procedures, and our office policies at Lumina Dental."
      />

      <section className="bg-[#F8FBFC] py-16 md:py-24 text-center border-b border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A4B56] mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-[#64748B]">
            Have a question? We've compiled a list of our most common inquiries to help you prepare for your visit.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Accordion items={faqs} />
          </div>

          <div className="bg-[#F8FBFC] border border-[#E2E8F0] shadow-sm rounded-3xl p-10 text-center mt-16">
            <h3 className="text-2xl font-serif font-bold text-[#1A4B56] mb-4">Still have questions?</h3>
            <p className="text-[#64748B] mb-8 leading-relaxed">
              If you couldn't find the answer you were looking for, please don't hesitate to reach out to our team directly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <CTAButton to="/contact" className="shadow-lg text-lg px-8">Contact Us</CTAButton>
              <CTAButton to="tel:[PHONE]" variant="outline" className="text-lg px-8 border-[#CBD5E1] text-[#64748B] hover:bg-white bg-white">[PHONE]</CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
