import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/forms')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard/forms"!</div>
}
