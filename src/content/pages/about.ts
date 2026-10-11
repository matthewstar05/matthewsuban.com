import type { Page } from "@/content/types";
const about: Page = {
  slug: "about",
  title: "A little about me",
  description:
    "Meet Matthew, the human behind this quiet little garden on the internet. A personal space for creations, thoughts, and small discoveries.",
  nav: { label: "About", order: 10 },
  sections: [
    {
      type: "hero",
      eyebrow: "01 / THE HUMAN BEHIND THE SCREEN",
      title: "Hi, I'm Matthew.",
      subtitle: "Welcome to my little corner. I'm glad our paths crossed.",
      align: "left",
      actions: [{ label: "Back to the garden", href: "/", variant: "secondary" }],
    },
    {
      type: "prose",
      title: "A small space, made with care.",
      body: [
        "This is a personal website for the things that don't quite fit into a profile: ideas taking shape, little discoveries, and moments worth keeping.",
        "For now, the garden is just beginning. There is room to grow, and no particular hurry to fill it all.",
        "Take the scenic route. Press play on the little record. Leave a note for yourself among the leaves. Stay as long as you like.",
      ],
    },
    {
      type: "cta",
      tone: "muted",
      title: "Follow a different path.",
      body: "A few things are already taking root.",
      actions: [
        { label: "Things I'm making", href: "/projects" },
        { label: "The journal", href: "/journal", variant: "secondary" },
      ],
    },
  ],
};
export default about;
