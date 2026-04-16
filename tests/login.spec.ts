import test, { chromium, expect } from "@playwright/test";
import { regularUser } from "../test-data/user";

// test('Verify login as a user with valid credentials', async () => {
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   // 1. Open Login page
//   await page.goto('https://practicesoftwaretesting.com/auth/login');

//   // 2. Fill in login form
//   // 3. Verify successful login

//   await page.close();
//   await context.close();
//   await browser.close();
// });

test('Verify login as a user with valid credentials', async ({ page }) => {
  test.skip(!!process.env.CI, 'Skip login test on CI env');

  const { email, password, username } = regularUser;

  await test.step('Open Login page', async () => {
    await page.goto('/auth/login');
  });

  await test.step('Fill in login form', async () => {
    await page.getByTestId('email').fill(email);
    await page.getByTestId('password').fill(password);
    await page.getByTestId('login-submit').click();
  });

  await test.step('Verify successful login', async () => {
    await expect(page).toHaveURL(/\/account$/);

    await expect(page.getByTestId('page-title')).toHaveText('My account');
    await expect(page.getByTestId('nav-menu')).toHaveText(username);
  });
});
