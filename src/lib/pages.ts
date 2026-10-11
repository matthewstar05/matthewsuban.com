import { pages } from "@/content/pages";
import type { Page } from "@/content/types";
import type { SiteLink } from "@/content/site";

export function slugToPath(slug: string): string {
  return slug === "" ? "/" : `/${slug}`;
}

export function getPage(segments: string[] | undefined): Page | undefined {
  const slug = (segments ?? []).join("/");
  return pages.find((page) => page.slug === slug);
}

export function getNavLinks(): SiteLink[] {
  return pages
    .filter((page) => page.nav)
    .sort((a, b) => a.nav!.order - b.nav!.order)
    .map((page) => ({ label: page.nav!.label, href: slugToPath(page.slug) }));
}

export function getIndexablePages(): Page[] {
  return pages.filter((page) => !page.noindex);
}
