import { test } from "@playwright/test";
import { pages } from "../src/content/pages";

/**
 * Captures full-page screenshots for visual review → .screenshots/
 * Run: npm run shots            (all pages)
 *      SHOTS_PATH=/about npm run shots   (one page)
 */
const viewports = { mobile: { width: 390, height: 844 }, desktop: { width: 1440, height: 900 } };
const schemes = ["light", "dark"] as const;

const allPaths = [...pages.map((p) => (p.slug === "" ? "/" : `/${p.slug}`)), "/styleguide"];
const paths = process.env.SHOTS_PATH ? [process.env.SHOTS_PATH] : allPaths;

for (const path of paths) {
  for (const [device, viewport] of Object.entries(viewports)) {
    for (const scheme of schemes) {
      test(`${path} ${device} ${scheme}`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
        await page.goto(path);
        await page.waitForLoadState("networkidle");
        await page.evaluate(() => document.fonts.ready);
        const name = path === "/" ? "home" : path.slice(1).replaceAll("/", "_");
        await page.screenshot({
          path: `.screenshots/${name}.${device}.${scheme}.png`,
          fullPage: true,
        });
      });
    }
  }
}
