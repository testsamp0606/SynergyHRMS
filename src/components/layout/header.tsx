
"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarTrigger
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings, User, Clock, Bell, CircleCheck, MessageSquareWarning, CircleAlert } from "lucide-react"
import { ThemeToggle } from "../theme-toggle"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

function getTitleFromPathname(pathname: string): string {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return "Dashboard";

    const lastSegment = segments[segments.length - 1];

    if (lastSegment === 'dashboard') {
        if (segments.length > 1) {
            const role = segments[0];
            if (role === 'hr') return "HR Dashboard";
            if (role === 'manager') return "Manager Dashboard";
            if (role === 'employee') return "Employee Dashboard";
        }
        return "Admin Dashboard";
    }

    // Convert camelCase or kebab-case to Title Case
    return lastSegment
        .replace(/([A-Z])/g, ' $1')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase())
        .trim();
}

const notifications = [
    {
        icon: <CircleCheck className="h-4 w-4 text-green-500" />,
        title: "Leave Approved",
        description: "Your leave request for Dec 20-22 has been approved.",
        time: "5 minutes ago",
        href: "/employee/leave"
    },
    {
        icon: <MessageSquareWarning className="h-4 w-4 text-yellow-500" />,
        title: "Performance Review",
        description: "Your self-appraisal for H2 2024 is due in 3 days.",
        time: "1 hour ago",
        href: "/employee/performance"
    },
    {
        icon: <CircleAlert className="h-4 w-4 text-red-500" />,
        title: "Payroll Processed",
        description: "The payroll for August 2024 has been processed.",
        time: "2 days ago",
        href: "/employee/payroll"
    },
]

export function Header() {
  const pathname = usePathname();
  const title = getTitleFromPathname(pathname);
  const [time, setTime] = useState(new Date());

   useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      </div>
      <div className="ml-auto flex items-center gap-2 md:gap-4">
        <div className="hidden sm:flex items-center gap-2 text-sm font-medium">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{time.toLocaleTimeString()}</span>
        </div>
        <ThemeToggle />
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                 <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                     <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    <Badge variant="secondary">{notifications.length}</Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {notifications.map((notification, index) => (
                         <Link href={notification.href} key={index}>
                            <DropdownMenuItem className="flex items-start gap-3 cursor-pointer">
                                {notification.icon}
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{notification.title}</p>
                                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                                </div>
                            </DropdownMenuItem>
                        </Link>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-sm text-muted-foreground">
                    Mark all as read
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://picsum.photos/seed/user/100/100`} alt="User Avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Synergy User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  user@synergy.com
                </p>
              </div>
            </DropdownMenuLabel>
             <DropdownMenuLabel className="font-normal pt-0">
                <p className="text-xs text-muted-foreground">
                    Last login: {format(new Date(), "MMM d, yyyy 'at' hh:mm a")}
                </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
