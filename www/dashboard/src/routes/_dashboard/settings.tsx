import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/settings")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Settings",
  },
})

function RouteComponent() {
  return <div>Hello "/_dashboard/settings"!</div>
}
