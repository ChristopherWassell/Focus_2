import { Page, Locator } from '@playwright/test';

/**
 * The InventoryPage class represents the "Products" page
 * after a user logs in to https://www.saucedemo.com.
 *
 * Responsibilities of this page:
 *  - Display the list of products
 *  - Allow adding products to the cart
 *  - Show the shopping cart icon and badge
 *  - Navigate to the cart page
 *
 * All interactions related to the product catalog happen here.
 */
export class InventoryPage {
  // Playwright "Page" object representing the browser tab
  readonly page: Page;

  // Locator for the shopping cart icon (top-right)
  readonly cartIcon: Locator;

  // Locator for the cart badge (shows number of items in cart)
  readonly cartBadge: Locator;

  // Locator for the container holding all products
  readonly productList: Locator;

  constructor(page: Page) {
    /**
     * Store the Playwright page instance to:
     *  - Locate elements
     *  - Navigate pages
     *  - Interact with the UI
     */
    this.page = page;

    /**
     * Locators:
     *  - Shopping cart icon: clicking navigates to the cart page
     *  - Cart badge: displays number of items added
     *  - Product list: container for all products, used to verify products are displayed
     */
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.productList = page.locator('.inventory_list');
  }

  /**
   * Adds a product to the cart by its name
   *
   * @param itemName The exact product name to add
   *
   * How it works:
   *  1. Locate all product blocks using '.inventory_item'
   *  2. Filter the product block that contains the desired item name
   *  3. Find the "Add to cart" button inside that specific block
   *  4. Click the button
   *
   * Example usage:
   *   await inventoryPage.addToCart("Sauce Labs Backpack");
   */
  async addToCart(itemName: string) {
    // Locate the specific product block
    const itemLocator = this.page.locator('.inventory_item').filter({
      has: this.page.locator('.inventory_item_name', { hasText: itemName }),
    });

    // Locate the "Add to cart" button inside that product block
    const addButton = itemLocator.locator('button:has-text("Add to cart")');

    // Click the "Add to cart" button
    await addButton.click();
  }

  /**
   * Opens the shopping cart page by clicking the cart icon
   */
  async openCart() {
    await this.cartIcon.click();
  }

  /**
   * Optional helper: get the current number of items in the cart
   * Returns text content of the cart badge (e.g., "1")
   */
  async getCartCount() {
    return await this.cartBadge.textContent();
  }
}






