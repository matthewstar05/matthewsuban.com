import type { Page } from "@/content/types";
const journal: Page = {
  slug: "journal",
  title: "Pages from the journal",
  description:
    "A quiet place for thoughts and little discoveries. Matthew's personal journal is beginning here, one small page at a time.",
  nav: { label: "Journal", order: 30 },
  sections: [
    {
      type: "hero",
      eyebrow: "03 / THOUGHTS & LITTLE DISCOVERIES",
      title: "A few open pages.",
      subtitle: "Some thoughts need a little more room than a caption.",
      align: "left",
      actions: [{ label: "Back to the garden", href: "/", variant: "secondary" }],
    },
    {
      type: "prose",
      title: "The first page is still open.",
      body: [
        "No entries just yet. This is a place for real thoughts, when they're ready to be shared.",
        "Until then, here's a small invitation: notice one ordinary thing today. The shape of a leaf. A song you forgot you loved. Light moving across the floor.",
        "Not everything needs to become something. Sometimes noticing is enough.",
      ],
    },
    {
      type: "cta",
      tone: "muted",
      title: "Nothing to catch up on.",
      body: "There's a quiet spot in the garden with your name on it.",
      actions: [{ label: "Stay a while", href: "/" }],
    },
  ],
};
export default journal;
