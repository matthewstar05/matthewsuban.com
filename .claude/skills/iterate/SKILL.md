---
name: iterate
description: The default improvement loop for this site — pick the next backlog item (or the user's request), implement it in small steps, verify, visually review, and log. Use whenever asked to "keep going", "improve the site", "work on the next thing", or to run autonomously.
---

# Iterate

One iteration = one coherent, verified, logged change. Prefer several small iterations to one big one.

## 1. Orient (keep it quick)

- Read `docs/BRIEF.md`, the top of `docs/BACKLOG.md` (**Now**, then **Next**), and the last 2–3
  entries of `docs/LOG.md`.
- If the user gave a specific request, that's the task. Otherwise take the top unchecked item.
- If the brief is still the template, stop and run `/kickoff` instead.
- State the task and your acceptance criteria in one or two lines before starting.

## 2. Plan the smallest change

Choose the lowest layer that can do the job:

1. Content edit (`src/content/`) →
2. Existing section with a new/changed prop →
3. New section type (`/new-section`) →
4. Token change (`/retheme`) →
5. Bespoke route or new infrastructure (write an ADR if it's hard to reverse).

## 3. Build

Make the change. Keep content as data and styling on tokens (see `AGENTS.md` rules).

## 4. Verify

```bash
npm run verify && npm run test:e2e
```

Fix failures at the root cause; don't weaken tests to pass unless the test itself is wrong (say so).

## 5. Look at it

For anything visible: `SHOTS_PATH=/<page> npm run shots` and open the PNGs in `.screenshots/`
(mobile + desktop, light + dark). Check hierarchy, spacing rhythm, alignment, overflow on mobile,
contrast in dark mode, and whether it serves the brief's goal for that page. For bigger visual
changes, ask the `designer` subagent for a critique and apply what's worthwhile.

## 6. Record

- Append a `docs/LOG.md` entry (template at the top of that file).
- Check off the backlog item with today's date under **Done**; add discovered follow-ups to
  **Next**/**Later**.

## 7. Report

Tell the user in a few lines: what changed, how it was verified, and what's next. If running
autonomously, continue to the next backlog item unless it needs a user decision (brand, budget,
third-party accounts, publishing) — then stop and ask.
