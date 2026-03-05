import type { ServiceData } from "@/types/services";

export const services: ServiceData[] = [
  {
    slug: "web-and-mobile",
    name: "Web & Mobile Development",
    headline: "Software Built to Ship — Web, Mobile & APIs",
    tagline:
      "From SaaS platforms to consumer mobile apps — we build JavaScript and Python products that perform at scale. Node.js, Next.js, React Native, and Python backends.",
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
          "We build with Next.js and Node.js for web, React Native for mobile, and Python for data-intensive backends. We choose the right tool for your product — not the trendiest one.",
      },
      {
        question: "How long does it take to build a web application?",
        answer:
          "A focused MVP takes 6-10 weeks from kickoff to launch. Full-featured SaaS products typically run 12-20 weeks. We scope tightly before starting so there are no surprises.",
      },
      {
        question: "How much does custom web development cost?",
        answer:
          "MVP projects start around $15,000-$30,000. Full-scale SaaS products range from $40,000-$120,000+ depending on complexity. We provide detailed fixed-scope estimates before any commitment.",
      },
      {
        question: "Can you work with our existing codebase?",
        answer:
          "Yes. We audit your codebase, identify issues, and either refactor or rebuild depending on what saves you more in the long run. We never push rebuilds when a targeted fix is the right answer.",
      },
      {
        question: "How do you handle project management?",
        answer:
          "Two-week sprints with a working demo at the end of each cycle. You see progress every 10 business days — no black boxes, no surprises at launch.",
      },
      {
        question: "Do you optimize for Core Web Vitals and SEO?",
        answer:
          "Yes — every project we ship is optimized for Lighthouse performance, Core Web Vitals, and technical SEO. Next.js gives us a strong foundation with SSR, image optimization, and structured data.",
      },
    ],
    cta: "Start Your Project",
    relatedCaseStudy: "agilepulse-jira-apps",
    metaTitle:
      "Next.js & React Native Development Agency | Web and Mobile Apps | DevNexus",
    metaDescription:
      "Next.js web app and React Native mobile development agency. We build full-stack products with Node.js, TypeScript, and PostgreSQL — from startup MVP to production-scale SaaS.",
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
          "Not necessarily. We help you identify what data you have, clean it, and determine what AI approach gives you the fastest ROI. Many projects start with publicly available data or small curated datasets.",
      },
      {
        question: "How much does custom AI development cost?",
        answer:
          "Proof-of-concept projects start around $10,000-$25,000. Production AI systems typically range from $30,000-$100,000+ depending on model complexity, data volume, and integration depth.",
      },
      {
        question: "How long does it take to implement an AI solution?",
        answer:
          "We deliver a working prototype in 2-3 weeks to validate the approach. A production-ready system takes 6-16 weeks depending on scope, data preparation, and integration requirements.",
      },
      {
        question: "How do you handle data privacy?",
        answer:
          "We can deploy models privately on your infrastructure or use SOC 2-compliant cloud providers. Your data never leaves your control — we design for compliance from day one.",
      },
      {
        question: "What is RAG and do I need it?",
        answer:
          "RAG (Retrieval-Augmented Generation) lets AI answer questions using your specific documents instead of generic training data. If your team spends time searching internal docs, SOPs, or knowledge bases — you need it.",
      },
      {
        question: "Can you integrate AI into our existing software?",
        answer:
          "Yes. We build AI layers that plug into your existing stack via APIs. You don't need to rebuild your product — we add intelligence on top of what you already have.",
      },
    ],
    cta: "Discuss Your AI Strategy",
    relatedCaseStudy: "tophealth-patient-intake",
    metaTitle: "RAG Pipeline & LLM Integration Development | Custom AI Solutions | DevNexus",
    metaDescription:
      "RAG pipeline development with LangChain and LlamaIndex. LLM integration for OpenAI, Anthropic, and AWS Bedrock. Custom AI automation and document intelligence — production-ready, not just demos.",
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
        question: "How is agentic AI different from a chatbot?",
        answer:
          "Chatbots respond to questions. Agents take action. Our agentic AI systems can call APIs, update databases, send emails, route tasks, and coordinate multi-step processes — all without a human in every loop.",
      },
      {
        question: "How much does agentic AI development cost?",
        answer:
          "Simple single-agent automations start around $15,000-$30,000. Complex multi-agent orchestration systems with integrations and safety guardrails range from $40,000-$150,000+.",
      },
      {
        question: "How long does it take to build an AI agent?",
        answer:
          "A focused single-agent workflow takes 4-8 weeks. Multi-agent systems with multiple integrations typically take 10-20 weeks, depending on the complexity of your processes and data.",
      },
      {
        question: "What about safety and control?",
        answer:
          "Every agent has defined tool boundaries, approval gates for high-risk actions, rate limiting, and full audit logging. We design human-in-the-loop escalation for any action that shouldn't be fully autonomous.",
      },
      {
        question: "Can agents work with our existing tools?",
        answer:
          "Yes. We build agents that integrate with your CRM, ERP, Slack, ticketing system, or any platform with an API. We've connected agents to Salesforce, HubSpot, Jira, Notion, and custom internal systems.",
      },
      {
        question: "What industries use agentic AI workflows?",
        answer:
          "Healthcare (patient intake, triage), financial services (document processing, compliance), SaaS (customer onboarding, support), e-commerce (order management), and any business with repetitive multi-step processes.",
      },
    ],
    cta: "Build Your AI Agents",
    relatedCaseStudy: "vapi-voice-ai-outreach-agent",
    metaTitle:
      "Agentic AI Development Company | Autonomous Workflow Agents | DevNexus",
    metaDescription:
      "Build autonomous AI agents that execute multi-step workflows, call APIs, and make decisions — without a human in every loop. Multi-agent orchestration built for production.",
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
        question: "How much does a voice AI agent cost?",
        answer:
          "A focused inbound voice agent (single use case) starts at $12,000-$25,000. Full deployments with CRM integration, multi-scenario handling, and analytics dashboards range from $30,000-$80,000+.",
      },
      {
        question: "How long does it take to build and deploy a voice AI agent?",
        answer:
          "A focused voice agent goes from scoping to live calls in 4-8 weeks. Complex deployments with multiple call flows, integrations, and multi-language support take 8-16 weeks.",
      },
      {
        question: "What is the difference between IVR and voice AI?",
        answer:
          "Traditional IVR is rigid — press 1 for sales, press 2 for support. Voice AI understands natural speech, handles open-ended conversations, takes action in real time, and improves with usage. It's a fundamentally different experience.",
      },
      {
        question: "Do callers know they are talking to AI?",
        answer:
          "We design agents that are transparent when required and natural-sounding always. Disclosure requirements vary by industry and jurisdiction — we design for compliance from day one.",
      },
      {
        question: "Can the voice agent transfer to a human?",
        answer:
          "Yes, smart escalation is built in. The agent transfers with full context — call summary, intent, and sentiment — so the human never starts from scratch.",
      },
      {
        question: "Can voice AI agents make outbound calls?",
        answer:
          "Yes. We build outbound voice agents for lead qualification, appointment reminders, payment follow-up, and survey collection at scale.",
      },
    ],
    cta: "Launch Your Voice Agent",
    relatedCaseStudy: "vapi-voice-ai-outreach-agent",
    metaTitle: "Voice AI Agent Development | Phone AI for Sales & Support | DevNexus",
    metaDescription:
      "Custom voice AI agents that handle inbound and outbound calls 24/7. Lead qualification, appointment booking, and support automation — built on Vapi, ElevenLabs, and Twilio.",
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
        question: "How long does Atlassian Marketplace certification take?",
        answer:
          "Atlassian's certification review typically takes 4-8 weeks after submission. We prepare your app to pass first review — our AgilePulse apps achieved Marketplace certification on the first submission.",
      },
      {
        question: "What is the difference between Forge and Connect for Jira apps?",
        answer:
          "Forge is Atlassian's modern, serverless platform with tighter security and better Marketplace visibility. Connect is the older, self-hosted approach. We build on Forge for all new apps and migrate existing Connect apps when it makes sense.",
      },
      {
        question: "How much does a Jira app cost to build?",
        answer:
          "A focused Jira integration or automation takes $8,000-$20,000. A full Forge app built for Marketplace listing typically costs $20,000-$60,000+ depending on feature scope and integration complexity.",
      },
      {
        question: "Can you build for both Cloud and Data Center?",
        answer:
          "Yes. We build for Jira Cloud using Forge and for Data Center when on-premise is required. We scope the right platform based on your customer base.",
      },
      {
        question: "Will our app be listed on the Atlassian Marketplace?",
        answer:
          "If that is your goal, yes. We handle the full lifecycle — development, security review, Marketplace submission, certification, and listing optimization.",
      },
      {
        question: "Can you build private Jira apps for internal use only?",
        answer:
          "Absolutely. Private Forge apps don't require Marketplace certification and can be deployed directly to your Jira instance. This is the fastest path for internal workflow automation.",
      },
    ],
    cta: "Get Your Jira App Built",
    relatedCaseStudy: "agilepulse-jira-apps",
    metaTitle:
      "Jira App Development Company | Atlassian Forge & Marketplace | DevNexus",
    metaDescription:
      "Custom Jira apps built on Atlassian Forge — Marketplace-certified, Cloud and Data Center ready. Workflow automation, integrations, and private apps for your team.",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
