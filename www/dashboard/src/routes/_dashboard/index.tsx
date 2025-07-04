import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { userQueryOptions } from '@/lib/api'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_dashboard/')({
  component: App,
})

function App() {
  const [count, setCount] = useState(0)

  const { isPending, error, data } = useQuery(userQueryOptions)

  if (isPending) return <div>Loading...</div>
  if (error) return <div>An Error occured</div>

  return (
    <div className="space-y-4 px-4 text-center">
      <h1 className="mt-8 text-center text-2xl font-semibold">
        Hello from the Dashboard App!
      </h1>
      <Button variant="secondary" onClick={() => setCount(count + 1)}>
        Count: <span className="font-semibold">{count}</span>
      </Button>

      <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>

      <Button asChild variant="link">
        <a href="/api/logout">Logout</a>
      </Button>
    </div>
  )
}
