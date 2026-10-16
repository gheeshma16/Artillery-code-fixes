

import { expect, Page, Locator } from '@playwright/test';

export class SignOutPage {
  readonly page: Page;
  readonly signoutButton: Locator;
  readonly emailTextbox: Locator;

  constructor(page: Page) {
    this.page = page;

    this.signoutButton = page.getByRole('button', {
      name: 'Sign Out',
    });

    this.emailTextbox = page.getByRole('textbox', {
      name: 'email@example.com',
    });
  }

  async signOut(): Promise<void> {
    await this.signoutButton.click();
  }

  async verifyLoginPage(): Promise<void> {
    await expect(this.emailTextbox).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.signOut();
    await this.verifyLoginPage();
  }
}