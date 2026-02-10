export const SITE = {
  name: "DevNexus",
  url: "https://devnexus.co",
  description:
    "DevNexus builds production-grade web apps, AI solutions, voice agents, and Jira integrations. Battle-tested engineers. Transparent process. Real results.",
  email: "info@devnexus.co",
  social: {
    linkedin: "https://www.linkedin.com/company/devnexusconsulting",
    // github: "https://github.com/devnexus",
    x: "https://x.com/devnexus",
  },
} as const;

export const NAV_ITEMS = [
  { label: "Services", href: "/services" },
  // { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  // { label: "Blog", href: "/blog" },
] as const;

export const FOOTER_LINKS = {
  services: [
    { label: "Web & Mobile Development", href: "/services/web-and-mobile" },
    { label: "AI Solutions", href: "/services/ai-solutions" },
    { label: "Agentic AI Workflows", href: "/services/agentic-ai" },
    { label: "Voice AI Agents", href: "/services/voice-ai" },
    { label: "Jira Apps & Integrations", href: "/services/jira-apps" },
  ],
  company: [
    { label: "About", href: "/about" },
    // { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
