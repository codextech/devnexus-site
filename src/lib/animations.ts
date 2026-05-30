// Precision Instrument motion language — calm, precise, purposeful.
// Shared expo-out easing; all reveals are once-on-view.

export const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
} as const;

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: EASE },
} as const;

// Headline reveal. Uses opacity + y (not clip-path): animating `clip-path` via
// whileInView silently fails on mobile, leaving headings stuck clipped/invisible
// while plain transform/opacity reveals (fadeUp) work everywhere. Reliability
// over the wipe flourish — headings must always appear.
export const clipReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: EASE },
} as const;

export const staggerContainer = {
  whileInView: {
    transition: { staggerChildren: 0.08 },
  },
  viewport: { once: true, margin: "-80px" },
} as const;

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: EASE },
} as const;
