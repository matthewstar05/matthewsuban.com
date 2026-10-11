# Conventions

## Files & naming

- Components: PascalCase file, one exported component per file, named export.
- Lib modules: kebab-case, named exports, colocated `*.test.ts` for logic.
- Content: one page per file in `src/content/pages/`, default export, filename = slug
  (nested slugs: `work-case-study.ts` with `slug: "work/case-study"`).
- Route files (`page.tsx`, `layout.tsx`, …) use default exports as Next requires.

## TypeScript

- Strict mode. No `any`; narrow `unknown`.
- `interface` for object shapes; `type` for unions and mapped types.
- `import type` for type-only imports.
- Props interfaces are exported from section components — they are the content schema.

## React / Next

- Server Components by default; `"use client"` on the smallest possible leaf.
- Use `next/link` for internal links, `next/image` for images (put assets in `public/`).
- Route props use the generated `PageProps<"/route">` / `LayoutProps<"/route">` helpers.
- Before using a Next API you're unsure of, read it in `node_modules/next/dist/docs/`.

## Styling

- Tailwind utilities with design tokens only (see `docs/DESIGN.md`).
- Compose conditional classes with `cn()` from `@/lib/cn`.
- Prettier sorts Tailwind classes; don't hand-order.

## Content

- Content files are plain data: strings, numbers, arrays, objects. No JSX or functions.
- Titles ≤ 60 chars, descriptions 50–160 chars (enforced by tests).
- Exactly one `hero` per page — it renders the page's `<h1>` (enforced by tests).
- Internal links must point to existing pages (enforced by tests).

## Testing

- Unit (`vitest`): pure logic in `src/lib`, content invariants in `src/content/content.test.ts`.
- E2E (`playwright`): `e2e/smoke.spec.ts` checks every page renders, 404s, theme toggle.
  Add a test when you add interactive behavior.
- Visual: `npm run shots` then look at the images. There's no pixel-diff baseline by default;
  add `toHaveScreenshot` assertions once the design stabilizes.

## Git

- Small commits, one concern each, imperative subject. Only commit when asked.
