import { useLocation } from '@tanstack/react-router'

const urlMap: Record<string, { title: string; url: string }> = {
  dashboard: {
    title: 'Dashboard',
    url: '/',
  },
  about: {
    title: 'About',
    url: '/about',
  },
  analytics: {
    title: 'Analytics',
    url: '/analytics',
  },
  forms: {
    title: 'Form Builder',
    url: '/forms',
  },
  automation: {
    title: 'Automation',
    url: '/automation',
  },
  settings: {
    title: 'Settings',
    url: '/settings',
  },
}

function getPaths(pathname: string) {
  return pathname.split('/').filter(Boolean)
}

export function useBreadcrumbs() {
  const { pathname } = useLocation()
  console.log(getPaths(pathname).map((path) => urlMap[path].title))

  return getPaths(pathname).map((path) => urlMap[path])
}
