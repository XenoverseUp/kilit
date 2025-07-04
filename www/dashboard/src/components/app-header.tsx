import { Link } from '@tanstack/react-router'
import { Fragment } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import { SidebarTrigger, useSidebar } from './ui/sidebar'
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs'

export default function AppHeader() {
  const { open } = useSidebar()
  const crumbs = useBreadcrumbs()

  return (
    <header className="bg-background sticky top-0 flex h-12 items-center justify-between px-4">
      <div className="flex items-center gap-2">
        {!open && <SidebarTrigger />}

        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((crumb, i) => (
              <Fragment key={crumb.url}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={crumb.url}>{crumb.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {i !== crumbs.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
