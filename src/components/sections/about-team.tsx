"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/container";

export function AboutTeam() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 about-team-bg" />

      <Container className="relative z-10">
        <div ref={ref}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-brand-blue" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-blue">
                The Team
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold about-title leading-tight max-w-2xl">
              Engineers, Not Account Managers
            </h2>
            <p className="mt-3 text-sm md:text-base about-body max-w-xl leading-relaxed">
              Small by design. Every person you work with is a senior engineer
              who&rsquo;s shipped production software.
            </p>
          </motion.div>

          {/* Image grid — asymmetric bento */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Large image — spans 7 cols */}
            <motion.div
              className="md:col-span-7 relative rounded-2xl overflow-hidden about-image-card h-[280px] md:h-[400px] group"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/team/Gemini_Generated_Image_8enz948enz948enz.png"
                alt="DevNexus engineer at work"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              <div className="absolute inset-0 about-image-overlay" />
              <div className="absolute bottom-5 left-6">
                <p className="text-xs font-semibold text-white/60 uppercase tracking-[0.15em]">
                  Deep in the build
                </p>
                <p className="text-sm font-medium text-white/90 mt-1">
                  Senior engineers who own the outcome
                </p>
              </div>
            </motion.div>

            {/* Stacked right — 5 cols */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <motion.div
                className="relative rounded-2xl overflow-hidden about-image-card h-[200px] md:flex-1 group"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/images/team/Gemini_Generated_Image_lesspdlesspdless.png"
                  alt="DevNexus team collaborating"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
                <div className="absolute inset-0 about-image-overlay" />
                <div className="absolute bottom-4 left-5">
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-[0.15em]">
                    Collaboration
                  </p>
                  <p className="text-sm font-medium text-white/90 mt-1">
                    Working through hard problems together
                  </p>
                </div>
              </motion.div>

              {/* Info card */}
              <motion.div
                className="about-info-card rounded-2xl p-6 md:p-7 flex flex-col justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                <p className="text-lg md:text-xl font-bold about-title leading-snug">
                  No handoffs.
                  <br />
                  No juniors.
                  <br />
                  <span className="text-brand-blue">No surprises.</span>
                </p>
                <p className="mt-3 text-xs about-body leading-relaxed">
                  The same expert you meet is the one who builds your product.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
