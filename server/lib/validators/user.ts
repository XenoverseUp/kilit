import { zValidator } from "@hono/zod-validator"
import { z } from "zod"
import { uuid } from "zod/v4"

/**
 * PREFIXES
 *
 * q: Query Validator
 * p: Parameter Validator
 * b: Body Validator
 */

// Create Preferences
export const qCreatePreferencesValidator = zValidator(
  "query",
  z.object({
    lang: z.enum(["en", "tr"]).optional(),
  }),
)

// Get Single Link with ID
export const pGetSingleLinkValidator = zValidator(
  "param",
  z.object({
    id: z.string().uuid(),
  }),
)

// Create Locked Link

const typeToAnswerType: Record<
  "name" | "surname" | "email" | "age",
  "string" | "email" | "integer"
> = {
  name: "string",
  surname: "string",
  email: "email",
  age: "integer",
}

export const bCreateLinkValidator = zValidator(
  "json",
  z
    .object({
      lockedUrl: z.string().url(),

      expiresAt: z.string().datetime().optional(), // optional absolute expiry
      expiresIn: z.number().int().positive().optional(), // optional relative expiry

      title: z.string().optional(),
      description: z.string().optional(),

      verificationMode: z.enum(["none", "email"]).default("none"),

      formDefinition: z
        .array(
          z
            .object({
              type: z.enum(["name", "surname", "email", "age"]),
              label: z.string().optional(),
              required: z.boolean().default(false),
              displayOrder: z.number().default(0),
            })
            .transform(field => ({
              id: crypto.randomUUID(),
              ...field,
              answerType: typeToAnswerType[field.type],
            })),
        )
        .min(1),
    })
    .refine(data => !(data.expiresAt && data.expiresIn), {
      message: "Provide either expiresAt or expiresIn, not both",
    }),
)
