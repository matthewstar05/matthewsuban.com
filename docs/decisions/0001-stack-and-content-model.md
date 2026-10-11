# 0001 — Stack and content model

- **Status:** accepted
- **Date:** 2026-10-09

## Context

The site will be built and revised mostly by coding agents across many short iterations. Agents
work best when changes are small, typed, verifiable, and land in predictable places.

## Decision

- Next.js 16 App Router with Cache Components, React 19, TypeScript strict, Tailwind 4.
- Pages are typed data (`src/content/pages`) composed of sections from a registry; one catch-all
  route renders them all statically.
- All visual values are CSS custom-property tokens with `light-dark()`; components use only token
  utilities.
- Guardrails are tests: content invariants (Vitest), page smoke tests (Playwright), and a
  screenshot pipeline for visual review.
- No CMS, database, or UI kit by default — added later via ADR if the brief calls for them.

## Consequences

- Most iterations are content-only edits with compile-time checking.
- New layouts require a new section type (component + registry line + sample), which keeps the
  styleguide complete.
- Content lives in the repo, so non-technical editing needs a CMS later (would replace
  `src/content/pages` as the source for `pages`).
