import type { APIRequestContext } from "@playwright/test";

import type { FixturesOptions } from "@fixtures";

import { OrderApiClient } from "./domains/order.js";
import { SimApiClient } from "./domains/sim.js";

export class ApiClient {
  readonly order: OrderApiClient;
  readonly sim: SimApiClient;

  constructor(
    requestContext: APIRequestContext,
    validateResponseSchema: FixturesOptions["validateResponseSchema"],
  ) {
    this.order = new OrderApiClient(requestContext, validateResponseSchema);
    this.sim = new SimApiClient(requestContext, validateResponseSchema);
  }
}
