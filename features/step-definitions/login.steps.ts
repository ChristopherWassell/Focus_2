import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

Given('I am on the login page', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.goto();
});

When('I login with valid credentials', async function () {
  await loginPage.login('standard_user', 'secret_sauce');
});

Then('I should be redirected to the inventory page', async function () {
  inventoryPage = new InventoryPage(this.page);
  await expect(this.page).toHaveURL(/inventory.html/);
});

Then('I should see the product listings', async function () {
  await expect(inventoryPage.productList).toBeVisible();
});

