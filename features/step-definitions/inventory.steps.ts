import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../../pages/Inventory.page'; // relative import to InventoryPage POM

// Variable to hold the InventoryPage instance
let inventoryPage: InventoryPage;

/**
 * Step: Ensure the user is on the product catalog page
 * This can be used after login to confirm we are on inventory page
 */
Given('I am on the product catalog page', async function () {
  // Initialize InventoryPage with the current Playwright page
  inventoryPage = new InventoryPage(this.page);

  // Verify that the URL is correct for inventory page
  await expect(this.page).toHaveURL(/inventory.html/);

  // Optional: verify product list container is visible
  await expect(inventoryPage.productList).toBeVisible();
});

/**
 * Step: Add a specific product to the cart
 * @param itemName - name of the product to add (e.g., "Sauce Labs Backpack")
 */
When('I add {string} to the cart', async function (itemName: string) {
  // Call the POM method to click the "Add to cart" button for the product
  await inventoryPage.addToCart(itemName);
});

/**
 * Step: Verify the cart badge shows the expected number of items
 * @param count - expected number as string (e.g., "1")
 */
Then('the cart badge should show {string}', async function (count: string) {
  // Wait for the cart badge to have the expected text
  await expect(inventoryPage.cartBadge).toHaveText(count);
});

/**
 * Step: Open the shopping cart page
 * This simulates the user clicking the cart icon
 */
When('I go to the shopping cart', async function () {
  // Call the POM method to click the cart icon
  await inventoryPage.openCart();
});
