import {test, expect} from '@playwright/test';
import { LoginPage } from "../pages/login.page";
import dotenv from "dotenv";

dotenv.config();

// const standard_user = process.env.STANDARD_USER;
// const password = process.env.PASSWORD;


test.describe('Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Always start on the login page
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');
  });

  test('Successful login redirects to Inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;

    if (!username || !password) {
      throw new Error('Missing USERNAME or PASSWORD in .env file');
    }

    await loginPage.login(username, password);

    // After logging in, user should land on inventory page
    await expect(page).toHaveURL(/inventory\.html/);
  });

});






  // test("a login test using stored credentials", async ({ page }) => {
  //   const loginPage = new LoginPage(page);
  //   await loginPage.login(standard_user!, password!);
  //   await expect(page).toHaveURL(/inventory.html/);
  // });








