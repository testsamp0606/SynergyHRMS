import type { ReactNode } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ManagerSidebar } from "@/components/layout/manager-sidebar"
import { AttendanceCard } from "../employee/dashboard/attendance-card"

export default function ManagerDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <ManagerSidebar />
      <SidebarInset>
        <main className="flex-1 flex flex-col">
          <div className="p-4 md:p-8 md:pb-0">
               <AttendanceCard />
          </div>
          <div className="flex-1">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
