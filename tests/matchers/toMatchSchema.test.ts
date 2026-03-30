import { APIResponse } from "@playwright/test";
import { test, expect } from "@fixtures";

import { validResponseBody } from "./body.matching.js";

const createMockResponse = (body: unknown) => {
  return {
    url: () => "https://myurl.com/v2/orders",
    json: async () => body,
  } as unknown as APIResponse;
};

test.describe("expect().toMatchSchema()", () => {
  test("should match the schema successfully", async () => {
    await expect(createMockResponse(validResponseBody)).toMatchJsonSchema(
      "~1v2~1orders/post/responses/200/content/application~1json/schema",
      "error",
    );
  });

  test.describe("set to 'error'", () => {
    test("should throw an error when the response body does not match the schema", async () => {
      const invalidResponseBody = structuredClone(validResponseBody);
      invalidResponseBody.data.quantity = 6 as unknown as string; // Introduce a type mismatch to trigger schema validation failure

      await expect(async () => {
        await expect(createMockResponse(invalidResponseBody)).toMatchJsonSchema(
          "~1v2~1orders/post/responses/200/content/application~1json/schema",
          "error",
        );
      }).rejects.toThrowError("/data/quantity must be string");
    });
  });

  test.describe("set to 'warn'", () => {
    test("should not add annotations when the response body matches the schema", async () => {
      await expect(createMockResponse(validResponseBody)).toMatchJsonSchema(
        "~1v2~1orders/post/responses/200/content/application~1json/schema",
        "warn",
      );

      const annotations = test
        .info()
        .annotations.filter((annotation) =>
          annotation.type.includes("Response schema validation failed"),
        );

      expect(annotations).toEqual([]);
    });

    test("should not throw an error when the response body does not match the schema", async () => {
      const invalidResponseBody = structuredClone(validResponseBody);
      invalidResponseBody.data.quantity = 6 as unknown as string; // Introduce a type mismatch to trigger schema validation failure

      await expect(createMockResponse(invalidResponseBody)).toMatchJsonSchema(
        "~1v2~1orders/post/responses/200/content/application~1json/schema",
        "warn",
      );

      const annotations = test
        .info()
        .annotations.filter((annotation) =>
          annotation.type.includes("Response schema validation failed"),
        );

      expect(annotations).toEqual([
        {
          type: "Response schema validation failed: https://myurl.com/v2/orders",
          description: expect.stringContaining(
            'Response does not match schema "~1v2~1orders/post/responses/200/content/application~1json/schema":\n/data/quantity must be string',
          ),
        },
      ]);
    });
  });
});
