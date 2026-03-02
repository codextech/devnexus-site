"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Globe, BrainCircuit, Bot, Phone, Puzzle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const serviceDropdownItems = [
  {
    label: "Web & Mobile Development",
    description: "Node.js, React, Next.js, React Native — production-grade apps",
    href: "/services/web-and-mobile",
    icon: Globe,
  },
  {
    label: "AI Solutions",
    description: "RAG pipelines, automation & analytics dashboards",
    href: "/services/ai-solutions",
    icon: BrainCircuit,
  },
  {
    label: "Agentic AI Workflows",
    description: "Multi-agent orchestration for complex processes",
    href: "/services/agentic-ai",
    icon: Bot,
  },
  {
    label: "Voice AI Agents",
    description: "Conversational phone AI for sales & support",
    href: "/services/voice-ai",
    icon: Phone,
  },
  {
    label: "Jira Marketplace Apps",
    description: "Atlassian Forge apps & marketplace development",
    href: "/services/jira-apps",
    icon: Puzzle,
  },
];

const navLinks = [
  // { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  // { label: "Blog", href: "/blog" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 200);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="relative h-12 w-50 flex-shrink-0">
            {/* White logo — dark mode */}
            <Image
              src="/images/logo-word.svg"
              alt="DevNexus"
              fill
              className="object-contain object-left logo-dark-mode"
              priority
            />
            {/* Dark logo — light mode */}
            <Image
              src="/images/DevNexus-dark-logo.png"
              alt="DevNexus"
              fill
              className="object-contain object-left logo-light-mode"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Services Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-dark-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                Services
                {/* Pulsing indicator dot */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue" />
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[420px] rounded-2xl bg-dark-900/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden"
                  >
                    <div className="p-2">
                      {serviceDropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setServicesOpen(false)}
                          className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors duration-200"
                        >
                          <div className="mt-0.5 w-9 h-9 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue/20 transition-colors">
                            <item.icon className="w-4.5 h-4.5 text-brand-blue" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-dark-100 group-hover:text-white transition-colors">
                              {item.label}
                            </p>
                            <p className="text-xs text-dark-400 mt-0.5 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-white/5 p-3">
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-dark-400 hover:text-brand-blue hover:bg-white/5 transition-colors"
                      >
                        View all services
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other nav links */}
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
            >
              Contact
            </Link>

            <div className="ml-2 flex items-center gap-2">
              <ThemeToggle />
              <Button href="/contact" size="sm">
                Book a Call
              </Button>
            </div>
          </nav>

          {/* Mobile: theme toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              className="p-2 text-dark-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-dark-900/98 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <Container>
              <nav className="py-4 flex flex-col gap-0.5">
                {/* Services accordion */}
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full text-base font-medium text-dark-200 py-3 px-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    Services
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue" />
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-dark-400 transition-transform duration-200 ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pb-2 space-y-0.5">
                        {serviceDropdownItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 py-2.5 px-4 rounded-lg text-sm text-dark-300 hover:text-white hover:bg-white/5 transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            <item.icon className="w-4 h-4 text-brand-blue flex-shrink-0" />
                            {item.label}
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          className="flex items-center gap-3 py-2.5 px-4 rounded-lg text-sm text-brand-blue hover:bg-white/5 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          <ArrowRight className="w-4 h-4 flex-shrink-0" />
                          View all services
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-medium text-dark-200 hover:text-white transition-colors py-3 px-4 rounded-xl hover:bg-white/5"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <Link
                  href="/contact"
                  className="text-base font-medium text-dark-200 hover:text-white transition-colors py-3 px-4 rounded-xl hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact
                </Link>

                <div className="pt-4 mt-2 border-t border-white/5">
                  <Button
                    href="/contact"
                    className="w-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    Book a Call
                  </Button>
                </div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
