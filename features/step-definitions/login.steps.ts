import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/Inventory.page'; // use relative path

// POM instances
let loginPage: LoginPage;
let inventoryPage: InventoryPage;

/**
 * Step: Navigate to login page
 * - Initializes LoginPage POM
 * - Uses POM.goto() to open the login page
 */
Given('I am on the login page', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.goto();
});

/**
 * Step: Log in with standard credentials
 * - Calls LoginPage.login()
 */
When('I login with valid credentials', async function () {
  await loginPage.login('standard_user', 'secret_sauce');

  // Initialize InventoryPage POM after login
  inventoryPage = new InventoryPage(this.page);
});

/**
 * Step: Verify we are on the inventory page
 * - Uses Playwright expect() to assert URL
 */
Then('I should be redirected to the inventory page', async function () {
  await expect(this.page).toHaveURL(/inventory.html/);
});

/**
 * Step: Verify product listings are visible
 * - Calls InventoryPage.productList locator
 * - productList needs to be defined in InventoryPage POM:
 *
 *   readonly productList: Locator;
 *   this.productList = page.locator('.inventory_list');
 */
Then('I should see the product listings', async function () {
  await expect(inventoryPage.productList).toBeVisible();
});


