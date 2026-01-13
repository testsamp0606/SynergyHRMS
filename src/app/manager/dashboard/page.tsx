
'use client';
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
  TableRow,
  TableHeader,
  TableHead,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, ArrowRight, Users, CalendarOff, FileCheck, ClipboardX, CalendarPlus } from 'lucide-react';
import Link from 'next/link';
import { employees, leaveRequests } from '@/lib/data';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Mock data for manager's team
const teamMemberIds = ['EMP006', 'EMP005', 'EMP004', 'EMP003'];
const teamMembers = employees.filter((emp) => teamMemberIds.includes(emp.id));
const teamLeaveRequests = leaveRequests.filter((req) => teamMemberIds.includes(
    employees.find(e => e.name === req.employeeName)?.id || ''
));

const attendance = [
    { ...teamMembers[0], status: 'Present' },
    { ...teamMembers[1], status: 'WFH' },
    { ...teamMembers[2], status: 'On Leave' },
    { ...teamMembers[3], status: 'Present' },
];

const upcomingEvents = [
    { date: '2024-09-02', name: 'Labor Day' },
    { date: '2024-09-12', name: 'Marketing Offsite' },
]

export default function ManagerDashboardPage() {
  const pendingRequests = teamLeaveRequests.filter((req) => req.status === 'Pending Manager Approval').length;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">On Leave Today</CardTitle>
          <CalendarOff className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1</div>
          <p className="text-xs text-muted-foreground">Diana Miller is on vacation</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          <FileCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingRequests}</div>
          <p className="text-xs text-muted-foreground">Leave applications to review</p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
          <ClipboardX className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2</div>
          <p className="text-xs text-muted-foreground">Performance reviews pending</p>
        </CardContent>
      </Card>
    </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>
            Review and respond to leave and attendance requests from your team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamLeaveRequests.filter(r => r.status === 'Pending Manager Approval').map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={request.employeeAvatar} alt="Avatar" />
                        <AvatarFallback>{request.employeeName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{request.employeeName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{request.leaveType}</Badge>
                  </TableCell>
                  <TableCell>
                    {format(request.startDate, 'MMM d')} - {format(request.endDate, 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon" className="h-8 w-8 mr-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="sr-only">Approve</span>
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Reject</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
         <CardFooter>
             <Button variant="outline" className="w-full" asChild>
                <Link href="/manager/attendance">
                    View All Approvals <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
         </CardFooter>
      </Card>
      <div className="space-y-4">
         <Card>
            <CardHeader>
                <CardTitle>Today's Attendance</CardTitle>
                <CardDescription>{format(new Date(), 'MMMM d, yyyy')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {attendance.map(member => (
                        <div key={member.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{member.name}</span>
                            </div>
                            <Badge variant={member.status === 'Present' ? 'secondary' : 'outline'} className={
                                cn({'text-green-600 border-green-600': member.status === 'Present'},
                                   {'text-yellow-600 border-yellow-600': member.status === 'WFH'},
                                   {'text-blue-600 border-blue-600': member.status === 'On Leave'})
                            }>{member.status}</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
         </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Upcoming holidays and team events.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {upcomingEvents.map((event) => (
                <li key={event.name} className="flex items-center gap-4 text-sm">
                  <div className="flex h-10 w-10 flex-col items-center justify-center rounded-md bg-muted">
                    <span className="text-xs font-bold">{format(new Date(event.date), 'MMM')}</span>
                    <span className="text-lg font-bold -mt-1">{format(new Date(event.date), 'd')}</span>
                  </div>
                  <span>{event.name}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </main>
  );
}
