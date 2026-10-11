import type { Page } from "@/content/types";
const contact: Page = {
  slug: "contact",
  title: "A little hello",
  description:
    "A friendly hello from Matthew's little corner of the internet. Find your way back to the garden and leave a small note for yourself.",
  sections: [
    {
      type: "hero",
      eyebrow: "A NOTE AT THE GARDEN GATE",
      title: "Hello, passing friend.",
      subtitle: "Thanks for stopping by. It's lovely to have you here.",
      align: "left",
      actions: [{ label: "Back to the garden", href: "/" }],
    },
    {
      type: "prose",
      title: "The gate is still being built.",
      body: [
        "A public contact address hasn't been added yet. The guestbook on the front page is a private keepsake on your device, so it doesn't send a message to Matthew.",
        "For now, enjoy the garden. A real way to get in touch will live here once it's ready.",
      ],
    },
  ],
};
export default contact;
