import { Page, Locator, expect } from '@playwright/test';

/**
 * Represents the "Checkout: Complete!" page:
 *   https://www.saucedemo.com/checkout-complete.html
 *
 * Responsibilities:
 *  - Verify that the order completion confirmation message is visible
 *
 * This POM does NOT handle navigation or other pages.
 */
export class CheckoutCompletePage {
  readonly page: Page;

  // Locator for the order confirmation message
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    /**
     * The confirmation message is inside an element with class `.complete-header`.
     * On saucedemo, this shows "THANK YOU FOR YOUR ORDER!" after finishing checkout.
     */
    this.confirmationMessage = page.locator('.complete-header');
  }

  /**
   * Verifies that the order completion message is visible and correct.
   *
   * This method abstracts the check, so your step definitions remain clean.
   */
  async verifyOrderComplete() {
    // Assert that the confirmation message is visible
    await expect(this.confirmationMessage).toBeVisible();

    // Optional: verify the exact text (case-insensitive)
    await expect(this.confirmationMessage).toHaveText(/thank you for your order/i);
  }
}
