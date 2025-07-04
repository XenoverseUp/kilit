import type { UserType } from "@kinde-oss/kinde-typescript-sdk"
import { db } from "@lib/db"
import { users } from "@lib/db/schema"

export async function findOrCreateUser(
  id: UserType["id"],
  createPreferences?: Record<string, unknown>,
) {
  const existingUser = await retrieveUser(id)
  if (existingUser) return existingUser

  const created = await createUser(id, createPreferences)

  if (created.length > 0) return created[0]

  return await retrieveUser(id)
}

export async function createUser(
  id: UserType["id"],
  preferences?: Record<string, unknown>,
) {
  return await db
    .insert(users)
    .values({
      id,
      preferences: preferences ?? {},
    })
    .onConflictDoNothing()
    .returning()
}

export async function retrieveUser(userId: UserType["id"]) {
  const existingUser = await db.query.users.findFirst({
    where: ({ id }, { eq }) => eq(id, userId),
  })

  return existingUser ?? null
}
