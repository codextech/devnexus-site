import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { CTABanner } from "@/components/blocks/cta-banner";
import { CaseStudyBody } from "@/components/sections/case-study-body";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getBlogPostBySlug(slug);
    return createMetadata({
      title: frontmatter.title,
      description: frontmatter.excerpt,
      path: `/blog/${slug}`,
      image: `https://www.devnexus.co/og?title=${encodeURIComponent(frontmatter.title)}&type=blog`,
    });
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let data;
  try {
    data = getBlogPostBySlug(slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = data;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: frontmatter.title,
              description: frontmatter.excerpt,
              url: `${SITE.url}/blog/${slug}`,
              publishedAt: frontmatter.publishedAt,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE.url },
              { name: "Blog", url: `${SITE.url}/blog` },
              { name: frontmatter.title, url: `${SITE.url}/blog/${slug}` },
            ])
          ),
        }}
      />

      <section className="bg-dark-900 pt-32 pb-16 md:pt-40 md:pb-20 border-b border-white/5 relative">
        <div className="absolute inset-0 section-gradient" />
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-dark-500 font-[family-name:var(--font-geist-mono)]">
              {formatDate(frontmatter.publishedAt)} &middot;{" "}
              {frontmatter.readTime}
            </p>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              {frontmatter.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-dark-400">
              {frontmatter.excerpt}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <CaseStudyBody content={content} />
          </div>
        </Container>
      </section>

      <CTABanner
        title="Want to Discuss This Topic?"
        ctaLabel="Talk to Us"
      />
    </>
  );
}
