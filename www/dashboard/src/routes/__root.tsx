import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { userQueryOptions } from '@/lib/api'

interface Context {
  queryClient: QueryClient
}

const Component = () => {
  const { isAuthenticated } = Route.useRouteContext()
  if (!isAuthenticated) {
    const isDev = import.meta.env.DEV
    const redirectUrl = isDev
      ? 'http://localhost:4321/' // dev: Astro dev server
      : '/' // prod: served by Hono

    window.location.href = redirectUrl
    return null
  }

  return <Outlet />
}

export const Route = createRootRouteWithContext<Context>()({
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      const data = await queryClient.fetchQuery(userQueryOptions)
      return { isAuthenticated: data.isAuthenticated }
    } catch {
      return { isAuthenticated: false }
    }
  },
  component: Component,
})
