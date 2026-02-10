import type { Metadata } from "next";
import { SITE } from "./constants";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function createMetadata({
  title,
  description,
  path,
  image,
}: PageMetadataOptions): Metadata {
  const url = `${SITE.url}${path}`;
  const ogImage = image || "/og/home.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
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
  };
}
