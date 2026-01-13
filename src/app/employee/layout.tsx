import type { ReactNode } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { EmployeeSidebar } from "@/components/layout/employee-sidebar"
import { AttendanceCard } from "./dashboard/attendance-card"

export default function EmployeeDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <EmployeeSidebar />
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
