import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getIndexablePages, slugToPath } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return getIndexablePages().map((page) => ({
    url: new URL(slugToPath(page.slug), site.url).toString(),
  }));
}
