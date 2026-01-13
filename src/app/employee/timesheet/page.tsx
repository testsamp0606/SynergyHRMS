
'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  format,
  getWeek,
  isSameMonth,
  parse,
  subMonths,
} from 'date-fns';
import { timesheetData } from '@/lib/data';
import type { TimesheetEntry } from '@/lib/types';
import { Save, Send, Upload } from 'lucide-react';

const statusVariant: { [key in TimesheetEntry['status']]: 'default' | 'secondary' | 'outline' | 'destructive' } = {
  'Approved': 'default',
  'Pending': 'secondary',
  'Draft': 'outline',
  'Rejected': 'destructive',
};

const getWeeksForMonth = (date: Date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const weeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });
  return weeks.map((weekStart) => ({
    label: `Week ${getWeek(weekStart, { weekStartsOn: 1 })} (${format(weekStart, 'MMM d')})`,
    value: getWeek(weekStart, { weekStartsOn: 1 }),
  }));
};

const getMonthsForSelection = () => {
    const today = new Date();
    return [
        { label: format(today, 'MMMM yyyy'), value: today.toISOString() },
        { label: format(subMonths(today, 1), 'MMMM yyyy'), value: subMonths(today, 1).toISOString() },
        { label: format(subMonths(today, 2), 'MMMM yyyy'), value: subMonths(today, 2).toISOString() },
    ];
};

export default function TimesheetPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [weeks, setWeeks] = useState(getWeeksForMonth(selectedMonth));
  const [selectedWeek, setSelectedWeek] = useState<number>(weeks[0]?.value);
  const [entries, setEntries] = useState<TimesheetEntry[]>(timesheetData);

  useEffect(() => {
    const newWeeks = getWeeksForMonth(selectedMonth);
    setWeeks(newWeeks);
    setSelectedWeek(newWeeks[0]?.value);
  }, [selectedMonth]);
  
  const isCurrentMonth = isSameMonth(selectedMonth, new Date());

  const handleTimeChange = (id: string, field: 'loginTime' | 'logoutTime', value: string) => {
    setEntries(prevEntries => {
      return prevEntries.map(entry => {
        if (entry.id === id) {
          const updatedEntry = { ...entry, [field]: value, status: 'Draft' as const };
          
          if (updatedEntry.loginTime && updatedEntry.logoutTime) {
            try {
              const login = parse(updatedEntry.loginTime, 'HH:mm', new Date());
              const logout = parse(updatedEntry.logoutTime, 'HH:mm', new Date());
              
              if (!isNaN(login.getTime()) && !isNaN(logout.getTime()) && logout > login) {
                const diff = (logout.getTime() - login.getTime()) / (1000 * 60 * 60);
                const hours = Math.floor(diff);
                const minutes = Math.round((diff - hours) * 60);
                updatedEntry.totalHours = `${hours}h ${minutes}m`;
              } else {
                updatedEntry.totalHours = '0h 0m';
              }
            } catch (e) {
                console.error("Error parsing time", e);
                updatedEntry.totalHours = '0h 0m';
            }
          }
          return updatedEntry;
        }
        return entry;
      });
    });
  };
  
  const getWeekNumber = (date: Date) => getWeek(date, { weekStartsOn: 1 });

  const monthOptions = getMonthsForSelection();

  const filteredEntries = entries.filter(entry => 
    isSameMonth(entry.date, selectedMonth) && getWeekNumber(entry.date) === selectedWeek
  );

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>My Timesheet</CardTitle>
            <CardDescription>
              Submit your weekly hours. You can edit the current month and view the last two months.
            </CardDescription>
          </div>
           <div className="flex gap-2 w-full md:w-auto">
            <Select onValueChange={(value) => setSelectedMonth(new Date(value))} defaultValue={selectedMonth.toISOString()}>
                <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Select a month" />
                </SelectTrigger>
                <SelectContent>
                    {monthOptions.map(month => (
                        <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSelectedWeek(Number(value))} value={String(selectedWeek)}>
                <SelectTrigger className="w-full md:w-[280px]">
                <SelectValue placeholder="Select a week" />
                </SelectTrigger>
                <SelectContent>
                {weeks.map(week => (
                    <SelectItem key={week.value} value={String(week.value)}>
                    {week.label}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Login</TableHead>
                <TableHead>Logout</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{format(entry.date, 'MMM d, yyyy')}</TableCell>
                  <TableCell>{format(entry.date, 'EEEE')}</TableCell>
                  <TableCell>
                    {isCurrentMonth && entry.status === 'Draft' ? (
                      <Input
                        type="time"
                        value={entry.loginTime}
                        onChange={(e) => handleTimeChange(entry.id, 'loginTime', e.target.value)}
                        className="h-8"
                      />
                    ) : (
                      entry.loginTime
                    )}
                  </TableCell>
                  <TableCell>
                     {isCurrentMonth && entry.status === 'Draft' ? (
                      <Input
                        type="time"
                        value={entry.logoutTime}
                        onChange={(e) => handleTimeChange(entry.id, 'logoutTime', e.target.value)}
                        className="h-8"
                      />
                    ) : (
                      entry.logoutTime
                    )}
                  </TableCell>
                  <TableCell>{entry.totalHours}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[entry.status]}>{entry.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        {isCurrentMonth && (
            <CardFooter className="justify-end gap-2">
                <Button variant="outline"><Save className="mr-2 h-4 w-4" /> Save as Draft</Button>
                <Button><Send className="mr-2 h-4 w-4" /> Submit for Approval</Button>
            </CardFooter>
        )}
      </Card>
    </main>
  );
}
