
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { CalendarPlus, Briefcase, Sun } from 'lucide-react';
import { 
  format, 
  isSameDay, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  getDay,
  getDate,
} from 'date-fns';
import { cn } from '@/lib/utils';
import { attendanceData, holidays } from '@/lib/data';
import { AttendanceCard } from '../dashboard/attendance-card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function EmployeeAttendancePage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  // Adjust for Monday start: 0 (Sun) -> 6, 1 (Mon) -> 0, etc.
  const startingDayIndex = (getDay(firstDayOfMonth) + 6) % 7;
  
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const totalCells = Math.ceil((startingDayIndex + daysInMonth.length) / 7) * 7;


  const getDayStatus = (day: Date) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const dayData = attendanceData[dateStr];
    const holiday = holidays.find(h => isSameDay(h.date, day));
    const dayOfWeek = getDay(day);

    if (holiday) return { status: 'Holiday', details: holiday.name, variant: 'default' as const, className: 'bg-blue-500/10 text-blue-600' };
    if (dayOfWeek === 0 || dayOfWeek === 6) return { status: 'Week Off', details: '---', variant: 'outline' as const, className: 'text-muted-foreground'};
    if (dayData) {
      switch(dayData.status) {
        case 'Present': return { status: 'Present', details: `In: ${dayData.checkIn}, Out: ${dayData.checkOut}`, variant: 'secondary' as const, className: 'text-green-600' };
        case 'Half Day': return { status: 'Half Day', details: `In: ${dayData.checkIn}, Out: ${dayData.checkOut}`, variant: 'secondary' as const, className: 'text-yellow-600' };
        case 'Absent': return { status: 'Absent', details: '---', variant: 'destructive' as const };
        case 'On Leave': return { status: 'On Leave', details: '---', variant: 'default' as const, className: 'bg-yellow-500/10 text-yellow-600' };
      }
    }
    return { status: 'N/A', details: '---', variant: 'outline' as const };
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <AttendanceCard />

    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Attendance for {format(currentMonth, 'MMMM yyyy')}</CardTitle>
          <CardDescription>A summary of your attendance for the current month.</CardDescription>
        </CardHeader>
        <CardContent>
            <TooltipProvider>
                <div className="grid grid-cols-7 border-t border-l">
                    {daysOfWeek.map(day => (
                        <div key={day} className="text-center font-semibold p-2 border-b border-r text-sm text-muted-foreground">
                            {day}
                        </div>
                    ))}
                    {Array.from({ length: startingDayIndex }).map((_, index) => (
                        <div key={`empty-${index}`} className="border-b border-r h-28 bg-muted/50" />
                    ))}
                    {daysInMonth.map((day) => {
                        const { status, details } = getDayStatus(day);
                        return (
                           <Tooltip key={day.toString()}>
                                <TooltipTrigger asChild>
                                    <div className="border-b border-r p-2 h-28 flex flex-col hover:bg-muted/50 cursor-pointer">
                                        <span className="font-semibold text-sm">{getDate(day)}</span>
                                        <div className="mt-1 flex-grow flex flex-col justify-between">
                                            <Badge variant="outline" className="text-xs w-min whitespace-nowrap">{status}</Badge>
                                            <p className="text-xs text-muted-foreground mt-1 break-words truncate">
                                                {details !== '---' ? details : ''}
                                            </p>
                                        </div>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className='font-bold'>{format(day, 'MMMM d, yyyy')}</p>
                                    <p>Status: {status}</p>
                                    {details !== '---' && <p>Details: {details}</p>}
                                </TooltipContent>
                            </Tooltip>
                        )
                    })}
                    {Array.from({ length: totalCells - daysInMonth.length - startingDayIndex }).map((_, index) => (
                        <div key={`empty-end-${index}`} className="border-b border-r h-28 bg-muted/50" />
                    ))}
                </div>
            </TooltipProvider>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5" /> My Shift</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm">General Shift: 09:00 AM - 06:00 PM</p>
                <p className="text-xs text-muted-foreground">Monday to Friday</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sun className="h-5 w-5" /> Upcoming Holidays</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm">
                    {holidays.filter(h => h.date > new Date()).slice(0, 3).map(h => (
                       <li key={h.name} className="flex justify-between">
                           <span>{h.name}</span>
                           <span className="text-muted-foreground">{format(h.date, 'MMM d')}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Request Regularization</CardTitle>
                <CardDescription>Correct a missed punch-in or punch-out.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Button variant="outline" className="w-full">
                    <CalendarPlus className="mr-2 h-4 w-4" /> New Request
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
</div>
  );
}
