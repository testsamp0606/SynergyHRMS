
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, LineChart, CartesianGrid } from 'recharts'
import { ArrowUpRight, Users, CalendarClock, Briefcase, UserPlus, FileText, Megaphone, PlayCircle, AlertTriangle, CheckCircle } from 'lucide-react'
import { leaveRequests, departmentHeadcount, leaveTrends, latestPayroll, complianceAlerts } from '@/lib/data'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function DashboardPage() {
  const pendingRequests = leaveRequests.filter(req => req.status === 'Pending');

  return (
    <div className="flex min-h-screen w-full flex-col">
       <Header title="HR Dashboard" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Employees
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50</div>
              <p className="text-xs text-muted-foreground">
                +2 since last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending HR Approvals
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingRequests.length}</div>
              <p className="text-xs text-muted-foreground">
                Leave, expenses, onboarding
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Recruitment pipeline active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payroll Run</CardTitle>
              {latestPayroll.status === 'Completed' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertTriangle className="h-4 w-4 text-yellow-500" /> }
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{latestPayroll.status}</div>
              <p className="text-xs text-muted-foreground">
                For period: {latestPayroll.period}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <Button variant="outline" asChild>
                    <Link href="/hr/employees">
                        <UserPlus className="mr-2 h-4 w-4" /> Add Employee
                    </Link>
                </Button>
                <Button variant="outline" asChild>
                     <Link href="/hr/leave">
                        <FileText className="mr-2 h-4 w-4" /> Approve Requests
                    </Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/hr/payroll">
                        <PlayCircle className="mr-2 h-4 w-4" /> Run Payroll
                    </Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/hr/recruitment">
                        <Briefcase className="mr-2 h-4 w-4" /> Post Job
                    </Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/hr/announcements">
                        <Megaphone className="mr-2 h-4 w-4" /> Send Announcement
                    </Link>
                </Button>
            </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Headcount by Department</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentHeadcount}>
                  <XAxis
                    dataKey="department"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    cursor={{fill: 'hsl(var(--muted))'}}
                    contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Pending Leave Requests</CardTitle>
              <CardDescription>
                {pendingRequests.length} requests awaiting your approval.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  {pendingRequests.length > 0 ? (
                    pendingRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={request.employeeAvatar} alt="Avatar" />
                              <AvatarFallback>{request.employeeName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{request.employeeName}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline">{request.leaveType}</Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center text-muted-foreground">
                        No pending requests.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
             <CardFooter className="border-t p-4">
                <Button size="sm" variant="outline" className="w-full" asChild>
                    <Link href="/hr/leave">
                        View All Requests <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        </div>

         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
                <CardHeader>
                <CardTitle>Attendance & Leave Trends</CardTitle>
                <CardDescription>Leave requests over the last 6 months.</CardDescription>
                </CardHeader>
                <CardContent>
                <ChartContainer config={{}} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={leaveTrends} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                            <YAxis stroke="hsl(var(--muted-foreground))" />
                            <ChartTooltip
                                cursor={{stroke: 'hsl(var(--accent))', strokeWidth: 2, strokeDasharray: "3 3"}}
                                content={<ChartTooltipContent />}
                            />
                            <Line type="monotone" dataKey="requests" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
                </CardContent>
            </Card>
             <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="text-destructive"/>
                        Compliance Alerts
                    </CardTitle>
                    <CardDescription>Read-only alerts for mandatory compliance tasks.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {complianceAlerts.map(alert => (
                             <li key={alert.id} className="flex items-start gap-3">
                                <div className="mt-1 h-2 w-2 rounded-full bg-destructive flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{alert.title}</p>
                                    <p className="text-xs text-muted-foreground">Due Date: {alert.dueDate}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  )
}
