import type { APIRequestContext } from "@playwright/test";

import type { FixturesOptions } from "@fixtures";

export abstract class BaseApiClient {
  protected readonly requestContext: APIRequestContext;
  protected readonly validateResponseSchema: FixturesOptions["validateResponseSchema"];

  constructor(
    requestContext: APIRequestContext,
    validateResponseSchema: FixturesOptions["validateResponseSchema"],
  ) {
    this.requestContext = requestContext;
    this.validateResponseSchema = validateResponseSchema;
  }
}
