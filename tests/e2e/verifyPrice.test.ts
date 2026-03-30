import { test, expect, type FixturesOptions } from "@fixtures";

const getCurrencySymbol = (currency: FixturesOptions["websiteCurrency"]) => {
  const currencies = {
    EUR: "€",
    JPY: "¥",
  } as const;

  return currencies[currency];
};

test.describe("Verify Package Price", () => {
  test("should search for a package and verify its price on the website", async ({
    app,
    websiteCurrency,
  }) => {
    await app.navigateToHomePage();
    await app.searchForCountry("Japan");

    await app.esimPage.waitForCountryUrl("Japan");
    await app.esimPage.selectUnlimitedDataPlan();
    await app.esimPage.selectPlanDuration(7);

    // The assertion is async so that it can be retried
    await expect(
      async () => {
        const packagePrice = await app.esimPage.getPackagePriceByDuration(7);
        const footerPrice = await app.esimPage.getFooterPrice();

        const currencySymbol = getCurrencySymbol(websiteCurrency);
        expect(packagePrice).toContain(currencySymbol);
        expect(footerPrice).toContain(currencySymbol);

        expect(packagePrice).toBe(footerPrice);
      },
      {
        message: "Package price should match footer price",
      },
    ).toPass();
  });
});
