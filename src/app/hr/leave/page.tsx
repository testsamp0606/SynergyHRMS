
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { leaveRequests } from "@/lib/data"
import { format } from "date-fns"
import { Check, X, PlusCircle } from "lucide-react"
import { Header } from "@/components/layout/header"
import { HrAttendanceCard } from "../dashboard/hr-attendance-card"


export default function LeavePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
       <Header title="Attendance & Leave" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <HrAttendanceCard />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Vacation Days</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12 / 20</div>
                    <p className="text-xs text-muted-foreground">Remaining Days</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sick Days</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">3 / 10</div>
                    <p className="text-xs text-muted-foreground">Used This Year</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Request Time Off</CardTitle>
                </CardHeader>
                <CardContent>
                   <Button className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" /> New Request
                   </Button>
                </CardContent>
            </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>Review and respond to leave requests from your team.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.filter(r => r.status === 'Pending').map(request => (
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
                        {format(request.startDate, 'MMM d')} - {format(request.endDate, 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.leaveType}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="icon" className="h-8 w-8 mr-2">
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Team Calendar</CardTitle>
              <CardDescription>View upcoming team absences.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="multiple"
                selected={[new Date(2024, 7, 10), new Date(2024, 7, 11), new Date(2024, 7, 12), new Date(2024, 7, 13), new Date(2024, 7, 14), new Date()]}
                className="rounded-md"
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
