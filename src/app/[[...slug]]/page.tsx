import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sections } from "@/components/sections/registry";
import { pages } from "@/content/pages";
import { getPage } from "@/lib/pages";
import { buildPageMetadata } from "@/lib/seo";

// Known slugs are fully prerendered via generateStaticParams. Unknown slugs must
// block (not stream) so notFound() can still send a real 404 status.
export const instant = false;

/**
 * Renders every page in the content registry (src/content/pages).
 * Need a bespoke page? Create a real route folder (e.g. src/app/pricing/page.tsx)
 * — specific routes take precedence over this catch-all.
 */
export function generateStaticParams(): { slug: string[] }[] {
  return pages.map((page) => ({ slug: page.slug === "" ? [] : page.slug.split("/") }));
}

export async function generateMetadata({ params }: PageProps<"/[[...slug]]">): Promise<Metadata> {
  const page = getPage((await params).slug);
  return page ? buildPageMetadata(page) : {};
}

export default async function ContentPage({ params }: PageProps<"/[[...slug]]">) {
  const page = getPage((await params).slug);
  if (!page) notFound();
  return <Sections sections={page.sections} />;
}
