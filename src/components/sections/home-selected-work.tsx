"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Quote, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Metric } from "@/components/ui/metric";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";

const compact = [
  {
    href: "/work/agilepulse-jira-apps",
    image: "/images/work/agilepulse.jpg",
    meta: "AgilePulse · Jira Apps",
    title: "Planning Poker & agile apps, certified first try",
    tags: ["3,000+ installs", "4.7★", "1st-try cert"],
  },
  {
    href: "/work/vapi-voice-ai-outreach-agent",
    image: "/images/work/vapi.jpg",
    meta: "DevNexus · Voice AI",
    title: "An autonomous voice agent that runs outreach",
    tags: ["200+ calls/day", "91% qualified", "85% time saved"],
  },
];

export function SelectedWorkSection() {
  return (
    <section className="bg-bg py-24 md:py-32">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          title="Proof, not promises."
          subtitle="Real systems in production — with the numbers to show for it."
          align="left"
        />

        {/* Featured */}
        <motion.div {...fadeUp} className="mt-12">
          <Link
            href="/work/tophealth-patient-intake"
            className="group grid overflow-hidden rounded-[14px] border border-border bg-surface transition-colors hover:border-border-hi lg:grid-cols-2"
          >
            <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[440px]">
              <Image
                src="/images/work/tophealth.jpg"
                alt="TopHealth AI patient intake system"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent lg:bg-gradient-to-r" />
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur">
                Healthcare
              </span>
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                View case study <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>

            <div className="flex flex-col justify-center gap-7 p-8 md:p-10">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-faint">
                  TopHealth AI
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.01em] text-fg md:text-[1.75rem]">
                  AI-powered patient intake, 68% faster
                </h3>
                <p className="mt-3 max-w-md text-fg-muted">
                  Insurance-card extraction and EHR integration across 23 urgent-care
                  clinics — built on Next.js, Python, and HL7 FHIR.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <Metric value={68} suffix="%" label="faster intake" size="sm" />
                <Metric value={340} prefix="$" suffix="K" label="/ yr saved" size="sm" />
                <Metric value={94} suffix="%" label="accuracy" size="sm" />
              </div>

              <blockquote className="rounded-[12px] border border-border bg-surface-2/60 p-5 backdrop-blur">
                <Quote className="h-4 w-4 text-blue" />
                <p className="mt-2 text-sm italic leading-relaxed text-fg-muted">
                  Our front desk staff went from data entry clerks to patient advocates.
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-faint">
                  — Lina, Founder
                </p>
              </blockquote>
            </div>
          </Link>
        </motion.div>

        {/* Compact pair */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {compact.map((c) => (
            <motion.div key={c.href} {...fadeUp}>
              <Link
                href={c.href}
                className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-border bg-surface transition-colors hover:border-border-hi"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-faint">
                    {c.meta}
                  </span>
                  <h4 className="mt-2 font-display text-lg font-medium text-fg">{c.title}</h4>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <Button href="/work" variant="link" className="group/btn px-0 text-[15px]">
            View all case studies
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
