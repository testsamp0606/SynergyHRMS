"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenuButton,
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
  LifeBuoy,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation'

const navItems = [
  { href: "/hr/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/hr/employees", icon: Users, label: "Employee Management" },
  { href: "/hr/leave", icon: CalendarCheck, label: "Attendance & Leave" },
  { href: "/hr/payroll", icon: Wallet, label: "Payroll & Compliance" },
  { href: "/hr/recruitment", icon: UserPlus, label: "Recruitment" },
  { href: "/hr/performance", icon: TrendingUp, label: "Performance Management" },
  { href: "/hr/training", icon: GraduationCap, label: "Training & Development" },
  { href: "/hr/assets", icon: Package, label: "Assets Management" },
  { href: "/hr/expenses", icon: Receipt, label: "Expenses & Claims" },
  { href: "/hr/documents", icon: FileText, label: "Documents" },
  { href: "/hr/announcements", icon: Megaphone, label: "Announcements" },
  { href: "/hr/reports", icon: BarChart3, label: "Reports & Analytics" },
  { href: "/hr/users-roles", icon: UsersRound, label: "Users & Roles" },
  { href: "/hr/settings", icon: Settings, label: "Settings" },
  { href: "/hr/audit-logs", icon: History, label: "Audit Logs" },
  { href: "/hr/help-support", icon: LifeBuoy, label: "Help & Support" },
]

export function HrSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-2">
        <div className="flex h-12 items-center justify-between">
            <div className="flex items-center gap-2 px-2 cursor-pointer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    className="h-8 w-8 shrink-0 text-primary"
                >
                    <path
                    fill="currentColor"
                    d="M228.4 89.32a20.08 20.08 0 0 0-21.6-21.6l-60.12 17.18L129.5 27.68a20.08 20.08 0 0 0-39 0l-17.18 60.12-60.12-17.18a20.08 20.08 0 0 0-21.6 21.6l17.18 60.12L8 166.5a20.08 20.08 0 0 0 0 39l60.12 17.18L85.32 240a20.08 20.08 0 0 0 21.6 21.6l60.12-17.18L184.22 248a20.08 20.08 0 0 0 39 0l17.18-60.12L248 166.5a20.08 20.08 0 0 0 21.6-21.6l-17.18-60.12ZM128 164a36 36 0 1 1 36-36a36 36 0 0 1-36 36Z"
                    />
                </svg>
                <span className="text-xl font-semibold leading-none">Synergy</span>
            </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                tooltip={item.label}
                isActive={pathname === item.href}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
      </SidebarFooter>
    </Sidebar>
  )
}
