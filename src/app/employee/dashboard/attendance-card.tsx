'use client';
import { useState, useEffect } from 'react';
import { format, intervalToDuration, formatDuration } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, LogIn, LogOut, CircleCheck } from 'lucide-react';

export function AttendanceCard() {
  const [time, setTime] = useState(new Date());
  const [punchInTime, setPunchInTime] = useState<Date | null>(null);
  const [punchOutTime, setPunchOutTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState('0h 0m 0s');

  const isPunchedIn = punchInTime && !punchOutTime;

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);

    let elapsedTimerId: NodeJS.Timeout;
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
    }

    return () => {
      clearInterval(timerId);
      if (elapsedTimerId) clearInterval(elapsedTimerId);
    };
  }, [isPunchedIn, punchInTime]);

  const handlePunch = () => {
    const now = new Date();
    if (!isPunchedIn) {
      setPunchInTime(now);
      setPunchOutTime(null);
    } else {
      setPunchOutTime(now);
      if (punchInTime) {
        const duration = intervalToDuration({ start: punchInTime, end: now });
        const formatted =
          formatDuration(duration, { format: ['hours', 'minutes', 'seconds'] })
            .replace(' seconds', 's')
            .replace(' minutes', 'm')
            .replace(' hours', 'h') || '0s';
        setElapsedTime(formatted);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Attendance</CardTitle>
        <CardDescription className="flex items-center gap-2 pt-1">
          <Clock className="h-4 w-4" />
          <span>{time.toLocaleTimeString()}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {punchOutTime ? (
          <div className="flex items-center justify-center rounded-md border border-green-500 bg-green-50 p-4 text-green-700 dark:bg-green-900/20 dark:text-green-300">
            <CircleCheck className="mr-2 h-5 w-5" />
            <span className="font-medium">Present</span>
          </div>
        ) : (
          <Button
            className="w-full"
            onClick={handlePunch}
            disabled={!!punchOutTime}
            variant={isPunchedIn ? 'outline' : 'default'}
          >
            {isPunchedIn ? <LogOut className="mr-2 h-4 w-4" /> : <LogIn className="mr-2 h-4 w-4" />}
            {isPunchedIn ? 'Punch Out' : 'Punch In'}
          </Button>
        )}
        {punchInTime && !punchOutTime && (
          <div className="text-sm text-muted-foreground space-y-2">
            <div className="flex justify-between">
              <span>Punched In:</span>
              <span className="font-medium text-foreground">{format(punchInTime, 'hh:mm:ss a')}</span>
            </div>
            <div className="flex justify-between">
              <span>Time Elapsed:</span>
              <span className="font-medium text-foreground">{elapsedTime}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
