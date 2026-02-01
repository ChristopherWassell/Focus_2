import { Page, Locator, expect } from '@playwright/test';

/**
 * Represents the "Checkout: Overview" page:
 *   https://www.saucedemo.com/checkout-step-two.html
 *
 * Responsibilities:
 *  - Display items in the order summary
 *  - Show payment and shipping information
 *  - Provide a "Finish" button to complete the purchase
 *
 * This POM only handles interactions on this page.
 */
export class CheckoutStepTwoPage {
  readonly page: Page;

  // Locator for the "Finish" button
  readonly finishButton: Locator;

  // Locator for the container holding all items in the order summary
  readonly orderItems: Locator;

  // Optional: locators for payment info and shipping info sections
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;

  constructor(page: Page) {
    this.page = page;

    /**
     * Finish button:
     * Clicking this completes the checkout flow
     * and navigates to the "Checkout Complete" page.
     */
    this.finishButton = page.locator('[data-test="finish"]');

    /**
     * orderItems:
     * Each product in the summary has the class `.cart_item`
     * This lets us verify which products are present.
     */
    this.orderItems = page.locator('.cart_item');

    /**
     * Optional verification locators:
     * - Payment information section
     * - Shipping information section
     *
     * These can be used to assert the correct details are displayed.
     */
    this.paymentInfo = page.locator('.summary_value_label').first();
    this.shippingInfo = page.locator('.summary_value_label').nth(1);
  }

  /**
   * Click the "Finish" button to complete the purchase.
   */
  async clickFinish() {
    await this.finishButton.click();
  }

  /**
   * Verify that a specific item is present in the order summary.
   *
   * Similar to CartPage verification, but on the overview page.
   */
  async verifyItemPresent(itemName: string) {
    const matchingItem = this.orderItems.filter({
      has: this.page.locator('.inventory_item_name', { hasText: itemName }),
    });

    // Assert that the item is visible in the order summary
    await expect(matchingItem).toBeVisible();
  }

  /**
   * Optional: Verify that payment and shipping info are displayed
   * These are just examples of assertions you could add later.
   */
  async verifyPaymentInfo(expected: string) {
    await expect(this.paymentInfo).toHaveText(expected);
  }

  async verifyShippingInfo(expected: string) {
    await expect(this.shippingInfo).toHaveText(expected);
  }
}
