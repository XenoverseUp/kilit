import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs"
import { Link } from "@tanstack/react-router"
import For from "common/for"
import { If } from "common/if"
import type { SlashIcon } from "lucide-react"
import { Fragment } from "react"

interface Props {
  separator?: typeof SlashIcon
  leading?: boolean
}

export default function Breadcrumbs({
  separator: Separator,
  leading = false,
}: Props) {
  const crumbs = useBreadcrumbs()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <For
          each={crumbs}
          renderItem={(crumb, i) => (
            <Fragment key={crumb.url}>
              <If
                condition={leading || i !== 0}
                renderItem={() => (
                  <BreadcrumbSeparator>
                    {Separator && <Separator />}
                  </BreadcrumbSeparator>
                )}
              />

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
