
'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { timesheetData } from '@/lib/data';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, getDate, isToday, isSameMonth } from 'date-fns';
import { Check, X, HandCoins, CheckCircle, Ban } from 'lucide-react';
import type { TimesheetEntry } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


const statusVariant: { [key in TimesheetEntry['status']]: 'default' | 'secondary' | 'outline' | 'destructive' } = {
    'Approved': 'default',
    'Pending': 'secondary',
    'Draft': 'outline',
    'Rejected': 'destructive',
};

const employeesWithPendingTimesheets = [
    { name: 'Alice Johnson', avatar: 'https://picsum.photos/seed/1/100/100', week: 'Week 3 (Aug 12)', totalHours: 40, month: new Date() },
    { name: 'Fiona Garcia', avatar: 'https://picsum.photos/seed/6/100/100', week: 'Week 3 (Aug 12)', totalHours: 42, month: new Date() },
];


export default function ManagerTimesheetPage() {
    const [selectedSubmission, setSelectedSubmission] = useState<(typeof employeesWithPendingTimesheets)[0] | null>(null);

    const pendingTimesheets = employeesWithPendingTimesheets.length;
    const totalApproved = timesheetData.filter(c => c.status === 'Approved').length;
    const totalRejected = timesheetData.filter(c => c.status === 'Rejected').length;

    const firstDayOfMonth = selectedSubmission ? startOfMonth(selectedSubmission.month) : new Date();
    const lastDayOfMonth = selectedSubmission ? endOfMonth(selectedSubmission.month) : new Date();

    const daysInMonth = selectedSubmission ? eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    }) : [];

    const startingDayIndex = (getDay(firstDayOfMonth) + 6) % 7;
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const getDayEntry = (day: Date) => {
        return timesheetData.find(entry => format(entry.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));
    }

  return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <HandCoins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTimesheets}</div>
              <p className="text-xs text-muted-foreground">Timesheets from your team</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved This Month</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApproved}</div>
              <p className="text-xs text-muted-foreground">Total timesheets approved</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overtime Hours</CardTitle>
              <Ban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.5 Hours</div>
              <p className="text-xs text-muted-foreground">Total overtime logged this week</p>
            </CardContent>
          </Card>
        </div>

        <Dialog>
            <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="grid gap-2">
                <CardTitle>Team Timesheets</CardTitle>
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
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employeesWithPendingTimesheets.map((claim) => (
                    <TableRow key={claim.name}>
                        <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                            <AvatarImage src={claim.avatar} alt="Avatar" />
                            <AvatarFallback>{claim.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="font-medium">{claim.name}</p>
                        </div>
                        </TableCell>
                        <TableCell>{claim.week}</TableCell>
                        <TableCell>{claim.totalHours}h</TableCell>
                        <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedSubmission(claim)}>View Details</Button>
                            </DialogTrigger>
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

             <DialogContent className="max-w-4xl">
                 {selectedSubmission && (
                     <>
                        <DialogHeader>
                            <DialogTitle>Timesheet for {selectedSubmission.name}</DialogTitle>
                            <DialogDescription>
                                Month of {format(selectedSubmission.month, 'MMMM yyyy')}
                            </DialogDescription>
                        </DialogHeader>
                        <TooltipProvider>
                            <div className="grid grid-cols-7 border-t border-l mt-4">
                                {daysOfWeek.map(day => (
                                    <div key={day} className="text-center font-semibold p-2 border-b border-r text-xs text-muted-foreground">
                                        {day}
                                    </div>
                                ))}
                                {Array.from({ length: startingDayIndex }).map((_, index) => (
                                    <div key={`empty-${index}`} className="border-b border-r h-24 bg-muted/50" />
                                ))}
                                {daysInMonth.map((day) => {
                                    const entry = getDayEntry(day);
                                    const dayCell = (
                                        <div className={cn("border-b border-r p-1 flex flex-col h-24 text-xs", isToday(day) && "bg-primary/10")}>
                                            <span className={cn("font-semibold", isToday(day) && "text-primary")}>{getDate(day)}</span>
                                            {entry && isSameMonth(entry.date, selectedSubmission.month) ? (
                                                <div className="mt-1 flex-grow flex flex-col justify-start gap-1">
                                                    <Badge variant={statusVariant[entry.status]} className="text-xs w-min whitespace-nowrap">{entry.status}</Badge>
                                                    <p>In: {entry.loginTime}</p>
                                                    <p>Out: {entry.logoutTime}</p>
                                                    <p className='font-semibold'>Total: {entry.totalHours}</p>
                                                </div>
                                            ) : <div className='flex-grow'/>}
                                        </div>
                                    );

                                    return (
                                    <Tooltip key={day.toString()}>
                                            <TooltipTrigger asChild>
                                                {dayCell}
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className='font-bold'>{format(day, 'MMMM d, yyyy')}</p>
                                                {entry && isSameMonth(entry.date, selectedSubmission.month) ? (
                                                    <>
                                                        <p>Status: {entry.status}</p>
                                                        <p>Hours: {entry.totalHours}</p>
                                                    </>
                                                ) : <p>No entry</p>}
                                            </TooltipContent>
                                        </Tooltip>
                                    )
                                })}
                                {Array.from({ length: (7 - (daysInMonth.length + startingDayIndex) % 7) % 7 }).map((_, index) => (
                                    <div key={`empty-end-${index}`} className="border-b border-r h-24 bg-muted/50" />
                                ))}
                            </div>
                        </TooltipProvider>
                    </>
                 )}
            </DialogContent>
        </Dialog>
      </main>
  );
}
