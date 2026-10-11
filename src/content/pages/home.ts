import type { Page } from "@/content/types";

const home: Page = {
  slug: "",
  title: "Home",
  description: "A content-driven Next.js starter designed for fast, agent-assisted iteration.",
  sections: [
    {
      type: "hero",
      eyebrow: "Template",
      title: "A blank slate, built to iterate.",
      subtitle:
        "Pages are data. Sections are components. Design is tokens. Change any one without touching the others.",
      actions: [
        { label: "Read the brief", href: "/about" },
        { label: "See every section", href: "/styleguide", variant: "secondary" },
      ],
    },
    {
      type: "features",
      title: "What's in the box",
      columns: 3,
      items: [
        {
          icon: "layers",
          title: "Section registry",
          body: "Compose pages from typed sections. Add a new section type in two steps.",
        },
        {
          icon: "palette",
          title: "Design tokens",
          body: "Every color, radius, and font flows from CSS variables. Rebrand in one file.",
        },
        {
          icon: "bot",
          title: "Agent-ready",
          body: "AGENTS.md, skills, subagents, and a verify loop so agents can ship safely.",
        },
      ],
    },
    {
      type: "cta",
      tone: "muted",
      title: "Start with the brief",
      body: "Fill in docs/BRIEF.md, then ask your agent to run the kickoff skill.",
      actions: [{ label: "Contact", href: "/contact" }],
    },
  ],
};

export default home;
