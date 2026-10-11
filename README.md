# Website template

An agent-first blank slate for building a website iteratively with coding agents.

**Pages are data. Sections are components. Design is tokens.** Each one can change without touching
the others, so every iteration stays small, typed, and verifiable.

## Quick start

```bash
npm install
npx playwright install chromium   # once, for e2e + screenshots
cp .env.example .env.local
npm run dev                       # http://localhost:3000 — see /styleguide too
```

Then, in Claude Code (or any agent that reads `AGENTS.md`):

1. `/kickoff` — interview → `docs/BRIEF.md` → first draft of the site.
2. `/iterate` — repeat. Each loop picks the next item in `docs/BACKLOG.md`, builds it, runs the
   checks, screenshots it, reviews it, and appends to `docs/LOG.md`.

## What's here

| Path                              | Purpose                                                                      |
| --------------------------------- | ---------------------------------------------------------------------------- |
| `AGENTS.md`                       | Canonical agent instructions (all tools)                                     |
| `CLAUDE.md`                       | Claude Code extras: skills, subagents, hooks, MCP                            |
| `docs/BRIEF.md`                   | **Fill this in first.** Audience, goals, voice, direction                    |
| `docs/BACKLOG.md` · `docs/LOG.md` | What's next · what happened and why                                          |
| `docs/ARCHITECTURE.md`            | How content becomes pages                                                    |
| `docs/DESIGN.md`                  | Token system and visual rules                                                |
| `docs/CONVENTIONS.md`             | Code, content, and testing conventions                                       |
| `docs/decisions/`                 | Architecture decision records                                                |
| `src/content/`                    | Site config + one file per page                                              |
| `src/components/sections/`        | Section components + registry                                                |
| `src/app/globals.css`             | Design tokens (light + dark)                                                 |
| `.claude/skills/`                 | `/kickoff` `/iterate` `/new-page` `/new-section` `/retheme` `/visual-review` |
| `.claude/agents/`                 | `designer` `copywriter` `reviewer` `qa` subagents                            |
| `e2e/`                            | Smoke tests + screenshot capture                                             |

## Scripts

| Command                           | Does                                                 |
| --------------------------------- | ---------------------------------------------------- |
| `npm run dev`                     | Dev server                                           |
| `npm run verify`                  | typecheck + lint + format check + unit tests + build |
| `npm run test:e2e`                | Playwright smoke tests                               |
| `npm run shots`                   | Screenshots of every page → `.screenshots/`          |
| `SHOTS_PATH=/about npm run shots` | Screenshots of one page                              |
| `npm run format`                  | Prettier (with Tailwind class sorting)               |

## Stack

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · Vitest ·
Playwright · Prettier · lucide-react. CI in `.github/workflows/ci.yml`.
