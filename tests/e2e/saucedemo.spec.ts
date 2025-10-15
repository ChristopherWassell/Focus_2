import { test, expect } from '@playwright/test';

test.describe('SauceDemo Login Test', () => {
  const username = 'standard_user';
  const password = 'secret_sauce';

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('should log in successfully and display the Products page', async ({ page }) => {
    // Fill in username and password
    await page.locator('[data-test="username"]').fill(username);
    await page.locator('[data-test="password"]').fill(password);

    // Click the login button
    await page.locator('[data-test="login-button"]').click();

    // Assert that the Products page title is visible
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });
});