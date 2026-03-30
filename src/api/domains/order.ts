import type { APIResponse } from "@playwright/test";

import { expect } from "@fixtures";
import { BaseApiClient } from "./base.js";

type SubmitOrder200Response = {
  data: {
    package_id: string;
    quantity: number;
    description: string;
    validity: number;
    data: string;
    sims: {
      id: number;
      iccid: string;
    }[];
  };
  meta: {
    message: string;
  };
};

export class OrderApiClient extends BaseApiClient {
  async submit(
    args: { package_id: string; quantity: number },
    parseResponseBody: false,
  ): Promise<{ response: APIResponse }>;

  async submit(
    args: { package_id: string; quantity: number },
    parseResponseBody?: true,
  ): Promise<{ response: APIResponse; body: SubmitOrder200Response }>;

  async submit(
    args: { package_id: string; quantity: number },
    parseResponseBody = true,
  ): Promise<
    | { response: APIResponse }
    | { response: APIResponse; body: SubmitOrder200Response }
  > {
    const response = await this.requestContext.post("/v2/orders", {
      form: {
        package_id: args.package_id,
        quantity: args.quantity.toString(),
        description: `Test ${args.quantity} of package ${args.package_id}`,
      },
    });

    if (!parseResponseBody) {
      return { response };
    }

    const body: SubmitOrder200Response = await response.json();

    if (this.validateResponseSchema !== "off") {
      expect(response.status()).toBe(200);

      await expect(response).toMatchJsonSchema(
        // Since some keys in the OpenAPI schema contains /, we need to use the escaped version of it (~1)
        // to have a valid JSON Pointer for ajv schema validation
        "~1v2~1orders/post/responses/200/content/application~1json/schema",
        this.validateResponseSchema,
      );
    }

    return { response, body };
  }
}
