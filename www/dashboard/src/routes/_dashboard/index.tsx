import EmptyState from "@/components/compound/dashboard-empty"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/")({
  component: App,
})

function App() {
  return (
    <main className="space-y-4 p-4 min-h-[calc(100%-calc(var(--spacing)*16))] h-px">
      <EmptyState />
    </main>
  )
}
