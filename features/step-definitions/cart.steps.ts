import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CartPage } from '../../pages/Cart.page'; // relative import to CartPage POM

// Variable to hold the CartPage instance
let cartPage: CartPage;

/**
 * Step: Ensure the user is on the "Your Cart" page
 * This should be called after navigating to the cart
 */
Given('I am on the cart page', async function () {
  // Initialize the CartPage POM with the current Playwright page
  cartPage = new CartPage(this.page);

  // Verify the URL is correct for the cart page
  await expect(this.page).toHaveURL(/cart.html/);
});

/**
 * Step: Verify a specific item is listed in the cart
 * @param itemName - name of the product expected in the cart
 */
Then('I should see {string} in the cart', async function (itemName: string) {
    // Call the POM method which already asserts visibility
    await cartPage.verifyItemPresent(itemName);
  });

/**
 * Step: Click the "Checkout" button to begin the checkout process
 */
When('I proceed to checkout', async function () {
  // Use CartPage POM method to click the Checkout button
  await cartPage.clickCheckout();
});
