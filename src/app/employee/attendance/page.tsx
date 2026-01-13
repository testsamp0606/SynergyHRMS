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
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, LogIn, LogOut, CalendarPlus, Briefcase, Sun } from 'lucide-react';
import { addDays, format, isSameDay, isValid, intervalToDuration, formatDuration, getDay } from 'date-fns';
import { DayProps, DayContent, DayContentProps } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { attendanceData, holidays } from '@/lib/data';
import { useAttendanceStore } from '@/store/attendance-store';


export default function EmployeeAttendancePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { punchInTime, punchOutTime, punchIn, punchOut } = useAttendanceStore();
  const [elapsedTime, setElapsedTime] = useState("0h 0m 0s");

  const isPunchedIn = punchInTime && !punchOutTime;
    
    useEffect(() => {
        let elapsedTimerId: NodeJS.Timeout | undefined;
        if (isPunchedIn) {
            elapsedTimerId = setInterval(() => {
                if (punchInTime) {
                    const duration = intervalToDuration({ start: punchInTime, end: new Date() });
                    const formatted = formatDuration(duration, { format: ['hours', 'minutes', 'seconds'] })
                        .replace(' seconds', 's')
                        .replace(' minutes', 'm')
                        .replace(' hours', 'h');
                    setElapsedTime(formatted || "0s");
                }
            }, 1000);
        } else if (punchInTime && punchOutTime) {
            const duration = intervalToDuration({ start: punchInTime, end: punchOutTime });
            const formatted = formatDuration(duration, { format: ['hours', 'minutes'] });
            setElapsedTime(formatted);
        }


        return () => {
            if (elapsedTimerId) clearInterval(elapsedTimerId);
        };
    }, [isPunchedIn, punchInTime, punchOutTime]);


  const selectedDayData = date ? attendanceData[format(date, 'yyyy-MM-dd')] : null;
  const selectedHoliday = date ? holidays.find(h => isSameDay(h.date, date)) : null;

  const handlePunch = () => {
    if (!isPunchedIn) {
      punchIn();
    } else {
      punchOut();
    }
  };


    const CustomDay = (props: DayContentProps) => {
        const { date, activeModifiers } = props;
        const dateStr = format(date, 'yyyy-MM-dd');
        const dayData = attendanceData[dateStr];
        const holiday = holidays.find(h => isSameDay(h.date, date));
        const dayOfWeek = getDay(date);
        
        let status = dayData?.status;
        let cellClass = '';
        
        if (holiday) {
            status = holiday.name;
            cellClass = 'bg-blue-50 dark:bg-blue-900/20 text-blue-600';
        } else if (dayData) {
             switch (dayData.status) {
                case 'Present':
                case 'Half Day':
                    cellClass = 'bg-green-50 dark:bg-green-900/20 text-green-700';
                    break;
                case 'Absent':
                    cellClass = 'bg-red-50 dark:bg-red-900/20 text-red-700';
                    break;
                case 'On Leave':
                    cellClass = 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700';
                    break;
                 case 'Week Off':
                     cellClass = 'bg-gray-100 dark:bg-gray-800 text-gray-500';
                     break;
            }
        } else if (dayOfWeek === 0 || dayOfWeek === 6) {
             status = "Week Off";
             cellClass = 'bg-gray-100 dark:bg-gray-800 text-gray-500';
        }


        return (
            <div className={cn('relative flex h-full flex-col p-1', cellClass, {'ring-2 ring-primary ring-inset': activeModifiers.selected })}>
               <div className="absolute top-1 left-1 text-xs font-semibold">{format(date, 'd')}</div>
               {status && <div className="mt-4 text-[10px] font-medium leading-tight break-words">{status}</div>}
            </div>
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
                 <div className="flex flex-col sm:flex-row gap-2">
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

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Attendance Calendar</CardTitle>
              <CardDescription>Select a date to view details. </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-0 sm:p-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                components={{
                  DayContent: CustomDay
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
                    {date && isSameDay(date, new Date()) && punchInTime ? (
                         <div>
                            <Badge className='bg-green-500'>Present (Clocked In)</Badge>
                             <div className="mt-4 space-y-2 text-sm">
                                <div className="flex justify-between"><span>Check-in:</span> <span>{punchInTime ? format(punchInTime, 'hh:mm a') : '-'}</span></div>
                                <div className="flex justify-between"><span>Check-out:</span> <span>{punchOutTime ? format(punchOutTime, 'hh:mm a') : 'Pending'}</span></div>
                                <div className="flex justify-between font-semibold"><span>Total Hours:</span> <span>{elapsedTime}</span></div>
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
      </main>
    </div>
  );
}
