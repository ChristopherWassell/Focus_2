import {test, expect} from '@playwright/test';
import { LoginPage } from "../pages/login.page";


test.describe('Login Page Tests', () => {

    
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');
  });

  test("should display correct url", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(page).toHaveURL('https://www.saucedemo.com');
  });
});





