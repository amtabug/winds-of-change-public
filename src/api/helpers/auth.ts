import { type APIRequestContext, expect } from "@playwright/test";

import path from "node:path";
import fs from "node:fs";

const dirName = import.meta.dirname;
export const tokenFilePath = path.resolve(dirName, "../../../authToken.json");

// I am not using the expires_in value as I do not know its unit.
// Instead I follow the documentation to renew the token every 24 hours, but I add a lenient buffer of 1 hour to be safe.
const tokenExpirationPeriod = 23 * 60 * 60_000; // 23 hours in milliseconds

type TokenData = {
  access_token: string;
  expires_at: number;
};

const isTokenData = (value: unknown): value is TokenData => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.access_token === "string" &&
    typeof candidate.expires_at === "number" &&
    Number.isFinite(candidate.expires_at)
  );
};

export const readTokenFile = () => {
  try {
    const fileContents = fs.readFileSync(tokenFilePath, "utf-8");
    const tokenData = JSON.parse(fileContents) as unknown;

    if (!isTokenData(tokenData)) {
      throw new Error(
        "Token file has an invalid shape. Expected keys: access_token (string), expires_at (number).",
      );
    }

    return tokenData;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    throw new Error(
      `Unable to read token file at ${tokenFilePath}: ${message}`,
      { cause: error },
    );
  }
};

export const writeTokenFile = (args: { access_token: string }) => {
  console.log(`Writing token file to: ${tokenFilePath}`);
  const tokenData: TokenData = {
    access_token: args.access_token,
    expires_at: Date.now() + tokenExpirationPeriod,
  };

  fs.writeFileSync(tokenFilePath, JSON.stringify(tokenData, null, 2));
};

export const shouldRequestNewToken = () => {
  if (!fs.existsSync(tokenFilePath)) {
    console.log(`Token file does not exist: ${tokenFilePath}`);
    return true;
  }

  let tokenData: TokenData;

  try {
    tokenData = readTokenFile();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.warn(`Token file is invalid. Requesting a new one. ${message}`);
    return true;
  }

  const isExpired = Date.now() >= tokenData.expires_at;

  if (isExpired) {
    console.log(`Token is expired or about to expire. Renewing.`);
    return true;
  }

  console.log(`Token is still valid. No need to request a new one.`);
  return false;
};

export const getAccessToken = async (
  requestContext: APIRequestContext,
  client_id: string,
  client_secret: string,
) => {
  const response = await requestContext.post("/v2/token", {
    data: {
      client_id,
      client_secret,
      grant_type: "client_credentials",
    },
  });

  await expect(response).toBeOK();

  const responseBody: {
    data: {
      token_type: string;
      expires_in: number;
      access_token: string;
    };
    meta: {
      message: string;
    };
  } = await response.json();

  expect(responseBody).toMatchObject({
    data: {
      access_token: expect.any(String),
    },
    meta: {
      message: "success",
    },
  });

  return responseBody;
};
