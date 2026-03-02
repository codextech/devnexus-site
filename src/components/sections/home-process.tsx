"use client";

import { motion } from "motion/react";
import {
  Search,
  PenTool,
  Rocket,
  TrendingUp,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const steps: {
  icon: LucideIcon;
  title: string;
  tagline: string;
}[] = [
  {
    icon: Search,
    title: "Discover",
    tagline: "Understand goals, users & constraints",
  },
  {
    icon: PenTool,
    title: "Design",
    tagline: "System architecture & UI blueprint",
  },
  {
    icon: Rocket,
    title: "Build & Ship",
    tagline: "Sprint demos you can touch every cycle",
  },
  {
    icon: TrendingUp,
    title: "Scale",
    tagline: "Launch, monitor & iterate together",
  },
];

const CONNECTOR_DURATION = 1.2;
const PAUSE_DURATION = 0.6;
const TOTAL_CONNECTORS = steps.length - 1;
const CYCLE_DURATION =
  TOTAL_CONNECTORS * CONNECTOR_DURATION + PAUSE_DURATION;
const REPEAT_DELAY = CYCLE_DURATION - CONNECTOR_DURATION;

function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[number];
  index: number;
  isLast: boolean;
}) {
  return (
    <div className="flex flex-col items-center relative">
      {/* Animated icon ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.5,
          delay: index * 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative"
      >
        {/* Pulsing glow behind icon */}
        <motion.div
          className="absolute inset-0 rounded-full bg-brand-blue/20 blur-xl"
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.08, 0.3] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.6,
          }}
        />

        {/* Icon circle */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full process-icon-ring flex items-center justify-center">
          <step.icon className="w-6 h-6 md:w-7 md:h-7 text-brand-blue" strokeWidth={1.6} />
        </div>

        {/* Step number badge */}
        <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-[11px] font-bold text-white shadow-lg shadow-brand-blue/30">
          {index + 1}
        </span>
      </motion.div>

      {/* Title + tagline */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.4,
          delay: index * 0.15 + 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-6 text-center max-w-[11rem]"
      >
        <h3 className="text-base md:text-lg font-bold process-title-text">
          {step.title}
        </h3>
        <p className="mt-1.5 text-xs md:text-sm process-body-text leading-relaxed">
          {step.tagline}
        </p>
      </motion.div>

      {/* Sequential arrow connector — desktop only, not after last */}
      {!isLast && (
        <div
          className="hidden lg:flex absolute top-8 md:top-10 left-[calc(50%+3rem)] items-center"
          style={{ width: "calc(100% - 6rem)" }}
        >
          <div className="relative flex-1 h-px process-connector overflow-visible">
            {/* Dot synced to travel connector 0 → 1 → 2 sequentially */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(2,169,247,0.6)]"
              initial={{ left: "0%", opacity: 0 }}
              animate={{ left: ["0%", "100%"], opacity: [1, 1] }}
              transition={{
                duration: CONNECTOR_DURATION,
                delay: index * CONNECTOR_DURATION,
                repeat: Infinity,
                repeatDelay: REPEAT_DELAY,
                ease: "easeInOut",
              }}
            />
          </div>
          {/* Arrowhead lights up when dot arrives */}
          <motion.div
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.2, 1, 0.3], scale: [1, 1, 1.2, 1] }}
            transition={{
              duration: CONNECTOR_DURATION,
              delay: index * CONNECTOR_DURATION,
              repeat: Infinity,
              repeatDelay: REPEAT_DELAY,
              times: [0, 0.65, 0.88, 1],
              ease: "easeOut",
            }}
          >
            <ArrowRight className="w-4 h-4 text-brand-blue -ml-0.5 shrink-0" />
          </motion.div>
        </div>
      )}
    </div>
  );
}

export function ProcessSection() {
  return (
    <section className="py-24 md:py-36 relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-dark-900/30" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="How It Works"
          title="From First Call to First Users"
          subtitle="Four clear phases. Full transparency at every step. No surprises."
        />

        {/* Desktop: horizontal flow */}
        <div className="hidden lg:grid grid-cols-4 gap-0 mt-20 md:mt-28">
          {steps.map((step, i) => (
            <StepCard
              key={step.title}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>

        {/* Mobile: vertical flow with animated connector */}
        <div className="lg:hidden mt-16 relative">
          {/* Vertical connector with flowing dot */}
          <div className="absolute left-8 top-10 bottom-10 w-px process-connector overflow-visible">
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(2,169,247,0.6)]"
              animate={{ top: ["-4px", "100%"] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-start gap-5 relative"
              >
                {/* Icon */}
                <div className="relative shrink-0">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-brand-blue/20 blur-lg"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.06, 0.25] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                  />
                  <div className="relative w-16 h-16 rounded-full process-icon-ring flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-brand-blue" strokeWidth={1.6} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-brand-blue flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-brand-blue/30">
                    {i + 1}
                  </span>
                </div>

                {/* Text */}
                <div className="pt-3">
                  <h3 className="text-base font-bold process-title-text">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm process-body-text leading-relaxed">
                    {step.tagline}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
