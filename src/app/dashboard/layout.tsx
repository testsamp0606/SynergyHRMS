import type { ReactNode } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"

// Because this is a layout, the title will be inherited by child pages
// unless they define their own.
// const pageTitles: { [key: string]: string } = {
//   "/dashboard": "Dashboard",
//   "/dashboard/employees": "Employee Database",
//   "/dashboard/leave": "Absence Tracker",
//   "/dashboard/payroll": "Payroll Processing",
//   "/dashboard/performance": "Performance Review",
//   "/dashboard/recruitment": "Candidate Sourcing",
//   "/dashboard/reports": "Report Generator",
// };

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // const pathname = usePathname();
  // const title = pageTitles[pathname] || "Synergy HR";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
