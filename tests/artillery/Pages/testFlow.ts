


import { Page } from '@playwright/test';

import { LoginPage } from './LoginPage';
import { ProductPage } from './ProductPage';
import { SignOutPage } from './SignOutPage';

export async function testFlow(page: Page): Promise<void> {

  console.log('===== TEST STARTED =====');

  // LOGIN
  console.log('Starting login');

  const loginPage = new LoginPage(page);
  await loginPage.login();

  console.log('Login completed');


  // PRODUCT
  console.log('Starting product search');

  const productPage = new ProductPage(page);
  await productPage.searchProduct('ZARA COAT 3');
  await productPage.verifyProductDisplayed('ZARA COAT 3');
  await productPage.addProductToCart('ZARA COAT 3');
  console.log('addProductToCart');
  await productPage.goToCart();

  console.log('goToCart');


  // const cartProduct = page.getByRole('heading', {
  //     name: 'ZARA COAT 3'
  // });


  // console.log('ZARA COAT verified in cart');


  // await productPage.goToCart();
  await productPage.verifyProductDetails();

  await productPage.orderProduct();


  // SIGN OUT
  // const signOutPage = new SignOutPage(page);
  // await signOutPage.signOut();

  console.log('===== TEST COMPLETED =====');
}
