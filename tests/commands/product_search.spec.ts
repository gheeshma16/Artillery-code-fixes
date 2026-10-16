




import { test, expect } from '@playwright/test';
import { ProductPage } from '../artillery/Pages/ProductPage';

test('Product search', async ({ page }) => {

    // Navigate to the application
    await page.goto('/client/');

    // Verify that the saved authentication state is working
    await expect(page).toHaveURL(/dashboard/);

    // Create Product Page object
    const productPage = new ProductPage(page);

    // Search for the product
    await productPage.searchProduct('ZARA COAT 3');

    // Verify the product is displayed
    await productPage.verifyProductDisplayed('ZARA COAT 3');
});

