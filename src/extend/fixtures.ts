import { test as base, request } from "@playwright/test";

import { ApiClient } from "../api/client.js";
import { readTokenFile } from "../api/helpers/auth.js";
import { envConfig } from "../env.config.js";
import { App } from "../e2e/index.js";
import { insertCookies } from "../e2e/insertCookies.js";

export type FixturesOptions = {
  validateResponseSchema: "off" | "error" | "warn";
  websiteLocale: "en";
  websiteCurrency: "EUR" | "JPY";
};

export const test = base.extend<
  {
    apiClient: ApiClient;
    app: App;
  },
  {
    accessToken: string;
  } & FixturesOptions
>({
  validateResponseSchema: ["off", { option: true, scope: "worker" }],
  accessToken: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      let accessToken: string;

      try {
        accessToken = readTokenFile().access_token;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";

        throw new Error(
          `Failed to load API access token. Run the api-auth project to regenerate it. ${message}`,
          { cause: error },
        );
      }

      await use(accessToken);
    },
    { scope: "worker" },
  ],
  apiClient: async ({ accessToken, validateResponseSchema }, use) => {
    const requestContext = await request.newContext({
      baseURL: envConfig.API_BASE_URL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const client = new ApiClient(requestContext, validateResponseSchema);

    await use(client);

    await requestContext.dispose();
  },
  websiteLocale: ["en", { option: true, scope: "worker" }],
  websiteCurrency: ["EUR", { option: true, scope: "worker" }],
  app: async ({ page, websiteLocale, websiteCurrency }, use) => {
    await insertCookies(page, {
      websiteLocale,
      websiteCurrency,
    });

    const app = new App(page);

    await use(app);
  },
});
