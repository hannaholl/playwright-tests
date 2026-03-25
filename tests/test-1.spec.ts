import { test, expect } from './custom-test';

test('add a widget', async ({ dashboardPage, page }) => {
  dashboardPage.navigateToAddWidget();

  await expect(
    page.getByRole('heading', { name: 'Connect your data' }),
  ).toBeVisible();
});
