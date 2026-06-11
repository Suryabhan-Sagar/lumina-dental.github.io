import React from 'react';
import { SEO } from '../components/SEO';

export function PrivacyPolicy() {
  const lastUpdated = "August 1, 2024";

  return (
    <div className="flex flex-col">
      <SEO 
        title="Privacy Policy & HIPAA Notice" 
        description="Read our privacy policy and HIPAA notice of privacy practices to understand how we protect your medical and personal information."
      />

      <section className="bg-primary-50 py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy & HIPAA Notice</h1>
          <p className="text-gray-600">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-gray-600 max-w-none">
            <h2>Notice of Privacy Practices (HIPAA)</h2>
            <p>
              <strong>THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.</strong>
            </p>
            <p>
              At [CLINIC NAME], we are legally required to protect the privacy of your health information. We call this information "Protected Health Information" (PHI). It includes information that can be used to identify you, that we've created or received about your past, present, or future health condition, the provision of healthcare to you, or the payment for this healthcare.
            </p>

            <h3>How We May Use and Disclose Your PHI</h3>
            <ul>
              <li><strong>Treatment:</strong> We may use your PHI to provide, coordinate, or manage your dental treatment. For example, we may disclose your PHI to other dentists or physicians who may be treating you or consulting with us.</li>
              <li><strong>Payment:</strong> We may use and disclose your PHI to obtain payment for the services we provide you. For example, we may send a claim for payment, which includes information about your treatment.</li>
              <li><strong>Healthcare Operations:</strong> We may use your PHI for our healthcare operations, which include internal administration, quality improvement, and training programs.</li>
            </ul>

            <h3>Your Rights Regarding Your PHI</h3>
            <p>You have the following rights regarding the PHI we maintain about you:</p>
            <ul>
              <li><strong>Right to Inspect and Copy:</strong> You have the right to inspect and receive a copy of your PHI.</li>
              <li><strong>Right to Amend:</strong> If you feel that PHI we have about you is incorrect or incomplete, you may ask us to amend the information.</li>
              <li><strong>Right to an Accounting of Disclosures:</strong> You have the right to request a list of certain disclosures we made of your PHI.</li>
              <li><strong>Right to Request Restrictions:</strong> You have the right to request a restriction or limitation on the PHI we use or disclose for treatment, payment, or operations.</li>
            </ul>

            <h2>Website Privacy Policy</h2>
            <p>
              This website privacy policy describes how [CLINIC NAME] collects and uses the personal information you provide on our website.
            </p>
            
            <h3>Information Collection</h3>
            <p>
              When you use our website booking or contact forms, you may voluntarily provide personal information such as your name, email address, phone number, and the reason for your visit. <strong>Any health-related information submitted through our forms is treated with the utmost confidentiality and is transmitted securely in compliance with HIPAA guidelines.</strong>
            </p>

            <h3>Use of Information</h3>
            <p>
              We use the information you provide purely to respond to your inquiries, schedule appointments, and coordinate your care. We do not sell, rent, or trade your personal information to third parties.
            </p>

            <h3>Security</h3>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, please note that no internet transmission is completely secure.
            </p>

            <h3>Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please contact our Privacy Officer at:
            </p>
            <p>
              [CLINIC NAME]<br />
              [ADDRESS]<br />
              [CITY], [STATE] [ZIP]<br />
              Phone: [PHONE]
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
