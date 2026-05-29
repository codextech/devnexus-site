"use client";

import "lenis/dist/lenis.css";
import { ReactLenis, type LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

// Cubic-bezier solver matching the site's EASE [0.16, 1, 0.3, 1]
// (see src/lib/animations.ts) so Lenis scroll momentum is cohesive with the
// Framer Motion reveals. Note: motion v12 does not export cubicBezier, so the
// algorithm is implemented inline. All values tunable here. ReactLenis drives
// requestAnimationFrame itself (autoRaf defaults to true), so no manual loop.
function sampleCurveX(t: number, p1x: number, p2x: number) {
  return ((1 - 3 * p2x + 3 * p1x) * t + (3 * p2x - 6 * p1x)) * t + 3 * p1x * t;
}
function solveCubicBezierT(x: number, p1x: number, p2x: number) {
  let t = x;
  for (let i = 0; i < 8; i++) {
    const dx = sampleCurveX(t, p1x, p2x) - x;
    if (Math.abs(dx) < 1e-7) break;
    const derivative = (1 - 3 * p2x + 3 * p1x) * (3 * t * t) + (3 * p2x - 6 * p1x) * (2 * t) + 3 * p1x;
    if (Math.abs(derivative) < 1e-7) break;
    t -= dx / derivative;
  }
  return t;
}
function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  return (t: number) => {
    if (t === 0 || t === 1) return t;
    const st = solveCubicBezierT(t, p1x, p2x);
    return ((1 - 3 * p2y + 3 * p1y) * st + (3 * p2y - 6 * p1y)) * st + 3 * p1y * st;
  };
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
