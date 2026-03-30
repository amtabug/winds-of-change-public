import { test } from "@fixtures";
import {
  getAccessToken,
  shouldRequestNewToken,
  writeTokenFile,
} from "../../src/api/helpers/auth.js";
import { envConfig } from "../../src/env.config.js";

test("save access token for API tests", async ({ request }) => {
  if (!shouldRequestNewToken()) {
    return;
  }

  const tokenResponseBody = await getAccessToken(
    request,
    envConfig.CLIENT_ID,
    envConfig.CLIENT_SECRET,
  );

  writeTokenFile(tokenResponseBody.data);
});
