# Design system

The visual system is deliberately small so it's easy to rebrand and hard to drift. All values live
in `src/app/globals.css`. `/styleguide` renders all of it.

## Tokens

| Token                    | Utility examples                         | Role                                   |
| ------------------------ | ---------------------------------------- | -------------------------------------- |
| `--background`           | `bg-background`                          | Page background                        |
| `--foreground`           | `text-foreground`                        | Primary text                           |
| `--surface`              | `bg-surface`                             | Cards, raised elements                 |
| `--muted`                | `bg-muted`                               | Subtle fills, hover, muted sections    |
| `--muted-foreground`     | `text-muted-foreground`                  | Secondary text                         |
| `--border`               | `border-border`                          | Hairlines, dividers                    |
| `--accent`               | `bg-accent` `text-accent` `bg-accent/10` | Brand color, primary actions, links    |
| `--accent-foreground`    | `text-accent-foreground`                 | Text on accent                         |
| `--radius-control/card`  | `rounded-control` `rounded-card`         | Buttons/inputs vs. cards               |
| `--spacing-gutter`       | `px-gutter`                              | Horizontal page padding (fluid)        |
| `--spacing-section(-lg)` | `py-section` `py-section-lg`             | Vertical rhythm between sections       |
| `--text-display/heading` | `text-display` `text-heading`            | H1 / H2 (fluid size, tracking, weight) |

Each color is defined once with `light-dark(<light>, <dark>)`. The active scheme comes from
`color-scheme`: system by default, overridden by `<html data-theme="light|dark">` (set by the theme
toggle and an inline pre-paint script).

## Rules

1. Components use token utilities only — no hex, no `dark:` variants, no arbitrary color values.
2. Need a new color role? Add a token (both light and dark values) and map it in `@theme inline`
   rather than one-off values. Document it in the table above.
3. Section tones: `default`, `muted` (`bg-muted`), `inverted` (flips the scheme for that section).
4. Contrast: body text ≥ 4.5:1, large text and UI ≥ 3:1, in **both** themes. Check accent on
   background and accent-foreground on accent whenever the accent changes.
5. Width: `Container` sizes — `prose` (reading), `default` (most sections), `wide`.
6. Motion: subtle and optional; respect `prefers-reduced-motion`.
7. When you change tokens, also update the hard-coded colors in `src/app/opengraph-image.tsx`
   and `viewport.themeColor` in `src/app/layout.tsx`.

## Fonts

Geist Sans / Geist Mono via `next/font/google` in `layout.tsx`, exposed as `--font-geist-*` and
mapped to `font-sans` / `font-mono`. To change fonts, swap the imports in `layout.tsx` and keep
the variable names (or update the `@theme inline` mapping).

## Matthew's daydream forest

Cream paper and moss ink surround an original painterly anime forest. The scene
uses six transparent illustrations as links and activities, with labels and a
plain map as navigation alternatives. Hover and focus lift objects; leaves react
to pointer wind and a branch gust. Dialogue and a keepsake pouch give feedback.

Cormorant Garamond supplies the large italic title and editorial headings.
Caveat supplies handwritten greetings and reminders. Geist remains the small UI
face. All are self-hosted by Next's font loader.

The world uses dedicated `--world-*` tokens for ink, paper labels, glow and night
shade. Dark mode keeps the original artwork recognizable with a night overlay
and visible stars. Mobile repositions the scene objects rather than shrinking
the desktop layout. All essential object destinations also appear in the map.

Animation pauses with reduced motion or the forest control. The music player
stays mounted between routes and reflects actual audio playback. On small
screens its default compact form leaves more room for the world.
