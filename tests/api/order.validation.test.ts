import { test, expect } from "@fixtures";

test.describe("Submit Order And Validate SIMs", () => {
  test("should submit an order and validate SIMs", async ({ apiClient }) => {
    const packageId = "moshi-moshi-7days-1gb";
    const orderResponseBody = await test.step("Submit an order", async () => {
      const { response, body } = await apiClient.order.submit({
        package_id: packageId,
        quantity: 6,
      });

      expect(response.status()).toBe(200);

      return body;
    });

    expect(orderResponseBody.data.sims).toHaveLength(6);

    for (const sim of orderResponseBody.data.sims) {
      await test.step(`Validate SIM with ID ${sim.id} and ICCID ${sim.iccid}`, async () => {
        const { body, response } = await apiClient.sim.get(sim.iccid);

        expect(response.status()).toBe(200);

        expect(body).toMatchObject({
          data: {
            iccid: sim.iccid,
            simable: {
              package_id: packageId,
              description: `Test 6 of package ${packageId}`,
              quantity: 6,
              type: "sim",
              validity: "7",
              data: "1 GB",
            },
          },
        });
      });
    }
  });
});
