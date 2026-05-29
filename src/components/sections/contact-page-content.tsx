"use client";

import { motion } from "motion/react";
import { Mail, Clock, MapPin, ArrowRight, CalendarCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BlueprintGrid } from "@/components/ui/blueprint-grid";
import { ContactForm } from "@/components/blocks/contact-form";
import { fadeUp, clipReveal } from "@/lib/animations";
import { SITE } from "@/lib/constants";

const contactInfo = [
  { icon: Mail, title: "Email", detail: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Clock, title: "Response", detail: "Within 24 hours" },
  { icon: MapPin, title: "Location", detail: "244 E PIA, Lahore" },
];

const trust = ["No commitment required", "Reply within 24 hours", "Free strategy session"];

export function ContactPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg pt-32 pb-16 md:pt-40 md:pb-20">
        <BlueprintGrid focus="50% 40%" />
        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div {...fadeUp} className="flex justify-center">
              <span className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue" />
                </span>
                Ready when you are
              </span>
            </motion.div>

            <motion.h1
              {...clipReveal}
              className="mt-6 font-display text-3xl font-bold leading-[1.06] tracking-[-0.02em] text-fg md:text-4xl lg:text-5xl"
            >
              Let&rsquo;s build something together
            </motion.h1>

            <motion.p
              {...fadeUp}
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg"
            >
              Tell us about your project. We&rsquo;ll respond within 24 hours with
              a concrete plan.
            </motion.p>

            <motion.div
              {...fadeUp}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-faint"
            >
              {trust.map((t, i) => (
                <span key={t} className="flex items-center gap-4">
                  {i > 0 ? <span className="h-1 w-1 rounded-full bg-border-hi" aria-hidden="true" /> : null}
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Form + sidebar */}
      <section className="border-t border-border bg-bg py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Form */}
            <motion.div {...fadeUp} className="lg:col-span-8">
              <div className="rounded-[14px] border border-border bg-surface p-7 md:p-10">
                <div className="mb-8">
                  <Eyebrow label="Send a message" />
                  <h2 className="mt-4 font-display text-xl font-bold tracking-[-0.01em] text-fg md:text-2xl">
                    Tell us what you&rsquo;re building
                  </h2>
                  <p className="mt-2 text-sm text-fg-muted">
                    Fill out the form and we&rsquo;ll get back to you within a day.
                  </p>
                </div>
                <ContactForm />
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div {...fadeUp} className="lg:col-span-4">
              <div className="mb-4 space-y-4">
                {contactInfo.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-[12px] border border-border bg-surface p-5"
                  >
                    <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[9px] border border-border text-blue">
                      <item.icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-faint">
                        {item.title}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium text-fg transition-colors hover:text-blue"
                        >
                          {item.detail}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-fg">{item.detail}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Calendly */}
              <div className="rounded-[14px] border border-border bg-surface p-6 md:p-7">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-blue/40 text-blue">
                  <CalendarCheck className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-fg">Prefer a call?</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                  Skip the form — book a free 30-minute discovery call directly.
                </p>
                <a
                  href="https://calendly.com/tanzeel-saleem/meet-greet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-5 inline-flex items-center gap-2 rounded-[10px] bg-blue px-5 py-2.5 text-sm font-medium text-[#04121a] transition-all hover:bg-blue-press"
                >
                  Schedule on Calendly
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
