"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  BrainCircuit,
  Bot,
  Phone,
  Puzzle,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const serviceItems = [
  { label: "Web & Mobile Development", code: "WEB · MOBILE", href: "/services/web-and-mobile", icon: Globe },
  { label: "AI Solutions", code: "RAG · AUTOMATION", href: "/services/ai-solutions", icon: BrainCircuit },
  { label: "Agentic AI Workflows", code: "AGENTS", href: "/services/agentic-ai", icon: Bot },
  { label: "Voice AI Agents", code: "VOICE", href: "/services/voice-ai", icon: Phone },
  { label: "Jira Apps & Integrations", code: "ATLASSIAN", href: "/services/jira-apps", icon: Puzzle },
];

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const servicesActive = pathname.startsWith("/services");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between md:h-[72px]">
          {/* Logo */}
          <Link href="/" className="relative h-9 w-44 flex-shrink-0">
            <Image
              src="/images/logo-word.svg"
              alt="DevNexus"
              fill
              className="logo-dark-mode object-contain object-left"
              priority
            />
            <Image
              src="/images/DevNexus-dark-logo.png"
              alt="DevNexus"
              fill
              className="logo-light-mode object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {/* Services dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                setServicesOpen(true);
              }}
              onMouseLeave={() => {
                timeoutRef.current = setTimeout(() => setServicesOpen(false), 180);
              }}
            >
              <Link
                href="/services"
                className={cn(
                  "relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors",
                  servicesActive ? "text-fg" : "text-fg-muted hover:text-fg",
                )}
              >
                Services
                <ChevronDown
                  className={cn("h-3.5 w-3.5 transition-transform duration-200", servicesOpen && "rotate-180")}
                />
                {servicesActive ? (
                  <motion.span
                    layoutId="nav-tick"
                    className="absolute -bottom-px left-3 right-3 h-px bg-blue"
                  />
                ) : null}
              </Link>

              <AnimatePresence>
                {servicesOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-1/2 top-full w-[380px] -translate-x-1/2 pt-3"
                  >
                    <div className="overflow-hidden rounded-[14px] border border-border bg-surface shadow-xl shadow-black/20">
                      <div className="p-2">
                        {serviceItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setServicesOpen(false)}
                            className="group flex items-center gap-3 rounded-[10px] px-3 py-2.5 transition-colors hover:bg-surface-2"
                          >
                            <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[8px] border border-border text-fg-muted transition-colors group-hover:border-border-hi group-hover:text-blue">
                              <item.icon className="h-4 w-4" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-medium text-fg">{item.label}</span>
                              <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">
                                {item.code}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center justify-between border-t border-border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-faint transition-colors hover:text-blue"
                      >
                        View all services
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {navLinks.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors",
                    active ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {item.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-tick"
                      className="absolute -bottom-px left-3 right-3 h-px bg-blue"
                    />
                  ) : null}
                </Link>
              );
            })}

            <div className="ml-2 flex items-center gap-2">
              <ThemeToggle />
              <Button href="/contact" size="sm">
                Book a call
              </Button>
            </div>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-fg-muted transition-colors hover:text-fg"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-border bg-bg lg:hidden"
          >
            <Container>
              <nav className="flex flex-col py-4">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between py-3 text-base font-medium text-fg"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-fg-faint">01</span>
                    Services
                  </span>
                  <ChevronDown
                    className={cn("h-4 w-4 text-fg-faint transition-transform", mobileServicesOpen && "rotate-180")}
                  />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-0.5 border-l border-border pb-2 pl-4">
                        {serviceItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 py-2.5 text-sm text-fg-muted transition-colors hover:text-fg"
                          >
                            <item.icon className="h-4 w-4 flex-shrink-0 text-blue" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {navLinks.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 border-t border-border py-3 text-base font-medium text-fg"
                  >
                    <span className="font-mono text-[11px] text-fg-faint">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    {item.label}
                  </Link>
                ))}

                <div className="mt-4 border-t border-border pt-4">
                  <Button href="/contact" className="w-full" onClick={() => setMobileOpen(false)}>
                    Book a call
                  </Button>
                </div>
              </nav>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
