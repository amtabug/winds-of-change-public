import Ajv2020 from "ajv/dist/2020.js";

import openapiSpec from "../../../openapi.json" with { type: "json" };

import type {
  AnyValidateFunction,
  ValidateFunction,
} from "ajv/dist/types/index.js";

const OPENAPI_SCHEMA_ID = "openapi.json";

// OpenAPI documents include keys (for instance "openapi") that are not part of JSON Schema,
// so we need to disable strict keyword checks while compiling.
const ajv = new Ajv2020.default({
  allErrors: true,
  strict: false,
  unevaluated: true,
});

ajv.addSchema(openapiSpec, OPENAPI_SCHEMA_ID);

export const validateObjectAgainstSchema = <
  const PotentialObjectType extends object,
>(
  schemaPath: string,
) => {
  const schemaRef = `${OPENAPI_SCHEMA_ID}#/paths/${schemaPath}`;

  // Prefer a cached validator if already compiled; otherwise compile via $ref to the root schema
  const validator: AnyValidateFunction<PotentialObjectType> =
    ajv.getSchema<PotentialObjectType>(schemaRef) ??
    ajv.compile<PotentialObjectType>({ $ref: schemaRef });

  if ("$async" in validator && validator.$async === true) {
    throw new Error(
      `Schema ${schemaRef} compiled as async validator; expected sync validator.`,
    );
  }

  return validator as ValidateFunction<PotentialObjectType>;
};
