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
4. Unknown slugs call `notFound()`. The route exports `ensureStatic = "navigation"` so that unknown slugs
   wait for the complete static result and return a real 404 under Cache Components.
   `instant = false` only disables navigation validation and does not prevent streaming.

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

## Interactive forest

The `woodland` section is a server wrapper around `WoodlandHome`. Its serializable
page data supplies the title and introduction. The client scene owns transient
collectibles, dialogue, native dialogs, breathing timer, and motion controls.
`LivingLeaves` uses one requestAnimationFrame loop and refs for physics rather
than rendering React on every frame. It cleans up listeners, observers and frames.

`ForestBackdrop` selects the local 4K, landscape or portrait video. Its 16-second
loop was rendered with the same shader and original painting as `LivingForest`.
The live canvas reacts to pointer and branch gusts, matching video time and camera
composition. `LivingLeaves` reads that shared wind clock. WebGL failure leaves
the video visible; video failure leaves live shader animation. Reduced motion
and manual pause retain the matching static texture. All media stays local.

`MusicPlayer` lives in the root layout so navigation preserves playback and
controls. The guestbook is explicitly private localStorage, not a public backend
or a way to contact Matthew.

About, Projects, Journal and Contact remain registered content pages. Unknown
biography and project history are left unclaimed. `e2e/forest.spec.ts` verifies
the actual scene interactions, media and responsive targets.
