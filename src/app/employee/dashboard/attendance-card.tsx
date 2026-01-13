
'use client';
import { useState, useEffect } from 'react';
import { format, intervalToDuration, formatDuration } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, LogIn, LogOut, CircleCheck, ArrowRight } from 'lucide-react';
import { useAttendanceStore } from '@/store/attendance-store';
import Link from 'next/link';

export function AttendanceCard() {
  const { punchInTime, punchOutTime, punchIn, punchOut } = useAttendanceStore();
  const [time, setTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState('0h 0m 0s');

  const isPunchedIn = punchInTime && !punchOutTime;

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);

    let elapsedTimerId: NodeJS.Timeout | undefined;
    if (isPunchedIn) {
      elapsedTimerId = setInterval(() => {
        if (punchInTime) {
          const duration = intervalToDuration({ start: punchInTime, end: new Date() });
          const formatted =
            formatDuration(duration, { format: ['hours', 'minutes', 'seconds'] })
              .replace(' seconds', 's')
              .replace(' minutes', 'm')
              .replace(' hours', 'h') || '0s';
          setElapsedTime(formatted);
        }
      }, 1000);
    } else {
        if (punchInTime && punchOutTime) {
            const duration = intervalToDuration({ start: punchInTime, end: punchOutTime });
            const formatted = formatDuration(duration, { format: ['hours', 'minutes'] });
            setElapsedTime(formatted);
        } else {
            setElapsedTime('0h 0m 0s');
        }
    }

    return () => {
      clearInterval(timerId);
      if (elapsedTimerId) clearInterval(elapsedTimerId);
    };
  }, [isPunchedIn, punchInTime, punchOutTime]);

  const handlePunch = () => {
    if (!isPunchedIn) {
      punchIn();
    } else {
      punchOut();
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4">
        <div className="flex items-center gap-4">
             <div className="text-center sm:text-left">
                <p className="text-sm font-medium text-muted-foreground">Today's Attendance</p>
                <p className="text-2xl font-bold">{format(new Date(), "MMMM d, yyyy")}</p>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block"/>
            <div className="text-center sm:text-left">
                 <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Current Time
                </p>
                <p className="text-2xl font-bold">{time.toLocaleTimeString()}</p>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
           {punchInTime && (
                <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">Total Hours</p>
                    <p className="text-2xl font-bold">{elapsedTime}</p>
                </div>
            )}
           <div className="flex gap-2 w-full sm:w-auto">
             <Button
                className="w-full"
                onClick={handlePunch}
                disabled={!!punchOutTime}
                variant={isPunchedIn ? 'outline' : 'default'}
                >
                {isPunchedIn ? <LogOut className="mr-2 h-4 w-4" /> : <LogIn className="mr-2 h-4 w-4" />}
                {isPunchedIn ? 'Punch Out' : 'Punch In'}
            </Button>
             <Button variant="outline" asChild>
                <Link href="/employee/attendance">
                    View Calendar <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
             </Button>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
