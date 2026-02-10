"use client";

import { motion } from "motion/react";
import { CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessStep } from "@/components/blocks/process-step";
import { TechStackRow } from "@/components/blocks/tech-stack-row";
import { FAQSection } from "@/components/blocks/faq-section";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import type { ServiceData } from "@/types/services";

export function ServicePageContent({ service }: { service: ServiceData }) {
  return (
    <>
      {/* Problem */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 section-gradient" />
        <Container className="relative z-10">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
              The Problem
            </h2>
            <p className="text-base md:text-lg text-dark-400 leading-relaxed">
              {service.problem}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Deliverables */}
      <section className="py-16 md:py-24 border-y border-white/5 relative">
        <div className="absolute inset-0 bg-dark-900/30" />
        <Container className="relative z-10">
          <SectionHeading
            title="What We Deliver"
            align="left"
            className="mb-10"
          />
          <motion.ul
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl"
          >
            {service.deliverables.map((item) => (
              <motion.li
                key={item}
                {...staggerItem}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <span className="text-dark-300">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </section>

      {/* Tech Stack */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="Tech Stack"
            align="left"
            className="mb-8"
          />
          <TechStackRow items={service.techStack} />
        </Container>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 border-y border-white/5 relative">
        <div className="absolute inset-0 bg-dark-900/30" />
        <Container className="relative z-10">
          <SectionHeading
            title="Our Process"
            align="center"
            className="mb-12"
          />
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {service.process.map((step, i) => (
              <ProcessStep
                key={step.title}
                number={i + 1}
                title={step.title}
                description={step.description}
              />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="Frequently Asked Questions"
            align="center"
            className="mb-12"
          />
          <FAQSection items={service.faqs} />
        </Container>
      </section>
    </>
  );
}
