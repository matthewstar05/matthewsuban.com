/**
 * Site identity — the single source of truth for name, URL, and chrome.
 * Navigation is NOT defined here: it is derived from pages that set `nav`
 * (see src/content/pages). Edit this file first when starting a new site.
 */
export interface SiteLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  /** Primary call to action shown in the header. Set to null to hide. */
  headerCta: SiteLink | null;
  footer: {
    note: string;
    links: SiteLink[];
  };
  socials: SiteLink[];
}

export const site: SiteConfig = {
  name: "Matthew Suban",
  tagline: "A soft place to land",
  description:
    "A little garden on the internet, with quiet thoughts, small creations, and room to breathe.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://matthewsuban.com",
  locale: "en",
  headerCta: { label: "Say hello", href: "/contact" },
  footer: {
    note: "Made with care and a little daydreaming.",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  socials: [],
};
