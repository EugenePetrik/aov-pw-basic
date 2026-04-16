import test, { expect } from "@playwright/test";
import { productData } from "../test-data/product";

test('Verify user can view product details', async ({ page }) => {
  const { name, price } = productData;

  // 1. Open Home page
  await page.goto('/');

  // 2. Open Product details page
  // await page.getByTestId('product-name').nth(2).click();
  await page.getByTestId('product-name').filter({ hasText: new RegExp(name) }).click();

  // 3. Verify Product details page
  await expect(page).toHaveURL(/\/product\/\w{26}$/);
  await expect(page.getByTestId('product-name')).toHaveText(name);
  await expect(page.locator('.price-section')).toHaveText(price);
  // await expect(page.locator('.price-section')).toHaveText(/\$\d{2}\.\d{2}/);
  await expect(page.getByTestId('add-to-cart')).toBeVisible();
  await expect(page.getByTestId('add-to-favorites')).toBeVisible();
});
