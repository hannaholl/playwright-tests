import { test as base } from '@playwright/test';
import { DashboardPage } from './pages/DashboardPage';

type MyFixtures = {
  dashboardPage: DashboardPage;
};

// Extend base test by providing "dashboardPage"
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  dashboardPage: async ({ page }, use, testInfo) => {
    // Set up the fixture.
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.gotoRoot();
    await dashboardPage.createNewDashboard(`Playwright - ${testInfo.title}`);

    // Use the fixture value in the test.
    await use(dashboardPage);

    // Cleanup
    await dashboardPage.deleteAll();
  },
});
export { expect } from '@playwright/test';
