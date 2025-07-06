import { userQueryOptions } from "@/lib/api"
import { useQueryClient } from "@tanstack/react-query"

export function useAuth() {
  const qc = useQueryClient()
  const data = qc.getQueryData(userQueryOptions.queryKey)

  if (!data) throw new Error("User is not authenticated or missing")

  return data
}
