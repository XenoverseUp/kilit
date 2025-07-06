import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { userQueryOptions } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/")({
  component: App,
})

function App() {
  const { isPending, error, data } = useQuery(userQueryOptions)

  if (isPending) return <div>Loading...</div>
  if (error) return <div>An Error occured</div>

  return (
    <div className="space-y-4 px-4 min-h-[calc(100%-calc(var(--spacing)*16))]"></div>
  )
}
