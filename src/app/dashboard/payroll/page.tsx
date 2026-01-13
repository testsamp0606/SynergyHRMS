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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { payrollRuns } from "@/lib/data"
import { format } from "date-fns"
import { PlayCircle, Download } from "lucide-react"
import { Header } from "@/components/layout/header"

export default function PayrollPage() {
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Payroll & Compliance" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="grid gap-2">
                    <CardTitle>Run Payroll</CardTitle>
                    <CardDescription>Process payroll for the current period: August 2024.</CardDescription>
                </div>
                <Button size="lg" className="gap-1 w-full sm:w-auto">
                    <PlayCircle className="h-5 w-5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Start Payroll Run
                    </span>
                </Button>
            </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payroll History</CardTitle>
            <CardDescription>View and download reports from previous payroll runs.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pay Period</TableHead>
                  <TableHead className="hidden sm:table-cell">Run Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell text-right">Total Payroll</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollRuns.map(run => (
                  <TableRow key={run.id}>
                    <TableCell className="font-medium">{run.period}</TableCell>
                    <TableCell className="hidden sm:table-cell">{format(run.runDate, 'MMMM d, yyyy')}</TableCell>
                    <TableCell>
                      <Badge variant={run.status === 'Completed' ? 'default' : 'secondary'} className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                        {run.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell">{currencyFormatter.format(run.totalAmount)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-0 sm:mr-2" />
                        <span className="sr-only sm:not-sr-only">Report</span>
                      </Button>
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
