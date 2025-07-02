import { Outlet, createFileRoute } from '@tanstack/react-router'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

export const Route = createFileRoute('/_dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <header className="sticky px-4 top-0 bg-background h-12 border-b flex items-center justify-between">
          <div className="flex items-center gap-2 ">
            <SidebarTrigger />
            <h1>Kilit</h1>
          </div>
        </header>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
