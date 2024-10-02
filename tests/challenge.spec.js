// @ts-check

import { test, expect } from "@playwright/test";

// validate that EXACTLY the first 100 articles are sorted from newest to oldest.
test("sorted-ascending", async ({ page }) => {
  let publishedTimestamps = [];
  await page.goto("https://news.ycombinator.com/newest");

  const addTimestamps = async (page) => {
    // get all published timestamps from a page of results
    const ageElements = await page.locator(".age").all();
    console.log(ageElements.length);

    for (const post of ageElements) {
      const timestamp = await post.getAttribute("title");
      publishedTimestamps.push(timestamp);
    }
  };

  await page.goto("https://news.ycombinator.com/newest");
  await expect(page).toHaveURL("https://news.ycombinator.com/newest");
  await expect(page.locator(".topsel")).toContainText("new");
  addTimestamps(page);

  // go to second page of results (results 31-60)
  await page.getByRole("link", { name: "More" }).locator("nth=-1").click();
  await expect(page).toHaveURL(/&n=31/);
  addTimestamps(page);

  console.log(publishedTimestamps, publishedTimestamps.length);
});
