import { Separator } from "./ui/separator"
import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

interface Props {
  title: string
  subtitle?: string
  actions?: ReactNode
  icon?: LucideIcon
}

export default function PageHeader({
  actions,
  title,
  subtitle,
  icon: Icon,
}: Props) {
  return (
    <header className="shrink-0">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
            {Icon && <Icon />}
            {title}
          </h2>
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </div>
        {actions}
      </div>
      <Separator className="my-4" />
    </header>
  )
}
