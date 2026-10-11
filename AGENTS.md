<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent guide

This repo is a website template built for iterative, agent-driven development. This file is the
canonical instruction set for every coding agent (Claude Code, Codex, Cursor, Copilot, …).
Tool-specific files (`CLAUDE.md`, `.claude/`) only add to it.

## Read first, every session

1. `docs/BRIEF.md` — what the site is for, who it's for, voice, and constraints. **The source of
   truth for every product and copy decision.** If it's still the blank template, ask the user to
   fill it in (or run the `kickoff` workflow) before making product decisions.
2. `docs/BACKLOG.md` — what to work on next.
3. The last few entries of `docs/LOG.md` — what changed recently and why.

Read `docs/ARCHITECTURE.md`, `docs/DESIGN.md`, and `docs/CONVENTIONS.md` before changing code in
those areas.

## Stack

Next.js 16 (App Router, Cache Components, Turbopack) · React 19 · TypeScript (strict) ·
Tailwind CSS 4 · Vitest · Playwright · Prettier. Node ≥ 24, npm.

## Mental model

```
docs/BRIEF.md ──► src/content/  (data: site.ts, pages/*.ts)
                      │
                      ▼
            src/components/sections/registry.tsx  (type → component)
                      │
                      ▼
            src/app/[[...slug]]/page.tsx  (renders any registered page)
                      │
            styled by src/app/globals.css tokens
```

- **Pages are data.** A page is a `Page` object in `src/content/pages/` listing sections.
- **Sections are components.** Each section type is one component in `src/components/sections/`
  plus one line in `registry.tsx`. Its props become the content schema automatically.
- **Design is tokens.** All color, radius, spacing rhythm, and type scale live in
  `src/app/globals.css`. Components never use raw colors or `dark:` variants.

## Where changes go

| You want to…                      | Edit                                                                                      |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| Change copy                       | `src/content/pages/*.ts`                                                                  |
| Change name, URL, footer, CTA     | `src/content/site.ts`                                                                     |
| Add a page                        | New file in `src/content/pages/` + add to `src/content/pages/index.ts`                    |
| Add a section type                | New component in `src/components/sections/` + `registry.tsx` + `src/content/samples.ts`   |
| Rebrand (color, type, radius)     | Tokens at the top of `src/app/globals.css` (+ OG colors in `src/app/opengraph-image.tsx`) |
| Build a bespoke, non-section page | Real route folder, e.g. `src/app/pricing/page.tsx` (beats the catch-all)                  |
| Add an icon for content           | `src/components/ui/Icon.tsx`                                                              |

## Commands

```bash
npm run dev          # dev server on :3000
npm run verify       # typecheck + lint + format:check + unit tests + build — run before calling work done
npm run test:e2e     # Playwright smoke tests (reuses a running dev server)
npm run shots        # full-page screenshots → .screenshots/ (mobile/desktop × light/dark)
SHOTS_PATH=/about npm run shots   # one page only
npm run format       # Prettier (sorts Tailwind classes)
```

## Definition of done

A change is done when **all** of these hold:

1. `npm run verify` passes.
2. `npm run test:e2e` passes.
3. For any visual change: you ran `npm run shots` for affected pages and **looked at the images**
   (mobile + desktop, light + dark). Fix what looks wrong before reporting.
4. `/styleguide` still renders every section (a new section has a sample in `samples.ts`).
5. You appended an entry to `docs/LOG.md` and updated `docs/BACKLOG.md`.

Report failures honestly with the output — never claim a check passed that you didn't run.

## Rules

- Follow the brief. If a request conflicts with `docs/BRIEF.md`, say so and ask.
- Prefer content edits over code edits, and existing sections over new ones. Add a new section
  type only when no existing one can express the content with reasonable props.
- Keep content files serializable data: no JSX, no functions, no React imports.
- Server Components by default. Add `"use client"` only to the smallest leaf that needs state or
  browser APIs.
- Use tokens via Tailwind utilities (`bg-surface`, `text-muted-foreground`, `rounded-card`,
  `py-section`, `text-display`). No hex values, no `dark:` variants, no arbitrary colors.
- Accessibility is not optional: semantic elements, one `<h1>` per page (the Hero), visible focus,
  alt text, sufficient contrast in both themes.
- Record non-obvious, hard-to-reverse decisions as an ADR in `docs/decisions/`.
- Don't add dependencies without a reason stated in the LOG entry.
- Don't commit, push, or deploy unless asked.
