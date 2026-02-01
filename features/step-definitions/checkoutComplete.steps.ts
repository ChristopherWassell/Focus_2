import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CheckoutCompletePage } from '../../pages/CheckoutComplete.page';

// POM instance for the completion page
let checkoutCompletePage: CheckoutCompletePage;

/**
 * Step: Verify that the order completion page is displayed
 * and the confirmation message is visible
 */
Then('I should see the order completion page', async function () {
  // Initialize the CheckoutCompletePage POM
  checkoutCompletePage = new CheckoutCompletePage(this.page);

  // Verify the URL contains 'checkout-complete.html'
  await expect(this.page).toHaveURL(/checkout-complete.html/);

  // Verify the confirmation message is visible
  await checkoutCompletePage.verifyOrderComplete();
});
