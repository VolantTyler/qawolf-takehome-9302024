// @ts-check

import { test, expect } from "@playwright/test";

test("basic validation", async ({ page }) => {
  await page.goto("https://news.ycombinator.com/newest");

  await expect(page).toHaveURL("https://news.ycombinator.com/newest");
  await expect(page.locator(".topsel")).toContainText("new");
});

// validate that EXACTLY the first 100 articles are sorted from newest to oldest.
test("sorted-ascending", async ({ page }) => {
  await page.goto("https://news.ycombinator.com/newest");

  const ageElements = page.locator(".age").first();
  console.log(ageElements);
});
