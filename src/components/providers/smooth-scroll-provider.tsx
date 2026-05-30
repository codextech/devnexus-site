"use client";

import "lenis/dist/lenis.css";
import { ReactLenis, type LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

// Cubic-bezier easing via the WebKit UnitBezier algorithm. motion v12 does not
// publicly export cubicBezier, so it is implemented inline here. The curve
// [0.16, 1, 0.3, 1] matches the site's EASE (src/lib/animations.ts) so Lenis
// scroll momentum stays cohesive with the Framer Motion reveals.
function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  // Polynomial coefficients for control points P0=(0,0) … P3=(1,1).
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const sampleDerivativeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  // Newton-Raphson: find the parametric t for a given x (elapsed time).
  const solveForT = (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const dx = sampleX(t) - x;
      if (Math.abs(dx) < 1e-6) return t;
      const d = sampleDerivativeX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= dx / d;
    }
    return t;
  };

  return (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : sampleY(solveForT(t)));
}

const lenisOptions = {
  duration: 1.1,
  easing: cubicBezier(0.16, 1, 0.3, 1),
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

  // Reset scroll to top on client-side route changes (App Router does not always
  // do this cleanly under a JS scroll layer). Skip the initial mount so deep
  // links and hash landings aren't clobbered.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
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
      const id = href.slice(1);
      const target = id ? document.getElementById(decodeURIComponent(id)) : null;
      if (!target) return;
      e.preventDefault();
      lenisRef.current?.lenis?.scrollTo(target, { offset: -80 });
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
