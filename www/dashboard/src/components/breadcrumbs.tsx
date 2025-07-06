import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs"
import { Link } from "@tanstack/react-router"
import For from "common/for"
import { If } from "common/if"
import type { SlashIcon } from "lucide-react"
import { Fragment } from "react"

interface Props {
  separator?: typeof SlashIcon
}

export default function Breadcrumbs({ separator: Separator }: Props) {
  const crumbs = useBreadcrumbs()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <For
          each={crumbs}
          renderItem={(crumb, i) => (
            <Fragment key={crumb.url}>
              <BreadcrumbSeparator>
                {Separator && <Separator />}
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={crumb.url}>{crumb.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          )}
        />
      </BreadcrumbList>
    </Breadcrumb>
  )
}
