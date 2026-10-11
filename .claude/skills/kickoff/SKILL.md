---
name: kickoff
description: Start a new website from this template — interview the user, fill docs/BRIEF.md, then produce a first draft of site config, tokens, pages, and backlog. Use at the very start of a project or when the user wants to reset direction.
---

# Kickoff

Goal: turn a blank template into a first, coherent draft of a real site, anchored in a brief.

## 1. Gather

- Read `docs/BRIEF.md`. Note which sections are empty.
- Ask the user for what's missing, in **one** batched message (not one question at a time). Prioritize:
  one-liner, primary audience, ranked goals, pages, voice (3 adjectives + "we are X, not Y"),
  visual references, existing assets, constraints. Offer sensible defaults they can accept.
- If the user pointed at reference sites or existing material, read them.

## 2. Write the brief

- Fill every section of `docs/BRIEF.md` concisely. Mark assumptions with `(assumed)` so the user
  can correct them. Remove the TEMPLATE banner.
- Show the user a short summary and ask for corrections before building. Wait for the answer.

## 3. First draft

1. `src/content/site.ts` — name, tagline, description, header CTA, footer.
2. Tokens in `src/app/globals.css` per the visual direction (follow `/retheme`).
3. Pages: create/replace files in `src/content/pages/` for each page in the brief (follow
   `/new-page`). Delete placeholder pages that aren't in the brief and remove them from the
   registry and any links. Write real copy in the brief's voice — no lorem ipsum. Where real
   facts are missing, write plausible copy and mark it `[TK]` in the string so it's findable.
4. `docs/BACKLOG.md` — replace the template items with a prioritized plan for this site
   (including every `[TK]` that needs real info).
5. Record notable choices (e.g. hosting, form provider) as ADRs only if decided.

## 4. Verify and show

Follow the Definition of Done in `AGENTS.md` (verify, e2e, screenshots — look at them), append a
LOG entry, then give the user: what you built, the open `[TK]` items, and the top 3 next steps.
