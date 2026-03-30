import { type Page, test } from "@playwright/test";

import { EsimPage } from "./esim.js";

export class App {
  readonly page: Page;
  readonly esimPage: EsimPage;

  constructor(page: Page) {
    this.page = page;

    this.esimPage = new EsimPage(page);
  }

  async navigateToHomePage() {
    await test.step("Navigate to the home page", async () => {
      const cachedStripePromise = this.page.waitForResponse((response) => {
        return response.url().includes("m.stripe.com");
      });

      await this.page.goto("/");

      // It seems that once the response from Stripe is received,
      // the input field is cleared, leading to missing input values.
      await cachedStripePromise;
    });
  }

  async searchForCountry(country: string) {
    await test.step(`Search for ${country} in the search bar`, async () => {
      await this.page
        .getByPlaceholder("Where do you need an eSIM?")
        .fill(country);
    });

    await test.step(`Select ${country} from the search results`, async () => {
      await this.page
        .locator("ul")
        .getByRole("link", { name: country, exact: true })
        .click();
    });
  }
}
