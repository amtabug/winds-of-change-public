import { defineConfig, devices } from "@playwright/test";
import { envConfig } from "./src/env.config.js";
import type { FixturesOptions } from "@fixtures";

export default defineConfig<FixturesOptions>({
  reporter: [["list"], ["html", { open: "never" }]],
  testDir: "./tests",
  timeout: 30000,
  use: {
    validateResponseSchema: "warn",
    headless: process.env.HEADLESS !== "false",
    trace: "on",
  },
  workers: 1,
  retries: 0,
  fullyParallel: true,
  projects: [
    {
      name: "api-auth",
      testMatch: "**/api-auth/**/*.test.ts",
      use: {
        baseURL: envConfig.API_BASE_URL,
      },
    },
    {
      name: "api",
      testMatch: "**/api/**/*.test.ts",
      dependencies: ["api-auth"],
      use: {
        baseURL: envConfig.API_BASE_URL,
      },
    },
    {
      name: "e2e",
      testMatch: "**/e2e/**/*.test.ts",
      retries: 1,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: envConfig.E2E_BASE_URL,
        websiteLocale: "en",
        websiteCurrency: "EUR",
      },
    },
    {
      name: "matchers",
      testMatch: "**/matchers/**/*.test.ts",
    },
  ],
});
