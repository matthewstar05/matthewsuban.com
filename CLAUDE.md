@AGENTS.md

# Claude Code specifics

Everything in AGENTS.md applies. This file only lists what's specific to Claude Code.

## Skills (`.claude/skills/`) — invoke with `/name`

| Skill            | Use when                                                                |
| ---------------- | ----------------------------------------------------------------------- |
| `/kickoff`       | Starting a new site from this template: interview → brief → first draft |
| `/iterate`       | The default work loop: pick a backlog item, build, verify, review, log  |
| `/new-page`      | Adding a page from the content registry                                 |
| `/new-section`   | Adding a new section type                                               |
| `/retheme`       | Changing brand colors, type, radius, or overall feel                    |
| `/visual-review` | Screenshot pages and critique them against the brief and DESIGN.md      |

## Subagents (`.claude/agents/`)

- `designer` — visual critique from screenshots (read-only). Use after visual changes.
- `copywriter` — writes and edits content files in the brief's voice.
- `reviewer` — reviews a diff against AGENTS.md, CONVENTIONS.md, and a11y rules (read-only).
- `qa` — runs verify + e2e + screenshots and reports failures precisely (no fixes).

Use subagents for independent second opinions or parallel work, not for trivial edits.

## Hooks

`.claude/hooks/format.mjs` runs Prettier on every file you Edit/Write, so don't hand-format or
re-run Prettier after edits.

## MCP

`.mcp.json` registers `next-devtools`, which exposes the running dev server's errors, logs, and
routes. With `npm run dev` running, prefer it (`get_errors`) over guessing at runtime failures.
