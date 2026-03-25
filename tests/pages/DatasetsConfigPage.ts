import type { Page } from '@playwright/test';

// This could potentially be shared with spreadsheets and salesforce
export class DatasetsConfigPage {
  constructor(public readonly page: Page) {}

  async createWidget(name: string) {
    await this.page.getByText('Add a widget title').click();
    await this.page.getByPlaceholder('Add a widget title').fill(name);
    await this.page.getByRole('button', { name: 'Add to dashboard' }).click();
  }
}
