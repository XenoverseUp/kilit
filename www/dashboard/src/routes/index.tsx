import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { userQueryOptions } from '@/lib/api'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [count, setCount] = useState(0)

  const { isPending, error, data } = useQuery(userQueryOptions)

  if (isPending) return <div>Loading...</div>
  if (error) return <div>An Error occured</div>

  return (
    <div className="text-center">
      <h1 className="text-2xl mt-8 font-semibold text-center">
        Hello from the Dashboard App!
      </h1>
      <button
        className="px-4 mt-4 py-2 bg-neutral-900 text-white select-none cursor-pointer"
        onClick={() => setCount(count + 1)}
      >
        Count: <span className="font-semibold">{count}</span>
      </button>

      <pre className="text-start">{JSON.stringify(data.user, null, 2)}</pre>

      <a href="/api/logout">Logout</a>
    </div>
  )
}
