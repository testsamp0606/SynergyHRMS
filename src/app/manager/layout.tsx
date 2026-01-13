
import type { ReactNode } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ManagerSidebar } from "@/components/layout/manager-sidebar"
import { Header } from "@/components/layout/header"

export default function ManagerDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <ManagerSidebar />
      <SidebarInset>
        <div className="flex flex-col flex-1">
          <Header title="Manager" />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
