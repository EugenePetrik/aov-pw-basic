import test, { expect } from "@playwright/test";

test('Verify user can add product to cart', async ({ page }) => {
  const productName = 'Slip Joint Pliers';
  const productPrice = '$9.17';
  
  // 1. Open Home page
  await page.goto('https://practicesoftwaretesting.com/');

  // 2. Open Product details page
  // await page.getByTestId('product-name').nth(2).click();
  await page.getByTestId('product-name').filter({ hasText: new RegExp(productName) }).click();

  // 3. Verify Product details page
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/product/01KPBQ6WB0DJWWJQMMJEPWK57Q');
  await expect(page.getByTestId('product-name')).toHaveText(productName);
  await expect(page.locator('.price-section')).toHaveText(productPrice);

  // 4. Add product to cart
  await page.getByTestId('add-to-cart').click();

  // 5. Verify product added to cart
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByRole('alert')).toHaveText('toasts.product-added-to-cart');
  await expect(page.getByRole('alert')).toBeHidden({ timeout: 8_000 });

  await expect(page.getByTestId('cart-quantity')).toHaveText('1');

  // 6. Open cart page
  await page.getByTestId('nav-cart').click();

  // 7. Verify product is in cart
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout');
  await expect(page.locator('table tbody tr')).toHaveCount(1);
  await expect(page.getByTestId('product-title')).toHaveText(productName);
  await expect(page.getByTestId('product-price')).toHaveText(productPrice);
  await expect(page.getByTestId('cart-total')).toHaveText(productPrice);
});
