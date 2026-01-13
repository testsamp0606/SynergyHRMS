'use client';
import { Header } from '@/components/layout/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { assets } from '@/lib/data';
import { format } from 'date-fns';
import { MoreHorizontal, Laptop, HelpCircle, FileWarning } from 'lucide-react';

// Assuming the logged-in user is Alice Johnson for demonstration
const employeeName = 'Alice Johnson';
const assignedAssets = assets.filter(
  (asset) => asset.assignedTo === employeeName && asset.status === 'Assigned'
);

export default function EmployeeAssetsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="My Assets" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>My Assigned Assets</CardTitle>
                        <CardDescription>
                        All company assets currently assigned to you.
                        </CardDescription>
                    </div>
                     <div className="flex items-center text-sm text-muted-foreground">
                        <Laptop className="mr-2 h-4 w-4" />
                        <span>{assignedAssets.length} Assets</span>
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead className="hidden sm:table-cell">Category</TableHead>
                      <TableHead className="hidden md:table-cell">Serial</TableHead>
                      <TableHead className="hidden md:table-cell">Issue Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignedAssets.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell className="font-medium">
                          {asset.name}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{asset.category}</TableCell>
                        <TableCell className="hidden md:table-cell font-mono text-xs">
                          {asset.serialNumber}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {format(asset.purchaseDate, 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                Acknowledge Receipt
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Request Return
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Report Damage/Loss
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Asset Policy</CardTitle>
                <CardDescription>
                  Your responsibilities for company assets.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-4">
                 <p>
                  All assigned assets are the property of Synergy Corp. and must be used for business purposes.
                </p>
                <p>
                  You are responsible for the care and security of your assigned equipment. Please report any damage, loss, or theft immediately.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Read Full Policy
                </Button>
              </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Report an Issue</CardTitle>
                    <CardDescription>
                    Having trouble with your equipment?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full">
                        <FileWarning className="mr-2 h-4 w-4" />
                        Create IT Support Ticket
                    </Button>
                </CardContent>
             </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
