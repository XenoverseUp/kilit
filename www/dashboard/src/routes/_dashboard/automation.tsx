import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/automation")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Automation",
  },
})

function RouteComponent() {
  return <div>Hello "/_dashboard/automation"!</div>
}
