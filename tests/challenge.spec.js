// @ts-check

import { test, expect } from "@playwright/test";

// validate that EXACTLY the first 100 articles are sorted from newest to oldest.
test("sorted-ascending", async ({ page }) => {
  let publishedTimestamps = [];

  const addTimestamps = async (page) => {
    // get all published timestamps from a page of results
    const ageElements = await page.locator(".age").all();

    for (const post of ageElements) {
      if (publishedTimestamps.length === 100) break;
      const timestamp = await post.getAttribute("title");
      publishedTimestamps.push(timestamp);
    }
  };

  await page.goto("https://news.ycombinator.com/newest");
  await expect(page).toHaveURL("https://news.ycombinator.com/newest");
  await expect(page.locator(".topsel")).toContainText("new");
  await addTimestamps(page);

  // go to second page of results (results 31-60)
  await page.getByRole("link", { name: "More" }).locator("nth=-1").click();
  await expect(page).toHaveURL(/&n=31/);
  await addTimestamps(page);

  // go to third page of results (results 61-90)
  await page.getByRole("link", { name: "More" }).locator("nth=-1").click();
  await expect(page).toHaveURL(/&n=61/);
  await addTimestamps(page);

  // go to fourth page of results (results 91-120)
  await page.getByRole("link", { name: "More" }).locator("nth=-1").click();
  await expect(page).toHaveURL(/&n=91/);
  await addTimestamps(page);

  // console.log(publishedTimestamps, publishedTimestamps.length);
});
