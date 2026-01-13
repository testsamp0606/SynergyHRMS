import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import { performanceReviews } from "@/lib/data"
import { format } from "date-fns"
import { Header } from "@/components/layout/header"

const statusVariant: { [key: string]: "default" | "secondary" | "outline" } = {
  "Completed": "default",
  "In Progress": "secondary",
  "Upcoming": "outline"
}


export default function PerformancePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
       <Header title="Performance Management" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="grid gap-2">
                <CardTitle>Performance Reviews</CardTitle>
                <CardDescription>
                Track and manage employee performance reviews.
                </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1 w-full sm:w-auto">
                <a href="#">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Start New Cycle
                </span>
                </a>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead className="hidden md:table-cell">Reviewer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Due Date</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                          <AvatarImage src={review.employeeAvatar} alt="Avatar" />
                          <AvatarFallback>{review.employeeName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{review.employeeName}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{review.reviewer}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[review.status]}>{review.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{format(review.dueDate, 'MMMM d, yyyy')}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Review</DropdownMenuItem>
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
