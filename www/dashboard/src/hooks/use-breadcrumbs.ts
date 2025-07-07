import { removeTrailingSlash } from "@/lib/utils"
import { useRouter, useLocation, type Route } from "@tanstack/react-router"

type BreadcrumbItem = {
  title: string
  url: string
}

export function useBreadcrumbs(): BreadcrumbItem[] {
  const router = useRouter()
  const location = useLocation()
  const breadcrumbs: BreadcrumbItem[] = []

  const { routesByPath, basepath } = router

  const { pathname } = location

  const route = routesByPath["/"]

  breadcrumbs.push({
    title: route.options.staticData.breadcrumb,
    url: "/",
  })

  const splittedPaths = pathname
    .split("/")
    .filter(Boolean)
    .filter(p => !basepath.split("/").includes(p))

  let acc = ""

  for (let path of splittedPaths) {
    acc += `/${path}`

    if (acc in routesByPath) {
      // @ts-ignore
      const route: Route = routesByPath[removeTrailingSlash(acc)]

      breadcrumbs.push({
        title: route.options.staticData.breadcrumb,
        url: acc,
      })
    }
  }

  return breadcrumbs
}
