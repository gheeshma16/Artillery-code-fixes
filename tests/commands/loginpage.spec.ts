import { test } from '@playwright/test';

// import { testLogin } from './pages_copy/test_login';
import { LoginPage } from '../artillery/Pages/LoginPage';


test('test login', async ({ page }) => {

    // test.setTimeout(120000);

    const loginPage = new LoginPage(page);


    await loginPage.login();
});


