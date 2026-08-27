import { test, expect } from '@playwright/test';

test('successful login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // fill in the username field
  await page.getByPlaceholder('Username').fill('standard_user');

  // fill in the password field
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // click the login button
  await page.getByRole('button', { name: 'Login' }).click();

  // verify the products page is displayed
  await expect(page).toHaveURL(/inventory/);
});
test('login fails with incorrect password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // fill in the username field
  await page.getByPlaceholder('Username').fill('standard_user');

  // fill in the password field
  await page.getByPlaceholder('Password').fill('wrong_password');

  // click the login button
  await page.getByRole('button', { name: 'Login' }).click();

  // verify the error message is displayed
  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toContainText('Username and password do not match');

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});