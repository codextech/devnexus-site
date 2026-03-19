"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechStackRow } from "@/components/blocks/tech-stack-row";
import { FAQSection } from "@/components/blocks/faq-section";
import type { ServiceData } from "@/types/services";

/* ── Animated process step with connecting line ── */

function ProcessStep({
  number,
  title,
  description,
  isLast,
  delay,
  isInView,
}: {
  number: number;
  title: string;
  description: string;
  isLast: boolean;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Connecting line to next step */}
      {!isLast && (
        <motion.div
          className="hidden lg:block absolute top-5 left-[calc(100%+0.5rem)] w-[calc(100%-1rem)] h-px svc-process-line"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: delay + 0.3, duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
      )}

      <div className="svc-process-card rounded-2xl p-6 md:p-7 h-full group">
        {/* Number */}
        <motion.div
          className="w-10 h-10 rounded-xl svc-process-number flex items-center justify-center mb-5"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            delay: delay + 0.1,
            duration: 0.4,
            type: "spring",
            stiffness: 200,
          }}
        >
          <span className="text-sm font-bold text-brand-blue">
            {String(number).padStart(2, "0")}
          </span>
        </motion.div>

        <h3 className="text-base md:text-lg font-bold svc-pg-title mb-2">
          {title}
        </h3>
        <p className="text-sm svc-pg-muted leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

/* ── Main content ── */

export function ServicePageContent({ service }: { service: ServiceData }) {
  const problemRef = useRef<HTMLDivElement>(null);
  const deliverablesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  const problemInView = useInView(problemRef, { once: true, margin: "-80px" });
  const deliverablesInView = useInView(deliverablesRef, {
    once: true,
    margin: "-80px",
  });
  const processInView = useInView(processRef, {
    once: true,
    margin: "-80px",
  });

  return (
    <>
      {/* ══════════════ Problem & Approach ══════════════ */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 svc-pg-section-bg" />
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-blue/[0.03] blur-[120px] pointer-events-none" />

        <Container className="relative z-10">
          <div ref={problemRef} className="max-w-5xl">
            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={problemInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="h-px w-8 bg-brand-blue" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-blue">
                The Challenge
              </span>
            </motion.div>

            {/* Problem statement — large, impactful typography */}
            <motion.blockquote
              className="text-xl md:text-2xl lg:text-3xl font-semibold svc-pg-title leading-[1.35] max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              {service.problem}
            </motion.blockquote>

            {/* Approach indicator */}
            <motion.div
              className="mt-10 flex items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-brand-blue" />
              </div>
              <p className="text-sm svc-pg-muted max-w-lg leading-relaxed">
                We solve this with a focused, sprint-based approach &mdash;
                senior engineers who own the outcome from day one.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ══════════════ Deliverables ══════════════ */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 svc-pg-alt-bg" />
        <Container className="relative z-10">
          <div ref={deliverablesRef}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={deliverablesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <SectionHeading
                eyebrow="Deliverables"
                title="What You Get"
                align="left"
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
              {service.deliverables.map((item, i) => (
                <motion.div
                  key={item}
                  className="svc-deliverable-card rounded-xl p-5 flex items-start gap-4 group"
                  initial={{ opacity: 0, y: 16 }}
                  animate={
                    deliverablesInView ? { opacity: 1, y: 0 } : {}
                  }
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="w-8 h-8 rounded-lg svc-deliverable-icon flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle
                      className="w-4 h-4 text-brand-blue"
                      strokeWidth={2}
                    />
                  </div>
                  <span className="text-sm svc-pg-body leading-relaxed font-medium">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════ Tech Stack ══════════════ */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 svc-pg-section-bg" />
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
            <div className="shrink-0">
              <SectionHeading
                eyebrow="Stack"
                title="Built With"
                align="left"
              />
            </div>
            <div className="flex-1">
              <TechStackRow items={service.techStack} />
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════ Process ══════════════ */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 svc-pg-alt-bg" />
        <div className="absolute -left-32 bottom-0 w-[500px] h-[500px] rounded-full bg-brand-cyan/[0.02] blur-[120px] pointer-events-none" />

        <Container className="relative z-10">
          <div ref={processRef}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <SectionHeading
                eyebrow="How We Work"
                title="From Kickoff to Launch"
                align="center"
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {service.process.map((step, i) => (
                <ProcessStep
                  key={step.title}
                  number={i + 1}
                  title={step.title}
                  description={step.description}
                  isLast={i === service.process.length - 1}
                  delay={0.15 + i * 0.12}
                  isInView={processInView}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 svc-pg-section-bg" />
        <Container className="relative z-10">
          <SectionHeading
            eyebrow="FAQ"
            title="Common Questions"
            align="center"
            className="mb-14"
          />
          <FAQSection items={service.faqs} />
        </Container>
      </section>
    </>
  );
}
