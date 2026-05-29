"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechStackRow } from "@/components/blocks/tech-stack-row";
import { FAQSection } from "@/components/blocks/faq-section";
import { EASE } from "@/lib/animations";
import type { ServiceData } from "@/types/services";

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
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: EASE }}
      className="relative"
    >
      {!isLast ? (
        <motion.div
          className="absolute left-[calc(100%+0.25rem)] top-5 hidden h-px w-[calc(100%-0.5rem)] origin-left bg-border lg:block"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: delay + 0.25, duration: 0.6, ease: EASE }}
        />
      ) : null}

      <div className="h-full rounded-[14px] border border-border bg-surface p-6 transition-colors hover:border-border-hi md:p-7">
        <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-border">
          <span className="font-mono text-sm font-medium text-blue">
            {String(number).padStart(2, "0")}
          </span>
        </span>
        <h3 className="font-display text-base font-bold text-fg md:text-lg">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{description}</p>
      </div>
    </motion.div>
  );
}

export function ServicePageContent({ service }: { service: ServiceData }) {
  const problemRef = useRef<HTMLDivElement>(null);
  const deliverablesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const problemInView = useInView(problemRef, { once: true, margin: "-80px" });
  const deliverablesInView = useInView(deliverablesRef, { once: true, margin: "-80px" });
  const processInView = useInView(processRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* Problem & approach */}
      <section className="bg-bg py-20 md:py-28">
        <Container>
          <div ref={problemRef} className="max-w-5xl">
            <motion.div
              className="mb-8 flex items-center gap-3"
              initial={{ opacity: 0, x: -16 }}
              animate={problemInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="h-px w-6 bg-border-hi" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
                The challenge
              </span>
            </motion.div>

            <motion.blockquote
              className="max-w-3xl font-display text-xl font-semibold leading-[1.35] tracking-[-0.01em] text-fg md:text-2xl lg:text-3xl"
              initial={{ opacity: 0, y: 18 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.12, duration: 0.6, ease: EASE }}
            >
              {service.problem}
            </motion.blockquote>

            <motion.div
              className="mt-10 flex items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-blue">
                <ArrowRight className="h-4 w-4" />
              </span>
              <p className="max-w-lg text-sm leading-relaxed text-fg-muted">
                We solve this with a focused, sprint-based approach — senior
                engineers who own the outcome from day one.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Deliverables */}
      <section className="border-t border-border bg-bg py-20 md:py-28">
        <Container>
          <div ref={deliverablesRef}>
            <SectionHeading eyebrow="Deliverables" title="What you get" align="left" className="mb-12" />
            <div className="grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
              {service.deliverables.map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-start gap-4 rounded-[12px] border border-border bg-surface p-5 transition-colors hover:border-border-hi"
                  initial={{ opacity: 0, y: 14 }}
                  animate={deliverablesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: EASE }}
                >
                  <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[8px] border border-border text-blue">
                    <CheckCircle className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="text-sm font-medium leading-relaxed text-fg">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Tech stack */}
      <section className="bg-bg py-16 md:py-20">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-16">
            <div className="shrink-0">
              <SectionHeading eyebrow="Stack" title="Built with" align="left" />
            </div>
            <div className="flex-1">
              <TechStackRow items={service.techStack} />
            </div>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="border-t border-border bg-bg py-20 md:py-28">
        <Container>
          <div ref={processRef}>
            <SectionHeading
              eyebrow="How we work"
              title="From kickoff to launch"
              align="center"
              className="mb-14"
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, i) => (
                <ProcessStep
                  key={step.title}
                  number={i + 1}
                  title={step.title}
                  description={step.description}
                  isLast={i === service.process.length - 1}
                  delay={0.12 * i}
                  isInView={processInView}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-bg py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Common questions" align="center" className="mb-14" />
          <FAQSection items={service.faqs} />
        </Container>
      </section>
    </>
  );
}
