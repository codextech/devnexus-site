import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SITE, FOOTER_LINKS } from "@/lib/constants";

const socials = [
  {
    label: "LinkedIn",
    href: SITE.social.linkedin,
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "X (Twitter)",
    href: SITE.social.x,
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Instagram",
    href: SITE.social.instagram,
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
];

function ColHeader({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
      {children}
    </h4>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <Container>
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-12 md:gap-8 md:py-20">
          {/* Brand */}
          <div className="md:col-span-4">
            <p className="font-display text-xl font-bold tracking-[-0.02em] text-fg">
              DevNexus
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              Production software and AI, built by a senior team that ships every
              week. Transparent process, real results.
            </p>
            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue transition-colors"
            >
              Start a project
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <ColHeader>Services</ColHeader>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <ColHeader>Company</ColHeader>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-3">
            <ColHeader>Connect</ColHeader>
            <div className="space-y-2.5">
              <a
                href={`mailto:${SITE.email}`}
                className="block text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {SITE.email}
              </a>
              <p className="text-sm text-fg-faint">{SITE.phone}</p>
            </div>
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-border text-fg-muted transition-colors hover:border-border-hi hover:text-fg"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Oversized wordmark baseline */}
      <div className="overflow-hidden border-t border-border" aria-hidden="true">
        <Container>
          <span className="block select-none whitespace-nowrap py-6 font-display text-[18vw] font-bold leading-none tracking-[-0.04em] text-fg/[0.045]">
            DEVNEXUS
          </span>
        </Container>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <Container>
          <div className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-faint">
              &copy; {new Date().getFullYear()} DevNexus — All rights reserved
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-faint">
              Web · Mobile · AI
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
