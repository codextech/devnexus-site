"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

// Lenis feel — expo-out easing matching the site's EASE [0.16, 1, 0.3, 1].
// All values tunable here. ReactLenis drives requestAnimationFrame itself
// (autoRaf defaults to true) so no manual RAF loop is needed.
const lenisOptions = {
  duration: 1.1,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  syncTouch: false, // native touch scrolling — expected on mobile
  orientation: "vertical" as const,
};

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  // Reset scroll to top on route change (App Router does not always do this
  // cleanly under a JS scroll layer).
  useEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  // Smooth in-page anchor links (href="#id").
  useEffect(() => {
    if (reduceMotion) return;
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]'
      );
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenisRef.current?.lenis?.scrollTo(target as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reduceMotion]);

  // Reduced motion → native scroll, no Lenis.
  if (reduceMotion) return <>{children}</>;

  return (
    <ReactLenis root options={lenisOptions} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}
