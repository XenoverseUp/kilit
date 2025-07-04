import AuthInfo from './auth-info'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import { SidebarTrigger, useSidebar } from './ui/sidebar'
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs'
import { useIsMobile } from '@/hooks/use-mobile'
import { Link } from '@tanstack/react-router'
import { Fragment } from 'react'

export default function AppHeader() {
  const { open } = useSidebar()
  const isMobile = useIsMobile()
  const crumbs = useBreadcrumbs()

  return (
    <header className="bg-background sticky top-0 flex h-16 items-center justify-between px-4">
      <div className="flex items-center gap-2">
        {(!open || isMobile) && <SidebarTrigger />}

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
      <AuthInfo />
    </header>
  )
}
