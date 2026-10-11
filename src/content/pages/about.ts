import type { Page } from "@/content/types";

const about: Page = {
  slug: "about",
  title: "About",
  description:
    "Who we are, what we do, and why it matters. Replace this placeholder with your story.",
  nav: { label: "About", order: 10 },
  sections: [
    {
      type: "hero",
      title: "About",
      subtitle: "Replace this with a one-sentence summary of who you are.",
      align: "left",
    },
    {
      type: "prose",
      body: [
        "This is placeholder copy. Write your story here — what you do, who it's for, and what makes it different.",
        "Keep paragraphs short. Each string in the body array renders as its own paragraph.",
      ],
    },
    {
      type: "faq",
      title: "Questions",
      items: [
        {
          question: "Is this real content?",
          answer: "No. Every page in src/content/pages is placeholder copy meant to be replaced.",
        },
        {
          question: "How do I add a page?",
          answer: "Create a file in src/content/pages and add it to the registry in index.ts.",
        },
      ],
    },
  ],
};

export default about;
