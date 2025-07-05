import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import For from 'common/for'
import { If } from 'common/if'
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
} from 'lucide-react'

const menuConfig = [
  {
    label: 'General',
    items: [
      {
        to: '/',
        icon: Home,
        text: 'Dashboard',
      },
      {
        to: '/about',
        icon: Link2,
        text: 'Locked Links',
        badge: 5,
      },
      {
        to: '/analytics',
        icon: ChartNoAxesColumn,
        text: 'Analytics',
      },
    ],
  },
  {
    label: 'Tools',
    items: [
      {
        to: '/forms',
        icon: LetterText,
        text: 'Forms',
      },
      {
        to: '/automation',
        icon: Workflow,
        text: 'Automation',
      },
    ],
  },
  {
    label: 'Support',
    items: [
      {
        to: '/settings',
        icon: Settings,
        text: 'Settings',
      },
      {
        to: '/security',
        icon: Shield,
        text: 'Security',
      },
      {
        to: '/help',
        icon: HelpCircle,
        text: 'Help',
      },
    ],
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <header className="flex h-16 shrink-0 items-center justify-between pr-4 pl-6">
          <div className="text-brand flex items-center gap-1">
            <Cuboid size={20} />
            <h1 className="text-lg font-medium">Kilit.</h1>
          </div>
          <SidebarTrigger />
        </header>

        <For
          each={menuConfig}
          renderItem={(group) => (
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
        <p className="text-muted-foreground pb-3 text-center text-xs">
          Can Durmus &copy; {new Date().getFullYear()}
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}
