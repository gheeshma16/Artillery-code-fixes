import { Page } from '@playwright/test';

export async function testREGISTER(page: Page): Promise<void> {



 await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.getByText('Register here').click();
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('tester');
  await page.getByRole('textbox', { name: 'Last Name' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).fill('demo');
  await page.getByRole('textbox', { name: 'email@example.com' }).click();
  await page.getByRole('textbox', { name: 'email@example.com' }).fill('gheeshma.beo@gmail.com');
  await page.getByRole('textbox', { name: 'enter your number' }).click();
  await page.getByRole('textbox', { name: 'enter your number' }).fill('9034122158');
  await page.getByRole('radio', { name: 'Female' }).check();
  await page.getByRole('combobox').selectOption('2: Student');
  await page.getByRole('textbox', { name: 'Passsword' }).click();
  await page.getByRole('textbox', { name: 'Passsword' }).fill('Tester@123');
  await page.getByRole('textbox', { name: 'Confirm Password' }).click();
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill('Tester@123');
  await page.locator('.col-md-1').click();
  await page.getByRole('checkbox').uncheck();
  await page.getByRole('textbox', { name: 'Confirm Password' }).click();
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Register' }).click();
  await page.waitForTimeout(5000);

 
}



