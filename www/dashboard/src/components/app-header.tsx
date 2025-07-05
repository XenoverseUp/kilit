import AuthInfo from './auth-info'
import Breadcrumbs from './breadcrumbs'
import { SidebarTrigger, useSidebar } from './ui/sidebar'
import { If } from 'common/if'
import { SlashIcon } from 'lucide-react'

export default function AppHeader() {
  const { open, isMobile } = useSidebar()

  return (
    <header className="bg-background sticky top-0 flex h-16 items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <If
          condition={!open || isMobile}
          renderItem={() => <SidebarTrigger />}
        />
        <Breadcrumbs separator={SlashIcon} />
      </div>
      <AuthInfo />
    </header>
  )
}
