"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { fadeUp, clipReveal } from "@/lib/animations";

// Contrast is the section's persuasive core: name the buyer's real fear (the
// agency bait-and-switch) on the left, answer it on the right. Loss-aversion +
// the value made self-evident by juxtaposition.
const agencyNorm = [
  "Account managers relay your messages",
  "Junior devs do the actual work",
  "Context lost in handoffs",
  "You chase status updates",
];
const devnexusWay = [
  "You talk to the engineer building it",
  "Senior-only — production-proven",
  "One team, discovery to ship",
  "Weekly demos, nothing hidden",
];

export function AboutTeam() {
  return (
    <section className="border-t border-border bg-bg py-24 md:py-32">
      <Container>
        {/* Header */}
        <motion.div {...fadeUp}>
          <Eyebrow label="The team" />
        </motion.div>
        <motion.h2
          {...clipReveal}
          className="mt-5 max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-fg md:text-4xl lg:text-[2.75rem]"
        >
          Engineers, not account managers
        </motion.h2>
        <motion.p
          {...fadeUp}
          className="mt-4 max-w-xl leading-relaxed text-fg-muted"
        >
          Small by design. Every person you work with is a senior engineer
          who&rsquo;s shipped production software.
        </motion.p>

        <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:items-stretch">
          {/* Contrast — the persuasive centerpiece */}
          <motion.div
            {...fadeUp}
            className="grid gap-4 sm:grid-cols-2 lg:col-span-7"
          >
            {/* The agency norm — muted, the "before" */}
            <div className="flex flex-col rounded-[14px] border border-border bg-surface/40 p-7 md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
                The agency norm
              </p>
              <ul className="mt-6 space-y-4">
                {agencyNorm.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[15px] leading-snug text-fg-muted"
                  >
                    <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-fg-faint" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The DevNexus way — brand accent, the "after" (visually wins) */}
            <div className="flex flex-col overflow-hidden rounded-[14px] border border-blue/30 bg-blue-tint p-7 md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">
                The DevNexus way
              </p>
              <ul className="mt-6 space-y-4">
                {devnexusWay.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[15px] leading-snug text-fg"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Human trust */}
          <motion.div
            {...fadeUp}
            className="group relative min-h-[300px] overflow-hidden rounded-[14px] border border-border lg:col-span-5"
          >
            <Image
              src="/images/team/team-build.jpg"
              alt="A DevNexus senior engineer deep in the build"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
                Senior engineers
              </p>
              <p className="mt-1 text-base font-medium text-white/90">
                who own the outcome
              </p>
            </div>
          </motion.div>
        </div>

        {/* Closing principle — full-width, the line they'll remember */}
        <motion.div
          {...fadeUp}
          className="mt-5 flex flex-col gap-3 rounded-[14px] border border-border bg-surface p-7 md:flex-row md:items-center md:justify-between md:gap-8 md:p-8"
        >
          <p className="font-display text-xl font-bold leading-snug text-fg md:text-2xl">
            No handoffs. No juniors.{" "}
            <span className="text-blue">No surprises.</span>
          </p>
          <p className="max-w-md text-sm leading-relaxed text-fg-muted">
            The same expert you meet on the first call is the one who writes
            your code.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
