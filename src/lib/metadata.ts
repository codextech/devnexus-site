import type { Metadata } from "next";
import { SITE } from "./constants";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
};

export function createMetadata({
  title,
  description,
  path,
  image,
  keywords,
}: PageMetadataOptions): Metadata {
  const url = `${SITE.url}${path}`;
  // Auto-generate OG image from title if no custom image provided
  const ogImage = image || `${SITE.url}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
    keywords,
  };
}
