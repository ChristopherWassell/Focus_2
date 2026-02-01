import { Page, Locator } from '@playwright/test';

/**
 * Represents the "Checkout: Your Information" page:
 *   https://www.saucedemo.com/checkout-step-one.html
 *
 * This page allows the user to input:
 *  - First Name
 *  - Last Name
 *  - Postal Code
 *
 * And then continue to the next checkout step.
 *
 * This POM handles ONLY those responsibilities.
 */
export class CheckoutStepOnePage {
  readonly page: Page;

  // Locators for the input fields
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;

  // Locator for the "Continue" button
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;

    /**
     * Using data-test attributes (preferred, stable selectors):
     * These IDs DO NOT change unless the dev team intentionally removes them.
     */
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');

    /**
     * Continue button — moves user to:
     *   https://www.saucedemo.com/checkout-step-two.html
     */
    this.continueButton = page.locator('[data-test="continue"]');
  }

  /**
   * Enters the user information required to proceed.
   *
   * This method intentionally groups all three inputs together.
   * Why?
   *  - In a real scenario, the user will always fill all fields.
   *  - It keeps your step definitions clean:
   *        When I enter valid checkout information
   *
   * If you ever need to test validation errors, you can create
   * additional methods (fillFirstName, fillLastName, fillPostalCode).
   */
  async enterInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Clicks the "Continue" button to move to Checkout Step Two.
   *
   * This keeps the abstraction clean:
   *   - POM: "what does the page allow you to do?"
   *   - Cucumber: "When I continue"
   */
  async clickContinue() {
    await this.continueButton.click();
  }
}
