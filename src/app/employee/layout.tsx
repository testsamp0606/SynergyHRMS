
import type { ReactNode } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { EmployeeSidebar } from "@/components/layout/employee-sidebar"
import { Header } from "@/components/layout/header"

export default function EmployeeDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <EmployeeSidebar />
      <SidebarInset>
        <div className="flex flex-col flex-1">
          <Header title="Employee" />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
