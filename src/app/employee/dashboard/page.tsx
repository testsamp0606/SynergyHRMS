
'use client';
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
  BarChart,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon
} from 'lucide-react';
import {
  ResponsiveContainer,
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

import { employeeDashboardSummary, recentAnnouncements, employeeTasks } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { AttendanceCard } from './attendance-card';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];


export default function EmployeeDashboardPage() {
  const { leaveBalance, upcomingPayslip, pendingExpenses, attendanceSummary, leaveBreakdown, performanceTrend } = employeeDashboardSummary;

   const leaveBreakdownData = [
    { name: 'Vacation', value: leaveBreakdown.vacation, fill: 'hsl(var(--chart-1))' },
    { name: 'Sick', value: leaveBreakdown.sick, fill: 'hsl(var(--chart-2))' },
    { name: 'Personal', value: leaveBreakdown.personal, fill: 'hsl(var(--chart-3))' },
  ];

   const attendanceSummaryData = [
    { name: 'Present', value: attendanceSummary.present, fill: 'hsl(var(--chart-1))' },
    { name: 'Absent', value: attendanceSummary.absent, fill: 'hsl(var(--chart-2))' },
    { name: 'On Leave', value: attendanceSummary.onLeave, fill: 'hsl(var(--chart-3))' },
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="p-4 md:p-8 md:pb-0">
        <AttendanceCard />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><PieChartIcon className="h-5 w-5"/>Leave Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={leaveBreakdownData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                            {leaveBreakdownData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        </RechartsPieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><LineChartIcon className="h-5 w-5"/>Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={performanceTrend} margin={{ left: -20, right: 10 }}>
                             <XAxis dataKey="cycle" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                             <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 5]} tickLine={false} axisLine={false} />
                             <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                             <Line type="monotone" dataKey="rating" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                        </RechartsLineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><BarChart className="h-5 w-5"/>Attendance This Month</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={attendanceSummaryData} margin={{ left: -20 }}>
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Bar dataKey="value" radius={4} />
                        </RechartsBarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
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
            View Payslip
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

    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
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
  );
}
