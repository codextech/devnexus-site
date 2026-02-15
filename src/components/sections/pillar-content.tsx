import Link from "next/link";
import { Container } from "@/components/ui/container";

type PillarContentSectionProps = {
  title: string;
  intro: string;
  topicClusters: Array<{
    title: string;
    description: string;
  }>;
  relatedLinks: Array<{
    href: string;
    label: string;
  }>;
};

export function PillarContentSection({
  title,
  intro,
  topicClusters,
  relatedLinks,
}: PillarContentSectionProps) {
  return (
    <section className="py-16 md:py-24 border-y border-white/5 relative">
      <div className="absolute inset-0 bg-dark-900/30" />
      <Container className="relative z-10">
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            {title}
          </h2>
          <p className="text-dark-300 leading-relaxed mb-10">{intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {topicClusters.map((cluster) => (
            <article
              key={cluster.title}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {cluster.title}
              </h3>
              <p className="text-dark-300 leading-relaxed">{cluster.description}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {relatedLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-sm text-dark-200 hover:text-white hover:border-brand-blue transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
