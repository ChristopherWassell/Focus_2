import { Page, Locator, expect } from '@playwright/test';

/**
 * Represents the "Your Cart" page at:
 *   https://www.saucedemo.com/cart.html
 *
 * Responsibilities of this Page Object:
 *  - Verify items listed in the cart
 *  - Click the Checkout button
 */
export class CartPage {
  readonly page: Page;

  // The container that holds all cart items
  readonly cartItems: Locator;

  // The checkout button
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    /**
     * cartItems:
     *   Each cart item is rendered with the class `.cart_item`.
     *   This locator allows us to search *within* the list of cart items.
     */
    this.cartItems = page.locator('.cart_item');

    /**
     * checkoutButton:
     *   The button that moves the user to:
     *     https://www.saucedemo.com/checkout-step-one.html
     */
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  /**
   * Verifies that a specific product appears in the cart.
   *
   * Why this approach?
   *   - Each cart item includes:
   *         .inventory_item_name  → product name text
   *   - We filter cart items to find the one with matching text.
   */
  async verifyItemPresent(itemName: string) {
    /**
     * Filter cart items by matching the item name.
     * If the item exists, the locator will resolve to 1 matching element.
     */
    const matchingItem = this.cartItems.filter({
      has: this.page.locator('.inventory_item_name', { hasText: itemName }),
    });

    /**
     * We assert that the matching item is visible.
     * This ensures:
     *   - The product was successfully added
     *   - The inventory→cart transition works
     */
    await expect(matchingItem).toBeVisible();
  }

  /**
   * Clicks the Checkout button
   *
   * This transitions the flow to the:
   *   Checkout: Your Information page
   *
   * This method is intentionally small — POM methods should be single-purpose.
   */
  async clickCheckout() {
    await this.checkoutButton.click();
  }
}
