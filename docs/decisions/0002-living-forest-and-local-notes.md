# 0002 - A coherent living forest and private notes

- **Status:** accepted
- **Date:** 2026-10-11

## Context

Matthew requested an anime game atmosphere with interactive scene assets,
an animated background, 4K detail, music and a full-screen arrival. A generated
Flow video changed the painting style and deformed foliage independently of
foreground objects. The user rejected that mismatch.

## Decision

Render the matching 4K painting continuously on the GPU, with a 16-second breeze
cycle and a shared clock for live reactions and collectible leaves. Draw at
display cadence and size the buffer for physical display pixels, within a 4K
pixel budget. Keep landmarks anchored and use the same image for static fallback.
The previously exported local video remains a fallback for unavailable WebGL.
The user reported the 24 fps video and 30 fps reaction overlay as soft and choppy;
the primary experience now has one renderer, with no compressed-video handoff.
Host all original art and audio locally. Retain the content-page registry and
server section wrapper, with browser interactivity isolated in woodland components.

Until a public guestbook service and moderation policy are chosen, the mailbox
stores private notes in the visitor's browser. Its UI explicitly says notes
are not sent to Matthew. Unknown biography and contact details remain unclaimed.

## Consequences

The forest keeps its composition and visual style, and responds immediately to
wind without generative scene changes. Reduced motion shows the matching still;
unavailable WebGL uses the ambient video, and failure of both animation paths
leaves the matching still. Public messages and actual contact delivery require a
separate backend decision. The enhanced 4K art is documented as upscaled.
