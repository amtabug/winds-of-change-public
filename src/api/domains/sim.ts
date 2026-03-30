import type { APIResponse } from "@playwright/test";

import { expect } from "@fixtures";
import { BaseApiClient } from "./base.js";

type GetSim200Response = {
  data: {
    id: string;
    iccid: string;
    order: null;
    simable: {
      id: string;
      type: string;
      package_id: string;
      quantity: number;
      validity: string;
      data: string;
      description: string;
    };
  };
};

export class SimApiClient extends BaseApiClient {
  async get(
    sim_iccid: string,
    parseResponseBody: false,
  ): Promise<{ response: APIResponse }>;

  async get(
    sim_iccid: string,
    parseResponseBody?: true,
  ): Promise<{ response: APIResponse; body: GetSim200Response }>;

  async get(
    sim_iccid: string,
    parseResponseBody = true,
  ): Promise<
    | { response: APIResponse }
    | { response: APIResponse; body: GetSim200Response }
  > {
    const response = await this.requestContext.get(`/v2/sims/${sim_iccid}`, {
      params: { include: "simable" },
    });

    if (!parseResponseBody) {
      return { response };
    }

    const body: GetSim200Response = await response.json();

    if (this.validateResponseSchema !== "off") {
      expect(response.status()).toBe(200);

      await expect(response).toMatchJsonSchema(
        "~1v2~1sims~1{sim_iccid}/get/responses/200/content/application~1json/schema",
        this.validateResponseSchema,
      );
    }

    return { response, body };
  }
}
