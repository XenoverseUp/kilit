import "./index.css"
import reportWebVitals from "./reportWebVitals.ts"
import { routeTree } from "./routeTree.gen"
import "@fontsource-variable/bricolage-grotesque"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { createRoot } from "react-dom/client"

const queryClient = new QueryClient()

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  basepath: "/dashboard/",
  defaultViewTransition: true,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
  interface StaticDataRouteOption {
    breadcrumb?: string
  }
}

const rootElement = document.getElementById("app")!

createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
)

reportWebVitals(console.log)
