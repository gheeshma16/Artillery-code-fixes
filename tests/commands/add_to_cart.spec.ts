import { test, expect } from '@playwright/test';
import { ProductPage } from '../artillery/Pages/ProductPage';





test('Add product to cart and place order', async ({ page }) => {


    await page.goto('/client/');

    await expect(page).toHaveURL(/dashboard/);

    const productPage = new ProductPage(page);

    await productPage.searchProduct('ZARA COAT 3');

    await productPage.verifyProductDisplayed('ZARA COAT 3');

    await productPage.addProductToCart('ZARA COAT 3');

    await productPage.goToCart();

    await productPage.verifyProductDetails();

    await productPage.orderProduct();
});