
'use client';
import { useState } from 'react';
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
  CardFooter
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, Calendar as CalendarIcon } from 'lucide-react';
import { auditLogs } from '@/lib/data';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 10;

export default function AuditLogsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(auditLogs.length / ITEMS_PER_PAGE);

    const paginatedLogs = auditLogs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };


  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <div className="flex flex-col md:flex-row items-center gap-4">
      <div className="relative w-full md:w-auto md:flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search logs..."
          className="pl-8 w-full md:w-64 lg:w-80"
        />
      </div>
      <div className="flex gap-2 w-full flex-col sm:flex-row md:w-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full sm:w-[240px] justify-start text-left font-normal',
                !Date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Filter by date range</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="range" />
          </PopoverContent>
        </Popover>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="login">User Login</SelectItem>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
            <SelectItem value="export">Export</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="grid gap-2">
            <CardTitle>System Audit Trail</CardTitle>
            <CardDescription>
            Track all user actions and system events for compliance and security.
            </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2 md:ml-auto">
            <Button variant="outline" size="sm">
                <Download className="h-3.5 w-3.5 mr-2" />
                Export Logs
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="hidden md:table-cell">Details</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
              <TableHead className="text-right hidden sm:table-cell">IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 hidden sm:flex">
                      <AvatarImage src={log.userAvatar} alt="Avatar" />
                      <AvatarFallback>{log.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{log.user}</span>
                  </div>
                </TableCell>
                <TableCell>
                    <span className="font-mono text-sm">{log.action}</span>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{log.details}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {format(log.date, 'MMM d, yyyy, hh:mm:ss a')}
                </TableCell>
                <TableCell className="text-right font-mono text-sm hidden sm:table-cell">{log.ipAddress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
       <CardFooter>
        <div className="text-xs text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  </main>
  );
}
