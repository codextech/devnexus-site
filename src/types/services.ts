export type ServiceData = {
  slug: string;
  name: string;
  tagline: string;
  headline: string;
  problem: string;
  deliverables: string[];
  techStack: string[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  cta: string;
  relatedCaseStudy?: string;
  metaTitle: string;
  metaDescription: string;
};
