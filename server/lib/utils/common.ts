export type AttemptResult<T> =
  | { success: true; value: T }
  | { success: false; error: Error }

export async function attempt<T>(
  promise: Promise<T>,
): Promise<AttemptResult<T>> {
  try {
    const result = await promise
    return { success: true, value: result }
  } catch (err) {
    return { success: false, error: err as Error }
  }
}
