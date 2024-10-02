import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://news.ycombinator.com/newest");
  await page.getByRole("link", { name: "1 minute ago" }).click();
});
