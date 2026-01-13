

'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { CalendarPlus, Briefcase, Sun, Clock, LogIn, LogOut } from 'lucide-react';
import { 
  format, 
  isSameDay, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  getDay,
  getDate,
  isToday,
  isFuture,
  intervalToDuration,
  startOfToday
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';

const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
const months = Array.from({ length: 12 }, (_, i) => ({
  value: i,
  label: format(new Date(0, i), 'MMMM'),
}));

export default function EmployeeAttendancePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [regularizationDate, setRegularizationDate] = useState<Date | undefined>(new Date());

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  // Adjust for Monday start: 0 (Sun) -> 6, 1 (Mon) -> 0, etc.
  const startingDayIndex = (getDay(firstDayOfMonth) + 6) % 7;
  
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDayStatus = (day: Date) => {
    const holiday = holidays.find(h => {
        const [year, month, dayOfMonth] = h.date.split('-').map(Number);
        // Create date in local timezone to match the calendar's dates
        const holidayDate = new Date(year, month - 1, dayOfMonth);
        return isSameDay(holidayDate, day);
    });
    
    const dayOfWeek = getDay(day);
    const dateStr = format(day, 'yyyy-MM-dd');
    const dayData = attendanceData[dateStr];

    if (holiday) return { status: 'Holiday', details: holiday.name, variant: 'default' as const, className: 'bg-blue-500/10 text-blue-600' };
    if (dayOfWeek === 0 || dayOfWeek === 6) return { status: 'Week Off', details: '---', variant: 'outline' as const, className: 'bg-muted/50 text-muted-foreground'};
    if (dayData) {
      switch(dayData.status) {
        case 'Present': return { status: 'Present', details: `In: ${dayData.checkIn}, Out: ${dayData.checkOut}`, variant: 'secondary' as const, className: 'bg-green-500/10 text-green-600' };
        case 'Half Day': return { status: 'Half Day', details: `In: ${dayData.checkIn}, Out: ${dayData.checkOut}`, variant: 'secondary' as const, className: 'bg-yellow-500/10 text-yellow-600' };
        case 'Absent': return { status: 'Absent', details: '---', variant: 'destructive' as const, className: 'bg-red-500/10' };
        case 'On Leave': return { status: 'On Leave', details: '---', variant: 'default' as const, className: 'bg-purple-500/10 text-purple-600' };
      }
    }
    if (isFuture(day) && !isToday(day)) return { status: 'Upcoming', details: '---', variant: 'outline' as const, className: 'opacity-50' };
    return { status: 'N/A', details: '---', variant: 'outline' as const, className: '' };
  }
  
  const today = startOfToday();
  const upcomingHolidays = holidays
    .map(h => {
        const [year, month, dayOfMonth] = h.date.split('-').map(Number);
        return { ...h, dateObj: new Date(year, month - 1, dayOfMonth) };
    })
    .filter(h => h.dateObj >= today)
    .slice(0, 3);


  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <AttendanceCard />

    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <CardTitle>Attendance for {format(currentDate, 'MMMM yyyy')}</CardTitle>
                <CardDescription>A summary of your attendance for the selected month.</CardDescription>
            </div>
            <div className="flex gap-2">
                <Select
                    value={String(currentYear)}
                    onValueChange={(year) => setCurrentDate(new Date(parseInt(year), currentMonth))}
                >
                    <SelectTrigger className="w-full sm:w-[120px]">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map(year => (
                            <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    value={String(currentMonth)}
                    onValueChange={(month) => setCurrentDate(new Date(currentYear, parseInt(month)))}
                >
                    <SelectTrigger className="w-full sm:w-[160px]">
                        <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                        {months.map(month => (
                            <SelectItem key={month.value} value={String(month.value)}>{month.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
          </div>
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
                        <div key={`empty-${index}`} className="border-b border-r aspect-square bg-muted/50" />
                    ))}
                    {daysInMonth.map((day) => {
                        const { status, details, className: statusClassName, variant } = getDayStatus(day);
                        const isFutureDate = isFuture(day) && !isToday(day);

                        const dayCell = (
                           <div className={cn("border-b border-r p-2 flex flex-col aspect-square",
                            isToday(day) && "bg-primary/20", 
                            !isFutureDate && 'hover:bg-accent/50 cursor-pointer',
                            statusClassName)}>
                                <span className={cn("font-semibold text-sm", isToday(day) && "text-primary")}>{getDate(day)}</span>
                                <div className="mt-1 flex-grow flex flex-col justify-start">
                                    <Badge variant={variant} className="text-xs w-min whitespace-nowrap">{status}</Badge>
                                </div>
                            </div>
                        );

                        if (isFutureDate) {
                            return <div key={day.toString()} className="opacity-50">{dayCell}</div>;
                        }

                        return (
                           <Tooltip key={day.toString()}>
                                <TooltipTrigger asChild>
                                    {dayCell}
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className='font-bold'>{format(day, 'MMMM d, yyyy')}</p>
                                    <p>Status: {status}</p>
                                    {details !== '---' && <p className="text-xs">{details}</p>}
                                </TooltipContent>
                            </Tooltip>
                        )
                    })}
                    {Array.from({ length: (7 - (daysInMonth.length + startingDayIndex) % 7) % 7 }).map((_, index) => (
                        <div key={`empty-end-${index}`} className="border-b border-r aspect-square bg-muted/50" />
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
                    {upcomingHolidays.map(h => (
                       <li key={h.name} className="flex justify-between">
                           <span>{h.name}</span>
                           <span className="text-muted-foreground">{format(h.dateObj, 'MMM d')}</span>
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
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <CalendarPlus className="mr-2 h-4 w-4" /> New Request
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                        <DialogTitle>New Regularization Request</DialogTitle>
                        <DialogDescription>
                            Fill in the details for your attendance correction.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="regularization-date">Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                        "justify-start text-left font-normal",
                                        !regularizationDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarPlus className="mr-2 h-4 w-4" />
                                        {regularizationDate ? format(regularizationDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={regularizationDate}
                                        onSelect={setRegularizationDate}
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="reason">Reason</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a reason" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="missed-punch-in">Missed Punch-In</SelectItem>
                                        <SelectItem value="missed-punch-out">Missed Punch-Out</SelectItem>
                                        <SelectItem value="late-login">Late Login</SelectItem>
                                        <SelectItem value="early-logout">Early Logout</SelectItem>
                                        <SelectItem value="overtime">Overtime</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="remarks">Remarks</Label>
                                <Textarea id="remarks" placeholder="Provide a brief explanation..."/>
                            </div>
                        </div>
                        <DialogFooter>
                        <Button type="submit">Submit Request</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
      </div>
    </div>
</div>
  );

    