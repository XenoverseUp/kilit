import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/locked-links/")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Locked Links",
  },
})

function RouteComponent() {
  return "Hello from locked links!"
}
