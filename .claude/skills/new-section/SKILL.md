---
name: new-section
description: Add a new section type to the section registry (e.g. testimonials, pricing table, logo cloud, gallery, timeline). Use when content needs a layout no existing section provides.
---

# New section

First check `src/components/sections/` and `/styleguide` — can an existing section do it with a
small new prop? Prefer that.

1. **Component** — `src/components/sections/<Name>.tsx`:
   - Export `interface <Name>Props` (this _is_ the content schema — keep props serializable:
     strings, numbers, booleans, arrays/objects of those, `IconName`, `Action`).
   - Export `function <Name>(props)`; server component; wrap in `<Container>` with `py-section`;
     use `SectionHeading` for an optional title/intro.
   - Tokens only (see `docs/DESIGN.md`). Use `<h2>`/`<h3>` — never `<h1>` (Hero owns it).
   - Mobile first; check it at 390px.
2. **Registry** — add `<key>: <Name>` to `sections` in `src/components/sections/registry.tsx`.
   The key is the `type` string content files use (short, kebab or lowercase).
3. **Sample** — add a realistic sample to `src/content/samples.ts` (the file won't compile until
   you do). It renders on `/styleguide`.
4. **Use it** in the page that needed it.
5. If it's interactive, add a Playwright test in `e2e/`.
6. Definition of Done in `AGENTS.md`; screenshot `/styleguide` and the page using it.
