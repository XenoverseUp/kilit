import { Link, createFileRoute } from '@tanstack/react-router'

import { useState } from 'react'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  const [count, setCount] = useState(0)
  return (
    <div className="text-center">
      <h1 className="text-2xl mt-8 font-semibold text-center">
        Dashboard About!
      </h1>
      <button
        className="px-4 mt-4 py-2 bg-neutral-900 text-white select-none cursor-pointer"
        onClick={() => setCount(count + 1)}
      >
        Count: <span className="font-semibold">{count}</span>
      </button>
      <Link to="/">Home</Link>
    </div>
  )
}
