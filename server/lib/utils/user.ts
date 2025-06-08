import type { UserType } from "@kinde-oss/kinde-typescript-sdk"
import { db } from "@lib/db"
import { users } from "@lib/db/schema"
import { eq } from "drizzle-orm"

export async function upsertOrGetUser(user: UserType) {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  })

  if (!existingUser) {
    const created = await db
      .insert(users)
      .values({
        id: user.id,
        email: user.email,
        firstName: user.given_name ?? null,
        lastName: user.family_name ?? null,
        picture: user.picture ?? null,
      })
      .returning()

    return created[0]
  }

  return existingUser
}
