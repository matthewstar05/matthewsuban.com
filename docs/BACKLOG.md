# Backlog

Ordered by priority — work top-down. Agents: move items to **Done** with the date when finished,
and add follow-ups you discover to **Next** or **Later** rather than doing them unasked.

Item format: `- [ ] Short imperative title — why / acceptance criteria`

## Now

- [ ] Fill in `docs/BRIEF.md` (run `/kickoff`) — every later decision depends on it

## Next

- [ ] Complete creative-provider account connections and verify requested asset generation - see `docs/AGENT_INTEGRATIONS.md`
- [ ] Replace placeholder copy on all pages with real content from the brief
- [ ] Set brand tokens in `src/app/globals.css` and OG colors in `src/app/opengraph-image.tsx`
- [ ] Set `site.name`, `tagline`, `description`, and `NEXT_PUBLIC_SITE_URL`
- [ ] Replace `src/app/icon.svg` with the real mark

## Later

- [ ] Contact form (Server Action + email provider) — decide provider in an ADR
- [ ] Analytics — decide provider in an ADR
- [ ] Blog / MDX content collection, if the brief calls for it
- [ ] Deploy (Vercel or other) and set the production URL

## Done

- [x] 2026-10-11 - Initialize `matthewstar05/matthewsuban.com` with this project and preserve the previous main branch as `legacy`
- [x] 2026-10-09 - Configure user-wide asset routing and Flow, Meshy, Higgsfield, and Lovable MCPs for installed local agents
- [x] 2026-10-09 — Template scaffolded
