import Image from "next/image";

/**
 * Static poster for the hero panel. Shown during SSR / canvas load, and as the
 * graceful fallback when WebGL is unavailable or the user prefers reduced motion.
 * (The live neural scene visually echoes this poster.)
 */
export function HeroPoster() {
  return (
    <Image
      src="/images/hero/hero-3d.jpg"
      alt="DevNexus — software and AI engineering"
      fill
      priority
      sizes="(max-width: 1024px) 90vw, 520px"
      className="object-cover"
    />
  );
}
