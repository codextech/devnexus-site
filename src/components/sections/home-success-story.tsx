"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { fadeUp } from "@/lib/animations";

export function SuccessStorySection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Base dark fill */}
      <div className="absolute inset-0 bg-dark-950" />

      {/* Motorcycle image — right side, fades left */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[60%]">
        <Image
          src="/images/section/Gemini_Generated_Image_hguwljhguwljhguw.png"
          alt="SysPOS digital transformation"
          fill
          priority
          className="object-cover object-left"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        {/* Horizontal fade: dark left → transparent right */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/75 to-dark-950/10" />
        {/* Bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 to-transparent" />
      </div>

      {/* Subtle brand glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-lg">
          {/* Eyebrow */}
          <motion.p
            {...fadeUp}
            className="text-[11px] font-semibold tracking-widest uppercase text-brand-blue mb-8"
          >
            Success Story — SysPOS
          </motion.p>

          {/* Big number */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          >
            <span className="block font-bold leading-none text-white"
              style={{ fontSize: "clamp(5rem, 14vw, 10rem)" }}>
              30x
            </span>
            <span className="block text-lg md:text-xl font-medium text-dark-300 mt-1">
              increase in orders per annum
            </span>
          </motion.div>

          {/* Divider */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-12 h-px bg-brand-blue/50 my-8"
          />

          {/* Description */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-dark-300 text-base md:text-lg leading-relaxed mb-10"
          >
            Streamlined SysPOS&apos;s operations with scalable, intelligent
            solutions — transforming how their platform handles volume, speed,
            and customer demand at scale.
          </motion.p>

          {/* CTA */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-3 group"
            >
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-blue shadow-lg shadow-brand-blue/20 group-hover:shadow-brand-blue/40 transition-shadow">
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span className="text-white font-semibold text-sm tracking-wide group-hover:text-brand-blue transition-colors">
                View our work
              </span>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
