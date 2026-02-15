import type { ServiceData } from "@/types/services";

export const services: ServiceData[] = [
  {
    slug: "web-and-mobile",
    name: "Web & Mobile Development",
    headline: "Web & Mobile Applications Built to Ship",
    tagline:
      "From SaaS dashboards to consumer mobile apps — we build Python and JavaScript products that perform under real-world load.",
    problem:
      "Your team has a validated idea but not the engineering capacity to build it right the first time. Missed deadlines, scaling issues, and technical debt pile up when the foundation is wrong.",
    deliverables: [
      "Full-stack web applications (Next.js, Node.js, PostgreSQL)",
      "Cross-platform mobile apps (React Native / Expo)",
      "API design and third-party integrations",
      "Performance optimization and Core Web Vitals tuning",
      "CI/CD pipelines and infrastructure setup",
      "Ongoing maintenance and feature development",
    ],
    techStack: [
      "Next.js",
      "React",
      "React Native",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "AWS",
      "Vercel",
      "Tailwind CSS",
    ],
    process: [
      {
        title: "Discovery",
        description:
          "We map your requirements, users, and constraints in a focused one-week sprint.",
      },
      {
        title: "Architecture & Design",
        description:
          "We design the system, data models, and UI before writing production code.",
      },
      {
        title: "Sprint-based Build",
        description:
          "Two-week sprints with working demos you can touch every cycle.",
      },
      {
        title: "Launch & Handoff",
        description:
          "We deploy, document, and hand off with full knowledge transfer.",
      },
    ],
    faqs: [
      {
        question: "What frameworks do you use?",
        answer:
          "We standardize on Next.js for web and React Native for mobile. Both are production-proven and backed by large ecosystems.",
      },
      {
        question: "Can you work with our existing codebase?",
        answer:
          "Yes. We audit your codebase, identify issues, and either refactor or rebuild depending on what saves you more in the long run.",
      },
      {
        question: "How do you handle project management?",
        answer:
          "Two-week sprints with a working demo at the end of each cycle. You see progress every 10 business days.",
      },
    ],
    cta: "Start Your Project",
    relatedCaseStudy: "nexaform-jira-test-management",
    metaTitle:
      "Web & Mobile Development | Next.js, React Native & Python APIs | DevNexus",
    metaDescription:
      "Production-grade web and mobile applications built with Next.js, React, React Native, and Python backends. Expert engineers, transparent process, two-week sprint cycles.",
  },
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    headline: "AI Solutions That Actually Work in Production",
    tagline:
      "Custom automation, RAG systems, and analytics that turn your data into decisions — not just dashboards.",
    problem:
      "You have data but no way to act on it at speed. Manual processes eat your team's time, and off-the-shelf AI tools never quite fit your domain.",
    deliverables: [
      "Retrieval-Augmented Generation (RAG) pipelines",
      "Custom LLM fine-tuning and prompt engineering",
      "Automated data processing and ETL workflows",
      "AI-powered analytics dashboards",
      "Document intelligence and extraction systems",
      "Model evaluation and monitoring infrastructure",
    ],
    techStack: [
      "Python",
      "LangChain",
      "OpenAI",
      "Anthropic",
      "Pinecone",
      "PostgreSQL",
      "pgvector",
      "AWS Bedrock",
      "Next.js",
    ],
    process: [
      {
        title: "Data Audit",
        description:
          "We assess your data landscape and identify the highest-ROI AI opportunities.",
      },
      {
        title: "Prototype",
        description:
          "A working proof-of-concept in 2-3 weeks to validate the approach before scaling.",
      },
      {
        title: "Production Build",
        description:
          "Enterprise-grade implementation with monitoring, guardrails, and testing.",
      },
      {
        title: "Iterate & Optimize",
        description:
          "Continuous model evaluation and improvement based on real-world performance.",
      },
    ],
    faqs: [
      {
        question: "Do we need our own data to get started?",
        answer:
          "Not necessarily. We help you identify what data you have, clean it, and determine what AI approach gives you the fastest ROI.",
      },
      {
        question: "How do you handle data privacy?",
        answer:
          "We can deploy models privately on your infrastructure or use SOC 2-compliant cloud providers. Your data never leaves your control.",
      },
      {
        question: "What is RAG and do I need it?",
        answer:
          "RAG lets AI answer questions using your specific documents instead of generic training data. If your team spends time searching internal docs, you likely need it.",
      },
    ],
    cta: "Discuss Your AI Strategy",
    relatedCaseStudy: "healthbridge-patient-intake",
    metaTitle: "AI Solutions | RAG, Automation & Analytics | DevNexus",
    metaDescription:
      "Custom AI solutions including RAG pipelines, LLM integration, automated workflows, and analytics dashboards. Production-ready AI that fits your business.",
  },
  {
    slug: "agentic-ai",
    name: "Agentic AI Workflows",
    headline: "Agentic AI That Handles the Work, Not Just the Chat",
    tagline:
      "Autonomous AI agents that execute multi-step workflows, make decisions, and escalate only when they should.",
    problem:
      "Chatbots answer questions. Your business needs agents that take action — processing orders, triaging tickets, coordinating across systems — without a human in every loop.",
    deliverables: [
      "Multi-agent orchestration systems",
      "Tool-calling agents with API integrations",
      "Human-in-the-loop escalation design",
      "Agent evaluation and safety guardrails",
      "Workflow automation across business systems",
      "Custom agent frameworks built on your infrastructure",
    ],
    techStack: [
      "LangGraph",
      "CrewAI",
      "OpenAI",
      "Anthropic Claude",
      "Node.js",
      "Python",
      "Custom Orchestration",
    ],
    process: [
      {
        title: "Workflow Mapping",
        description:
          "We document the processes your agents will handle, including edge cases and escalation rules.",
      },
      {
        title: "Agent Design",
        description:
          "Define agent responsibilities, tool access, safety boundaries, and approval gates.",
      },
      {
        title: "Build & Test",
        description:
          "Iterative development with comprehensive evaluation suites and human review.",
      },
      {
        title: "Deploy & Monitor",
        description:
          "Production deployment with full audit logging, performance tracking, and drift detection.",
      },
    ],
    faqs: [
      {
        question: "How is this different from a chatbot?",
        answer:
          "Chatbots respond. Agents act. Our agents can call APIs, update databases, send emails, and coordinate multi-step processes autonomously.",
      },
      {
        question: "What about safety and control?",
        answer:
          "Every agent has defined boundaries, approval gates for high-risk actions, and full audit logging. You stay in control.",
      },
      {
        question: "Can agents work with our existing tools?",
        answer:
          "Yes. We build agents that integrate with your CRM, ERP, ticketing system, or any tool with an API.",
      },
    ],
    cta: "Build Your AI Agents",
    relatedCaseStudy: "logitrack-freight-dispatch",
    metaTitle:
      "Agentic AI Workflows | Autonomous Agent Development | DevNexus",
    metaDescription:
      "Custom agentic AI systems that execute multi-step workflows autonomously. Multi-agent orchestration, tool integration, and human-in-the-loop design.",
  },
  {
    slug: "voice-ai",
    name: "Voice AI Agents",
    headline: "Voice AI Agents That Sound Like Your Best Employee",
    tagline:
      "Phone-based AI agents that handle inbound calls, qualify leads, book appointments, and resolve support tickets — 24/7.",
    problem:
      "Your phone lines are a bottleneck. Customers wait on hold, leads go cold overnight, and staffing a 24/7 call center costs more than the revenue it protects.",
    deliverables: [
      "Inbound voice agent design and deployment",
      "Outbound campaign automation",
      "Real-time speech-to-text and intent recognition",
      "CRM and calendar integration",
      "Call analytics and sentiment dashboards",
      "Multi-language support",
    ],
    techStack: [
      "Vapi",
      "Twilio",
      "ElevenLabs",
      "Deepgram",
      "OpenAI",
      "Node.js",
      "WebSockets",
    ],
    process: [
      {
        title: "Script Design",
        description:
          "We design conversation flows, personas, and escalation paths based on your call data.",
      },
      {
        title: "Voice Build",
        description:
          "Build the voice agent with natural speech patterns, intent handling, and integrations.",
      },
      {
        title: "Testing",
        description:
          "Rigorous testing with edge cases, accents, background noise, and adversarial inputs.",
      },
      {
        title: "Launch & Tune",
        description:
          "Go live with real calls and continuously improve based on conversation analytics.",
      },
    ],
    faqs: [
      {
        question: "Do callers know they are talking to AI?",
        answer:
          "We design agents that are transparent when required and natural-sounding always. Disclosure depends on your industry and compliance requirements.",
      },
      {
        question: "Can the voice agent transfer to a human?",
        answer:
          "Absolutely. Smart escalation is built in. The agent transfers with full context so the human never starts from scratch.",
      },
      {
        question: "What languages are supported?",
        answer:
          "English natively, with support for Spanish, French, German, and others depending on the voice model.",
      },
    ],
    cta: "Launch Your Voice Agent",
    relatedCaseStudy: "logitrack-freight-dispatch",
    metaTitle: "Voice AI Agents | Phone AI for Sales & Support | DevNexus",
    metaDescription:
      "AI-powered voice agents that handle phone calls 24/7. Lead qualification, appointment booking, and customer support — automated with natural conversation.",
  },
  {
    slug: "jira-apps",
    name: "Jira Apps & Integrations",
    headline: "Jira Apps That Make Your Workflows Disappear",
    tagline:
      "Custom Atlassian Marketplace apps and integrations that eliminate the manual steps your team works around every day.",
    problem:
      "Jira does a lot, but it does not do everything your team needs. You end up with spreadsheets, manual copy-paste, and workarounds that slow everyone down.",
    deliverables: [
      "Atlassian Marketplace-ready Forge apps",
      "Custom Jira Cloud and Data Center plugins",
      "Jira-to-CRM / ERP / DevOps integrations",
      "Automated workflows and custom fields",
      "Migration from Server to Cloud",
      "Marketplace listing and certification support",
    ],
    techStack: [
      "Atlassian Forge",
      "Jira REST API",
      "Confluence API",
      "Node.js",
      "React",
      "PostgreSQL",
    ],
    process: [
      {
        title: "Requirements & Feasibility",
        description:
          "We assess what Atlassian's platform supports and design within those capabilities.",
      },
      {
        title: "Build on Forge",
        description:
          "Development on Atlassian's modern Forge platform for maximum compatibility.",
      },
      {
        title: "Security Review",
        description:
          "Internal security review aligned with Atlassian's Marketplace certification requirements.",
      },
      {
        title: "Certification & Launch",
        description:
          "Handle Marketplace submission, certification, and listing optimization.",
      },
    ],
    faqs: [
      {
        question: "Can you build for both Cloud and Data Center?",
        answer:
          "Yes. We build for Jira Cloud using Forge and for Data Center when on-premise is required.",
      },
      {
        question: "Will our app be listed on the Atlassian Marketplace?",
        answer:
          "If that is your goal, yes. We handle the full lifecycle from development through Marketplace certification and listing.",
      },
      {
        question: "How long does a typical Jira app take to build?",
        answer:
          "A focused integration takes 4-8 weeks. A full Marketplace app is typically 8-16 weeks depending on complexity.",
      },
    ],
    cta: "Get Your Jira App Built",
    relatedCaseStudy: "nexaform-jira-test-management",
    metaTitle:
      "Jira Apps & Integrations | Atlassian Forge Developer | DevNexus",
    metaDescription:
      "Custom Jira apps and Atlassian integrations. Forge development, Marketplace certification, and workflow automation for Jira Cloud and Data Center.",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
