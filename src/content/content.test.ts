import { describe, expect, it } from "vitest";
import { pages } from "@/content/pages";
import { sectionSamples } from "@/content/samples";
import { site } from "@/content/site";
import type { SectionData } from "@/content/types";
import { slugToPath } from "@/lib/pages";

/**
 * Content guardrails. These catch the mistakes agents (and humans) make most:
 * duplicate slugs, broken internal links, weak SEO fields.
 */

const knownPaths = new Set([...pages.map((p) => slugToPath(p.slug)), "/styleguide"]);

function hrefsIn(section: SectionData): string[] {
  return "actions" in section && section.actions ? section.actions.map((a) => a.href) : [];
}

function isInternal(href: string): boolean {
  return href.startsWith("/");
}

describe("pages", () => {
  it("have unique slugs", () => {
    const slugs = pages.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("include a home page", () => {
    expect(pages.some((p) => p.slug === "")).toBe(true);
  });

  it.each(pages.map((p) => [slugToPath(p.slug), p] as const))("%s has a valid slug", (_, page) => {
    expect(page.slug).toMatch(/^(|[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*)$/);
  });

  it.each(pages.map((p) => [slugToPath(p.slug), p] as const))(
    "%s has SEO-ready fields",
    (_, page) => {
      expect(page.title.length).toBeGreaterThan(0);
      expect(page.title.length).toBeLessThanOrEqual(60);
      expect(page.description.length).toBeGreaterThanOrEqual(50);
      expect(page.description.length).toBeLessThanOrEqual(160);
    },
  );

  it.each(pages.map((p) => [slugToPath(p.slug), p] as const))(
    "%s has sections and exactly one h1 source",
    (_, page) => {
      expect(page.sections.length).toBeGreaterThan(0);
      // Conventional and scenic heroes each render an h1.
      expect(page.sections.filter((s) => s.type === "hero" || s.type === "woodland")).toHaveLength(
        1,
      );
    },
  );

  it.each(pages.map((p) => [slugToPath(p.slug), p] as const))(
    "%s has unique section ids",
    (_, page) => {
      const ids = page.sections.map((s) => s.id).filter(Boolean);
      expect(new Set(ids).size).toBe(ids.length);
    },
  );

  it("only link internally to pages that exist", () => {
    const links = [
      ...pages.flatMap((p) => p.sections.flatMap(hrefsIn)),
      ...site.footer.links.map((l) => l.href),
      ...(site.headerCta ? [site.headerCta.href] : []),
    ];
    const broken = links
      .filter(isInternal)
      .map((href) => href.split("#")[0] || "/")
      .filter((path) => !knownPaths.has(path));
    expect(broken).toEqual([]);
  });
});

describe("section samples", () => {
  it("are keyed by their own type", () => {
    for (const [key, sample] of Object.entries(sectionSamples)) expect(sample.type).toBe(key);
  });
});
