import type { Page } from "@playwright/test";

import type { FixturesOptions } from "@fixtures";
import { envConfig } from "../env.config.js";

export const insertCookies = async (
  page: Page,
  options: {
    websiteLocale: FixturesOptions["websiteLocale"];
    websiteCurrency: FixturesOptions["websiteCurrency"];
  },
) => {
  const { websiteLocale, websiteCurrency } = options;

  await page.context().addCookies([
    {
      name: "Airalo.currency",
      value: websiteCurrency,
      url: envConfig.E2E_BASE_URL,
    },
    {
      name: "Airalo.locale",
      value: websiteLocale,
      url: envConfig.E2E_BASE_URL,
    },
  ]);
};
