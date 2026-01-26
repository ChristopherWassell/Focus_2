import {test, expect} from '@playwright/test';
import { LoginPage } from "../pages/login.page";
import dotenv from "dotenv";

dotenv.config();

const standard_user = process.env.STANDARD_USER;
const password = process.env.PASSWORD;

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

  test("a login test using stored credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(standard_user!, password!);
    await expect(page).toHaveURL(/inventory.html/);
  });
});







