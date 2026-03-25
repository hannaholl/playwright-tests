import { test as setup, expect } from '@playwright/test';
import { assert } from 'tsafe';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('https://app.geckoboard.com/login');

  assert(process.env.PLAYWRIGHT_TESTS_EMAIL);
  assert(process.env.PLAYWRIGHT_TESTS_PASSWORD);

  await page
    .getByRole('textbox', { name: 'email' })
    .fill(process.env.PLAYWRIGHT_TESTS_EMAIL);
  await page
    .getByRole('textbox', { name: 'password' })
    .fill(process.env.PLAYWRIGHT_TESTS_PASSWORD);

  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByRole('button', { name: 'Add widget' })).toBeVisible();

  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});
