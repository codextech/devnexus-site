export type CaseStudyMeta = {
  title: string;
  slug: string;
  client: string;
  industry: string;
  services: string[];
  thumbnail: string;
  duration: string;
  teamSize: string;
  excerpt: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  publishedAt: string;
};

export type BlogPostMeta = {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  image: string;
};
