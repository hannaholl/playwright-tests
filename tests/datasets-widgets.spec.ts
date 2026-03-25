import { test, expect } from './custom-test';
import { DatasetsConfigPage } from './pages/DatasetsConfigPage';
import { IntegrationsPage } from './pages/IntegrationsPage';

test('add a dataset widget on a container dashboard', async ({
  dashboardPage,
  page,
}) => {
  await dashboardPage.navigateToAddWidget();

  const integrationsPage = new IntegrationsPage(page);
  await integrationsPage.addDatasetWidget();

  const datasetsConfigPage = new DatasetsConfigPage(page);
  await datasetsConfigPage.createWidget('playwright datasets widget');

  await expect(
    page.getByRole('article').filter({ hasText: 'playwright datasets widget' }),
  ).toBeVisible();

  // Wait for the widget to render before taking screenshot
  await expect(page.locator('[data-visualisation-rendered=true]')).toHaveCount(
    1,
  );

  // TODO: We might need to use a different dataset if the data changes to use screenshot
  await expect(dashboardPage.dashboardWrapper).toHaveScreenshot();
});
