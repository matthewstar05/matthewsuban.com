# 0002 - A coherent living forest and private notes

- **Status:** accepted
- **Date:** 2026-10-11

## Context

Matthew requested an anime game atmosphere with interactive scene assets,
an animated background, 4K detail, music and a full-screen arrival. A generated
Flow video changed the painting style and deformed foliage independently of
foreground objects. The user rejected that mismatch.

## Decision

Render a controlled 16-second 4K loop from the matching original painting. Add
live WebGL reactions with the same shader and a shared video/breeze clock. Keep landmarks anchored and use the same image for static fallback.
Host all original art and audio locally. Retain the content-page registry and
server section wrapper, with browser interactivity isolated in woodland components.

Until a public guestbook service and moderation policy are chosen, the mailbox
stores private notes in the visitor's browser. Its UI explicitly says notes
are not sent to Matthew. Unknown biography and contact details remain unclaimed.

## Consequences

The forest keeps its composition and visual style, and responds immediately to
wind without generative scene changes. Reduced motion shows the matching still;
unavailable WebGL leaves the ambient video playing, and unavailable video
leaves live shader animation. Public messages and actual contact delivery require a
separate backend decision. The enhanced 4K art is documented as upscaled.
