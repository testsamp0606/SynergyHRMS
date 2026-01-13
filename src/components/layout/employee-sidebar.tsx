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
  User,
  CalendarCheck,
  CalendarClock,
  Wallet,
  Receipt,
  TrendingUp,
  GraduationCap,
  Package,
  FileText,
  Megaphone,
  LifeBuoy,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation'

const navItems = [
  { href: "/employee/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/employee/profile", icon: User, label: "My Profile" },
  { href: "/employee/attendance", icon: CalendarCheck, label: "Attendance" },
  { href: "/employee/timesheet", icon: Clock, label: "Timesheet" },
  { href: "/employee/leave", icon: CalendarClock, label: "Leave" },
  { href: "/employee/payroll", icon: Wallet, label: "Payroll" },
  { href: "/employee/expenses", icon: Receipt, label: "Expenses" },
  { href: "/employee/performance", icon: TrendingUp, label: "Performance" },
  { href: "/employee/training", icon: GraduationCap, label: "Training" },
  { href: "/employee/assets", icon: Package, label: "Assets" },
  { href: "/employee/documents", icon: FileText, label: "Documents" },
  { href: "/employee/announcements", icon: Megaphone, label: "Announcements" },
  { href: "/employee/help-support", icon: LifeBuoy, label: "Help & Support" },
]

export function EmployeeSidebar() {
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
                variant={pathname.startsWith(item.href) && (item.href !== '/employee/dashboard' || pathname === '/employee/dashboard') ? "secondary" : "ghost"}
                className="w-full justify-start"
                tooltip={item.label}
                isActive={pathname.startsWith(item.href) && (item.href !== '/employee/dashboard' || pathname === '/employee/dashboard')}
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
