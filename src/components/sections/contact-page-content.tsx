"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Mail,
  Clock,
  MapPin,
  ArrowRight,
  CalendarCheck,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/blocks/contact-form";
import { SITE } from "@/lib/constants";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    detail: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Clock,
    title: "Response",
    detail: "Within 24 hours",
  },
  {
    icon: MapPin,
    title: "Location",
    detail: "244 E PIA, Lahore",
  },
];

const trustItems = [
  { icon: ShieldCheck, text: "No commitment required" },
  { icon: MessageSquare, text: "Reply within 24 hours" },
  { icon: CalendarCheck, text: "Free strategy session" },
];

export function ContactPageContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-40px" });
  const formInView = useInView(formRef, { once: true, margin: "-40px" });

  return (
    <>
      {/* ══════════════ Hero ══════════════ */}
      <section className="relative overflow-hidden hero-bg-page pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 hero-page-gradient" />
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-blue/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute -right-20 top-0 w-[300px] h-[300px] rounded-full bg-brand-cyan/[0.03] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px hero-page-divider" />

        <Container className="relative z-10">
          <div ref={heroRef} className="max-w-3xl mx-auto text-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full contact-eyebrow-pill mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase contact-eyebrow-text">
                Ready when you are
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight hero-title-text leading-[1.08]"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Let&rsquo;s Build Something Together
            </motion.h1>

            <motion.p
              className="mt-5 text-base md:text-lg hero-subtitle-text leading-relaxed max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              Tell us about your project. We&rsquo;ll respond within 24 hours
              with a concrete plan.
            </motion.p>

            {/* Trust signals — inline */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {trustItems.map((item) => (
                <span key={item.text} className="flex items-center gap-2">
                  <item.icon className="w-3.5 h-3.5 text-brand-blue" strokeWidth={2} />
                  <span className="text-xs font-medium contact-trust-text">
                    {item.text}
                  </span>
                </span>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ══════════════ Form + Sidebar ══════════════ */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 contact-form-bg" />

        <Container className="relative z-10">
          <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

            {/* ── Form — 8 cols ── */}
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 24 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="contact-form-card rounded-2xl p-7 md:p-10">
                <div className="mb-8">
                  <h2 className="text-lg md:text-xl font-bold contact-form-title">
                    Send us a message
                  </h2>
                  <p className="mt-1 text-sm contact-form-sub">
                    Fill out the form below and we&rsquo;ll get back to you.
                  </p>
                </div>
                <ContactForm />
              </div>
            </motion.div>

            {/* ── Sidebar — 4 cols ── */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 24 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              {/* Contact info cards */}
              <div className="space-y-4 mb-6">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="contact-info-card rounded-xl p-5 flex items-start gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={formInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                  >
                    <div className="w-9 h-9 rounded-lg contact-info-icon flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-brand-blue" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-[0.1em] uppercase contact-info-label">
                        {item.title}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium contact-info-value hover:text-brand-blue transition-colors"
                        >
                          {item.detail}
                        </a>
                      ) : (
                        <p className="text-sm font-medium contact-info-value">
                          {item.detail}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Calendly CTA card */}
              <motion.div
                className="contact-calendly-card rounded-2xl p-6 md:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4">
                  <CalendarCheck className="w-5 h-5 text-brand-blue" />
                </div>
                <h3 className="text-base font-bold contact-form-title mb-1.5">
                  Prefer a call?
                </h3>
                <p className="text-sm contact-form-sub mb-5 leading-relaxed">
                  Skip the form — book a free 30-minute discovery call directly.
                </p>
                <a
                  href="https://calendly.com/tanzeel-saleem/meet-greet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-blue text-white text-sm font-semibold shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/50 hover:scale-105 transition-all duration-300 group"
                >
                  Schedule on Calendly
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </motion.div>

          </div>
        </Container>
      </section>
    </>
  );
}
