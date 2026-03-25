import type { Locator, Page } from '@playwright/test';

type DatasetVisualization =
  | 'Number'
  | 'Gauge'
  | 'Line'
  | 'Column'
  | 'Bar'
  | 'Leaderboard'
  | 'Table';

// This could potentially be shared with spreadsheets and salesforce
export class DatasetsConfigPage {
  public createWidgetButton: Locator;

  constructor(public readonly page: Page) {
    this.createWidgetButton = page.getByRole('button', {
      name: 'Add to dashboard',
    });
  }

  vizButton(type: DatasetVisualization) {
    return this.page.getByRole('button', { name: type });
  }

  async selectWidgetType(type: DatasetVisualization) {
    await this.vizButton(type).click();
  }

  async createWidget(name?: string) {
    if (name) {
      await this.page.getByText('Add a widget title').click();
      await this.page.getByPlaceholder('Add a widget title').fill(name);
    }

    await this.createWidgetButton.click();
  }
}
