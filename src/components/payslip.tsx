'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from './ui/separator';

const payslip = {
    id: 'PSLIP-AUG2024-001',
    payPeriod: 'August 1, 2024 - August 31, 2024',
    payDate: 'August 31, 2024',
    employeeId: 'EMP001',
    employeeName: 'Alice Johnson',
    department: 'Engineering',
    role: 'Senior Software Engineer',
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
  };

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

export function Payslip() {
    const totalEarnings = payslip.earnings.reduce((sum, item) => sum + item.amount, 0);
    const totalDeductions = payslip.deductions.reduce((sum, item) => sum + item.amount, 0);
    const netPay = totalEarnings - totalDeductions;

    const numberToWords = (num: number): string => {
        // This is a simple implementation. In a real app, use a library.
        const a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
        const b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
        const number = parseFloat(num.toFixed(2).toString().replace('.', ''));
        if (number.toString().length > 9) return 'overflow';
        const n = ('000000000' + number).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return '';
        let str = '';
        str += (parseInt(n[1]) != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (parseInt(n[2]) != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (parseInt(n[3]) != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (parseInt(n[4]) != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (parseInt(n[5]) != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
        return str.trim().replace(/\s+/g, ' ').toUpperCase();
    }
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white text-black font-sans">
      <style>{`
        @media print {
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .no-print {
                display: none;
            }
        }
      `}</style>
      <header className="flex justify-between items-center pb-4 border-b">
        <div>
          <h1 className="text-3xl font-bold">Synergy Corp</h1>
          <p>123 Innovation Drive, Tech City, 12345</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-semibold text-gray-700">Payslip</h2>
          <p className="text-sm">For the month of {new Date(payslip.payPeriod.split(' - ')[0]).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
        </div>
      </header>

      <section className="my-6">
        <h3 className="font-semibold mb-4 text-center text-lg">Employee Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm border p-4 rounded-md">
          <div>
            <p className="text-gray-500">Employee Name</p>
            <p className="font-medium">{payslip.employeeName}</p>
          </div>
          <div>
            <p className="text-gray-500">Employee ID</p>
            <p className="font-medium">{payslip.employeeId}</p>
          </div>
          <div>
            <p className="text-gray-500">Department</p>
            <p className="font-medium">{payslip.department}</p>
          </div>
          <div>
            <p className="text-gray-500">Designation</p>
            <p className="font-medium">{payslip.role}</p>
          </div>
          <div>
            <p className="text-gray-500">Pay Period</p>
            <p className="font-medium">{payslip.payPeriod}</p>
          </div>
          <div>
            <p className="text-gray-500">Pay Date</p>
            <p className="font-medium">{payslip.payDate}</p>
          </div>
        </div>
      </section>

      <section className="my-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 className="font-semibold mb-2 text-center text-lg">Earnings</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-black">Description</TableHead>
                            <TableHead className="text-right text-black">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payslip.earnings.map(item => (
                            <TableRow key={item.component}>
                                <TableCell>{item.component}</TableCell>
                                <TableCell className="text-right">{currencyFormatter.format(item.amount)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow className="bg-gray-100">
                            <TableCell className="font-bold">Total Earnings</TableCell>
                            <TableCell className="text-right font-bold">{currencyFormatter.format(totalEarnings)}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
            <div>
                <h3 className="font-semibold mb-2 text-center text-lg">Deductions</h3>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-black">Description</TableHead>
                            <TableHead className="text-right text-black">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payslip.deductions.map(item => (
                            <TableRow key={item.component}>
                                <TableCell>{item.component}</TableCell>
                                <TableCell className="text-right">{currencyFormatter.format(item.amount)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow className="bg-gray-100">
                            <TableCell className="font-bold">Total Deductions</TableCell>
                            <TableCell className="text-right font-bold">{currencyFormatter.format(totalDeductions)}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
      </section>

      <Separator className="my-6" />

      <section className="my-6 bg-gray-100 p-4 rounded-md">
        <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Net Pay</h3>
            <p className="font-bold text-lg">{currencyFormatter.format(netPay)}</p>
        </div>
        <p className="text-sm text-right mt-1">
            ( {numberToWords(netPay)} )
        </p>
      </section>

      <footer className="mt-8 pt-4 border-t text-center text-xs text-gray-500">
        <p>This is a computer-generated document and does not require a signature.</p>
        <p>Synergy Corp | Email: hr@synergy.com | Phone: 1-800-123-4567</p>
      </footer>
    </div>
  );
}