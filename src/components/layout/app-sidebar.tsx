"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Wallet,
  UserPlus,
  TrendingUp,
  GraduationCap,
  Package,
  Receipt,
  FileText,
  Megaphone,
  BarChart3,
  UsersRound,
  Settings,
  History,
  LifeBuoy
} from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Button } from "../ui/button"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/employees", icon: Users, label: "Employee Management" },
  { href: "/dashboard/leave", icon: CalendarCheck, label: "Attendance & Leave" },
  { href: "/dashboard/payroll", icon: Wallet, label: "Payroll & Compliance" },
  { href: "/dashboard/recruitment", icon: UserPlus, label: "Recruitment" },
  { href: "/dashboard/performance", icon: TrendingUp, label: "Performance Management" },
  { href: "/dashboard/training", icon: GraduationCap, label: "Training & Development" },
  { href: "/dashboard/assets", icon: Package, label: "Assets Management" },
  { href: "/dashboard/expenses", icon: Receipt, label: "Expenses & Claims" },
  { href: "/dashboard/documents", icon: FileText, label: "Documents" },
  { href: "/dashboard/announcements", icon: Megaphone, label: "Announcements" },
  { href: "/dashboard/reports", icon: BarChart3, label: "Reports & Analytics" },
  { href: "/dashboard/users-roles", icon: UsersRound, label: "Users & Roles" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  { href: "/dashboard/audit-logs", icon: History, label: "Audit Logs" },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-8 w-8 text-primary"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
          <span className="text-xl font-semibold">Synergy HR</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Button
                asChild
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
         <Button variant="ghost" className="w-full justify-start">
            <LifeBuoy className="mr-2 h-4 w-4" />
            Help & Support
         </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
