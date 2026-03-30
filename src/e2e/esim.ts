import { type Page, test } from "@playwright/test";

export class EsimPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForCountryUrl(country: string) {
    await test.step(`Wait for ${country} URL`, async () => {
      await this.page.waitForURL(
        (url) => url.href.endsWith(`/${country.toLowerCase()}-esim`),
        {
          timeout: 10_000,
        },
      );
    });
  }

  async selectUnlimitedDataPlan() {
    await test.step("Select the unlimited data plan", async () => {
      await this.page
        .getByTestId("segmented-control_tabs-list")
        .getByRole("tab", { name: "Unlimited" })
        .click();
    });
  }

  private getPackageLocatorByDuration(days: 3 | 5 | 7) {
    return this.page
      .locator("div")
      .filter({
        has: this.page.getByTestId("package-grouped-packages_duration-title"),
      })
      .filter({ hasText: `${days} days` })
      .last()
      .getByTestId("card-package_container");
  }

  async selectPlanDuration(days: 3 | 5 | 7) {
    await test.step(`Select the ${days}-day plan duration`, async () => {
      const packageLocator = this.getPackageLocatorByDuration(days);

      await packageLocator.click();
    });
  }

  async getPackagePriceByDuration(days: 3 | 5 | 7) {
    const packageLocator = this.getPackageLocatorByDuration(days);
    const priceLocator = packageLocator.getByTestId("price_amount");

    return priceLocator.textContent();
  }

  async getFooterPrice() {
    const footerPriceLocator = this.page
      .getByRole("dialog")
      .filter({ hasText: "Package details" })
      .getByTestId("price_amount");

    return footerPriceLocator.textContent();
  }
}
