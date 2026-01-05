import type { ReactNode } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { HrSidebar } from "@/components/layout/hr-sidebar"

export default function HrDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <HrSidebar />
      <SidebarInset>
        <main className="flex-1">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
