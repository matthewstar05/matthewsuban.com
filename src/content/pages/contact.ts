import type { Page } from "@/content/types";

const contact: Page = {
  slug: "contact",
  title: "Contact",
  description: "Get in touch. Replace this placeholder with real contact details.",
  nav: { label: "Contact", order: 90 },
  sections: [
    {
      type: "hero",
      title: "Get in touch",
      subtitle: "Replace this with how people should reach you.",
      align: "left",
      actions: [{ label: "hello@example.com", href: "mailto:hello@example.com" }],
    },
  ],
};

export default contact;
