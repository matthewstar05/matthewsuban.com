import type { ComponentProps, ComponentType } from "react";
import { cn } from "@/lib/cn";
import { CallToAction } from "./CallToAction";
import { Faq } from "./Faq";
import { FeatureGrid } from "./FeatureGrid";
import { Hero } from "./Hero";
import { Prose } from "./Prose";

/**
 * Section registry: maps a content `type` string to its component.
 * To add a section: create the component in this folder, then add one line here.
 * Its props automatically become a valid `SectionData` shape for content files.
 */
const sections = {
  hero: Hero,
  features: FeatureGrid,
  prose: Prose,
  cta: CallToAction,
  faq: Faq,
} satisfies Record<string, ComponentType<never>>;

export type SectionType = keyof typeof sections;

/** Options every section accepts, handled by the renderer rather than the component. */
export interface SectionBase {
  /** Anchor id, e.g. "pricing" → /#pricing. */
  id?: string;
  /** Background treatment. */
  tone?: "default" | "muted" | "inverted";
}

export type SectionData = {
  [K in SectionType]: { type: K } & SectionBase & ComponentProps<(typeof sections)[K]>;
}[SectionType];

const tones: Record<NonNullable<SectionBase["tone"]>, string> = {
  default: "",
  muted: "bg-muted",
  inverted: "inverted bg-background text-foreground",
};

export function Section({ section }: { section: SectionData }) {
  const { type, id, tone = "default", ...props } = section;
  const Component = sections[type] as ComponentType<typeof props>;
  return (
    <section id={id} data-section={type} className={cn(tones[tone])}>
      <Component {...props} />
    </section>
  );
}

export function Sections({ sections: list }: { sections: SectionData[] }) {
  return list.map((section, i) => (
    <Section key={section.id ?? `${section.type}-${i}`} section={section} />
  ));
}
