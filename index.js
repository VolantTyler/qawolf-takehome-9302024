// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const { expect } = require("playwright/test");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  let publishedTimestamps = [];

  const addTimestamps = async (page) => {
    // get all published timestamps from each page of results
    const ageElements = await page.locator(".age").all();

    for (const post of ageElements) {
      // determine sort order when we have exactly 100 timestamps
      // don't determine based on each page's results, as this would not pick up a false result between the last item of one page and the first item of the next page
      if (publishedTimestamps.length === 100) {
        // determine sort order
        for (let i = 0; i < publishedTimestamps.length - 1; i++) {
          const dateFirst = new Date(publishedTimestamps[i]);
          const dateSecond = new Date(publishedTimestamps[i + 1]);
          expect(dateFirst.getTime()).toBeGreaterThanOrEqual(
            dateSecond.getTime()
          );
        }
      }
      // add timestamp to full array only if we do not yet have 100 entries
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
}

(async () => {
  await sortHackerNewsArticles();
})();
