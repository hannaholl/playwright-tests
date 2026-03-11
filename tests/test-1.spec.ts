import { test, expect } from '@playwright/test';

test('login to geckoboard', async ({ page }) => {
  await page.goto('https://app.geckoboard.com/login');
  await page
    .getByRole('textbox', { name: 'email' })
    .fill('hanna@geckoboard.com');
});
