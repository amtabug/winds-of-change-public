import { type APIResponse, expect as baseExpect, test } from "@playwright/test";
import type { ErrorObject } from "ajv";

import { validateObjectAgainstSchema } from "../api/helpers/schemaValidation.js";

const expect = baseExpect.extend({
  /**
   * Custom matcher to validate an object against a JSON schema defined in the OpenAPI specification.
   * @param received The object to validate.
   * @param schemaPath The schema path as an escaped JSON pointer.
   * @param validateResponseSchema The validation mode. `error` fails the assertion on mismatch. `warn` only adds an annotation to the report.
   */
  async toMatchJsonSchema(
    received: APIResponse,
    schemaPath: string,
    validateResponseSchema: "error" | "warn",
  ) {
    const assertionName = "toMatchJsonSchema";
    const validate = validateObjectAgainstSchema(schemaPath);
    const responseJson = await received?.json().catch(() => ({}));
    const isValid = validate(responseJson);

    const pass =
      validateResponseSchema === "warn"
        ? this.isNot
          ? isValid !== true
          : true
        : this.isNot
          ? isValid !== true
          : isValid === true;

    const shouldAnnotate =
      validateResponseSchema === "warn" && !this.isNot && isValid !== true;

    const formatValidationError = (error: ErrorObject) => {
      const location =
        error.instancePath && error.instancePath.length > 0
          ? error.instancePath
          : "/";

      if (
        error.keyword === "unevaluatedProperties" &&
        "unevaluatedProperty" in error.params
      ) {
        return `${location} has unevaluated property '${(error.params as { unevaluatedProperty: string }).unevaluatedProperty}'`;
      }

      if (
        error.keyword === "additionalProperties" &&
        "additionalProperty" in error.params
      ) {
        return `${location} has unknown property '${(error.params as { additionalProperty: string }).additionalProperty}'`;
      }

      if (error.keyword === "required" && "missingProperty" in error.params) {
        return `${location} is missing required property '${(error.params as { missingProperty: string }).missingProperty}'`;
      }

      return `${location} ${error.message ?? ""}`.trim();
    };

    const errorDetails = validate.errors?.map(formatValidationError) ?? [];

    const message = () => {
      const hint = this.utils.matcherHint(assertionName, undefined, undefined, {
        isNot: this.isNot,
      });

      if (this.isNot) {
        return (
          `${hint}\n\n` +
          `URL: ${received.url()}\n` +
          `Expected: value not to match schema "${schemaPath}"\n` +
          `Received: ${isValid ? "value matches schema" : "value does not match schema"}`
        );
      }

      const errorText = errorDetails.length
        ? `Validation errors:\n${errorDetails.join("\n")}`
        : "No validation errors were reported.";

      return (
        `${hint}\n\n` +
        `URL: ${received.url()}\n` +
        `Expected: value to match schema "${schemaPath}"\n${errorText}`
      );
    };

    if (shouldAnnotate) {
      const annotationType = `Response schema validation failed: ${received.url()}`;

      if (
        !test
          .info()
          .annotations.some((annotation) => annotation.type === annotationType)
      ) {
        test.info().annotations.push({
          type: annotationType,
          description: `Response does not match schema "${schemaPath}":\n${errorDetails.join("\n")}`,
        });
      }
    }

    return {
      message,
      pass,
      name: assertionName,
      expected: `schema ${schemaPath}`,
      actual: responseJson,
    };
  },
});

export { expect };
