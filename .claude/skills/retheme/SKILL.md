---
name: retheme
description: Change the site's visual identity — brand colors, fonts, radius, type scale, spacing rhythm — through design tokens. Use for rebranding, "make it feel more X", or matching a reference.
---

# Retheme

1. Read `docs/BRIEF.md` §6 (visual direction) and `docs/DESIGN.md`. If the user gave references,
   identify concretely what to borrow (palette, type, density, radius), not just "the vibe".
2. Edit tokens at the top of `src/app/globals.css`:
   - Colors: set **both** light and dark values in each `light-dark()`. Keep the role of each
     token (see the table in DESIGN.md).
   - Radius: `--radius-control`, `--radius-card` (0 for sharp, ~1rem+ for soft).
   - Type scale/rhythm: `--text-display*`, `--text-heading*`, `--spacing-section*`.
3. Fonts: change the `next/font/google` imports in `src/app/layout.tsx`, keeping the CSS variable
   names (or update the `@theme inline` mapping).
4. Sync hard-coded copies: `colors` in `src/app/opengraph-image.tsx`, `viewport.themeColor` in
   `layout.tsx`, fill in `src/app/icon.svg`.
5. Check contrast in both themes: foreground/background, muted-foreground/background,
   accent-foreground/accent, accent/background (≥ 4.5:1 for text, ≥ 3:1 for UI).
6. `npm run shots` → review `/styleguide` and the home page in light and dark, mobile and desktop.
7. Update the token table in `docs/DESIGN.md` if roles changed; log the change.
