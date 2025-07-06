import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "@tanstack/react-router"
import { useState } from "react"

interface Props {
  initialValue?: string
}

export default function DashboardLockInput({ initialValue = "" }: Props) {
  const [value, setValue] = useState(initialValue)

  return (
    <div className="w-full max-w-lg flex gap-2 items-center justify-center [view-transition-name:inp]">
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        className="flex-grow"
      />
      <Button asChild>
        <Link to="/locked-links/create" search={{ link: value }}>
          Lock
        </Link>
      </Button>
    </div>
  )
}
