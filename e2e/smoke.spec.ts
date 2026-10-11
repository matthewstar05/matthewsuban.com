import { expect, test } from "@playwright/test";
import { pages } from "../src/content/pages";

const contentPaths = pages.map((p) => (p.slug === "" ? "/" : `/${p.slug}`));
const paths = [...contentPaths, "/styleguide"];

for (const path of paths) {
  test(`${path} renders without errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Matthew Suban/);
    // The styleguide renders a Hero sample, so only content pages must have exactly one h1.
    if (contentPaths.includes(path)) await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("unknown routes 404", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
});

test("theme toggle cycles and persists", async ({ page }) => {
  await page.goto("/");
  const toggle = page.locator("[data-theme-toggle]:visible");
  await expect(toggle).toHaveAttribute("data-theme-toggle", "system");
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
