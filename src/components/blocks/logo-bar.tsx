"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { fadeIn } from "@/lib/animations";

const clientLogos = [
  { src: "/images/testimonial/cellular-logo.png", alt: "Cellular" },
  { src: "/images/testimonial/syspos-logo.webp", alt: "SysPOS" },
  { src: "/images/testimonial/tasleem-taxi-logo.png", alt: "Tasleem Taxi" },
  { src: "/images/testimonial/ttravel-logo.png", alt: "TTravel" },
];

export function LogoBar() {
  return (
    <section className="py-12 md:py-16 border-y border-white/5 relative">
      <div className="absolute inset-0 bg-dark-900/50" />
      <Container className="relative z-10">
        <motion.p
          {...fadeIn}
          className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-dark-500 mb-8"
        >
          Trusted by teams shipping real products
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
          {clientLogos.map((logo) => (
            <div
              key={logo.alt}
              className="relative h-8 md:h-10 w-28 md:w-36 opacity-50 hover:opacity-90 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
