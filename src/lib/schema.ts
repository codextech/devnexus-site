import { SITE } from "./constants";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/logo.svg`,
    sameAs: [SITE.social.linkedin, SITE.social.github, SITE.social.x].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: { "@type": "Organization", name: SITE.name },
    name: service.name,
    description: service.description,
    url: service.url,
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  modifiedAt?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    image: article.image || `${SITE.url}/og/home.png`,
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/images/logo.svg`,
      },
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/logo.svg`,
    email: SITE.email,
    description:
      "DevNexus is a full-service software development company specializing in JavaScript, Node.js, Python, web & mobile apps, AI solutions, agentic workflows, voice AI agents, and Jira app development.",
    sameAs: [SITE.social.linkedin, SITE.social.x],
    areaServed: "Worldwide",
    serviceType: [
      "Web Application Development",
      "Mobile App Development",
      "AI Solutions Development",
      "Agentic AI Workflow Development",
      "Voice AI Agent Development",
      "Jira App Development",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Development Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web & Mobile Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Solutions" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Agentic AI Workflows" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Voice AI Agents" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Jira Apps & Integrations" } },
      ],
    },
  };
}

export function itemListSchema(items: { name: string; url: string; position: number }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  };
}
