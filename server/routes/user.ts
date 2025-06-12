import * as schema from "@lib/db/schema"
import { db } from "@lib/db"
import { getUser } from "@lib/kinde"
import { findOrCreateUser } from "@lib/utils/user"
import {
  bCreateLinkValidator,
  pGetSingleLinkValidator,
  qCreatePreferencesValidator,
} from "@lib/validators/user"
import { and, eq, sql } from "drizzle-orm"

import { Hono } from "hono"
import { resolveExpiresAt } from "@lib/utils/links"

export const userRouter = new Hono()
  .use(getUser)

  /**
   * User Preferences
   */

  .get("/preferences", async c => {
    const user = await findOrCreateUser(c.var.user, {})
    return c.json(user?.preferences ?? {})
  })

  .post("/preferences", qCreatePreferencesValidator, async c => {
    const query = c.req.valid("query")

    if (Object.entries(query).length === 0)
      return c.json({ message: "Nothing to update." }, 200)

    const result = await db
      .update(schema.users)
      .set({
        preferences: sql`COALESCE(${schema.users.preferences}, '{}'::jsonb) || ${sql.raw(`'${JSON.stringify(query)}'::jsonb`)}`,
      })
      .where(eq(schema.users.id, c.var.user.id))
      .returning({ updatedId: schema.users.id })

    if (!result.length) await findOrCreateUser(c.var.user, query)

    return c.json({ message: "Preferences updated." }, 201)
  })

  /**
   * Locked Links
   */

  // !TODO: Apply pagination to getLinks.
  .get("/links", async c => {
    const links = await db
      .select({
        id: schema.links.id,
        title: schema.links.title,
        description: schema.links.description,
        verificationMode: schema.links.verificationMode,
        createdAt: schema.links.createdAt,
      })
      .from(schema.links)
      .where(eq(schema.links.userId, c.var.user.id))

    return c.json(links)
  })
  .post("/links", bCreateLinkValidator, async c => {
    const { user } = c.var
    const body = c.req.valid("json")

    const redirectUrl = generateRedirectUrl()

    const expiresAt = resolveExpiresAt(body.expiresAt, body.expiresIn)

    await db.insert(schema.links).values({
      userId: user.id,
      lockedUrl: body.lockedUrl,
      redirectUrl,
      expiresAt,
      title: body.title,
      description: body.description,
      verificationMode: body.verificationMode,
      formDefinition: body.formDefinition,
    })

    return c.json({ message: "Locked link successfully." }, 201)
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
