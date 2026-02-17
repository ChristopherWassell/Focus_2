import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../../pages/Inventory.page'; // relative import to InventoryPage POM
import { CartPage } from '../../pages/Cart.page';
import { CheckoutStepOnePage } from '../../pages/CheckoutStepOne.page';
import { CheckoutStepTwoPage } from '../../pages/CheckoutStepTwoPage.page';
import { CheckoutCompletePage } from '../../pages/CheckoutComplete.page';
import { LoginPage } from '../../pages/login.page';



// Variable to hold pages
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutStepOnePage: CheckoutStepOnePage;
let checkoutStepTwoPage: CheckoutStepTwoPage;
let checkoutCompletePage: CheckoutCompletePage;
let loginPage: LoginPage;


Given('I am a registered user and have logged in successfully', async function () {
loginPage = new LoginPage(this.page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(this.page).toHaveURL(/inventory.html/);
});

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

Then('I continue to checkout information page', async function () {
  // Verify the URL for the checkout information page
  await expect(this.page).toHaveURL(/checkout-step-one.html/);
});


/**
 * Step: Fill in shipping information on Checkout Step One page
 * @param firstName - First Name
 * @param lastName - Last Name
 * @param postalCode - Postal Code
 */
When(
  'I enter valid shipping information: {string}, {string}, {string}',
  async function (firstName: string, lastName: string, postalCode: string) {
    // Initialize CheckoutStepOnePage POM
    checkoutStepOnePage = new CheckoutStepOnePage(this.page);
    

    // Use POM method to fill in the shipping form
    await checkoutStepOnePage.enterInformation(firstName, lastName, postalCode);
  }
);

/**
 * Step: Continue to the Checkout Overview page
 */
When('I continue to overview', async function () {
  // Click the Continue button using CheckoutStepOnePage POM
  await checkoutStepOnePage.clickContinue();

  // Initialize CheckoutStepTwoPage POM for next steps
  checkoutStepTwoPage = new CheckoutStepTwoPage(this.page);
});

/**
 * Step: Finish the purchase on Checkout Overview page
 */
When('I finish the purchase', async function () {
  // Click Finish button using CheckoutStepTwoPage POM
  await checkoutStepTwoPage.clickFinish();
});

Then('I should see the order completion page', async function () {
  // Initialize the CheckoutCompletePage POM
  checkoutCompletePage = new CheckoutCompletePage(this.page);

  // Verify the order confirmation message
  await checkoutCompletePage.verifyOrderComplete();
});

Then('I should see the order completion page', async function () {
  // Initialize the CheckoutCompletePage POM
  checkoutCompletePage = new CheckoutCompletePage(this.page);

  // Verify the URL contains 'checkout-complete.html'
  await expect(this.page).toHaveURL(/checkout-complete.html/);

  // Verify the confirmation message is visible
  await checkoutCompletePage.verifyOrderComplete();
});