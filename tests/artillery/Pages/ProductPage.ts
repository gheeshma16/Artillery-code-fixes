import { expect, Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly productHeading: Locator;
    readonly addToCartButton: Locator;
    readonly cartLink: Locator;


    readonly itemTitle;
    readonly productPrice;
    readonly productQuantity;
    readonly checkoutbtn;



    constructor(page: Page) {
        this.page = page;

        this.searchBox = page.getByRole('textbox', {
            name: 'search'
        });

        this.productHeading = page.getByRole('heading', {
            name: 'ZARA COAT 3'
        });



        this.itemTitle = page.locator('.item__title');
        this.productPrice = page.locator('.item__price');
        this.productQuantity = page.locator('.item__quantity');
        this.checkoutbtn = page.getByRole('button', { name: 'Checkout' });
        this.addToCartButton = page.getByRole('button', {
            name: 'Add To Cart'
        });
        this.cartLink = page.getByRole('listitem').filter({
            hasText: 'Cart'
        });
    }

    async searchProduct(productName: string): Promise<void> {
        await this.searchBox.click();
        await this.searchBox.fill(productName);
        await this.searchBox.press('Enter');
    }

    async verifyProductDisplayed(productName: string): Promise<void> {
        const product = this.page.getByRole('heading', {
            name: productName
        }).first();
        await expect(product).toBeVisible();
        console.log(`${productName} exists`);



    }


    async addProductToCart(productName: string): Promise<void> {

        const productCard = this.page
            .locator('.card')
            .filter({ hasText: productName });
        await productCard.getByRole('button', { name: /Add To Cart/i }).click();


    }



    async verifyProductDetails(): Promise<void> {


        await this.checkoutbtn.click();
        const product = this.page.locator('.cartSection').filter({
            hasText: 'ZARA COAT 3'
        });
        await expect(this.itemTitle).toHaveText('ZARA COAT 3');
        console.log('product name verified');
        await expect(this.productQuantity).toHaveText('Quantity: 1');
        console.log('quantity verified');
        await expect(this.productPrice).toHaveText('$ 11500');
        console.log('price verified1');
        console.log('Product details verified successfully');
    }








// async verifyProductDetails(): Promise<void> {
//     // Verify the expected product is displayed in the cart
//     const product = this.page.locator('.cartSection').filter({
//         hasText: 'ZARA COAT 3'
//     });

//     await expect(product.locator('.item__title'))
//         .toHaveText('ZARA COAT 3', { timeout: 6000 });

//     console.log('Product name verified');

//     // Verify quantity
//     await expect(product.locator('.quantity'))
//         .toContainText('1', { timeout: 6000 });

//     console.log('Quantity verified');

//     // Verify price
//     await expect(product.locator('.prodTotal p'))
//         .toHaveText('$ 11500', { timeout: 6000 });

//     console.log('Price verified');

//     // Click Checkout
//     await this.page.getByRole('button', {
//         name: 'Checkout',
//         exact: true
//     }).click({ timeout: 3000 });

//     console.log('Product details verified successfully');
// }



















    async orderProduct(): Promise<void> {

        // cvv and name enter
        await this.page.getByRole('textbox').nth(1).click();
        await this.page.getByRole('textbox').nth(1).fill('456');
        await this.page.getByRole('textbox').nth(2).click();
        await this.page.getByRole('textbox').nth(2).fill('TESTBEO');
        console.log('cvv and name entered');
        const country = this.page.locator('input[placeholder="Select Country"]');
        await country.click();
        await country.pressSequentially('INDIA', { delay: 300 });
        console.log('BEFORE SUGGESTN')
        const results = this.page.locator('.ta-results');
        await results.waitFor({ state: 'visible' });
        console.log('AFTER SUGGESTN');
        const buttonElement = this.page.locator(
            'button.ta-item.list-group-item'
        );
        await buttonElement.first().waitFor({ state: 'visible' });
        console.log('button list found');
        const suggestionELEMENT = this.page.getByRole('button', { name: ' India', exact: true })
        console.log('suggestion found');
        // await this.page.waitForTimeout(5000);
        await expect(suggestionELEMENT).toBeVisible({
            timeout: 15000
        });
        console.log('suggestion visible');
        await suggestionELEMENT.click();
        console.log('suggestion   click happen');

        // place order button click
        await this.page.getByText('Place Order').click();
        console.log('India button clicked successfully');

        //  order placed page 

        await expect(
            this.page.getByRole('heading', { name: 'Thankyou for the order.' })
        ).toBeVisible();

        await this.page.getByRole('button', { name: '   ORDERS' }).click();



        await expect(
            this.page.getByRole('cell', {
                name: 'ZARA COAT 3',
                exact: true
            }).first()
        ).toHaveText('ZARA COAT 3');

        console.log('Order verified successfully');


    }



    async goToCart(): Promise<void> {
        await this.cartLink.click();
        console.log('Navigated to cart');
    }
}