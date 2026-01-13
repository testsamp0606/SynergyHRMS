
'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Upload, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { regularizationRequests } from '@/lib/data';
import type { RegularizationRequest } from '@/lib/types';

const statusVariant: { [key in RegularizationRequest['status']]: 'default' | 'secondary' | 'outline' | 'destructive' } = {
  'Submitted': 'secondary',
  'Approved by Manager': 'outline',
  'Approved': 'default',
  'Rejected': 'destructive',
};


export default function RegularizationPage() {
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>New Regularization Request</CardTitle>
              <CardDescription>
                Fill out the form to correct your attendance record for a
                specific day.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="login-time">Login Time</Label>
                   <div className="relative">
                     <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="login-time" type="time" className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logout-time">Logout Time</Label>
                  <div className="relative">
                     <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="logout-time" type="time" className="pl-8" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="late-login">Late Login</SelectItem>
                    <SelectItem value="early-logout">Early Logout</SelectItem>
                    <SelectItem value="missed-punch">Missed Punch</SelectItem>
                    <SelectItem value="overtime">Overtime</SelectItem>
                     <SelectItem value="leave-adjustment">Leave Adjustment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  placeholder="Provide any additional details or justification"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="attachment">Attach Document (Optional)</Label>
                 <div className="relative">
                    <Upload className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="attachment" type="file" className="pl-8" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit Request</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Request History</CardTitle>
              <CardDescription>
                Track the status of your past regularization requests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Approver Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regularizationRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{format(request.date, 'MMM d, yyyy')}</TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[request.status]}>
                          {request.status}
                        </Badge>
                      </TableCell>
                       <TableCell className="text-muted-foreground text-xs">{request.remarks || '---'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
