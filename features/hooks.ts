import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

// Optional: set a default timeout for all steps (e.g., 30s)
setDefaultTimeout(30 * 1000);

// Declare variables to hold the browser and page instances
let browser: Browser;
let page: Page;

/**
 * Before hook runs before each scenario
 * - Opens a new browser and page
 * - Attaches the page to the scenario context via `this.page`
 */
Before(async function () {
  // Launch a new browser instance
  browser = await chromium.launch({
    headless: false, // set to true if you don't need UI
  });

  // Open a new tab / page
  page = await browser.newPage();

  // Attach the page object to the Cucumber scenario context
  // This allows step definitions to access `this.page`
  this.page = page;
});

/**
 * After hook runs after each scenario
 * - Closes the page and browser
 * - Cleans up resources to avoid test interference
 */
After(async function () {
  if (page) {
    await page.close(); // close the tab
  }
  if (browser) {
    await browser.close(); // close the browser
  }
});
