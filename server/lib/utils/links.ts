/**
 * Resolve expiresAt timestamp from expiresAt (ISO string) or expiresIn (seconds)
 * Returns a Date object in UTC or null if none provided.
 */

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
