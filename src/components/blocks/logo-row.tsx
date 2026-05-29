"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  useReducedMotion,
} from "motion/react";
import { Container } from "@/components/ui/container";

const logos = [
  { src: "/images/clients/agilepulselogo.png", alt: "AgilePulse" },
  { src: "/images/clients/syspos-logo.webp", alt: "SysPOS" },
  { src: "/images/clients/cellular-logo.png", alt: "Cellular" },
  { src: "/images/clients/tasleem-taxi-logo.png", alt: "Tasleem Taxi" },
  { src: "/images/clients/ttravel-logo.png", alt: "TTravel" },
  { src: "/images/clients/top-health-ai.png", alt: "TopHealth AI" },
  { src: "/images/clients/capri.avif", alt: "Capri" },
];

const SPEED = 2.4; // % of track width per second

// keep a value looping within [min, max)
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return min + (((v - min) % range) + range) % range;
};

function LogoItem({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex w-[150px] flex-shrink-0 items-center justify-center sm:w-[180px]">
      <Image
        src={src}
        alt={alt}
        width={150}
        height={36}
        className="logo-bar-image h-7 w-auto object-contain opacity-55 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
      />
    </div>
  );
}

export function LogoRow() {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const paused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current) return;
    baseX.set(baseX.get() - (SPEED * delta) / 1000);
  });

  return (
    <section className="border-y border-border bg-bg py-10 md:py-12">
      <Container>
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
          Trusted by teams shipping real products
        </p>
      </Container>

      {reduce ? (
        <Container>
          <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-7">
            {logos.map((l) => (
              <LogoItem key={l.alt} {...l} />
            ))}
          </div>
        </Container>
      ) : (
        <div
          className="group relative mt-8 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          }}
          onMouseEnter={() => {
            paused.current = true;
          }}
          onMouseLeave={() => {
            paused.current = false;
          }}
        >
          <motion.div className="flex w-max" style={{ x }}>
            {/* two identical sets → seamless -50% loop */}
            {[...logos, ...logos].map((l, i) => (
              <LogoItem key={`${l.alt}-${i}`} {...l} />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
