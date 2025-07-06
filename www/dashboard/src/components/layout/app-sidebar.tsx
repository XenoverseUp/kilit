import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"
import For from "common/for"
import { If } from "common/if"
import {
  ChartNoAxesColumn,
  Cuboid,
  HelpCircle,
  Home,
  LetterText,
  Link2,
  Settings,
  Shield,
  Workflow,
} from "lucide-react"

const menuConfig = [
  {
    label: "General",
    items: [
      {
        to: "/",
        icon: Home,
        text: "Home",
      },
      {
        to: "/locked-links",
        icon: Link2,
        text: "Locked Links",
      },
      {
        to: "/analytics",
        icon: ChartNoAxesColumn,
        text: "Analytics",
      },
    ],
  },
  {
    label: "Tools",
    items: [
      {
        to: "/forms",
        icon: LetterText,
        text: "Form Templates",
      },
      {
        to: "/automation",
        icon: Workflow,
        text: "Automation",
      },
    ],
  },
]

const footerConfig = [
  {
    to: "/settings",
    icon: Settings,
    text: "Settings",
  },
  {
    to: "/security",
    icon: Shield,
    text: "Security",
  },
  {
    to: "/help",
    icon: HelpCircle,
    text: "Help",
  },
]

export function AppSidebar() {
  const { open } = useSidebar()
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="flex h-16 shrink-0 items-center justify-between pr-4 pl-6">
          <div className="flex items-center gap-2">
            <Cuboid size={20} />
            <h1 className="text-lg font-medium">kilit.</h1>
          </div>
          <If condition={open} renderItem={() => <SidebarTrigger />} />
        </SidebarHeader>

        <For
          each={menuConfig}
          renderItem={group => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <For
                    each={group.items}
                    renderItem={({ to, icon: Icon, text, badge }) => (
                      <SidebarMenuItem key={text}>
                        <Link to={to}>
                          {({ isActive }) => (
                            <SidebarMenuButton isActive={isActive}>
                              <Icon />
                              <span>{text}</span>
                              <If
                                condition={!!badge}
                                renderItem={() => (
                                  <SidebarMenuBadge>{badge}</SidebarMenuBadge>
                                )}
                              />
                            </SidebarMenuButton>
                          )}
                        </Link>
                      </SidebarMenuItem>
                    )}
                  />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        />
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup className="pl-0">
          <SidebarGroupContent>
            <SidebarMenu>
              <For
                each={footerConfig}
                renderItem={({ to, icon: Icon, text }) => (
                  <SidebarMenuItem key={text}>
                    <Link to={to}>
                      {({ isActive }) => (
                        <SidebarMenuButton isActive={isActive}>
                          <Icon />
                          <span>{text}</span>
                        </SidebarMenuButton>
                      )}
                    </Link>
                  </SidebarMenuItem>
                )}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <p className="text-muted-foreground pb-3 text-center text-xs">
          Can Durmus &copy; {new Date().getFullYear()}
        </p> */}
      </SidebarFooter>
    </Sidebar>
  )
}
