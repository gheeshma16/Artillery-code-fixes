


import 'dotenv/config';
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.email = page.getByRole('textbox', {
            name: 'email@example.com'
        });

        this.password = page.locator(
            'input[type="password"]'
        );

        this.loginButton = page.getByRole('button', {
            name: 'Login'
        });

        this.searchButton = page.getByRole('textbox', {
            name: 'search'
        });
    }

    async login() {

        console.log('Starting login');

        // await this.page.goto('/client/#/auth/login');

        const username = process.env.TEST_USERNAME;
        const password = process.env.TEST_PASSWORD;

        console.log(
            'Username:',
            username ? 'Available' : 'MISSING'
        );

        console.log(
            'Password:',
            password ? 'Available' : 'MISSING'
        );

        if (!username || !password) {
            throw new Error(
                'TEST_USERNAME or TEST_PASSWORD is missing'
            );
        }



         console.log('Before goto');

    await this.page.goto('/client/#/auth/login', {
        waitUntil: 'domcontentloaded',
        timeout: 15000
    });

    console.log('After goto');
        await this.email.fill(username);

        await this.password.fill(password);

        await this.loginButton.click();

        console.log('Login button clicked');

        // await expect(this.searchButton).toBeVisible();

        // console.log('Login successful - search box is visible');



          // Verify successful login
        await expect(this.searchButton).toBeVisible({
            timeout: 15000
        });

        console.log('Login successful - search box is visible');
    }
}