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

// Headline reveal — text wipes up from behind a mask.
export const clipReveal = {
  initial: { clipPath: "inset(0 0 100% 0)", y: 10, opacity: 0.6 },
  whileInView: { clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1 },
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
