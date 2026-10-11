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

`scripts/render-forest-loop.mjs` renders the actual painting pixels through the
same WebGL shader used by live reactions. Every animation term repeats over
16 seconds. It exports 384 frames at 24 fps, encoded as silent H.264 with
fast-start. Soft spatial masks make the canopy, leaf clusters and meadow sway
while the main trunks, path and mountains stay anchored. No camera pan, zoom,
generative morphing or scene changes are used.

- `public/media/forest-coherent-4k.mp4`: 3840 × 2160 desktop loop.
- `public/media/forest-coherent-tablet.mp4`: 1920 × 1080 landscape loop.
- `public/media/forest-coherent-mobile.mp4`: 720 × 1440 portrait crop. Wider short
  phones use the landscape encode so the crop cannot change the composition.
- `public/media/forest-coherent-4k.webp`: matching 4K still texture and fallback.

`ForestBackdrop` plays the loop. `LivingForest` adds live pointer and branch-gust
reactions, using the same painting, shader and video time. It fades in during
interaction, preserving the camera and landmarks. `LivingLeaves` reads the same
wind clock. The live buffer follows pixel density up to 3840 × 2160 with a 30 fps
ceiling; it stops drawing when idle behind the video or when the tab is hidden.
If video cannot load, the live shader supplies ambient movement. If WebGL is
unavailable, the video still plays. The matching static painting remains below
both layers. Reduced motion, manual pause and quiet mode use that still.

The enhancement used a 3× model result resized and center-cropped to 4K. This
increases edge clarity but does not recover unknown original details exactly.
Responsive image sizing accounts for tall-screen cover crops. All artwork,
video and audio are local. No runtime dependency or remote media request was
added; FFmpeg and enhancement tools are only used offline.

Frame checks on the finished render showed moving canopy and grass, identical
mountain pixels, and much smaller changes at the loop boundary than midway
through the sway. Browser tests verify the actual 4K stream, playing state,
16-second duration, responsive encodes, gusts and media-failure fallback.

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
