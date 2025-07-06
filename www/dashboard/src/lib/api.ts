import type { ApiRoutes } from "@server/app"
import { queryOptions } from "@tanstack/react-query"
import { hc } from "hono/client"

const client = hc<ApiRoutes>("/")

export const api = client.api

/* User Query */

async function getCurrentUser() {
  const res = await api.me.$get()
  if (!res.ok) throw new Error("Server Error!")
  return await res.json()
}

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
})

/* Dashboard Query */

async function getDashboardData() {
  const res = await api.user.dashboard.$get()
  if (!res.ok) throw new Error("Server Error!")
  return await res.json()
}

export const dashboardQueryOptions = queryOptions({
  queryKey: ["get-dashboard-data"],
  queryFn: getDashboardData,
})
