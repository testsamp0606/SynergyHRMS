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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Download, BadgeCheck } from 'lucide-react';

const payslipData = {
  'aug-2024': {
    period: 'August 2024',
    payDate: 'August 31, 2024',
    bankStatus: 'Credited',
    earnings: [
      { component: 'Basic Salary', amount: 3000 },
      { component: 'House Rent Allowance (HRA)', amount: 1500 },
      { component: 'Special Allowance', amount: 1000 },
    ],
    deductions: [
      { component: 'Provident Fund (PF)', amount: 360 },
      { component: 'Professional Tax', amount: 20 },
      { component: 'Income Tax (TDS)', amount: 250 },
    ],
  },
  'jul-2024': {
    period: 'July 2024',
    payDate: 'July 31, 2024',
    bankStatus: 'Credited',
    earnings: [
      { component: 'Basic Salary', amount: 3000 },
      { component: 'House Rent Allowance (HRA)', amount: 1500 },
      { component: 'Special Allowance', amount: 1000 },
    ],
    deductions: [
        { component: 'Provident Fund (PF)', amount: 360 },
        { component: 'Professional Tax', amount: 20 },
        { component: 'Income Tax (TDS)', amount: 250 },
    ],
  },
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function EmployeePayrollPage() {
  const [selectedPeriod, setSelectedPeriod] = React.useState('aug-2024');
  const currentPayslip = payslipData[selectedPeriod as keyof typeof payslipData];

  const totalEarnings = currentPayslip.earnings.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = currentPayslip.deductions.reduce((sum, item) => sum + item.amount, 0);
  const netPay = totalEarnings - totalDeductions;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Payroll" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>My Payslips</CardTitle>
                <CardDescription>
                  View and download your monthly salary slips.
                </CardDescription>
              </div>
              <Select defaultValue={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aug-2024">August 2024</SelectItem>
                  <SelectItem value="jul-2024">July 2024</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
                <div>
                  <div className="text-muted-foreground">Pay Period</div>
                  <div className="font-medium">{currentPayslip.period}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Pay Date</div>
                  <div className="font-medium">{currentPayslip.payDate}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Bank Status</div>
                  <div className="font-medium flex items-center gap-1">
                     <BadgeCheck className="h-4 w-4 text-green-500" />
                     {currentPayslip.bankStatus}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">Earnings</h3>
                  <Table>
                    <TableBody>
                      {currentPayslip.earnings.map((item) => (
                        <TableRow key={item.component}>
                          <TableCell>{item.component}</TableCell>
                          <TableCell className="text-right">{currencyFormatter.format(item.amount)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Deductions</h3>
                  <Table>
                    <TableBody>
                      {currentPayslip.deductions.map((item) => (
                        <TableRow key={item.component}>
                          <TableCell>{item.component}</TableCell>
                          <TableCell className="text-right">{currencyFormatter.format(item.amount)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid gap-4 text-sm md:grid-cols-3">
                  <div className="rounded-md border p-4">
                      <div className="text-muted-foreground">Gross Pay</div>
                      <div className="text-lg font-bold">{currencyFormatter.format(totalEarnings)}</div>
                  </div>
                   <div className="rounded-md border p-4">
                      <div className="text-muted-foreground">Total Deductions</div>
                      <div className="text-lg font-bold text-destructive">{currencyFormatter.format(totalDeductions)}</div>
                  </div>
                   <div className="rounded-md border bg-muted p-4">
                      <div className="text-muted-foreground">Net Pay</div>
                      <div className="text-lg font-bold text-primary">{currencyFormatter.format(netPay)}</div>
                  </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>
                <Download className="mr-2 h-4 w-4" /> Download Payslip
              </Button>
            </CardFooter>
          </Card>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tax Documents</CardTitle>
                <CardDescription>
                  Download your yearly tax summaries.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                    <li className="flex items-center justify-between rounded-md border p-3">
                        <div>
                            <p className="font-medium">Form-16 (FY 2023-24)</p>
                            <p className="text-sm text-muted-foreground">Available for download</p>
                        </div>
                        <Button variant="outline" size="sm"><Download className="h-4 w-4" /></Button>
                    </li>
                     <li className="flex items-center justify-between rounded-md border p-3">
                        <div>
                            <p className="font-medium">Tax Summary (FY 2023-24)</p>
                            <p className="text-sm text-muted-foreground">View your tax computation</p>
                        </div>
                        <Button variant="outline" size="sm"><Download className="h-4 w-4" /></Button>
                    </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

// Added React import for useState
import React from 'react';
