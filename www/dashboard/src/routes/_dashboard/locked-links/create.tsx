import DashboardLockInput from "@/components/compound/dashboard-lock-input"
import { createFileRoute, useSearch } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/locked-links/create")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Create",
  },
})

function RouteComponent() {
  const data: { link?: string } = useSearch({ strict: false })

  return (
    <div className="flex items-center justify-center mt-32">
      <h1>Create Locked Link</h1>
      <DashboardLockInput initialValue={data.link ?? ""} />
    </div>
  )
}
