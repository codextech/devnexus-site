import type { Metadata } from "next";
import { ContactPageContent } from "@/components/sections/contact-page-content";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Contact DevNexus | Book a Free Discovery Call",
  description:
    "Get in touch with DevNexus. Tell us about your project and we'll respond within 24 hours with a plan.",
  path: "/contact",
  keywords: [
    "hire software development agency",
    "contact software development company",
    "book discovery call software agency",
    "get software development quote",
    "hire AI developers",
    "DevNexus contact",
  ],
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE.url },
              { name: "Contact", url: `${SITE.url}/contact` },
            ])
          ),
        }}
      />

      <ContactPageContent />
    </>
  );
}
