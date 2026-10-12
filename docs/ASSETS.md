# Original forest assets

The forest painting and six transparent scene objects were generated for this
site with ChatGPT image generation. They are original anime-inspired
illustrations, not copies of album artwork or game assets.

- `public/media/forest-coherent-4k.webp`: 3840 × 2160 painted forest texture.
- `public/art/treehouse.png`: About destination.
- `public/art/workbench.png`: Projects destination.
- `public/art/journal.png`: Journal destination.
- `public/art/mailbox.png`: private browser guestbook.
- `public/art/pond.png`: breathing break.
- `public/art/spirit.png`: friendly forest character.

## Living painting

The background now uses the original forest artwork, enhanced locally from its
1586 × 992 source with the official
[Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN) macOS release and its
`realesr-animevideov3` model at 3×, then resized to 3840 × 2160. This is an
**AI-enhanced 4K texture**, not native 4K generation. Enhancement sharpens painted
edges without changing the scene's composition.

`LivingForest` animates the actual painting pixels directly on the GPU. Every
animation term repeats over 16 seconds; branch and pointer wind add live
reactions. It draws on every display frame, with no 30 fps throttle or transition
between video and canvas. Smooth spatial masks replace per-pixel color masks
that caused painted edges to tear and shimmer. The main trunks, path and
mountains stay anchored. No camera pan, zoom, generative morphing or scene
changes are used.

- `public/media/forest-coherent-4k.mp4`: 3840 × 2160 desktop loop.
- `public/media/forest-coherent-tablet.mp4`: 1920 × 1080 landscape loop.
- `public/media/forest-coherent-mobile.mp4`: 720 × 1440 portrait crop. Wider short
  phones use the landscape encode so the crop cannot change the composition.
- `public/media/forest-coherent-4k.webp`: matching 4K still texture and fallback.

`ForestBackdrop` uses the GPU painting as the primary animation and only loads
video if WebGL fails. The render buffer follows physical display pixels,
including 3× phones, within an 8.3-megapixel budget and 4096-pixel edge limit.
`LivingLeaves` reads the same continuous wind clock. Rendering suspends when
the scene is offscreen or the tab is hidden. The matching still remains below
the animation. Reduced motion, manual pause, quiet mode or failure of both
animation paths uses that still.

The three previously exported video fallbacks are 24 fps H.264. They preserve
the original composition but are not the normal playback path. Retina screens
use the 4K fallback rather than a CSS-width-selected low-resolution encode.
`scripts/render-forest-loop.mjs` can export the current shader; the shipped
fallbacks retain the earlier shader's color masks. No new provider generation
or credit spending was required for this correction.

The enhancement used a 3× model result resized and center-cropped to 4K. This
increases edge clarity but does not recover unknown original details exactly.
Responsive image sizing accounts for tall-screen cover crops. All artwork,
video and audio are local. No runtime dependency or remote media request was
added; FFmpeg and enhancement tools are only used offline.

Browser tests verify full-density phone buffers, continuous drawing at display
cadence, branch gusts, absence of video downloads on the primary path, and
video/static fallbacks when animation capabilities fail.

## Flow experiment

A real Flow image and video were generated in the user's existing authenticated
Chrome session, in this [project](https://flow.google.com/project/c3076cc6-088a-4be2-9865-cee98b94937c).
The image asset is `66b96483-2003-4702-99e5-34997e62ddcf`; the Veo 3.1 Quality
video asset is `2d0c6dd8-7f66-473e-a79e-fe095ba39b74`. One video generation showed
100 credits at submission. The downloaded eight-second video was 1920 × 1080.
The account's 4K export required an upgrade; no purchase or plan change was made.

The user rejected the video's appearance and its mismatch with the interactive
objects. It is not shipped. Raw downloads remain in Downloads; rejected video
encodes and earlier prototypes were moved to `/tmp/matthew-forest-prototypes`.
Enhancement tools and intermediate files are in `/tmp/matthew-video-tools`.
These temporary files are not required at runtime. Browser generation does not
imply the separate dedicated Flow MCP profile is authenticated.

## Soundtrack

`public/media/a-place-to-land.m4a` is an original 48-second ambient composition,
made by `scripts/compose-ambient.py` and encoded with macOS `afconvert`.
Periodic pad harmonics and soft bell notes meet at the loop boundary. This is
not a Porter Robinson recording. Music attempts autoplay at a gentle volume;
browsers can require the visitor to press Play. The interface reports actual
playback state and does not bypass browser autoplay restrictions.

## Interactive leaves

The nine SVG leaves are DOM controls with pointer-driven wind and a branch gust.
They share the painting's breeze and can also be collected by keyboard. Reduced
motion keeps them stationary; quiet mode hides them. All essential destinations
also appear in the plain navigation map.
