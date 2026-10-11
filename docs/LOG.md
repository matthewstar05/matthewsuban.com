# Iteration log

Append-only, newest at the bottom. One entry per iteration — a reader should be able to
reconstruct _why_ the site looks the way it does from this file alone.

```md
## YYYY-MM-DD — Short title

- **Goal:** what we set out to do (link backlog item)
- **Changed:** files/areas touched, at a glance
- **Decisions:** anything non-obvious and why (link ADR if one was written)
- **Verified:** verify / e2e / screenshots reviewed (which pages)
- **Follow-ups:** added to BACKLOG.md
```

---

## 2026-10-09 — Template scaffolded

- **Goal:** create an agent-friendly blank slate for a new website.
- **Changed:** Next.js 16 app with content registry, section registry, design tokens, styleguide,
  SEO routes, unit + e2e tests, screenshot pipeline, agent docs, Claude Code skills/agents/hooks.
- **Decisions:** see `docs/decisions/0001-stack-and-content-model.md`.
- **Verified:** `npm run verify` and `npm run test:e2e` pass; screenshots of all pages reviewed.
- **Follow-ups:** brief, content, brand — see BACKLOG.md.

## 2026-10-09 - Shared creative-agent integrations

- **Goal:** route asset prompts to Google Flow and install Meshy, Higgsfield, and
  Lovable integrations across the installed local agents.
- **Changed:** user-wide MCP configurations and routing rules for Codex, Claude
  Code, Cursor, Antigravity CLI/IDE, Kiro, and Claude Desktop. Local integration
  code, pinned dependencies, tests, and private configuration backups live outside
  this repository at `/Users/star/.local/share/agent-integrations`.
  Added `docs/AGENT_INTEGRATIONS.md` and an account-connection follow-up.
- **Decisions:** Flow uses a local browser adapter so it can use the Google Flow
  account allowance. Higgsfield and Lovable share a local OAuth bridge across
  clients. Meshy accepts a local private key. No website runtime dependencies were
  added; the external MCP packages are needed for agent-to-provider communication.
- **Verified:** five local routing/configuration tests passed; router, Flow and
  Meshy passed MCP handshakes with 3, 22 and 24 tools respectively. Flow's Chrome,
  ffprobe and SQLite integrity checks passed. All seven client configurations
  contain the five integrations, and unrelated JSON configuration was preserved.
  Lovable returned 41 tools after authorization, and a fresh process reused the
  cached login. Website `npm run verify` passed, including 20 unit tests and the
  production build; all six Playwright smoke tests passed, including `/styleguide`.
  No visual website changes were made. Generated output remains a separate check.
- **Follow-ups:** complete provider account connections; no generation was
  submitted and no credits were spent during installation.

## 2026-10-09 - Shared provider account connections

- **Goal:** finish Flow and Higgsfield connections across local agents; leave Meshy alone.
- **Changed:** authenticated Higgsfield's shared OAuth bridge and added guarded
  compatibility changes for Google's current `flow.google.com` app address in the
  external integration package. Both current and legacy project URLs are supported;
  marketing pages and sign-in pages cannot satisfy the login checkpoint.
- **Verified:** Higgsfield returned 154 tools and a fresh process reused its login.
  Seven routing/configuration/URL tests passed. All seven agent configurations still
  contain the integrations. No site UI or runtime changes were made.
- **Follow-ups:** the user confirmed Flow access and credits; finish personal sign-in
  in its separate MCP Chrome profile. No generation, paid plan or trial was started.

## 2026-10-11 - Initialize the matthewsuban.com repository

- **Goal:** replace the repository's main branch contents with this project and
  preserve the previous site on a `legacy` branch.
- **Changed:** connected this checkout to `matthewstar05/matthewsuban.com` and
  prepared the current template for its main branch. Excluded the ignored private
  Claude settings file from formatting checks.
- **Decisions:** retain both Git histories and point `legacy` at the previous
  main commit, `addd2ee161ac07f0e9f871a6f7a6a6e0d48a9945`. Keep existing template
  content until the brief is filled in. No dependencies or site UI were changed.
- **Verified:** `npm run verify` and all six Playwright smoke tests passed,
  including `/styleguide`. Screenshots were not required because this iteration
  did not change the template's appearance.
- **Follow-ups:** fill in the brief and replace placeholder content before launch.
