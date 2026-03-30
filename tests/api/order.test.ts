import { test, expect } from "@fixtures";

test.describe("Submit Order", () => {
  test("should submit a valid order", async ({ apiClient }) => {
    const { response, body } =
      await test.step("submit a valid order", async () =>
        apiClient.order.submit({
          package_id: "moshi-moshi-7days-1gb",
          quantity: 6,
        }));

    expect(response.status()).toBe(200);

    expect(body).toMatchObject({
      data: {
        package_id: "moshi-moshi-7days-1gb",
        quantity: 6,
        description: "Test 6 of package moshi-moshi-7days-1gb",
        validity: 7,
        data: "1 GB",
        sims: expect.arrayOf(
          expect.objectContaining({
            id: expect.any(Number),
            iccid: expect.any(String),
          }),
        ),
      },
      meta: {
        message: "success",
      },
    });

    expect(Array.from(new Set(body.data.sims.map((sim) => sim.id))), {
      message: "Expected all SIM IDs to be unique",
    }).toHaveLength(6);
  });

  test.fail(
    "should fail to submit an order with invalid package_id",
    async ({ apiClient }) => {
      const { response } =
        await test.step("submit an order with invalid package_id", async () =>
          apiClient.order.submit(
            {
              package_id: "invalid-package-id",
              quantity: 1,
            },
            false,
          ));

      // The documentation states that the API should return a 422 status code for package validation error.
      // However the API currently returns a 500 status code with HTML content.
      expect(response.status()).toBe(422);
    },
  );

  test.fail(
    "should fail to submit an order with quantity greater than 50",
    async ({ apiClient }) => {
      const { response } =
        await test.step("submit an order with a quantity greater than 50", async () =>
          apiClient.order.submit(
            {
              package_id: "moshi-moshi-7days-1gb",
              quantity: 51,
            },
            false,
          ));

      // The documentation states that the API should allow a maximum quantity of 50 and return a 422 status code for quantity validation error.
      // However the API currently returns a 401 status code with HTML content.
      expect(response.status()).toBe(422);
    },
  );
});
