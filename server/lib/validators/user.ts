import { zValidator } from "@hono/zod-validator"
import { z } from "zod"

/**
 * PREFIXES
 *
 * q: Query Validator
 * p: Parameter Validator
 * b: Body Validator
 */

export const qCreatePreferencesValidator = zValidator(
  "query",
  z.object({
    lang: z.enum(["en", "tr"]).optional(),
  }),
)

export const pGetSingleLinkValidator = zValidator(
  "param",
  z.object({
    id: z.string().uuid(),
  }),
)
