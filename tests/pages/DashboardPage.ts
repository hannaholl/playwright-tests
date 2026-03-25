import { type Page, type Locator } from '@playwright/test';

/**
 * Don't create a new DashboardPage this directly in tests, instead rely on the
 * dashboardPage test fixture. It sets up a new dashboard and handles deleting
 * all dashboards created after each test.
 *
 * This is only used on ContainerDashboards/dashies. We need to add support for
 * legacy dashboards or create a new page for them.
 */

export class DashboardPage {
  private readonly addDashboardButton: Locator;
  private readonly addWidgetButton: Locator;
  private readonly createdDashboardIds: string[];

  constructor(public readonly page: Page) {
    this.createdDashboardIds = [];

    this.addDashboardButton = this.page.getByRole('button', {
      name: 'New',
      exact: true,
    });

    // On empty dashboards, the button appears twice so target first()
    this.addWidgetButton = page
      .getByRole('button', { name: 'Add widget' })
      .first();
  }

  private getCurrentDashboardId() {
    if (!this.page.url().includes('/edit/dashboards/dash_')) {
      throw new Error(
        'Not on a dashie edit page, navigate to the correct page first',
      );
    }

    const splitUrl = this.page.url().split('/');
    const dashboardId = splitUrl[5];
    return dashboardId;
  }

  async gotoRoot() {
    await this.page.goto('https://app.geckoboard.com');

    // wait for redirect to a dashboard
    await this.page.waitForURL('**/edit/dashboards/dash_**');
  }

  async createNewDashboard(name: string) {
    const currentDashboardId = this.getCurrentDashboardId();
    await this.addDashboardButton.click();

    // Wait for the browser to create and navigate to the new dashboard so
    // that any locators we use target elements on the new page
    await this.page.waitForURL(
      (url) => !url.pathname.includes(currentDashboardId),
    );

    this.createdDashboardIds.push(this.getCurrentDashboardId());

    await this.page.locator("label[class*='editable']").click();
    await this.page.locator("textarea[class^='editableInput']").fill(name);
  }

  async deleteAll() {
    while (this.createdDashboardIds.length) {
      const id = this.createdDashboardIds.pop();
      if (!id) {
        break;
      }
      await this.page.goto(`https://app.geckoboard.com/edit/dashboards/${id}`);

      await this.page.getByRole('button', { name: 'More' }).click();
      await this.page.getByRole('menuitem', { name: 'Delete' }).click();

      // Delete button in modal
      await this.page.getByRole('button', { name: 'Delete' }).click();

      // Wait for browser to delete dashboard and navigate to another
      await this.page.waitForURL((url) => !url.pathname.includes(id));
    }
  }

  async navigateToAddWidget() {
    await this.addWidgetButton.click();
  }
}
