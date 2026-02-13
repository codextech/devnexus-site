import type { Metadata } from "next";
import { Mail, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/blocks/contact-form";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Contact Us | Book a Discovery Call",
  description:
    "Get in touch with DevNexus. Tell us about your project and we'll respond within 24 hours with a plan.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE.url },
              { name: "Contact", url: `${SITE.url}/contact` },
            ])
          ),
        }}
      />

      <section className="bg-dark-900 pt-32 pb-16 md:pt-40 md:pb-20 border-b border-white/5 relative">
        <div className="absolute inset-0 section-gradient" />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-blue mb-3">
              Get In Touch
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              Let&apos;s Build Something Together
            </h1>
            <p className="mt-4 text-base md:text-lg text-dark-400 leading-relaxed">
              Tell us about your project and we&apos;ll get back to you within 24
              hours with a plan.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Email Us
                  </h3>
                  <p className="mt-1 text-sm text-dark-400">{SITE.email}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Response Time
                  </h3>
                  <p className="mt-1 text-sm text-dark-400">
                    Within 24 hours on business days
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Location
                  </h3>
                  <p className="mt-1 text-sm text-dark-400">
                    Remote-first team, worldwide delivery
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl glass-card mt-8">
                <h3 className="text-sm font-semibold text-white mb-2">
                  Prefer to book a call directly?
                </h3>
                <p className="text-sm text-dark-400 mb-4">
                  Skip the form and schedule a 30-minute discovery call.
                </p>
                <a
                  href="https://calendly.com/tanzeel-saleem/meet-greet"
                  className="text-sm font-medium text-brand-blue hover:text-brand-blue-hover transition-colors"
                >
                  Schedule on Calendly &rarr;
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
