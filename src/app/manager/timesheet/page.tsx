
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
  eachDayOfInterval,
  getDay,
  getDate,
  isToday,
} from 'date-fns';
import { timesheetData, employees } from '@/lib/data';
import type { TimesheetEntry } from '@/lib/types';
import { Save, Send, Check, X, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const teamMemberIds = ['EMP006', 'EMP005', 'EMP004', 'EMP003'];
const teamMembers = employees.filter((emp) => teamMemberIds.includes(emp.id));

const statusVariant: { [key in TimesheetEntry['status']]: 'default' | 'secondary' | 'outline' | 'destructive' } = {
  'Approved': 'default',
  'Pending': 'secondary',
  'Draft': 'outline',
  'Rejected': 'destructive',
  'Pending Admin Approval': 'secondary'
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

export default function ManagerTimesheetPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<string>(teamMembers[0].id);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [weeks, setWeeks] = useState(getWeeksForMonth(selectedMonth));
  const [selectedWeek, setSelectedWeek] = useState<number>(weeks[0]?.value);
  const [entries, setEntries] = useState<TimesheetEntry[]>(timesheetData);
  const [viewingSubmission, setViewingSubmission] = useState<any | null>(null);

  useEffect(() => {
    const newWeeks = getWeeksForMonth(selectedMonth);
    setWeeks(newWeeks);
  }, [selectedMonth]);

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
  
  const submissions = teamMembers.map(tm => ({...tm, week: 'Week 3 (Aug 12)', totalHours: 40, status: 'Pending' as const, date: new Date()}));

  // Calendar view logic
  const calendarMonth = viewingSubmission ? viewingSubmission.date : new Date();
  const daysInCalendarMonth = eachDayOfInterval({
    start: startOfMonth(calendarMonth),
    end: endOfMonth(calendarMonth),
  });
  const startingDayIndex = (getDay(startOfMonth(calendarMonth)) + 6) % 7;
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const employeeTimesheetForMonth = viewingSubmission
    ? entries.filter(entry =>
        isSameMonth(entry.date, calendarMonth) &&
        employees.find(e => e.id === viewingSubmission.id)?.name === timesheetData.find(td => td.id === entry.id)
      )
    : [];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    
        <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="grid gap-2">
                <CardTitle>Team Timesheet Submissions</CardTitle>
                <CardDescription>Review, approve, or reject your team's timesheets.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Week</TableHead>
                        <TableHead>Total Hours</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {submissions.map((sub) => (
                        <TableRow key={sub.id}>
                            <TableCell>{sub.name}</TableCell>
                            <TableCell>{sub.week}</TableCell>
                            <TableCell>{sub.totalHours}h</TableCell>
                            <TableCell><Badge variant="secondary">{sub.status}</Badge></TableCell>
                            <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setViewingSubmission(sub)}>
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">View</span>
                                </Button>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="sr-only">Approve</span>
                                </Button>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                    <X className="h-4 w-4 text-red-500" />
                                    <span className="sr-only">Reject</span>
                                </Button>
                            </div>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
                <CardTitle>Fill Timesheet</CardTitle>
                <CardDescription>
                Select an employee from your team to fill or edit their timesheet.
                </CardDescription>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                <Select onValueChange={setSelectedEmployee} value={selectedEmployee}>
                    <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Select a team member" />
                    </SelectTrigger>
                    <SelectContent>
                        {teamMembers.map(employee => (
                            <SelectItem key={employee.id} value={employee.id}>{employee.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={(value) => setSelectedMonth(new Date(value))} value={selectedMonth.toISOString()}>
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
                        <Input
                            type="time"
                            value={entry.loginTime}
                            onChange={(e) => handleTimeChange(entry.id, 'loginTime', e.target.value)}
                            className="h-8"
                        />
                    </TableCell>
                    <TableCell>
                        <Input
                            type="time"
                            value={entry.logoutTime}
                            onChange={(e) => handleTimeChange(entry.id, 'logoutTime', e.target.value)}
                            className="h-8"
                        />
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
                <Button><Send className="mr-2 h-4 w-4" /> Submit for Admin Approval</Button>
            </CardFooter>
        </Card>

        <Dialog open={!!viewingSubmission} onOpenChange={(isOpen) => !isOpen && setViewingSubmission(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
                {viewingSubmission && (
                <>
                <DialogHeader>
                    <DialogTitle>Timesheet for {viewingSubmission.name}</DialogTitle>
                    <DialogDescription>
                        Full month view for {format(viewingSubmission.date, 'MMMM yyyy')}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-grow overflow-y-auto pr-6">
                 <TooltipProvider>
                    <div className="grid grid-cols-7 border-t border-l mt-4">
                        {daysOfWeek.map(day => (
                            <div key={day} className="text-center font-semibold p-2 border-b border-r text-xs text-muted-foreground bg-muted">
                                {day}
                            </div>
                        ))}
                        {Array.from({ length: startingDayIndex }).map((_, index) => (
                            <div key={`empty-${index}`} className="border-b border-r aspect-square bg-muted/50" />
                        ))}
                        {daysInCalendarMonth.map((day) => {
                            const entry = entries.find(e => format(e.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));
                             const dayOfWeek = getDay(day);
                             const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

                            const dayCell = (
                               <div className={cn("border-b border-r p-1 flex flex-col aspect-square text-xs", isToday(day) && "bg-primary/10", isWeekend && "bg-muted/50")}>
                                    <span className={cn("font-semibold", isToday(day) && "text-primary")}>{getDate(day)}</span>
                                    {entry && !isWeekend ? (
                                        <div className="mt-1 flex-grow flex flex-col justify-start gap-0.5">
                                            <p>{entry.loginTime} - {entry.logoutTime}</p>
                                            <p className="font-bold">{entry.totalHours}</p>
                                            <Badge variant={statusVariant[entry.status]} className="text-xs w-min whitespace-nowrap mt-auto">{entry.status}</Badge>
                                        </div>
                                    ) : isWeekend ? (
                                        <div className="flex items-center justify-center h-full text-muted-foreground">Weekend</div>
                                    ) : null}
                                </div>
                            );

                            return (
                               <Tooltip key={day.toString()}>
                                    <TooltipTrigger asChild>
                                        {dayCell}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className='font-bold'>{format(day, 'MMMM d, yyyy')}</p>
                                        {entry ? (
                                            <>
                                            <p>Status: {entry.status}</p>
                                            <p>Hours: {entry.totalHours}</p>
                                            </>
                                        ) : isWeekend ? <p>Weekend</p> : <p>No entry</p>}
                                    </TooltipContent>
                                </Tooltip>
                            )
                        })}
                        {Array.from({ length: (7 - (daysInCalendarMonth.length + startingDayIndex) % 7) % 7 }).map((_, index) => (
                            <div key={`empty-end-${index}`} className="border-b border-r aspect-square bg-muted/50" />
                        ))}
                    </div>
                </TooltipProvider>
                </div>
                </>
                )}
            </DialogContent>
        </Dialog>
    </main>
  );
}
