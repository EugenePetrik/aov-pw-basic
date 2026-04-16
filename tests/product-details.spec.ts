import test, { expect } from "@playwright/test";
import { productData } from "../test-data/product";

test('Verify user can view product details', async ({ page }) => {
  const { name, price } = productData;

  await test.step('Open Home page', async () => {
    await page.goto('/');
  });

  await test.step('Open Product details page', async () => {
    await page.getByTestId('product-name').filter({ hasText: new RegExp(name) }).click();
  });

  await test.step('Verify Product details page', async () => {
    await expect(page).toHaveURL(/\/product\//);

    await expect(page.getByTestId('product-name')).toHaveText(name);
    await expect(page.locator('.price-section')).toHaveText(price);
    await expect(page.getByTestId('add-to-cart')).toBeVisible();
    await expect(page.getByTestId('add-to-favorites')).toBeVisible();
  });
});
