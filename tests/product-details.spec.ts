import test, { expect } from "@playwright/test";

test('Verify user can view product details', async ({ page }) => {
  const productName = 'Bolt Cutters';

  // 1. Open Home page
  await page.goto('https://practicesoftwaretesting.com/');

  // 2. Open Product details page
  // await page.getByTestId('product-name').nth(2).click();
  await page.getByTestId('product-name').filter({ hasText: new RegExp(productName) }).click();

  // 3. Verify Product details page
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/product/01KPBKS1J11VKSF83QGCFK3949');
  await expect(page.getByTestId('product-name')).toHaveText(productName);
  await expect(page.locator('.price-section')).toHaveText('$48.41');
  await expect(page.getByTestId('add-to-cart')).toBeVisible();
  await expect(page.getByTestId('add-to-favorites')).toBeVisible();
});
