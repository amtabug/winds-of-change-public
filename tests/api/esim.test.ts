import { test, expect } from "@fixtures";

test.describe("Get eSIM Details", () => {
  test("should return an error when providing an invalid ICCID", async ({
    apiClient,
  }) => {
    const invalidIccid = "12345678901234567890"; // Invalid ICCID for testing
    const { response } =
      await test.step("get eSIM details with invalid ICCID", async () => {
        return apiClient.sim.get(invalidIccid, false);
      });

    expect(response.status()).toBe(404);

    const responseBody = await response.text();
    expect(responseBody).toContain("Page Not Found");
  });
});
