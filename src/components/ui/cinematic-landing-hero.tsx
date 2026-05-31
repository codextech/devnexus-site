// src/components/ui/cinematic-landing-hero.tsx
"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Real DevNexus case studies, revealed one-by-one inside the pinned card.
const PROJECTS = [
  {
    index: "01",
    name: "TopHealth",
    tag: "Healthcare · AI",
    heading: "AI patient intake, 68% faster",
    description:
      "Insurance-card extraction + EHR integration across 23 urgent-care clinics. Next.js · Python · HL7 FHIR.",
    image: "/images/work/tophealth.jpg",
    href: "/work/tophealth-patient-intake",
    metric: { value: 68, suffix: "%", label: "Faster intake" },
    badges: [
      { value: "$340K/yr", note: "Cost saved" },
      { value: "94%", note: "Extraction accuracy" },
    ],
  },
  {
    index: "02",
    name: "AgilePulse",
    tag: "Atlassian · Forge",
    heading: "Jira apps, certified first try",
    description:
      "Planning Poker, Retrospectives & Async Estimation on Atlassian Forge — Marketplace-certified on the first attempt.",
    image: "/images/work/agilepulse.jpg",
    href: "/work/agilepulse-jira-apps",
    metric: { value: 3000, suffix: "+", label: "Installs" },
    badges: [
      { value: "4.7★", note: "Avg rating" },
      { value: "1st try", note: "Certified" },
    ],
  },
  {
    index: "03",
    name: "Voice AI",
    tag: "Voice · Agentic",
    heading: "An autonomous outreach agent",
    description:
      "A voice agent that researches, calls, qualifies leads and books follow-ups — end to end, no human in the loop. VAPI · GPT-4o · Twilio.",
    image: "/images/work/vapi.jpg",
    href: "/work/vapi-voice-ai-outreach-agent",
    metric: { value: 200, suffix: "+", label: "Calls / day" },
    badges: [
      { value: "91%", note: "Lead qualified" },
      { value: "85%", note: "Time saved" },
    ],
  },
];

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .cine-film-grain {
      position: absolute; inset: 0; pointer-events: none; z-index: 50; opacity: 0.045; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%25" height="100%25" filter="url(%23n)"/></svg>');
  }

  .cine-bg-grid {
      background-size: 60px 60px;
      background-image:
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .cine-title {
      background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 45%, transparent) 100%);
      -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
      transform: translateZ(0);
  }

  /* Always-light title for use INSIDE the permanently-dark card (theme tokens
     flip to dark in light mode and would vanish on the deep-blue card). */
  .cine-title-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #c3cee0 100%);
      -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
      transform: translateZ(0);
  }

  .cine-wordmark {
      background: linear-gradient(180deg, #FFFFFF 0%, #6f7d96 100%);
      -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
      transform: translateZ(0);
  }

  .cine-card {
      background: linear-gradient(150deg, #06283f 0%, #04101d 60%, #02080f 100%);
      box-shadow: 0 40px 100px -20px rgba(0,0,0,0.9), inset 0 1px 2px rgba(255,255,255,0.12), inset 0 -2px 4px rgba(0,0,0,0.8);
      border: 1px solid rgba(2,169,247,0.10);
      will-change: width, height, transform, border-radius;
  }

  /* The card stays permanently dark in BOTH themes. In light mode the global
     token swap (--text → near-black, html.light h1–h4 → dark) would otherwise
     render the card's copy dark-on-dark and make it vanish. Re-pin the text
     tokens to their dark-theme values for everything inside the card (this also
     keeps the .cine-title gradient white), and shield the slide headings from
     the global light-mode heading-darkening rule. */
  html.light .cine-card {
      --text: #FAFAFA;
      --text-muted: #A1A1A6;
      --text-faint: #6B6B70;
  }
  html.light .cine-card h3 { color: #FAFAFA !important; }

  .cine-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 40;
      background: radial-gradient(700px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(2,169,247,0.12) 0%, transparent 42%);
      mix-blend-mode: screen;
  }

  .cine-screen {
      background: #050b16;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06), 0 30px 60px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(2,169,247,0.12);
      will-change: transform;
  }
  .cine-screen-glare {
      background: linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 42%);
  }

  .cine-badge {
      background: linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 100%);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.10), 0 20px 40px -12px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.18);
      will-change: transform, opacity;
  }
`;

export function CinematicHero({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Keep ScrollTrigger in sync with Lenis smooth scroll (root-mode window scroll
  // — no scrollerProxy needed).
  useLenis(() => {
    ScrollTrigger.update();
  });

  // Cursor sheen + subtle parallax on the active screen — only while the
  // section is actually in the viewport (it's far down the page).
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const card = cardRef.current;
        if (card) {
          card.style.setProperty("--mouse-x", `${e.clientX - card.getBoundingClientRect().left}px`);
          card.style.setProperty("--mouse-y", `${e.clientY - card.getBoundingClientRect().top}px`);
        }
        const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
        const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(".cine-screen", { rotationY: xVal * 8, rotationX: -yVal * 8, ease: "power3.out", duration: 1.1 });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Cinematic pinned timeline.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(".gsap-reveal", { visibility: "visible" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(".cine-intro", { autoAlpha: 0, y: 50, filter: "blur(16px)" });
      gsap.set(".cine-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".cine-slide", ".cta-wrapper"], { autoAlpha: 0 });

      gsap.timeline({ delay: 0.2 }).to(".cine-intro", {
        autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.6, ease: "expo.out", stagger: 0.12,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=7200",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(".cine-intro-wrap", { autoAlpha: 0, scale: 1.1, filter: "blur(16px)", duration: 1.2, ease: "power2.in" }, 0)
        .to(".cine-card", { y: 0, duration: 1.2, ease: "power3.inOut" }, 0)
        .to(".cine-card", { width: "100%", height: "100%", borderRadius: "0px", duration: 1.2, ease: "power3.inOut" });

      PROJECTS.forEach((p, i) => {
        if (i === 0) {
          tl.fromTo(`.cine-slide-${i}`, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 1.3, ease: "expo.out" });
        } else {
          tl.to(`.cine-slide-${i - 1}`, { autoAlpha: 0, xPercent: -6, filter: "blur(8px)", duration: 1.0, ease: "power2.in" })
            .fromTo(`.cine-slide-${i}`, { autoAlpha: 0, xPercent: 6, filter: "blur(8px)" }, { autoAlpha: 1, xPercent: 0, filter: "blur(0px)", duration: 1.2, ease: "expo.out" }, "-=0.6");
        }
        tl.to(`.cine-counter-${i}`, { innerHTML: p.metric.value, snap: { innerHTML: 1 }, duration: 1.4, ease: "expo.out" }, "<")
          .fromTo(`.cine-slide-${i} .cine-badge`, { autoAlpha: 0, y: 26, scale: 0.85 }, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.15, duration: 1.0, ease: "back.out(1.4)" }, "<0.2")
          .to({}, { duration: 1.7 });
      });

      tl.to(`.cine-slide-${PROJECTS.length - 1}`, { autoAlpha: 0, scale: 0.96, filter: "blur(10px)", duration: 1.0, ease: "power2.in" })
        .fromTo(".cta-wrapper", { autoAlpha: 0, scale: 0.9, filter: "blur(24px)" }, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1.4, ease: "expo.out" }, "-=0.5")
        .to({}, { duration: 2.2 })
        .to(".cine-card", { yPercent: -120, duration: 1.5, ease: "power3.in" });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Recalculate pin measurements on resize.
  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    // Stable outer wrapper that React owns. GSAP's pin reparents the inner
    // container into a pin-spacer; keeping a wrapper React always removes
    // (whose parent GSAP never touches) avoids the "removeChild: not a child"
    // crash on route change.
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-bg font-sans text-fg antialiased"
        style={{ perspective: "1500px" }}
      >
        <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="cine-film-grain" aria-hidden="true" />
      <div className="cine-bg-grid pointer-events-none absolute inset-0 z-0 opacity-50" aria-hidden="true" />

      {/* Intro — the section identity */}
      <div className="cine-intro-wrap absolute z-10 flex w-full flex-col items-center px-4 text-center will-change-transform">
        <p className="cine-intro gsap-reveal mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-faint">
          03 — Selected work
        </p>
        <h2 className="cine-intro gsap-reveal cine-title font-display text-5xl font-extrabold tracking-tight md:text-7xl lg:text-[6rem]">
          Proof, not promises.
        </h2>
        <p className="cine-intro gsap-reveal mt-5 max-w-md text-fg-muted">
          Real systems in production — keep scrolling.
        </p>
      </div>

      {/* The pinned card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={cardRef}
          className="cine-card gsap-reveal relative flex h-[92vh] w-[92vw] items-center justify-center overflow-hidden rounded-[32px] pointer-events-auto md:h-[85vh] md:w-[85vw] md:rounded-[40px]"
        >
          <div className="cine-sheen" aria-hidden="true" />

          {/* Project slides */}
          {PROJECTS.map((p, i) => (
            <div
              key={p.name}
              className={`cine-slide cine-slide-${i} gsap-reveal absolute inset-0 flex items-center`}
            >
              {/* Faded backdrop wordmark */}
              <span
                aria-hidden="true"
                className="cine-wordmark pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap pr-4 text-[22vw] font-black uppercase tracking-tighter opacity-[0.06] lg:text-[16rem]"
              >
                {p.name}
              </span>

              <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-6 lg:grid-cols-2 lg:px-12">
                {/* Left: copy + metric */}
                <div className="order-2 text-center lg:order-1 lg:text-left">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue">
                    <span className="text-[#9fd2ff]/55">{p.index} / 0{PROJECTS.length}</span> · {p.tag}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-[#FAFAFA] md:text-3xl lg:text-[2.5rem] lg:leading-[1.1]">
                    {p.heading}
                  </h3>
                  <p className="mx-auto mt-4 hidden max-w-md text-sm leading-relaxed text-[#cfeaff]/80 md:block lg:mx-0 lg:text-base">
                    {p.description}
                  </p>

                  <div className="mt-7 flex items-center justify-center gap-5 lg:justify-start">
                    <div
                      className="flex items-baseline gap-1"
                      aria-label={`${p.metric.value}${p.metric.suffix} ${p.metric.label}`}
                    >
                      <span
                        className={`cine-counter-${i} font-display text-4xl font-extrabold tracking-tighter text-fg md:text-5xl`}
                        aria-hidden="true"
                      >
                        0
                      </span>
                      <span className="font-display text-3xl font-extrabold text-blue md:text-4xl" aria-hidden="true">{p.metric.suffix}</span>
                      <span className="ml-2 max-w-[7rem] text-left font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-fg-faint" aria-hidden="true">
                        {p.metric.label}
                      </span>
                    </div>
                  </div>

                  <a
                    href={p.href}
                    className="group mt-7 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg transition-colors hover:text-blue"
                  >
                    View case study
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

                {/* Right: framed screenshot + floating metric badges */}
                <div className="order-1 flex items-center justify-center lg:order-2" style={{ perspective: "1000px" }}>
                  <div className="relative w-full max-w-[440px]">
                    <div className="cine-screen relative aspect-[16/11] overflow-hidden rounded-[20px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={`${p.name} — ${p.heading}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="cine-screen-glare pointer-events-none absolute inset-0 z-20" aria-hidden="true" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04101d]/70 via-transparent to-transparent" />
                    </div>

                    <div className="cine-badge gsap-reveal absolute -left-4 -top-5 flex items-center gap-2.5 rounded-2xl px-4 py-3 lg:-left-12">
                      <span className="font-display text-base font-bold text-fg lg:text-lg">{p.badges[0].value}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#9fd2ff]/70">{p.badges[0].note}</span>
                    </div>
                    <div className="cine-badge gsap-reveal absolute -bottom-5 -right-4 flex items-center gap-2.5 rounded-2xl px-4 py-3 lg:-right-12">
                      <span className="font-display text-base font-bold text-fg lg:text-lg">{p.badges[1].value}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#9fd2ff]/70">{p.badges[1].note}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* CTA — uses the app's Button so it matches the rest of the site */}
          <div className="cta-wrapper gsap-reveal absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-faint">Real systems, real numbers</p>
            <h3 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl text-[#FAFAFA]">
              Want results like these?
            </h3>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">
              Production software and AI, shipped every week by a senior team.
            </p>
            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
              <Button href="/work" variant="primary" size="lg" className="group">
                Explore the work
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
              <Button href="/contact" variant="secondary" size="lg" className="group">
                Start a project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
