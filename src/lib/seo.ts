import type { Metadata } from "next";
import type { Page } from "@/content/types";
import { slugToPath } from "@/lib/pages";

export function buildPageMetadata(page: Page): Metadata {
  const path = slugToPath(page.slug);
  return {
    // The home page uses the site's default title instead of "Home · Site".
    title: page.slug === "" ? undefined : page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: { url: path, description: page.description },
    robots: page.noindex ? { index: false, follow: false } : undefined,
  };
}
