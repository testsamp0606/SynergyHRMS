

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
import type { LeaveRequestStatus } from "@/lib/types"


export default function LeavePage() {
  const adminPendingRequests = leaveRequests.filter(r => r.status === 'Pending Admin Approval');
  
  const statusVariant: { [key in LeaveRequestStatus]: "default" | "secondary" | "outline" | "destructive" } = {
    "Approved": "default",
    "Pending Admin Approval": "secondary",
    "Pending Manager Approval": "outline",
    "Rejected": "destructive",
    "Cancelled": "destructive"
  };
  
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Admin Approval</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{adminPendingRequests.length}</div>
                <p className="text-xs text-muted-foreground">Requests from Managers/HR</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{leaveRequests.filter(r => r.status.startsWith('Pending')).length}</div>
                <p className="text-xs text-muted-foreground">Across all employees</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Create Request</CardTitle>
            </CardHeader>
            <CardContent>
               <Button className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> New Request
               </Button>
            </CardContent>
        </Card>
    </div>
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>All Leave Requests</CardTitle>
          <CardDescription>Review and respond to leave requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.map(request => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 hidden sm:flex">
                        <AvatarImage src={request.employeeAvatar} alt="Avatar" />
                        <AvatarFallback>{request.employeeName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{request.employeeName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(request.startDate, 'MMM d')} - {format(request.endDate, 'MMM d')}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={statusVariant[request.status]}>{request.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {request.status === 'Pending Admin Approval' && (
                        <>
                            <Button variant="outline" size="icon" className="h-8 w-8 mr-2">
                                <Check className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                                <X className="h-4 w-4 text-red-500" />
                            </Button>
                        </>
                    )}
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
        <CardContent className="flex justify-center p-0 sm:p-6">
          <Calendar
            mode="multiple"
            selected={[new Date(2024, 7, 10), new Date(2024, 7, 11), new Date(2024, 7, 12), new Date(2024, 7, 13), new Date(2024, 7, 14), new Date()]}
            className="rounded-md"
          />
        </CardContent>
      </Card>
    </div>
  </main>
  )
}
