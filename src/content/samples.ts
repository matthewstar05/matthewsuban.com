import type { SectionData, SectionType } from "@/components/sections/registry";

/**
 * One realistic example per section type, rendered on /styleguide.
 * The Record type makes this fail to compile until every section has a sample.
 */
export const sectionSamples: { [K in SectionType]: Extract<SectionData, { type: K }> } = {
  hero: {
    type: "hero",
    eyebrow: "Eyebrow",
    title: "Hero title that states the value",
    subtitle: "A supporting sentence that adds specifics and earns the click.",
    actions: [
      { label: "Primary action", href: "/" },
      { label: "Secondary", href: "/" },
    ],
  },
  features: {
    type: "features",
    title: "Feature grid",
    intro: "Two to four columns of short, scannable benefits.",
    items: [
      { icon: "zap", title: "Fast", body: "Static by default, served from the edge." },
      {
        icon: "shield",
        title: "Accessible",
        body: "Semantic HTML, focus styles, and contrast-safe tokens.",
      },
      {
        icon: "sparkles",
        title: "Iterable",
        body: "Every section is data, so changes stay small.",
      },
    ],
  },
  prose: {
    type: "prose",
    title: "Prose",
    body: [
      "Long-form copy at a comfortable measure. Each array entry is one paragraph.",
      "Use this for stories, policies, and anything that reads top to bottom.",
    ],
  },
  cta: {
    type: "cta",
    tone: "inverted",
    title: "Call to action",
    body: "One clear next step. The inverted tone flips the color scheme.",
    actions: [{ label: "Do the thing", href: "/" }],
  },
  faq: {
    type: "faq",
    title: "FAQ",
    items: [
      { question: "A common question?", answer: "A short, direct answer." },
      { question: "Another question?", answer: "Another short answer." },
    ],
  },
};
