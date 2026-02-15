"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { fadeIn } from "@/lib/animations";

const clientLogos = [
  {
    src: "/images/clients/cellular-logo.png",
    alt: "Cellular",
    href: "https://cellularoptics.com/",
  },
  {
    src: "/images/clients/top-health-ai.png",
    alt: "TopHealth AI",
    href: "https://tophealth.ai/",
  },
  {
    src: "/images/clients/syspos-logo.webp",
    alt: "SysPOS",
    href: "https://syspos.ae/",
  },
  {
    src: "/images/clients/tasleem-taxi-logo.png",
    alt: "Tasleem Taxi",
    href: "https://tasleemtaxi.com/",
  },
  {
    src: "/images/clients/ttravel-logo.png",
    alt: "TTravel",
    href: "https://ttravell.com/",
  },
  {
    src: "/images/clients/agilepulselogo.png",
    alt: "AgilePulse",
    href: "https://agilepulse.co/",
  },
  { src: "/images/clients/capri.avif", alt: "Capri", href: "https://capristudios.com/" },
];

export function LogoBar() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsetRef = useRef(0);
  const activeIndexRef = useRef(0);

  const [offset, setOffset] = useState(0);
  const [singleSetWidth, setSingleSetWidth] = useState(0);
  const [centers, setCenters] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const marqueeLogos = useMemo(() => [...clientLogos, ...clientLogos], []);

  useEffect(() => {
    const measureTrack = () => {
      const firstLogo = logoRefs.current[0];
      const repeatedSetStart = logoRefs.current[clientLogos.length];

      if (!firstLogo || !repeatedSetStart) {
        return;
      }

      const measuredWidth = repeatedSetStart.offsetLeft - firstLogo.offsetLeft;

      const measuredCenters = logoRefs.current
        .slice(0, clientLogos.length)
        .map((item) =>
          item
            ? item.offsetLeft - firstLogo.offsetLeft + item.offsetWidth / 2
            : 0
        );

      setSingleSetWidth(measuredWidth);
      setCenters(measuredCenters);
      offsetRef.current = measuredWidth > 0 ? offsetRef.current % measuredWidth : 0;
      setOffset(offsetRef.current);
      activeIndexRef.current = 0;
      setActiveIndex(0);
    };

    measureTrack();
    window.addEventListener("resize", measureTrack);

    return () => {
      window.removeEventListener("resize", measureTrack);
    };
  }, []);

  useEffect(() => {
    const pxPerSecond = 70;
    let animationFrame = 0;
    let lastFrameTime = performance.now();

    const getActiveLogoIndex = (nextOffset: number) => {
      if (!viewportRef.current || centers.length === 0 || singleSetWidth === 0) {
        return 0;
      }

      const viewportCenter = nextOffset + viewportRef.current.clientWidth / 2;
      const normalizedCenter =
        ((viewportCenter % singleSetWidth) + singleSetWidth) % singleSetWidth;

      let closestIndex = 0;
      let minDistance = Number.POSITIVE_INFINITY;

      centers.forEach((center, index) => {
        const directDistance = Math.abs(normalizedCenter - center);
        const wrappedDistance = singleSetWidth - directDistance;
        const distance = Math.min(directDistance, wrappedDistance);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    };

    const step = (timestamp: number) => {
      const elapsed = (timestamp - lastFrameTime) / 1000;
      lastFrameTime = timestamp;

      if (!isPaused && singleSetWidth > 0) {
        const nextOffset = (offsetRef.current + elapsed * pxPerSecond) % singleSetWidth;
        offsetRef.current = nextOffset;
        setOffset(nextOffset);

        const nextActiveIndex = getActiveLogoIndex(nextOffset);
        if (nextActiveIndex !== activeIndexRef.current) {
          activeIndexRef.current = nextActiveIndex;
          setActiveIndex(nextActiveIndex);
        }
      }

      animationFrame = window.requestAnimationFrame(step);
    };

    animationFrame = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [centers, isPaused, singleSetWidth]);

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
        <div
          ref={viewportRef}
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-36 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div
            className="flex w-max items-center gap-x-14 pr-14"
            style={{ transform: `translate3d(-${offset}px, 0, 0)` }}
          >
            {marqueeLogos.map((logo, index) => {
              const logoIndex = index % clientLogos.length;
              const isActive = logoIndex === activeIndex;

              return (
                <div
                  key={`${logo.alt}-${index}`}
                  ref={(node) => {
                    logoRefs.current[index] = node;
                  }}
                  className={`relative h-8 md:h-10 w-28 md:w-36 shrink-0 transition-all duration-300 ${
                    isActive
                      ? "opacity-100 grayscale-0 scale-105"
                      : "opacity-45 grayscale"
                  }`}
                >
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${logo.alt} in a new tab`}
                    className="block h-full w-full"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain"
                    />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
