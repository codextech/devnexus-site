import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { CaseStudyMeta, BlogPostMeta } from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

export function getAllCaseStudies(): CaseStudyMeta[] {
  const dir = path.join(CONTENT_DIR, "case-studies");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return { ...data, slug: file.replace(".mdx", "") } as CaseStudyMeta;
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getCaseStudyBySlug(slug: string) {
  const filePath = path.join(CONTENT_DIR, "case-studies", `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as CaseStudyMeta, content };
}

export function getAllBlogPosts(): BlogPostMeta[] {
  const dir = path.join(CONTENT_DIR, "blog");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return { ...data, slug: file.replace(".mdx", "") } as BlogPostMeta;
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getBlogPostBySlug(slug: string) {
  const filePath = path.join(CONTENT_DIR, "blog", `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as BlogPostMeta, content };
}
