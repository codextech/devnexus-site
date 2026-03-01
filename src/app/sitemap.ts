import { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getAllCaseStudies, getAllBlogPosts } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/services",
    "/services/web-and-mobile",
    "/services/ai-solutions",
    "/services/agentic-ai",
    "/services/voice-ai",
    "/services/jira-apps",
    "/work",
    "/about",
    "/contact",
    "/blog",
  ].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : route.startsWith("/services") ? 0.9 : 0.8,
  }));

  const caseStudies = getAllCaseStudies().map((cs) => ({
    url: `${SITE.url}/work/${cs.slug}`,
    lastModified: new Date(cs.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const blogPosts = getAllBlogPosts().map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseStudies, ...blogPosts];
}
