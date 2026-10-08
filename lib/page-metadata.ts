import type { Metadata } from "next";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const fullTitle = `${title} — ChatBeds`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, type: "website" },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
