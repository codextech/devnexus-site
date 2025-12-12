import React from "react";

export const metadata = {
  title: "Privacy Policy | DevNexus",
  description: "DevNexus Privacy Policy - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-4xl mx-auto px-8 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-neutral-100">
          Privacy Policy
        </h1>
        
        <div className="text-neutral-300 space-y-6 leading-relaxed">
          <p className="text-sm text-neutral-400 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-neutral-100">
              1. Introduction
            </h2>
            <p>
              DevNexus ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard 
              your information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-neutral-100">
              2. Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2 text-neutral-200">
                  2.1 Personal Information
                </h3>
                <p>
                  We may collect personal information that you voluntarily provide to us 
                  when you:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                  <li>Contact us through our website forms</li>
                  <li>Request information about our services</li>
                  <li>Subscribe to our newsletter or communications</li>
                  <li>Engage with our services</li>
                </ul>
                <p className="mt-2">
                  This information may include your name, email address, phone number, 
                  company name, and any other information you choose to provide.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2 text-neutral-200">
                  2.2 Automatically Collected Information
                </h3>
                <p>
                  When you visit our website, we may automatically collect certain information 
                  about your device, including:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-neutral-100">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Respond to your inquiries and requests</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Analyze website usage and trends</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-neutral-100">
              4. Information Sharing and Disclosure
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li>With service providers who assist us in operating our website and conducting our business</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or merger</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-neutral-100">
              5. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational security measures to 
              protect your personal information. However, no method of transmission over 
              the Internet or electronic storage is 100% secure, and we cannot guarantee 
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-neutral-100">
              6. Cookies and Tracking Technologies
            </h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our 
              website and store certain information. You can instruct your browser to 
              refuse all cookies or to indicate when a cookie is being sent. However, 
              if you do not accept cookies, you may not be able to use some portions of 
              our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-neutral-100">
              7. Your Rights
            </h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information</li>
              <li>Objection to processing of your information</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, please contact us using the information provided 
              in the "Contact Us" section below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-neutral-100">
              8. Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible 
              for the privacy practices of these external sites. We encourage you to review 
              the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-neutral-100">
              9. Children's Privacy
            </h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not 
              knowingly collect personal information from children. If you believe we have 
              collected information from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-neutral-100">
              10. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of 
              any changes by posting the new Privacy Policy on this page and updating the 
              "Last updated" date. You are advised to review this Privacy Policy periodically 
              for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-neutral-100">
              11. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="mt-4 space-y-2">
              <p>
                <strong>DevNexus</strong>
              </p>
              <p>
                Email: <a href="mailto:info@devnexus.com" className="text-blue-400 hover:text-blue-300 underline">info@devnexus.com</a>
              </p>
              <p>
                Website: <a href="https://www.devnexus.com" className="text-blue-400 hover:text-blue-300 underline">www.devnexus.com</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

