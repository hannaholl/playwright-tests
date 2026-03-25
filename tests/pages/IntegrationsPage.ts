import type { Page } from '@playwright/test';

export class IntegrationsPage {
  constructor(public readonly page: Page) {}

  private createWidgetButton(integrationName: string) {
    return this.page.getByRole('link', { name: integrationName }).first();
  }

  async addDatasetWidget() {
    await this.createWidgetButton('Datasets API').click();
    await this.page
      .getByRole('button', { name: 'geckoboard.space.cargo' })
      .click();
  }
}
