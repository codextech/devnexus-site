"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import {
  Search,
  PenTool,
  Rocket,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const steps: {
  icon: LucideIcon;
  num: string;
  title: string;
  sub: string;
  time: string;
}[] = [
  {
    icon: Search,
    num: "01",
    title: "Discover",
    sub: "Goals, users & constraints",
    time: "Week 1",
  },
  {
    icon: PenTool,
    num: "02",
    title: "Design",
    sub: "Architecture & UI prototype",
    time: "Week 2",
  },
  {
    icon: Rocket,
    num: "03",
    title: "Build & Ship",
    sub: "Live demos every sprint",
    time: "Week 3–8",
  },
  {
    icon: TrendingUp,
    num: "04",
    title: "Scale",
    sub: "Launch, monitor & iterate",
    time: "Ongoing",
  },
];

/* ── Desktop: horizontal pipeline ── */
function DesktopPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  /* Scroll-linked progress for the fill bar */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.3"],
  });
  const fillWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="hidden lg:block mt-20 md:mt-28">
      {/* ── Progress track ── */}
      <div className="relative h-1 rounded-full process-track mx-12 mb-16">
        {/* Fill bar — driven by scroll */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full process-track-fill"
          style={{ width: fillWidth }}
        />

        {/* Node dots on the track */}
        <div className="absolute inset-0 flex justify-between items-center -mx-2">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{
                delay: 0.2 + i * 0.2,
                duration: 0.4,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              {/* Pulse ring */}
              <motion.div
                className="absolute -inset-2 rounded-full bg-brand-blue/20"
                animate={
                  isInView
                    ? {
                        scale: [1, 1.8, 1],
                        opacity: [0.4, 0, 0.4],
                      }
                    : {}
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
              <div className="w-4 h-4 rounded-full bg-brand-blue shadow-[0_0_12px_rgba(2,169,247,0.5)]" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Step columns below track ── */}
      <div className="grid grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.3 + i * 0.18,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-center"
          >
            {/* Large step number */}
            <motion.span
              className="block text-6xl xl:text-7xl font-bold process-big-num select-none"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: 0.4 + i * 0.18,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 18,
              }}
            >
              {step.num}
            </motion.span>

            {/* Icon */}
            <motion.div
              className="mx-auto mt-5 w-14 h-14 rounded-2xl process-icon-ring flex items-center justify-center"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={isInView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{
                delay: 0.5 + i * 0.18,
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <step.icon className="w-6 h-6 text-brand-blue" strokeWidth={1.6} />
            </motion.div>

            {/* Title */}
            <h3 className="mt-4 text-lg font-bold process-title-text">
              {step.title}
            </h3>

            {/* Sub */}
            <p className="mt-1 text-sm process-body-text">{step.sub}</p>

            {/* Timeline pill */}
            <span className="inline-block mt-3 process-timeline-badge">
              {step.time}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Mobile: vertical timeline ── */
function MobilePipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="lg:hidden mt-16 relative">
      {/* Vertical track */}
      <div className="absolute left-[1.6rem] top-0 bottom-0 w-0.5 process-track rounded-full">
        <motion.div
          className="absolute top-0 left-0 right-0 rounded-full process-track-fill"
          initial={{ height: "0%" }}
          animate={isInView ? { height: "100%" } : {}}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </div>

      <div className="space-y-12">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: 0.3 + i * 0.2,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-start gap-5 relative"
          >
            {/* Node dot */}
            <div className="relative shrink-0">
              <motion.div
                className="absolute -inset-2 rounded-full bg-brand-blue/20"
                animate={
                  isInView
                    ? { scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }
                    : {}
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
              <div className="relative w-[3.2rem] h-[3.2rem] rounded-full process-icon-ring flex items-center justify-center">
                <step.icon className="w-5 h-5 text-brand-blue" strokeWidth={1.8} />
              </div>
              {/* Number badge */}
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-brand-blue flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-brand-blue/30">
                {i + 1}
              </span>
            </div>

            {/* Content */}
            <div className="pt-1 flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-base font-bold process-title-text">
                  {step.title}
                </h3>
                <span className="process-timeline-badge text-[10px]">
                  {step.time}
                </span>
              </div>
              <p className="text-sm process-body-text leading-relaxed">
                {step.sub}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
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

        <DesktopPipeline />
        <MobilePipeline />
      </Container>
    </section>
  );
}
