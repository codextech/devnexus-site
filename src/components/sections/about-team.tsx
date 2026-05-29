"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { fadeUp } from "@/lib/animations";

export function AboutTeam() {
  return (
    <section className="border-t border-border bg-bg py-24 md:py-32">
      <Container>
        <motion.div {...fadeUp} className="mb-12">
          <div className="mb-5">
            <Eyebrow label="The team" />
          </div>
          <h2 className="max-w-2xl font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-fg md:text-3xl lg:text-4xl">
            Engineers, not account managers
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-fg-muted">
            Small by design. Every person you work with is a senior engineer
            who&rsquo;s shipped production software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* Large image */}
          <motion.div
            {...fadeUp}
            className="group relative h-[280px] overflow-hidden rounded-[14px] border border-border md:col-span-7 md:h-[400px]"
          >
            <Image
              src="/images/team/team-build.jpg"
              alt="DevNexus engineer at work"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
                Deep in the build
              </p>
              <p className="mt-1 text-sm font-medium text-white/90">
                Senior engineers who own the outcome
              </p>
            </div>
          </motion.div>

          {/* Right column */}
          <div className="flex flex-col gap-4 md:col-span-5">
            <motion.div
              {...fadeUp}
              className="group relative h-[200px] overflow-hidden rounded-[14px] border border-border md:flex-1"
            >
              <Image
                src="/images/team/team-collab.jpg"
                alt="DevNexus team collaborating"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
                  Collaboration
                </p>
                <p className="mt-1 text-sm font-medium text-white/90">
                  Working through hard problems together
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="flex flex-col justify-center rounded-[14px] border border-border bg-surface p-6 md:p-7"
            >
              <p className="font-display text-lg font-bold leading-snug text-fg md:text-xl">
                No handoffs.
                <br />
                No juniors.
                <br />
                <span className="text-blue">No surprises.</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                The same expert you meet is the one who builds your product.
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
