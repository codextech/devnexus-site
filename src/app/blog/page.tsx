import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/metadata";
import { getAllBlogPosts } from "@/lib/content";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Blog | Insights on Software, AI & Engineering",
  description:
    "Technical insights, industry perspectives, and engineering best practices from the DevNexus team.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE.url },
              { name: "Blog", url: `${SITE.url}/blog` },
            ])
          ),
        }}
      />
      {posts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              itemListSchema(
                posts.map((post, i) => ({
                  position: i + 1,
                  name: post.title,
                  url: `${SITE.url}/blog/${post.slug}`,
                }))
              )
            ),
          }}
        />
      )}

      <Hero
        eyebrow="Blog"
        title="Insights & Ideas"
        subtitle="Technical insights, industry perspectives, and engineering best practices from our team."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />

      <section className="py-16 md:py-24 lg:py-32">
        <Container>
          {posts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg text-fg-muted">
                Blog posts coming soon. In the meantime, check out our{" "}
                <Link
                  href="/work"
                  className="font-medium text-blue hover:text-blue-press"
                >
                  case studies
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-[14px] border border-border bg-surface p-6 transition-colors hover:border-border-hi"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-faint">
                    {post.publishedAt} &middot; {post.readTime}
                  </p>
                  <h2 className="mt-3 font-display text-lg font-bold text-fg transition-colors group-hover:text-blue">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
