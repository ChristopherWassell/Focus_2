import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../../pages/Inventory.page';
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

Given('I am on the product catalog page', async function () {
  inventoryPage = new InventoryPage(this.page);
  await expect(this.page).toHaveURL(/inventory.html/);
  await expect(inventoryPage.productList).toBeVisible();
});

When('I add {string} to the cart', async function (itemName: string) {
  await inventoryPage.addToCart(itemName);
});

Then('the cart badge should show {string}', async function (count: string) {
  await expect(inventoryPage.cartBadge).toHaveText(count);
});

When('I go to the shopping cart', async function () {
  await inventoryPage.openCart();
});

Given('I am on the cart page', async function () {
  cartPage = new CartPage(this.page);
  await expect(this.page).toHaveURL(/cart.html/);
});

Then('I should see {string} in the cart', async function (itemName: string) {
  await cartPage.verifyItemPresent(itemName);
});

When('I proceed to checkout', async function () {
  await cartPage.clickCheckout();
});

Then('I continue to checkout information page', async function () {
  await expect(this.page).toHaveURL(/checkout-step-one.html/);
});

When(
  'I enter valid shipping information: {string}, {string}, {string}',
  async function (firstName: string, lastName: string, postalCode: string) {
    checkoutStepOnePage = new CheckoutStepOnePage(this.page);
    await checkoutStepOnePage.enterInformation(firstName, lastName, postalCode);
  }
);

When('I continue to overview', async function () {
  checkoutStepOnePage = new CheckoutStepOnePage(this.page);
  await checkoutStepOnePage.clickContinue();
  // Initialize the next page object so it's ready for the next step
  checkoutStepTwoPage = new CheckoutStepTwoPage(this.page);
});

/**
 * Step: Verification of the Overview URL
 * Matches: Then I should be navigated to the "Checkout: Overview" page (https://www.saucedemo.com/checkout-step-two.html).
 */
Then(
  /^I should be navigated to the "([^"]*)" page \(https:\/\/www\.saucedemo\.com\/checkout-step-two\.html\)\.$/,
  async function (pageTitle) {
    // Verify the URL
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
  }
);

// We use a Regex here to handle the literal parentheses in the feature file
When(
  /^I review the order summary \(items, payment info, shipping info\)$/,
  async function () {
    await this.page.waitForSelector('.cart_list');
    await this.page.waitForSelector('.summary_info');
  }
);

When('I finish the purchase', async function () {
  await checkoutStepTwoPage.clickFinish();
});

Then('I should see the order completion page', async function () {
  await expect(this.page).toHaveURL(/checkout-complete.html/);
  checkoutCompletePage = new CheckoutCompletePage(this.page);
  await checkoutCompletePage.verifyOrderComplete();
});

