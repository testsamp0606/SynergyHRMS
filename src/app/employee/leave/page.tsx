

'use client';
import { Header } from '@/components/layout/header';
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
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { PlusCircle, Calendar as CalendarIcon, X } from 'lucide-react';
import { leaveRequests } from '@/lib/data';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import React from 'react';
import { LeaveRequestStatus } from '@/lib/types';


const statusVariant: { [key in LeaveRequestStatus]: "default" | "secondary" | "outline" | "destructive" } = {
  'Approved': 'default',
  'Pending Admin Approval': 'outline',
  'Pending Manager Approval': 'outline',
  'Rejected': 'destructive',
  'Cancelled': 'destructive'
};

export default function EmployeeLeavePage() {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });
    
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Leave Management" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vacation Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 / 20</div>
              <p className="text-xs text-muted-foreground">Available Days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sick Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7 / 10</div>
              <p className="text-xs text-muted-foreground">Available Days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Personal Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2 / 2</div>
              <p className="text-xs text-muted-foreground">Available Days</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="grid gap-2">
              <CardTitle>My Leave History</CardTitle>
              <CardDescription>
                Track and manage your leave requests.
              </CardDescription>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="sm" className="ml-auto gap-1 w-full sm:w-auto">
                        <PlusCircle className="h-3.5 w-3.5" />
                        New Leave Request
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>New Leave Request</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to submit a new leave request.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="leave-type">Leave Type</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="vacation">Vacation</SelectItem>
                                    <SelectItem value="sick">Sick Leave</SelectItem>
                                    <SelectItem value="personal">Personal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="date-range">Dates</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                    date.to ? (
                                        <>
                                        {format(date.from, "LLL dd, y")} -{" "}
                                        {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                    ) : (
                                    <span>Pick a date</span>
                                    )}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="reason">Reason</Label>
                            <Textarea id="reason" placeholder="Optional: Provide a reason for your leave" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Submit Request</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Leave Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Start Date</TableHead>
                  <TableHead className="hidden sm:table-cell">End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <Badge variant="outline">{request.leaveType}</Badge>
                      <div className="text-muted-foreground text-sm sm:hidden mt-1">{format(request.startDate, 'MMM d')} - {format(request.endDate, 'MMM d')}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {format(request.startDate, 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {format(request.endDate, 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[request.status]}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       {request.status.startsWith('Pending') && (
                         <Button variant="ghost" size="icon" className="h-8 w-8">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Cancel</span>
                        </Button>
                       )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

// Define the DateRange type if it's not globally available
// This is often needed when using react-day-picker's range mode.
import { DateRange } from 'react-day-picker';
