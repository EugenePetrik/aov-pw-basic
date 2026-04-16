import test, { expect } from "@playwright/test";
import { productData } from "../test-data/product";

test('Verify user can add product to cart', async ({ page }) => {
  const { name, price} = productData;
  
  await test.step('Open Home page', async () => {
    // 1. Ope Home page
    await page.goto('/');
  });
  

  await test.step('Open Product details page', async () => {
    // 2. Open Product details page
    // await page.getByTestId('product-name').nth(2).click();
    await page.getByTestId('product-name').filter({ hasText: new RegExp(name) }).click();
  });

  await test.step('Verify Product details page', async () => {
    // 3. Verify Product details page
    await expect(page).toHaveURL(/\/product\/\w{26}$/);
    await expect(page.getByTestId('product-name')).toHaveText(name);
    await expect(page.locator('.price-section')).toHaveText(price);
  });
  
  await test.step('Add product to cart', async () => {
    // 4. Add product to cart
    await page.getByTestId('add-to-cart').click();
  });
  
  await test.step('Verify product added to cart', async () => {
    // 5. Verify product added to cart
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toHaveText('toasts.product-added-to-cart');
    await expect(page.getByRole('alert')).toBeHidden({ timeout: 8_000 });

    await expect(page.getByTestId('cart-quantity')).toHaveText('1');
  });

  await test.step('Open cart page', async () => {
    // 6. Open cart page
    await page.getByTestId('nav-cart').click();
  });

  await test.step('Verify product is in cart', async () => {
    // 7. Verify product is in cart
    await expect(page).toHaveURL(/\/checkout$/);
    await expect(page.locator('table tbody tr')).toHaveCount(1);
    await expect(page.getByTestId('product-title')).toHaveText(name);
    await expect(page.getByTestId('product-price')).toHaveText(price);
    await expect(page.getByTestId('cart-total')).toHaveText(price);
  });
});
