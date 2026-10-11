import type { Page } from "@/content/types";
const projects: Page = {
  slug: "projects",
  title: "Things I'm making",
  description:
    "A growing collection of small creations from Matthew's little corner of the internet. Ideas, experiments, and things made with care.",
  nav: { label: "Creations", order: 20 },
  sections: [
    {
      type: "hero",
      eyebrow: "02 / SMALL IDEAS, TAKING ROOT",
      title: "Things I'm making.",
      subtitle: "A place for experiments, happy accidents, and ideas that become something.",
      align: "left",
      actions: [{ label: "Back to the garden", href: "/", variant: "secondary" }],
    },
    {
      type: "prose",
      title: "01. This little garden",
      body: [
        "A personal website made to feel like a quiet clearing. Sunlit trees, drifting leaves, paper keepsakes, and a small original soundtrack.",
        "Try the breathing circle, find the hidden leaves, or leave a note in your own private guestbook. The small things are part of the project, too.",
      ],
    },
    {
      type: "cta",
      tone: "muted",
      title: "More seeds, soon.",
      body: "This collection is still growing. New projects will find a home here when they're ready.",
      actions: [{ label: "Wander home", href: "/" }],
    },
  ],
};
export default projects;
