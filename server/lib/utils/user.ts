import type { UserType } from "@kinde-oss/kinde-typescript-sdk"
import { db } from "@lib/db"
import { users } from "@lib/db/schema"

export async function findOrCreateUser(
  user: UserType,
  createPreferences?: Record<string, unknown>,
) {
  const existingUser = await db.query.users.findFirst({
    where: ({ id }, { eq }) => eq(id, user.id),
  })

  if (existingUser) return existingUser

  const created = await createUser(user, createPreferences)

  if (created.length > 0) return created[0]

  return await db.query.users.findFirst({
    where: ({ id }, { eq }) => eq(id, user.id),
  })
}

export async function createUser(
  user: UserType,
  preferences?: Record<string, unknown>,
) {
  return await db
    .insert(users)
    .values({
      id: user.id,
      email: user.email,
      firstName: user.given_name ?? null,
      lastName: user.family_name ?? null,
      picture: user.picture ?? null,
      preferences: preferences ?? {},
    })
    .onConflictDoNothing()
    .returning()
}
