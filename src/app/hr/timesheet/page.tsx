
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
import { format } from 'date-fns';
import { Check, X, HandCoins, CheckCircle, Ban } from 'lucide-react';
import type { TimesheetEntry } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const statusVariant: { [key in TimesheetEntry['status']]: 'default' | 'secondary' | 'outline' | 'destructive' } = {
    'Approved': 'default',
    'Pending': 'secondary',
    'Draft': 'outline',
    'Rejected': 'destructive',
};

const employeesWithPendingTimesheets = [
    { name: 'Alice Johnson', avatar: 'https://picsum.photos/seed/1/100/100', week: 'Week 3 (Aug 12)', totalHours: 40 },
    { name: 'Charlie Brown', avatar: 'https://picsum.photos/seed/3/100/100', week: 'Week 3 (Aug 12)', totalHours: 38.5 },
];


export default function HrTimesheetPage() {
    const pendingTimesheets = employeesWithPendingTimesheets.length;
    const totalApproved = timesheetData.filter(c => c.status === 'Approved').length;
    const totalRejected = timesheetData.filter(c => c.status === 'Rejected').length;

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
              <p className="text-xs text-muted-foreground">Timesheets awaiting review</p>
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
              <CardTitle className="text-sm font-medium">Rejected This Month</CardTitle>
              <Ban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRejected}</div>
              <p className="text-xs text-muted-foreground">Total timesheets rejected</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="grid gap-2">
              <CardTitle>Timesheet Submissions</CardTitle>
              <CardDescription>Review, approve, or reject employee timesheets.</CardDescription>
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
                          <Button variant="outline" size="sm">View Details</Button>
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
      </main>
  );
}
