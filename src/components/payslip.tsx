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
        if (num === 0) return 'ZERO';
        const number = parseFloat(num.toFixed(2).replace('.', ''));
        if (number.toString().length > 9) return 'overflow';
        const n = ('000000000' + number).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return '';
        let str = '';
        str += (parseInt(n[1]) != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (parseInt(n[2]) != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (parseInt(n[3]) != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (parseInt(n[4]) != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (parseInt(n[5]) != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
        return (str.trim().replace(/\s+/g, ' ') + ' Only').toUpperCase();
    }
    
    const allItems = [
        ...payslip.earnings.map(e => ({...e, type: 'earning'})),
        {component: 'Gross Earnings', amount: totalEarnings, type: 'earning-total'},
        ...payslip.deductions.map(d => ({...d, type: 'deduction'})),
        {component: 'Total Deductions', amount: totalDeductions, type: 'deduction-total'},
        {component: 'Net Pay', amount: netPay, type: 'net-total'},
    ];


  return (
    <div className="bg-white text-black font-sans" id="payslip-content">
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
      <div className='p-2'>
        <header className="flex justify-between items-center pb-4 border-b">
            <div>
                <h1 className="text-2xl font-bold">Synergy Corp</h1>
                <p className="text-xs">123 Innovation Drive, Tech City, 12345</p>
            </div>
            <div className="text-right">
                <h2 className="text-xl font-semibold text-gray-700">Payslip</h2>
                <p className="text-xs">For {new Date(payslip.payPeriod.split(' - ')[0]).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
            </div>
        </header>

        <section className="my-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs border p-2 rounded-md">
                <div><p className="text-gray-500">Employee Name</p><p className="font-medium">{payslip.employeeName}</p></div>
                <div><p className="text-gray-500">Employee ID</p><p className="font-medium">{payslip.employeeId}</p></div>
                <div><p className="text-gray-500">Department</p><p className="font-medium">{payslip.department}</p></div>
                <div><p className="text-gray-500">Designation</p><p className="font-medium">{payslip.role}</p></div>
            </div>
        </section>

        <section className="my-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-black font-semibold">Earnings</TableHead>
                        <TableHead className="text-right text-black font-semibold">Amount</TableHead>
                        <TableHead className="text-black font-semibold">Deductions</TableHead>
                        <TableHead className="text-right text-black font-semibold">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: Math.max(payslip.earnings.length, payslip.deductions.length) }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>{payslip.earnings[index]?.component || ''}</TableCell>
                            <TableCell className="text-right">{payslip.earnings[index] ? currencyFormatter.format(payslip.earnings[index].amount) : ''}</TableCell>
                            <TableCell>{payslip.deductions[index]?.component || ''}</TableCell>
                            <TableCell className="text-right">{payslip.deductions[index] ? currencyFormatter.format(payslip.deductions[index].amount) : ''}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="bg-gray-100">
                        <TableCell className="font-bold">Total Earnings</TableCell>
                        <TableCell className="text-right font-bold">{currencyFormatter.format(totalEarnings)}</TableCell>
                        <TableCell className="font-bold">Total Deductions</TableCell>
                        <TableCell className="text-right font-bold">{currencyFormatter.format(totalDeductions)}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </section>

        <section className="my-4 bg-gray-100 p-2 rounded-md">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-md">Net Pay (Total Earnings - Total Deductions)</h3>
                <p className="font-bold text-md">{currencyFormatter.format(netPay)}</p>
            </div>
            <p className="text-xs text-right mt-1 font-semibold">
                (Amount in words: {numberToWords(netPay)})
            </p>
        </section>

        <footer className="mt-6 pt-2 border-t text-center text-xs text-gray-500">
            <p>This is a computer-generated document and does not require a signature.</p>
        </footer>
      </div>
    </div>
  );
}
