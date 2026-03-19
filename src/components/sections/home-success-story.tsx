"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { ArrowRight, TrendingUp, Users, Zap, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";

const results = [
  { icon: TrendingUp, value: "30x", label: "Order volume growth", suffix: "" },
  { icon: Zap, value: "< 2s", label: "Avg. response time", suffix: "" },
  { icon: Users, value: "50k+", label: "Monthly active users", suffix: "" },
];

export function SuccessStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  /* Parallax on the image */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.02]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-40"
    >
      {/* Base bg */}
      <div className="absolute inset-0 bg-dark-950 story-section-bg" />

      {/* Ambient glows */}
      <motion.div
        className="absolute -left-32 top-1/3 w-[600px] h-[600px] bg-brand-blue/[0.04] rounded-full blur-[150px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 bottom-1/4 w-[400px] h-[400px] bg-brand-cyan/[0.03] rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <Container className="relative z-10">
        {/* ── Eyebrow — full width ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-14"
        >
          <div className="h-px w-10 bg-brand-blue" />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-blue">
            Success Story
          </span>
          <div className="h-px flex-1 story-divider-line" />
        </motion.div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start"
        >
          {/* ── Left: Cinematic Image (7 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-7 relative"
          >
            {/* Main image container */}
            <div className="relative rounded-2xl overflow-hidden story-image-card h-[380px] md:h-[480px] lg:h-[560px]">
              <motion.div
                className="absolute inset-0"
                style={{ y: imageY, scale: imageScale }}
              >
                <Image
                  src="/images/section/success-pos-system.jpg"
                  alt="SysPOS point-of-sale system handling customer orders"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </motion.div>

              {/* Cinematic gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-dark-950/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-dark-950/30 to-transparent" />

              {/* Quote card — frosted glass, bottom-left */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 inset-x-0 p-6 md:p-7 story-quote-glass"
              >
                <div className="flex gap-3">
                  <Quote className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" strokeWidth={2} />
                  <div>
                    <p className="text-sm md:text-base text-white font-medium leading-relaxed italic">
                      DevNexus didn&rsquo;t just rebuild our app &mdash; they
                      transformed our business model.
                    </p>
                    <p className="mt-2.5 text-xs text-white/50 font-semibold uppercase tracking-[0.15em]">
                      Founder, SysPOS
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative frame accent */}
            <motion.div
              className="absolute -bottom-3 -right-3 w-24 h-24 rounded-2xl border border-brand-blue/15 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
            <motion.div
              className="absolute -top-3 -left-3 w-16 h-16 rounded-xl border border-brand-cyan/10 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            />
          </motion.div>

          {/* ── Right: Narrative Content (5 cols) ── */}
          <div className="lg:col-span-5 lg:pt-4">
            {/* Client badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2 story-client-badge mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase">
                SysPOS
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.08] story-title-text"
            >
              From local POS
              <br />
              to{" "}
              <motion.span
                className="text-brand-blue inline-block"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 150 }}
              >
                30x growth
              </motion.span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-5 text-[15px] md:text-base story-body-text leading-[1.7] max-w-md"
            >
              We rebuilt their point-of-sale platform from the ground up &mdash;
              scalable architecture, real-time inventory, and a mobile-first
              ordering experience that handles peak demand without breaking a sweat.
            </motion.p>

            {/* ── Stats — vertical stack ── */}
            <div className="mt-10 space-y-3">
              {results.map((r, i) => (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.4 + i * 0.12,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="story-stat-row group"
                >
                  <div className="flex items-center gap-4 p-4 rounded-xl story-stat-card transition-all duration-300">
                    {/* Icon */}
                    <div className="story-stat-icon-ring">
                      <r.icon
                        className="w-4 h-4 text-brand-blue"
                        strokeWidth={2}
                      />
                    </div>

                    {/* Value */}
                    <motion.span
                      className="text-2xl md:text-3xl font-bold story-stat-value min-w-[80px]"
                      initial={{ opacity: 0, scale: 0.5, filter: "blur(8px)" }}
                      animate={
                        isInView
                          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                          : {}
                      }
                      transition={{
                        delay: 0.55 + i * 0.15,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 180,
                        damping: 16,
                      }}
                    >
                      {r.value}
                    </motion.span>

                    {/* Label */}
                    <span className="text-xs font-medium story-stat-label uppercase tracking-[0.12em] flex-1">
                      {r.label}
                    </span>

                    {/* Animated accent bar */}
                    <motion.div
                      className="h-8 w-0.5 rounded-full bg-brand-blue/30"
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.15, duration: 0.4 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-10"
            >
              <div className="case-studies-cta-strip rounded-2xl px-6 py-5 md:px-8 md:py-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-sm font-bold case-studies-cta-title">
                    Want to see more results?
                  </p>
                  <p className="text-xs case-studies-cta-sub mt-1">
                    Explore every project with full metrics.
                  </p>
                </div>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-blue text-white text-sm font-semibold shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/50 hover:scale-105 transition-all duration-300 shrink-0 group"
                >
                  View All Case Studies
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
