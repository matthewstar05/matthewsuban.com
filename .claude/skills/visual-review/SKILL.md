---
name: visual-review
description: Capture screenshots of the site and critique them against the brief and design system, producing a prioritized list of fixes (and optionally applying them). Use after visual changes, before shipping, or when asked "how does it look?".
---

# Visual review

1. Ensure the dev server can start (Playwright reuses one on :3000 if running).
2. Capture: `npm run shots` (all pages) or `SHOTS_PATH=/x npm run shots`.
3. Open every PNG in `.screenshots/` for the pages in scope. For a thorough review, delegate to
   the `designer` subagent with the list of files and the brief's goals.
4. Critique against, in order:
   1. **Brief fit** — does each page do its job (§4) for its audience (§2) in the voice (§5)?
   2. **Hierarchy** — is the most important thing the most prominent? One clear primary action?
   3. **Layout** — alignment, consistent rhythm (`py-section`), no awkward widows, nothing
      overflowing or cramped at 390px.
   4. **Color & contrast** — both themes; inverted/muted sections read correctly.
   5. **Consistency** — tokens and existing sections used, not one-offs.
5. Output a prioritized list: `[P1|P2|P3] page · viewport · issue → proposed fix (file)`.
6. If asked to fix: apply P1s (and cheap P2s), re-shoot, confirm, and log.
