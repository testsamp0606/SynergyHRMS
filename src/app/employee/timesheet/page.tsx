
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
  isSameDay,
  eachDayOfInterval,
  parse,
} from 'date-fns';
import { timesheetData } from '@/lib/data';
import type { TimesheetEntry } from '@/lib/types';
import { Save, Send, Clock } from 'lucide-react';

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
  return weeks.map((weekStart, index) => ({
    label: `Week ${index + 1} (${format(weekStart, 'MMM d')})`,
    value: getWeek(weekStart, { weekStartsOn: 1 }),
  }));
};

export default function TimesheetPage() {
  const [currentDate] = useState(new Date());
  const [weeks, setWeeks] = useState(getWeeksForMonth(currentDate));
  const [selectedWeek, setSelectedWeek] = useState<number>(weeks[0]?.value);
  const [entries, setEntries] = useState<TimesheetEntry[]>(timesheetData);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setWeeks(getWeeksForMonth(currentDate));
  }, [currentDate]);

  useEffect(() => {
    setIsEditing(selectedWeek !== undefined);
  }, [selectedWeek]);

  const handleWeekChange = (value: string) => {
    setSelectedWeek(Number(value));
  };

  const handleTimeChange = (id: string, field: 'loginTime' | 'logoutTime', value: string) => {
    setEntries(prevEntries => {
      const newEntries = prevEntries.map(entry => {
        if (entry.id === id) {
          const updatedEntry = { ...entry, [field]: value };
          if (updatedEntry.loginTime && updatedEntry.logoutTime) {
            try {
              const login = parse(updatedEntry.loginTime, 'HH:mm', new Date());
              const logout = parse(updatedEntry.logoutTime, 'HH:mm', new Date());
              if (logout > login) {
                const diff = (logout.getTime() - login.getTime()) / (1000 * 60 * 60);
                updatedEntry.totalHours = `${diff.toFixed(2)}h`;
              }
            } catch (e) {
                // handle invalid time format
            }
          }
          return updatedEntry;
        }
        return entry;
      });
      return newEntries;
    });
  };
  
  const getWeekNumber = (date: Date) => getWeek(date, { weekStartsOn: 1 });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>My Timesheet</CardTitle>
            <CardDescription>
              Submit your weekly hours for {format(currentDate, 'MMMM yyyy')}.
            </CardDescription>
          </div>
          <Select onValueChange={handleWeekChange} defaultValue={String(selectedWeek)}>
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
              {entries.filter(entry => getWeekNumber(entry.date) === selectedWeek).map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{format(entry.date, 'MMM d, yyyy')}</TableCell>
                  <TableCell>{format(entry.date, 'EEEE')}</TableCell>
                  <TableCell>
                    {isEditing && entry.status === 'Draft' ? (
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
                     {isEditing && entry.status === 'Draft' ? (
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
        <CardFooter className="justify-end gap-2">
            <Button variant="outline"><Save className="mr-2 h-4 w-4" /> Save as Draft</Button>
            <Button><Send className="mr-2 h-4 w-4" /> Submit for Approval</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
