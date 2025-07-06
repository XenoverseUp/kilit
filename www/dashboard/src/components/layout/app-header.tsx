import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { SidebarTrigger, useSidebar } from "../ui/sidebar"
import AuthInfo from "./auth-info"
import Breadcrumbs from "./breadcrumbs"
import { If } from "common/if"
import { LogOutIcon, SlashIcon } from "lucide-react"
import { motion } from "motion/react"

export default function AppHeader() {
  const { open, isMobile } = useSidebar()

  return (
    <div className="bg-background sticky top-0 flex h-16 items-center justify-between px-4">
      <motion.div className="flex items-center gap-2">
        <If
          condition={!open || isMobile}
          renderItem={() => <SidebarTrigger />}
        />
        <motion.div layout="position" transition={{ duration: 0.15 }}>
          <Breadcrumbs separator={SlashIcon} />
        </motion.div>
      </motion.div>
      <div className="flex items-center gap-3">
        <AuthInfo />
        <Separator orientation="vertical" className="h-6!" />
        <Button asChild variant="ghost" className="justify-start">
          <a href="/api/logout">
            <LogOutIcon />
          </a>
        </Button>
      </div>
    </div>
  )
}
