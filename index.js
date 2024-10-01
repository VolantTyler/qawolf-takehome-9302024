// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const { expect } = require("playwright/test");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  await expect(page).toHaveURL("https://news.ycombinator.com/newest");
  await expect(page.locator(".topsel")).toContainText("new");
}

(async () => {
  await sortHackerNewsArticles();
})();
