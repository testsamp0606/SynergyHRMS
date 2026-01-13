
import type { ReactNode } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { HrSidebar } from "@/components/layout/hr-sidebar"
import { Header } from "@/components/layout/header"

export default function HrDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <HrSidebar />
      <SidebarInset>
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1">
              {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
