
"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarTrigger
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings, User, Clock, Bell } from "lucide-react"
import { ThemeToggle } from "../theme-toggle"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { format } from "date-fns"

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
        <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
        </Button>
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
