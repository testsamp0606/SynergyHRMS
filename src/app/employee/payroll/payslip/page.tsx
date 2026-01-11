'use client';
import { Payslip } from '@/components/payslip';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';

export default function PayslipPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-muted/40 min-h-screen">
      <header className="bg-background border-b p-4 sticky top-0 z-10 no-print">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-semibold">Payslip Viewer</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button onClick={handlePrint}>
              <Download className="mr-2 h-4 w-4" />
              Download as PDF
            </Button>
          </div>
        </div>
      </header>
      <div className="p-4 sm:p-8">
        <Payslip />
      </div>
    </div>
  );
}
