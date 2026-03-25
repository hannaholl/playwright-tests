import { test, expect } from './custom-test';
import { DatasetsConfigPage } from './pages/DatasetsConfigPage';
import { IntegrationsPage } from './pages/IntegrationsPage';

test('add datasets widgets on a container dashboard', async ({
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

  // Widget is on the dashboard and rendered
  await expect(page.locator('[data-visualisation-rendered=true]')).toHaveCount(
    1,
  );

  // TODO: There is a bug in the app, the create widget button is disabled when returning
  // to the config so we can't actually create a 2nd widget

  // Add another widget to the same dashboard
  // await dashboardPage.navigateToAddWidget();
  // await integrationsPage.addDatasetWidget();
  // await datasetsConfigPage.selectWidgetType('Table');

  // We might need to wait for the config to update before creating the widget
  // await expect(datasetsConfigPage.vizButton('Table')).toBeDisabled();

  // await datasetsConfigPage.createWidget();

  // // Wait for the widgets to render before taking screenshot
  // await expect(page.locator('[data-visualisation-rendered=true]')).toHaveCount(
  //   2,
  // );

  // TODO: We might need to use a different dataset if the data changes to use screenshot
  await expect(dashboardPage.dashboardWrapper).toHaveScreenshot();
});
