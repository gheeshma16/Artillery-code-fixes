// import { test as setup } from '@playwright/test';
// // import { LoginPage } from './pages/LoginPage';

// import { LoginPage } from '../artillery/Pages/LoginPage';


// const authFile = 'playwright/.auth/user.json';

// setup('authenticate', async ({ page }) => {

//     const loginPage = new LoginPage(page);

//     await loginPage.login();

//     // Save cookies, localStorage, etc.
//     await page.context().storageState({
//         path: authFile
//     });
// });


import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../artillery/Pages/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {

    const loginPage = new LoginPage(page);

    console.log('Starting login...');

    await loginPage.login();

    console.log('Login completed');
    console.log('Current URL:', page.url());

    // IMPORTANT:
    // Verify that we are no longer on the login page
    await expect(page).not.toHaveURL(/auth\/login/);

    // Save authentication state
    await page.context().storageState({
        path: authFile
    });

    console.log(`Storage state saved to: ${authFile}`);
});