---
name: new-page
description: Add a new page to the site via the content registry. Use when the user asks for a new page (about, services, pricing, case study, etc.).
---

# New page

1. Confirm the page's job against `docs/BRIEF.md` (§4 Pages). If it's not there, add it to the brief.
2. Create `src/content/pages/<name>.ts`:

   ```ts
   import type { Page } from "@/content/types";

   const page: Page = {
     slug: "<slug>", // "" for home, "a/b" for nested
     title: "<≤60 chars>",
     description: "<50–160 chars>",
     nav: { label: "<Label>", order: 50 }, // omit to keep out of the header
     sections: [
       { type: "hero", title: "…", subtitle: "…", align: "left" },
       // …compose from existing section types; see /styleguide and src/content/samples.ts
     ],
   };

   export default page;
   ```

3. Register it in `src/content/pages/index.ts` (order in the array doesn't affect nav).
4. Link to it from relevant pages/footer (`src/content/site.ts`) if appropriate.
5. Need a layout that no section supports? Use `/new-section` rather than inline JSX. Only use a
   bespoke route (`src/app/<route>/page.tsx`) for genuinely app-like pages.
6. Finish with the Definition of Done in `AGENTS.md` (including `SHOTS_PATH=/<slug> npm run shots`).
