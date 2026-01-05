'use client';
import { Header } from '@/components/layout/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, LogIn, LogOut, CalendarPlus, Briefcase, Sun } from 'lucide-react';
import { addDays, format, isSameDay, isValid } from 'date-fns';
import { DayProps } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { useAttendanceStore } from '@/hooks/use-attendance-store';
import { attendanceData, holidays } from '@/lib/data';


export default function EmployeeAttendancePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
    const {
    punchInTime,
    punchOutTime,
    isPunchedIn,
    handlePunch,
    getElapsedTime,
  } = useAttendanceStore();

  const selectedDayData = date ? attendanceData[format(date, 'yyyy-MM-dd')] : null;
  const selectedHoliday = date ? holidays.find(h => isSameDay(h.date, date)) : null;

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todayData = attendanceData[todayStr] || {};
  if (isPunchedIn && !punchOutTime) {
      todayData.status = 'Present (Clocked In)';
      todayData.checkIn = format(punchInTime!, 'hh:mm a');
      todayData.checkOut = 'Pending';
      todayData.totalHours = getElapsedTime();
  } else if (punchOutTime) {
      todayData.status = 'Present';
      todayData.checkIn = format(punchInTime!, 'hh:mm a');
      todayData.checkOut = format(punchOutTime, 'hh:mm a');
      todayData.totalHours = getElapsedTime();
  }


    const CustomDay = (props: DayProps) => {
        const { date, displayMonth } = props;
        if (!isValid(date) || !displayMonth) {
            return <td role="gridcell" className="rdp-cell"></td>;
        }

        const dateStr = format(date, 'yyyy-MM-dd');
        const dayData = attendanceData[dateStr];

        let badgeClass = '';
        if (dayData?.status?.startsWith('Present')) {
            badgeClass = 'bg-green-500';
        } else if (dayData?.status === 'Absent') {
            badgeClass = 'bg-red-500';
        } else if (dayData?.status === 'On Leave') {
            badgeClass = 'bg-yellow-500';
        } else if (holidays.some(h => isSameDay(h.date, date))) {
            badgeClass = 'bg-purple-500';
        }

        return (
            <td role="gridcell" className={cn("rdp-cell relative", props.className)}>
                <button
                    {...props.buttonProps}
                    type="button"
                    className={cn("rdp-button_reset rdp-button", props.buttonProps?.className)}
                    disabled={props.disabled}
                    tabIndex={props.tabIndex}
                >
                    {format(date, 'd')}
                    {badgeClass && (
                        <span className={`absolute bottom-1 right-1 h-2 w-2 rounded-full ${badgeClass}`}></span>
                    )}
                </button>
            </td>
        );
    };


  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="My Attendance" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <CardTitle>Today's Attendance</CardTitle>
                    <CardDescription>
                        Status for {format(new Date(), "MMMM d, yyyy")}
                    </CardDescription>
                </div>
                 <div className="flex flex-wrap gap-2">
                     <Button
                        className="w-full sm:w-auto"
                        onClick={handlePunch}
                        disabled={!!punchOutTime}
                        variant={isPunchedIn ? 'outline' : 'default'}
                    >
                        {isPunchedIn ? <LogOut className="mr-2 h-4 w-4" /> : <LogIn className="mr-2 h-4 w-4" />}
                        {isPunchedIn ? 'Check Out' : 'Check In'}
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto">
                        <CalendarPlus className="mr-2 h-4 w-4" /> Request Regularization
                    </Button>
                </div>
            </CardHeader>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Attendance Calendar</CardTitle>
              <CardDescription>Select a date to view details. </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                components={{
                  Day: CustomDay
                }}
              />
            </CardContent>
          </Card>
          <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Details for {date ? format(date, "MMMM d") : 'selected date'}</CardTitle>
                </CardHeader>
                <CardContent>
                    {date && isSameDay(date, new Date()) && isPunchedIn ? (
                         <div>
                            <Badge className='bg-green-500'>Present (Clocked In)</Badge>
                             <div className="mt-4 space-y-2 text-sm">
                                <div className="flex justify-between"><span>Check-in:</span> <span>{punchInTime ? format(punchInTime, 'hh:mm a') : '-'}</span></div>
                                <div className="flex justify-between"><span>Check-out:</span> <span>{punchOutTime ? format(punchOutTime, 'hh:mm a') : 'Pending'}</span></div>
                                <div className="flex justify-between font-semibold"><span>Total Hours:</span> <span>{getElapsedTime()}</span></div>
                             </div>
                        </div>
                    ) : selectedDayData ? (
                        <div>
                             <Badge variant={selectedDayData.status === 'Present' ? 'default' : 'destructive'} className={cn(
                                {'bg-green-500': selectedDayData.status === 'Present'},
                                {'bg-yellow-500': selectedDayData.status === 'On Leave'},
                                {'bg-red-500': selectedDayData.status === 'Absent'}
                                )}>
                                {selectedDayData.status}
                             </Badge>
                             {selectedDayData.checkIn && (
                                 <div className="mt-4 space-y-2 text-sm">
                                    <div className="flex justify-between"><span>Check-in:</span> <span>{selectedDayData.checkIn}</span></div>
                                    <div className="flex justify-between"><span>Check-out:</span> <span>{selectedDayData.checkOut}</span></div>
                                    <div className="flex justify-between font-semibold"><span>Total Hours:</span> <span>{selectedDayData.totalHours}</span></div>
                                 </div>
                             )}
                        </div>
                    ) : selectedHoliday ? (
                        <div>
                            <Badge className="bg-purple-500">Holiday</Badge>
                            <p className="mt-4 text-sm">{selectedHoliday.name}</p>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No data for this day.</p>
                    )}
                </CardContent>
            </Card>
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
                        {holidays.filter(h => h.date > new Date()).slice(0, 2).map(h => (
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
      </main>
    </div>
  );
}
