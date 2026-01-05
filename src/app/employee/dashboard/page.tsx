'use client';
import { Header } from '@/components/layout/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  CalendarCheck,
  FileText,
  Wallet,
  HandCoins,
  ChevronRight,
  Megaphone,
  CheckCircle,
  LogIn,
  LogOut,
  Clock,
  CircleCheck,
} from 'lucide-react';
import { employeeDashboardSummary, recentAnnouncements, employeeTasks } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useAttendanceStore } from '@/hooks/use-attendance-store';

export default function EmployeeDashboardPage() {
  const { leaveBalance, upcomingPayslip, pendingExpenses } = employeeDashboardSummary;
  const [time, setTime] = useState(new Date());

  const {
    punchInTime,
    punchOutTime,
    isPunchedIn,
    handlePunch,
    getElapsedTime,
  } = useAttendanceStore();

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="My Dashboard" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                           <div className='flex justify-between'>
                                <span>Punched In:</span>
                                <span className='font-medium text-foreground'>{format(punchInTime, 'hh:mm:ss a')}</span>
                           </div>
                           <div className='flex justify-between'>
                                <span>Time Elapsed:</span>
                                <span className='font-medium text-foreground'>{getElapsedTime()}</span>
                           </div>
                        </div>
                    )}
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
                <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{leaveBalance.used} / {leaveBalance.total} days</div>
                <p className="text-xs text-muted-foreground">Vacation days used this year</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Payslip</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{upcomingPayslip.netPay}</div>
                <p className="text-xs text-muted-foreground">For {upcomingPayslip.period}, on {upcomingPayslip.payDate}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Expenses</CardTitle>
                <HandCoins className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{pendingExpenses.count} claims</div>
                <p className="text-xs text-muted-foreground">Totaling {pendingExpenses.totalAmount}</p>
                </CardContent>
            </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Button variant="outline" asChild>
              <Link href="/employee/leave">
                Apply for Leave
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/employee/expenses">
                Submit Expense
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/employee/payroll">
                Download Payslip
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/employee/documents">
                View Documents
              </Link>
            </Button>
             <Button variant="outline" asChild>
              <Link href="/employee/help-support">
                Get Help
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="flex items-start gap-4">
                    <Megaphone className="h-5 w-5 text-primary mt-1" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">{announcement.title}</p>
                        <Badge variant="outline">{announcement.target}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{announcement.date}</p>
                    </div>
                     <Button variant="ghost" size="icon" className="h-8 w-8">
                       <ChevronRight className="h-4 w-4" />
                     </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full" asChild>
                  <Link href="/employee/announcements">View all announcements</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>
                Here are your pending tasks and to-do items.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employeeTasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3">
                        <Checkbox id={`task-${task.id}`} checked={task.status === 'Completed'} />
                        <div className="flex-1">
                            <label htmlFor={`task-${task.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {task.title}
                            </label>
                            <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                        </div>
                         {task.status === 'Completed' && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                ))}
              </div>
            </CardContent>
             <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full">
                    View all tasks
                </Button>
             </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
