import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator('.inventory_list');
  }
}


