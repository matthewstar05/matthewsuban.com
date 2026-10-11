import type { SectionData } from "@/components/sections/registry";

export type { SectionData };

export interface Page {
  /** URL path without leading slash. The home page is "". Nested: "work/case-study". */
  slug: string;
  /** Used for <title> (via the site title template) and the default H1 context. */
  title: string;
  /** Meta description — aim for 50–160 characters. */
  description: string;
  /** Include in header navigation. Lower `order` sorts first. */
  nav?: { label: string; order: number };
  /** Hide from search engines and the sitemap. */
  noindex?: boolean;
  /** Rendered top to bottom. Each entry maps to a component in the section registry. */
  sections: SectionData[];
}
