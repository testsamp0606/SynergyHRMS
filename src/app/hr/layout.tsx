
import type { ReactNode } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { HrSidebar } from "@/components/layout/hr-sidebar"
import { HrAttendanceCard } from "./dashboard/hr-attendance-card"
import { Header } from "@/components/layout/header"

export default function HrDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <HrSidebar />
      <SidebarInset>
        <div className="flex flex-col flex-1">
          <Header title="HR" />
          <div className="p-4 md:p-8 md:pb-0">
               <HrAttendanceCard />
          </div>
          <main className="flex-1">
              {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
