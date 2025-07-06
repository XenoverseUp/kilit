import * as schema from "@lib/db/schema"
import { db } from "@lib/db"
import { getUser } from "@lib/kinde"
import { retrieveUser } from "@lib/utils/user"
import {
  bCreateLinkValidator,
  pGetSingleLinkValidator,
  qCreatePreferencesValidator,
} from "@lib/validators/user"
import { and, eq, sql } from "drizzle-orm"

import { Hono } from "hono"
import { generateRedirectUrl, resolveExpiresAt } from "@lib/utils/links"
import { attempt } from "@lib/utils/common"

// !TODO: Improve error handling with `attempt`.

export const userRouter = new Hono()
  .use(getUser)

  /**
   * User Preferences
   */

  .get("/preferences", async c => {
    const user = await retrieveUser(c.var.user.id)
    return c.json(user?.preferences ?? {})
  })

  .post("/preferences", qCreatePreferencesValidator, async c => {
    const query = c.req.valid("query")

    if (Object.entries(query).length === 0)
      return c.json({ message: "Nothing to update." }, 200)

    const result = await attempt(
      db
        .update(schema.users)
        .set({
          preferences: sql`COALESCE(${schema.users.preferences}, '{}'::jsonb) || ${sql.raw(`'${JSON.stringify(query)}'::jsonb`)}`,
        })
        .where(eq(schema.users.id, c.var.user.id))
        .returning({ updatedId: schema.users.id }),
    )

    if (!result.success)
      return c.json({ message: "Preferences could not updated." }, 501)

    return c.json({ message: "Preferences updated." }, 201)
  })

  /**
   * Dashboard Data
   */

  .get("/dashboard", async c => {
    const user = c.var.user
    return c.json({})
  })

  /**
   * Locked Links
   */

  // !TODO: Apply pagination to getLinks.
  .get("/links", async c => {
    const result = await attempt(
      db
        .select({
          id: schema.links.id,
          title: schema.links.title,
          description: schema.links.description,
          verificationMode: schema.links.verificationMode,
          createdAt: schema.links.createdAt,
        })
        .from(schema.links)
        .where(eq(schema.links.userId, c.var.user.id)),
    )

    return c.json(result)
  })

  .post("/links", bCreateLinkValidator, async c => {
    const { user } = c.var
    const body = c.req.valid("json")

    const result = await attempt(generateRedirectUrl(process.env.BASE_URL))

    if (!result.success)
      return c.json(
        {
          message: "Failed to create a unique locked link.",
        },
        500,
      )

    const redirectUrl = result.value

    const expiresAt = resolveExpiresAt(body.expiresAt, body.expiresIn)

    const [link] = await db
      .insert(schema.links)
      .values({
        userId: user.id,
        lockedUrl: body.lockedUrl,
        redirectUrl,
        expiresAt,
        title: body.title,
        description: body.description,
        verificationMode: body.verificationMode,
        formDefinition: body.formDefinition,
      })
      .returning()

    return c.json(
      {
        message: "Locked link created successfully.",
        link,
      },
      201,
    )
  })

  .get("/links/:id", pGetSingleLinkValidator, async c => {
    const { id } = c.req.valid("param")

    const link = await db
      .select()
      .from(schema.links)
      .where(
        and(eq(schema.links.userId, c.var.user.id), eq(schema.links.id, id)),
      )
      .then(res => res.at(0))

    if (!link)
      return c.json({ message: `Couldn't find the link with id ${id}.` }, 404)

    return c.json(link, 200)
  })
