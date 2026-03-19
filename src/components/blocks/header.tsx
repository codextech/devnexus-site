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

interface NavItem {
  label: string;
  href: string;
  isDropdown?: boolean;
}

const navItems: NavItem[] = [
  { label: "Services", href: "/services", isDropdown: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/services") return pathname.startsWith("/services");
  return pathname === href;
}

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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
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
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "header-scrolled"
          : "bg-transparent",
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="relative h-12 w-50 flex-shrink-0">
            <Image
              src="/images/logo-word.svg"
              alt="DevNexus"
              fill
              className="object-contain object-left logo-dark-mode"
              priority
            />
            <Image
              src="/images/DevNexus-dark-logo.png"
              alt="DevNexus"
              fill
              className="object-contain object-left logo-light-mode"
              priority
            />
          </Link>

          {/* ── Desktop: Tubelight Nav ── */}
          <nav className="hidden lg:flex items-center gap-3">
            {/* Pill container */}
            <div className="flex items-center gap-0.5 tubelight-pill py-1 px-1 rounded-full">
              {navItems.map((item) => {
                const isActive = isActiveRoute(pathname, item.href);

                if (item.isDropdown) {
                  return (
                    <div
                      key={item.label}
                      ref={dropdownRef}
                      className="relative"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className={cn(
                          "relative flex items-center gap-1.5 px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-200 cursor-pointer",
                          "tubelight-link",
                          isActive && "tubelight-link-active",
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200",
                            servicesOpen && "rotate-180",
                          )}
                        />
                        {isActive && (
                          <motion.div
                            layoutId="tubelight"
                            className="absolute inset-0 w-full tubelight-active-bg rounded-full -z-10"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              damping: 30,
                            }}
                          >
                            {/* Lamp glow bar */}
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-brand-blue rounded-t-full">
                              <div className="absolute w-12 h-6 bg-brand-blue/20 rounded-full blur-md -top-2 -left-2" />
                              <div className="absolute w-8 h-6 bg-brand-blue/20 rounded-full blur-md -top-1" />
                              <div className="absolute w-4 h-4 bg-brand-blue/20 rounded-full blur-sm top-0 left-2" />
                            </div>
                          </motion.div>
                        )}
                      </button>

                      {/* Services Dropdown */}
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[420px] rounded-2xl header-dropdown border shadow-2xl shadow-black/40 overflow-hidden"
                          >
                            <div className="p-2">
                              {serviceDropdownItems.map((dropItem) => (
                                <Link
                                  key={dropItem.href}
                                  href={dropItem.href}
                                  onClick={() => setServicesOpen(false)}
                                  className="group flex items-start gap-4 p-3 rounded-xl header-dropdown-item transition-colors duration-200"
                                >
                                  <div className="mt-0.5 w-9 h-9 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue/20 transition-colors">
                                    <dropItem.icon className="w-4.5 h-4.5 text-brand-blue" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium header-dropdown-label transition-colors">
                                      {dropItem.label}
                                    </p>
                                    <p className="text-xs header-dropdown-desc mt-0.5 leading-relaxed">
                                      {dropItem.description}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>

                            <div className="header-dropdown-footer p-3">
                              <Link
                                href="/services"
                                onClick={() => setServicesOpen(false)}
                                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium header-dropdown-all transition-colors"
                              >
                                View all services
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "relative px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-200",
                      "tubelight-link",
                      isActive && "tubelight-link-active",
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="tubelight"
                        className="absolute inset-0 w-full tubelight-active-bg rounded-full -z-10"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-brand-blue rounded-t-full">
                          <div className="absolute w-12 h-6 bg-brand-blue/20 rounded-full blur-md -top-2 -left-2" />
                          <div className="absolute w-8 h-6 bg-brand-blue/20 rounded-full blur-md -top-1" />
                          <div className="absolute w-4 h-4 bg-brand-blue/20 rounded-full blur-sm top-0 left-2" />
                        </div>
                      </motion.div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side: theme toggle + CTA */}
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
              className="p-2 header-mobile-toggle rounded-lg transition-colors cursor-pointer"
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
            className="lg:hidden header-mobile-menu overflow-hidden"
          >
            <Container>
              <nav className="py-4 flex flex-col gap-0.5">
                {/* Services accordion */}
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={cn(
                    "flex items-center justify-between w-full text-base font-medium py-3 px-4 rounded-xl transition-colors cursor-pointer",
                    "header-mobile-link",
                    pathname.startsWith("/services") && "header-mobile-link-active",
                  )}
                >
                  <span className="flex items-center gap-2">Services</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 header-mobile-chevron transition-transform duration-200",
                      mobileServicesOpen && "rotate-180",
                    )}
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
                            className="flex items-center gap-3 py-2.5 px-4 rounded-lg text-sm header-mobile-sub-link transition-colors"
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

                {navItems
                  .filter((item) => !item.isDropdown)
                  .map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-base font-medium transition-colors py-3 px-4 rounded-xl",
                        "header-mobile-link",
                        pathname === item.href && "header-mobile-link-active",
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}

                <div className="pt-4 mt-2 border-t header-mobile-divider">
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
    </motion.header>
  );
}
