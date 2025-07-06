import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/locked-links/")({
  component: RouteComponent,
})

function RouteComponent() {
  return "Hello from locked links!"
}
