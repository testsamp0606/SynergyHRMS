

'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { leaveRequests, holidays } from '@/lib/data';
import {
  format,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  getDate,
  isToday,
  isFuture
} from 'date-fns';
import { Check, X } from 'lucide-react';
import { ManagerAttendanceCard } from '../dashboard/manager-attendance-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useState } from 'react';


const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
const months = Array.from({ length: 12 }, (_, i) => ({
  value: i,
  label: format(new Date(0, i), 'MMMM'),
}));


export default function ManagerAttendancePage() {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getDayStatus = (day: Date) => {
    const holiday = holidays.find(h => {
        const [year, month, dayOfMonth] = h.date.split('-').map(Number);
        const holidayDate = new Date(year, month - 1, dayOfMonth);
        return isSameDay(holidayDate, day);
    });
    
    const dayOfWeek = getDay(day);

    if (holiday) return { status: 'Holiday', details: holiday.name, variant: 'default' as const, className: 'bg-blue-500/10 text-blue-600' };
    if (dayOfWeek === 0 || dayOfWeek === 6) return { status: 'Week Off', details: '---', variant: 'outline' as const, className: 'bg-muted/50 text-muted-foreground'};
    
    const requestOnDay = leaveRequests.find(r => day >= r.startDate && day <= r.endDate);
    if(requestOnDay) return { status: 'On Leave', details: `${requestOnDay.employeeName} - ${requestOnDay.leaveType}`, variant: 'default' as const, className: 'bg-purple-500/10 text-purple-600' };
    
    if (isFuture(day) && !isToday(day)) return { status: 'Upcoming', details: '---', variant: 'outline' as const, className: 'opacity-50' };
    return { status: 'Present', details: 'All team members present', variant: 'secondary' as const, className: 'bg-green-500/10 text-green-600' };
  }

  return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <ManagerAttendanceCard />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leaveRequests.filter(r => r.status === 'Pending Manager Approval').length}</div>
              <p className="text-xs text-muted-foreground">Leave applications to review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team on Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Members on approved leave today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Team members late today</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>
                Review and respond to leave requests from your team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests
                    .filter((r) => r.status === 'Pending Manager Approval')
                    .map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage
                                src={request.employeeAvatar}
                                alt="Avatar"
                              />
                              <AvatarFallback>
                                {request.employeeName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {request.employeeName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(request.startDate, 'MMM d')} -{' '}
                          {format(request.endDate, 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{request.leaveType}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 mr-2"
                          >
                            <Check className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <X className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle>Team Calendar</CardTitle>
                        <CardDescription>View upcoming team absences.</CardDescription>
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
            <CardContent className="flex justify-center p-0 sm:p-4">
                 <TooltipProvider>
                    <div className="grid grid-cols-7 border-t border-l w-full">
                        {daysOfWeek.map(day => (
                            <div key={day} className="text-center font-semibold p-2 border-b border-r text-xs text-muted-foreground">
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
                               <div className={cn("border-b border-r p-1 flex flex-col aspect-square",
                                isToday(day) && "bg-primary/20", 
                                !isFutureDate && 'hover:bg-accent/50 cursor-pointer',
                                statusClassName)}>
                                    <span className={cn("font-semibold text-xs", isToday(day) && "text-primary")}>{getDate(day)}</span>
                                    <div className="mt-1 flex-grow flex flex-col justify-start">
                                        <Badge variant={variant} className="text-xs w-min whitespace-nowrap">{status}</Badge>
                                    </div>
                                </div>
                            );

                            if (isFutureDate) {
                                return <div key={day.toString()}>{dayCell}</div>;
                            }

                            return (
                               <Tooltip key={day.toString()}>
                                    <TooltipTrigger asChild>
                                        {dayCell}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className='font-bold'>{format(day, 'MMMM d, yyyy')}</p>
                                        <p>Status: {status}</p>
                                        {details !== '---' && <p>Details: {details}</p>}
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
        </div>
      </main>
  );
}
