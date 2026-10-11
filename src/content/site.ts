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
  name: "Untitled Site",
  tagline: "A blank slate, built to iterate.",
  description: "A content-driven Next.js starter designed for fast, agent-assisted iteration.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en",
  headerCta: { label: "Get in touch", href: "/contact" },
  footer: {
    note: "Built with Next.js.",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  socials: [],
};
