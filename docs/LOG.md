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

## 2026-10-11 - Matthew's living forest

- **Goal:** turn the template into an immersive anime forest with usable scene
  objects, moving foliage, crisp 4K artwork, music and small discoveries.
- **Changed:** filled the brief; added a registered woodland section and original
  illustrations, cream/moss tokens, serif and handwritten fonts, responsive
  full-viewport composition, themed inner pages and route transitions. Added
  pointer-driven collectible leaves, branch gusts, spirit reminders, pond
  breathing and a clearly private local-storage mailbox. An original ambient
  track and persistent player provide actual playback, seeking, volume and mute.
- **Decisions:** see `decisions/0002-living-forest-and-local-notes.md`. Replaced the
  rejected Flow video with a controlled 16-second 4K loop rendered from matching
  original art, plus live WebGL wind reactions sharing the interactive leaves
  and video clock. The 4K texture is AI-enhanced;
  source and generation details are in `ASSETS.md`. No runtime dependencies were
  added. Asset preparation tools were temporary, outside the application.
- **Verified:** `npm run verify` passed, including 28 unit tests and the production
  build. All 23 production Playwright tests and 24 screenshot captures passed.
  Reviewed all six pages on mobile and desktop in light/dark themes, plus short
  portrait and landscape windows. Chrome playback confirmed the real 3840 × 2160
  loop, live branch reactions and working audio. Tests cover shared wind,
  keyboard leaves, notes, breathing, playback persistence, pause, reduced motion
  and media failure. Fixed mobile header clipping, crowded landscape controls
  and an empty home-page title. Production tests also exposed a pre-existing
  soft 404 under Cache Components; unknown slugs now return an actual 404.
- **Follow-ups:** real biography, project history, journal entries and public
  contact details need user-supplied facts. Public guestbook delivery and hosting
  remain separate follow-ups.

## 2026-10-11 - Crisp, continuous forest animation

- **Goal:** correct the soft and choppy wallpaper animation reported by the user.
- **Changed:** replace the 24 fps idle video / 30 fps reaction overlay with one
  continuous GPU renderer of the full 4K painting. Remove the layer crossfade,
  follow physical display density on Retina phones, align the still and animated
  camera crops, and replace color-keyed
  displacement masks with smooth spatial masks. Retain video as a WebGL fallback
  and suspend rendering when hidden or offscreen. No dependencies or new remote
  asset generation were needed.
- **Verified:** `npm run verify` passed, including 28 unit tests and the build;
  all 25 production browser tests and 24 screenshot captures passed. Reviewed
  moving desktop/mobile scenes in both themes and checked the scene in native
  Chrome. A local Metal-backed Chromium benchmark, forcing GPU completion,
  drew 241 frames in 4.00 seconds at a true 3840 × 2160 buffer: median 16.7 ms,
  95th percentile 16.9 ms, no intervals above 33.4 ms. A 3× phone used its full
  1170 × 2532 buffer with a 16.7 ms median. The old reaction layer drew 73 frames
  in 2.51 seconds at roughly 33 ms intervals. These are local measurements,
  not a guarantee for every device. Tests verify continuous frame drawing,
  full-density phone resizing, no primary-path video downloads, and capability
  failure fallbacks.

## 2026-10-11 - Slower, rippling tree motion

- **Goal:** make the trees ripple smoothly and stop gusts snapping back quickly.
- **Changed:** replace instantaneous gust displacement and fast exponential
  recovery with damped spring momentum. Four delayed bend samples ripple across
  the canopy, peak gradually, and rebound with a roughly 14-second settling
  tail. Repeated gusts add momentum without resetting the painting. Ease pointer
  position and wind through the same spring model, slow fine foliage flutter,
  and slightly deepen the broad canopy sway. Preserve the full-resolution,
  display-cadence renderer and anchored landmarks. Update the offline loop
  exporter for the new gust uniform. No dependencies or remote assets added.
- **Verified:** `npm run verify` passed with 31 unit tests and the production
  build. All 26 production browser tests and four home screenshot captures
  passed. Reviewed animated mobile/desktop scenes in both themes and a canopy
  sequence through the bend, traveling ripple, rebound and settling phases.
  A browser regression test checks delayed bend peaks, continuous displacement
  and retriggering; unit tests cover slow recovery and refresh-rate independence.
  A local Metal-backed Chromium check, forcing GPU completion during the gust,
  drew 240 frames in four seconds at 3840 × 2160: median 16.7 ms, 95th percentile
  16.8 ms, no intervals over 33.4 ms. The updated scene is running in Chrome.
- **CI follow-up:** the slower remote renderer exposed a test comparison spanning
  the entire click delay. Compare consecutive actual draws when checking repeat
  gust continuity, so legitimate motion during the click cannot look like a snap.

## 2026-10-12 - Stable hover highlights

- **Goal:** stop highlighted scene objects snapping to another glow color.
- **Found:** a leaf crossing the pointer stole the object's hover, reverting its
  gold halo to the dark ground shadow. Explicit dark mode also replaced the
  whole image filter, overriding hover, while system dark used different rules.
- **Changed:** keep ground shadows and gold halos separate in a consistent
  filter list; fade halo opacity rather than mixing shadow hues. Apply night
  brightness and saturation independently in explicit and system dark themes.
  Passing leaves stack behind scene destinations, with keyboard-focused leaves
  lifted above them. Apply the same fixed-hue treatment to leaf highlights.
  No dependencies or assets changed.
- **Verified:** `npm run verify` passed with 31 unit tests and the production
  build; all 29 production browser tests and four home screenshot captures
  passed, including `/styleguide`. New tests reproduce a leaf crossing the
  pointer in light, explicit dark and system dark, check stable highlighting,
  and confirm an overlapping leaf can still be focused and collected by keyboard.
  Reviewed hovered desktop/mobile scenes in both themes; the held highlight's
  computed filter stayed unchanged while the forest continued animating.
