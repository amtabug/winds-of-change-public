import "dotenv/config";

const getMandatoryEnvVar = (varName: string) => {
  const value = process.env[varName];

  if (!value) {
    throw new Error(`Environment variable ${varName} is required but not set.`);
  }

  return value;
};

const getEnvVarWithDefault = (varName: string, defaultValue: string) => {
  const value = process.env[varName];
  return value || defaultValue;
};

export const envConfig = {
  CLIENT_ID: getMandatoryEnvVar("CLIENT_ID"),
  CLIENT_SECRET: getMandatoryEnvVar("CLIENT_SECRET"),
  API_BASE_URL: getEnvVarWithDefault(
    "API_BASE_URL",
    "https://partners-api.airalo.com",
  ),
  E2E_BASE_URL: getEnvVarWithDefault("E2E_BASE_URL", "https://www.airalo.com"),
};
