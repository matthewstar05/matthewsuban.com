import { expect, test } from "@playwright/test";

async function stillForest(page: import("@playwright/test").Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
}

test("the living 4K painting responds to a gust and pauses cleanly", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const painting = page.locator(".living-forest");
  await expect(page.locator("video")).toHaveCount(0);
  await expect(painting).toHaveClass(/is-ready/);
  await expect(painting).toHaveAttribute("data-source-width", "3840");
  await expect.poll(() => painting.evaluate((c: HTMLCanvasElement) => c.width)).toBe(1440);
  const before = await painting.screenshot();
  await page.getByRole("button", { name: "Gently shake the leafy branch" }).click();
  await expect
    .poll(async () => Number(await painting.getAttribute("data-gust")))
    .toBeGreaterThan(0.2);
  const after = await painting.screenshot();
  expect(before.equals(after)).toBe(false);
  await page.getByRole("button", { name: "Pause the forest motion" }).click();
  await expect(painting).toHaveCount(0);
  await expect(page.locator("video")).toHaveCount(0);
  await expect(page.locator(".world-art")).toBeVisible();
  await page.getByRole("button", { name: "Resume the forest motion" }).click();
  await expect(painting).toHaveClass(/is-ready/);
  await page.getByRole("button", { name: "Quiet mode", exact: true }).click();
  await expect(painting).toHaveCount(0);
  await expect(page.locator(".living-leaf")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Visit the treehouse: about Matthew" }),
  ).toBeVisible();
});

test("Retina phones keep full display resolution when animated or resized", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const videos: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".mp4")) videos.push(request.url());
  });
  await page.goto("/");
  const painting = page.locator(".living-forest");
  await expect(painting).toHaveClass(/is-ready/);
  expect(await painting.evaluate((c: HTMLCanvasElement) => [c.width, c.height])).toEqual([
    1170, 2532,
  ]);
  await page.setViewportSize({ width: 390, height: 667 });
  await expect
    .poll(() => painting.evaluate((c: HTMLCanvasElement) => [c.width, c.height]))
    .toEqual([1170, 2001]);
  expect(videos).toEqual([]);
  await context.close();
});

test("a gust bends gradually, ripples across trees and rebounds without resetting", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() => {
    const wind = window as typeof window & {
      forestBends: { time: number; fronts: number[] }[];
    };
    wind.forestBends = [];
    const uniform = WebGLRenderingContext.prototype.uniform4f;
    WebGLRenderingContext.prototype.uniform4f = function (location, ...fronts) {
      wind.forestBends.push({ time: performance.now(), fronts });
      return uniform.call(this, location, ...fronts);
    };
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".living-forest")).toHaveClass(/is-ready/);
  const branch = page.getByRole("button", { name: "Gently shake the leafy branch" });
  await branch.click();
  // Wait for the actual spring rebound rather than imposing wall-clock timing
  // on slower CI graphics devices.
  await expect
    .poll(() =>
      page.evaluate(() =>
        Number(document.querySelector(".living-forest")?.getAttribute("data-gust")),
      ),
    )
    .toBeGreaterThan(0.9);
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const wind = window as typeof window & {
            forestBends: { time: number; fronts: number[] }[];
          };
          return wind.forestBends.at(-1)!.fronts[0];
        }),
      { timeout: 12_000 },
    )
    .toBeLessThan(-0.2);
  const trace = await page.evaluate(() => {
    const wind = window as typeof window & {
      forestBends: { time: number; fronts: number[] }[];
    };
    return wind.forestBends;
  });
  const peaks = [0, 3].map((front) =>
    trace.reduce((best, sample) => (sample.fronts[front] > best.fronts[front] ? sample : best)),
  );
  expect(peaks[1].time - peaks[0].time).toBeGreaterThan(500);
  const jumps = trace.slice(1).map((sample, i) => Math.abs(sample.fronts[0] - trace[i].fronts[0]));
  expect(Math.max(...jumps)).toBeLessThan(0.15);
  const beforeRepeat = trace.at(-1)!.fronts[0];
  await branch.click();
  const afterRepeat = await page.evaluate(
    () =>
      new Promise<number>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const wind = window as typeof window & {
              forestBends: { time: number; fronts: number[] }[];
            };
            resolve(wind.forestBends.at(-1)!.fronts[0]);
          });
        });
      }),
  );
  expect(Math.abs(afterRepeat - beforeRepeat)).toBeLessThan(0.15);
});

async function withoutWebGL(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = new Proxy(HTMLCanvasElement.prototype.getContext, {
      apply(target, canvas, args) {
        return args[0] === "webgl" ? null : Reflect.apply(target, canvas, args);
      },
    });
  });
}

test("video remains a working fallback when WebGL is unavailable", async ({ page }) => {
  await withoutWebGL(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const video = page.locator("video");
  await expect(page.locator(".living-forest")).toHaveCount(0);
  await expect(video).toHaveClass(/is-ready/);
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => [v.videoWidth, v.videoHeight]))
    .toEqual([3840, 2160]);
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
    .toBeGreaterThan(0);
  expect(await video.evaluate((v: HTMLVideoElement) => v.loop && v.muted && v.playsInline)).toBe(
    true,
  );
});

test("the static painting remains usable if both animation paths fail", async ({ page }) => {
  await withoutWebGL(page);
  await page.route("**/media/forest-coherent-*.mp4", (route) => route.abort());
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("video")).toHaveCount(0);
  await expect(page.locator(".living-forest")).toHaveCount(0);
  await expect(page.locator(".world-art")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Visit the treehouse: about Matthew" }),
  ).toBeVisible();
});

test("the painting draws continuously at display cadence without the old 30 fps gate", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const counter = window as typeof window & { forestDraws: number };
    counter.forestDraws = 0;
    const draw = WebGLRenderingContext.prototype.drawArrays;
    WebGLRenderingContext.prototype.drawArrays = function (...args) {
      counter.forestDraws++;
      return draw.apply(this, args);
    };
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".living-forest")).toHaveClass(/is-ready/);
  const frames = await page.evaluate(async () => {
    const counter = window as typeof window & { forestDraws: number };
    const before = counter.forestDraws;
    let displayFrames = 0;
    await new Promise<void>((resolve) => {
      function next() {
        if (++displayFrames === 24) resolve();
        else requestAnimationFrame(next);
      }
      requestAnimationFrame(next);
    });
    return { drawn: counter.forestDraws - before, displayFrames };
  });
  expect(frames.drawn).toBeGreaterThanOrEqual(frames.displayFrames - 1);
});

test("reduced motion keeps nine keyboard-collectible leaves and no video", async ({ page }) => {
  await stillForest(page);
  await expect(page.locator("video, .living-forest")).toHaveCount(0);
  const leaf = page.getByRole("button", { name: "Keep leaf 1", exact: true });
  await leaf.focus();
  await page.keyboard.press("Enter");
  await expect(leaf).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Leaf keepsakes: 1 of 9" })).toBeVisible();
  for (let i = 2; i <= 9; i++) {
    await page.getByRole("button", { name: `Keep leaf ${i}`, exact: true }).focus();
    await page.keyboard.press("Enter");
  }
  await expect(page.locator(".living-leaf")).toHaveCount(0);
  await expect(page.locator(".world-dialogue")).toContainText("all nine");
});

test("branch gust and pointer wind affect live leaf positions", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const leaf = page.getByRole("button", { name: "Keep leaf 1", exact: true });
  await expect.poll(() => leaf.evaluate((el) => el.style.transform)).not.toBe("");
  const before = await leaf.boundingBox();
  await page.getByRole("button", { name: "Gently shake the leafy branch" }).click();
  await expect(page.locator(".world-dialogue")).toContainText("little breeze");
  await expect.poll(async () => (await leaf.boundingBox())!.x - before!.x).toBeGreaterThan(15);
  const near = (await leaf.boundingBox())!;
  await page.mouse.move(near.x - 70, near.y);
  await page.mouse.move(near.x + 70, near.y, { steps: 5 });
  await expect
    .poll(async () => Math.abs((await leaf.boundingBox())!.x - near.x))
    .toBeGreaterThan(10);
});

test("painted objects navigate while the soundtrack stays mounted", async ({ page }) => {
  await stillForest(page);
  const audio = page.locator("audio");
  if (await page.getByRole("button", { name: "Play music", exact: true }).isVisible())
    await page.getByRole("button", { name: "Play music", exact: true }).click();
  await expect(page.getByRole("button", { name: "Pause music", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Expand music player" }).click();
  await page.getByRole("slider", { name: "Song position" }).fill("12");
  await page.getByRole("slider", { name: "Music volume" }).fill("0.2");
  expect(await audio.evaluate((a: HTMLAudioElement) => a.volume)).toBe(0.2);
  await audio.evaluate((a) => a.setAttribute("data-persistent-check", "same-node"));
  await page.getByRole("link", { name: "Visit the treehouse: about Matthew" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(audio).toHaveAttribute("data-persistent-check", "same-node");
  expect(await audio.evaluate((a: HTMLAudioElement) => a.currentTime)).toBeGreaterThan(11);
  await page.getByRole("button", { name: "Pause music", exact: true }).click();
  expect(await audio.evaluate((a: HTMLAudioElement) => a.paused)).toBe(true);
  await page.getByRole("button", { name: "Mute music", exact: true }).click();
  expect(await audio.evaluate((a: HTMLAudioElement) => a.volume)).toBe(0);
  await page.getByRole("button", { name: "Restart song" }).click();
  expect(await audio.evaluate((a: HTMLAudioElement) => a.currentTime)).toBe(0);
});

test("private notes persist locally, escape safely, and can be cleared", async ({ page }) => {
  await stillForest(page);
  await page.getByRole("button", { name: "Open the mailbox guestbook" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("aren't sent to Matthew");
  await page.getByRole("textbox", { name: "Your name" }).fill("Wanderer");
  await page
    .getByRole("textbox", { name: "Your little note" })
    .fill("<script>not executable</script> a little sunlight");
  await page.getByRole("button", { name: "plant a little note" }).click();
  await expect(dialog.locator("article")).toContainText("<script>not executable</script>");
  await expect(dialog.locator("script")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "Open the mailbox guestbook" }).click();
  await expect(dialog.locator("article")).toContainText("a little sunlight");
  await page.getByRole("button", { name: "clear my notes" }).click();
  await expect(dialog.locator("article")).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem("matthew-garden-notes-v1"))).toBeNull();
});

test("pond, spirit, and map are usable scene interactions", async ({ page }) => {
  await stillForest(page);
  await page.getByRole("button", { name: "Say hello to the little forest spirit" }).click();
  await expect(page.locator(".world-dialogue")).toContainText("bloom");
  await page.getByRole("button", { name: "Rest by the pond: a breathing break" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "take a slow breath" }).click();
  await expect(page.locator(".breathing-orbit")).toContainText("breathe in");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("button", { name: "Open the forest map" }).click();
  await expect(page.locator("#forest-map")).toBeInViewport();
});

for (const [width, height] of [
  [320, 568],
  [844, 390],
  [390, 667],
  [390, 844],
  [768, 900],
  [1440, 900],
  [1280, 720],
]) {
  test(`scene fits ${width}x${height} and controls stay accessible`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await stillForest(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    const scene = (await page.locator(".world-scene").boundingBox())!;
    expect(scene.y).toBe(0);
    expect(scene.height).toBe(height);
    expect(scene.width).toBe(width);
    if (width === 1440) {
      expect(
        await page
          .locator(".world-copy h1")
          .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
      ).toBeGreaterThan(80);
    }
    for (const control of await page.locator(".world-hud-actions button").all()) {
      expect(
        await control.evaluate((el) => {
          const rect = el.getBoundingClientRect();
          return el.contains(
            document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2),
          );
        }),
      ).toBe(true);
    }
    for (const object of await page.locator(".world-object").all()) {
      const box = (await object.boundingBox())!;
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.x).toBeGreaterThanOrEqual(scene.x);
      expect(box.x + box.width).toBeLessThanOrEqual(scene.x + scene.width);
    }
  });
}
