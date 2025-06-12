import { db } from "@lib/db"
import { customAlphabet } from "nanoid"
import * as schema from "@lib/db/schema"
import { eq } from "drizzle-orm"

export const nanoid = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyz",
  +(process.env.LINK_LENGTH ?? 8),
)

export function resolveExpiresAt(
  expiresAt?: string,
  expiresIn?: number,
): Date | null {
  if (expiresAt) {
    const date = new Date(expiresAt)
    if (isNaN(date.getTime())) return null // invalid date string
    return date
  }

  if (expiresIn) {
    const now = new Date()
    return new Date(now.getTime() + expiresIn * 1000)
  }

  return null
}

export async function generateRedirectUrl(baseUrl: string = "") {
  let slug
  let isUnique = false
  const maxAttempts = 8

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    slug = nanoid()
    const existingLink = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.redirectUrl, `${baseUrl}/redirect/${slug}`))

    if (!existingLink) {
      isUnique = true
      break
    }
  }

  if (!isUnique) throw new Error("Failed to generate a unique redirect URL")

  return `${baseUrl}/redirect/${slug}`
}
