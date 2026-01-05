'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, PlusCircle, Search, Check, X, CircleDollarSign, HandCoins, Ban } from 'lucide-react';
import { expenseClaims } from '@/lib/data';
import { format } from 'date-fns';
import { Header } from '@/components/layout/header';

const statusVariant: { [key: string]: 'default' | 'secondary' | 'outline' | 'destructive' } = {
  Approved: 'default',
  Pending: 'secondary',
  Rejected: 'destructive',
};

export default function ExpensesPage() {
  const pendingClaims = expenseClaims.filter((claim) => claim.status === 'Pending').length;
  const totalApproved = expenseClaims.filter(c => c.status === 'Approved').reduce((sum, claim) => sum + claim.amount, 0);
  const totalRejected = expenseClaims.filter(c => c.status === 'Rejected').reduce((sum, claim) => sum + claim.amount, 0);

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Expenses & Claims" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
              <HandCoins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingClaims}</div>
              <p className="text-xs text-muted-foreground">Claims awaiting review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved This Month</CardTitle>
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currencyFormatter.format(totalApproved)}</div>
              <p className="text-xs text-muted-foreground">Total amount reimbursed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected This Month</CardTitle>
              <Ban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currencyFormatter.format(totalRejected)}</div>
              <p className="text-xs text-muted-foreground">Total amount declined</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-auto md:flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search claims by employee or description..."
              className="pl-8 w-full md:w-80"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="grid gap-2">
              <CardTitle>Expense Claims</CardTitle>
              <CardDescription>Review, approve, or reject employee expense claims.</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2 md:ml-auto">
              <Button asChild size="sm" className="gap-1">
                <a href="#">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    New Expense Claim
                  </span>
                </a>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenseClaims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={claim.employeeAvatar} alt="Avatar" />
                          <AvatarFallback>{claim.employeeName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{claim.employeeName}</p>
                          <p className="text-sm text-muted-foreground hidden md:block">{claim.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(claim.submissionDate, 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{claim.category}</Badge>
                    </TableCell>
                    <TableCell>{currencyFormatter.format(claim.amount)}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[claim.status]}>{claim.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       {claim.status === 'Pending' ? (
                         <div className="flex gap-2 justify-end">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                                <Check className="h-4 w-4 text-green-500" />
                                <span className="sr-only">Approve</span>
                            </Button>
                             <Button variant="outline" size="icon" className="h-8 w-8">
                                <X className="h-4 w-4 text-red-500" />
                                 <span className="sr-only">Reject</span>
                            </Button>
                         </div>
                       ) : (
                        <Button variant="ghost" size="icon" disabled>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                       )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
