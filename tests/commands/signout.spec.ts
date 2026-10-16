


// import { test } from '@playwright/test';
// import { SignOutPage } from '../artillery/Pages/SignOutPage';

// test('test Signout', async ({ page }) => {

//   const signOutPage = new SignOutPage(page);

//   await signOutPage.signOut();

// });

import { test, expect } from '@playwright/test';
import { SignOutPage } from '../artillery/Pages/SignOutPage';

test('test Signout', async ({ page }) => {

  await page.goto('/client/');

  // Verify storage state worked
  await expect(page).toHaveURL(/dashboard/);

  const signOutPage = new SignOutPage(page);

  await signOutPage.logout();
});