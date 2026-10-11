# Architecture

## Directory map

```
src/
  app/
    layout.tsx               Root shell: fonts, theme script, header, footer, skip link
    [[...slug]]/page.tsx     Renders every page in the content registry (static)
    styleguide/page.tsx      Every token and section sample — visual QA surface (noindex)
    not-found.tsx            404
    sitemap.ts robots.ts     Generated from the page registry
    opengraph-image.tsx      Default social image
    icon.svg                 Favicon
    globals.css              Design tokens + base styles
  components/
    sections/                One component per section type + registry.tsx
    shell/                   Header, Footer, NavLink, ThemeToggle, ThemeScript
    ui/                      Primitives: Button, Container, Heading, Icon
  content/
    site.ts                  Site identity and chrome
    pages/                   One file per page + index.ts registry
    samples.ts               One sample per section type (styleguide)
    types.ts                 Page type
    content.test.ts          Content guardrails (slugs, links, SEO lengths, h1)
  lib/                       Pure helpers (cn, pages, seo) with colocated tests
e2e/                         Playwright smoke tests + screenshot capture
docs/                        Brief, backlog, log, design, conventions, ADRs
.claude/                     Claude Code skills, subagents, hooks, settings
```

## Request flow

1. `generateStaticParams` in `[[...slug]]/page.tsx` returns one param per registered page, so
   every content page is prerendered at build time.
2. The page resolves its `Page` with `getPage(slug)` and renders `<Sections>`.
3. `Section` looks up the component by `type`, wraps it in `<section>` (handling `id` and `tone`),
   and passes the remaining fields as props.
4. Unknown slugs call `notFound()`. The route exports `instant = false` so that unknown slugs
   block rather than stream, which keeps a real 404 status under Cache Components.

## Type safety of content

`SectionData` is derived from the registry: for each key it is
`{ type: key } & SectionBase & ComponentProps<Component>`. Adding a prop to a section
component immediately type-checks every content file using it. `samples.ts` is typed as a
complete record over `SectionType`, so a new section won't compile until it has a sample.

## Navigation

The header nav is derived from pages with a `nav` field (sorted by `nav.order`). The footer and
header CTA come from `site.ts`. `content.test.ts` fails on internal links to pages that don't
exist.

## Escape hatches

- **Bespoke page:** create `src/app/<route>/page.tsx`. Specific routes beat the catch-all. You can
  still reuse section components directly. Add it to `knownPaths` in `content.test.ts` if content
  links to it, and to `sitemap.ts` if it should be indexed.
- **Dynamic data:** with Cache Components, wrap request-time data in `<Suspense>` or cache it with
  `"use cache"`. Read `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md` first.
- **Client interactivity:** add a `"use client"` leaf component; keep sections themselves server
  components where possible.
