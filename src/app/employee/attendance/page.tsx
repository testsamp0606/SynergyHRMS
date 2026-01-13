'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { CalendarPlus, Briefcase, Sun } from 'lucide-react';
import { 
  format, 
  isSameDay, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  getDay,
} from 'date-fns';
import { cn } from '@/lib/utils';
import { attendanceData, holidays } from '@/lib/data';
import { AttendanceCard } from '../dashboard/attendance-card';


export default function EmployeeAttendancePage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const getDayStatus = (day: Date) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const dayData = attendanceData[dateStr];
    const holiday = holidays.find(h => isSameDay(h.date, day));
    const dayOfWeek = getDay(day);

    if (holiday) return { status: 'Holiday', details: holiday.name, variant: 'default' as const, className: 'bg-blue-500/10 text-blue-600' };
    if (dayOfWeek === 0 || dayOfWeek === 6) return { status: 'Week Off', details: '---', variant: 'outline' as const, className: 'text-muted-foreground'};
    if (dayData) {
      switch(dayData.status) {
        case 'Present': return { status: 'Present', details: `In: ${dayData.checkIn}, Out: ${dayData.checkOut}, Total: ${dayData.totalHours}`, variant: 'secondary' as const, className: 'text-green-600' };
        case 'Half Day': return { status: 'Half Day', details: `In: ${dayData.checkIn}, Out: ${dayData.checkOut}, Total: ${dayData.totalHours}`, variant: 'secondary' as const, className: 'text-yellow-600' };
        case 'Absent': return { status: 'Absent', details: '---', variant: 'destructive' as const };
        case 'On Leave': return { status: 'On Leave', details: '---', variant: 'default' as const, className: 'bg-yellow-500/10 text-yellow-600' };
      }
    }
    return { status: 'N/A', details: '---', variant: 'outline' as const };
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <AttendanceCard />
    <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <CardTitle>Today's Attendance</CardTitle>
                <CardDescription>
                    Status for {format(new Date(), "MMMM d, yyyy")}
                </CardDescription>
            </div>
             <div className="flex flex-col sm:flex-row gap-2">
                 <Button variant="outline" className="w-full sm:w-auto">
                    <CalendarPlus className="mr-2 h-4 w-4" /> Request Regularization
                </Button>
            </div>
        </CardHeader>
    </Card>

    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Attendance for {format(currentMonth, 'MMMM yyyy')}</CardTitle>
          <CardDescription>A summary of your attendance for the current month.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden sm:table-cell">Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {monthDays.map(day => {
                        const { status, details, variant, className } = getDayStatus(day);
                        return (
                            <TableRow key={day.toString()}>
                                <TableCell className="font-medium">{format(day, 'MMM d, EEE')}</TableCell>
                                <TableCell>
                                    <Badge variant={variant} className={className}>{status}</Badge>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell text-muted-foreground text-xs">{details}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
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
      </div>
    </div>
</div>
  );
}
