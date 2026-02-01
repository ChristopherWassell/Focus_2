import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CheckoutStepOnePage } from '../../pages/CheckoutStepOne.page';
import { CheckoutStepTwoPage } from '../../pages/CheckoutStepTwoPage.page';
import { CheckoutCompletePage } from '../../pages/CheckoutComplete.page';

let checkoutCompletePage: CheckoutCompletePage;


// POM instances
let checkoutStepOnePage: CheckoutStepOnePage;
let checkoutStepTwoPage: CheckoutStepTwoPage;

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

