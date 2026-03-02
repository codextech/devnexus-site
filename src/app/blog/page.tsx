import type { Metadata } from "next";
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
            <div className="text-center py-12">
              <p className="text-lg text-dark-400">
                Blog posts coming soon. In the meantime, check out our{" "}
                <a
                  href="/work"
                  className="text-brand-blue hover:text-brand-blue-hover font-medium"
                >
                  case studies
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block p-6 rounded-2xl glass-card transition-all duration-300 hover:scale-[1.02]"
                >
                  <p className="text-xs text-dark-500 font-[family-name:var(--font-geist-mono)]">
                    {post.publishedAt} &middot; {post.readTime}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-white group-hover:text-brand-blue transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-dark-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                </a>
              ))}
            </div>
          )}
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
