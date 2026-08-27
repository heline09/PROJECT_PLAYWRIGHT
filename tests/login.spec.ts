import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
  });

  test('successful login', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(
      'https://www.saucedemo.com/inventory.html'
    );
  });

  test('login fails with incorrect password', async ({ page }) => {
    await loginPage.login('standard_user', 'wrong_password');

    await expect(loginPage.error_message).toBeVisible();
    await expect(loginPage.error_message).toContainText(
      'Username and password do not match'
    );

    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
  test('login fails with incorrect username', async ({ page }) => {
    await loginPage.login('wrong_user', 'secret_sauce');

    await expect(loginPage.error_message).toBeVisible();
    await expect(loginPage.error_message).toContainText(
      'Username and password do not match'
    );

    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
  test('successful logout', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.gotoLoginPage();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(
    'https://www.saucedemo.com/inventory.html'
  );

  await loginPage.logout();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(loginPage.username_textbox).toBeVisible();
});
});