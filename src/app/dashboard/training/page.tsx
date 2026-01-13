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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { MoreHorizontal, PlusCircle, BookOpen, Users, CheckCircle } from 'lucide-react';
import { trainingPrograms } from '@/lib/data';
import { Header } from '@/components/layout/header';

const statusVariant: { [key: string]: 'default' | 'secondary' | 'outline' } = {
  Active: 'default',
  Draft: 'secondary',
  Archived: 'outline',
};

export default function TrainingPage() {
  const totalParticipants = trainingPrograms.reduce((sum, p) => sum + p.assignedTo, 0);
  const averageCompletion =
    trainingPrograms.reduce((sum, p) => sum + p.completionRate, 0) / trainingPrograms.length;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Training & Development" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {trainingPrograms.filter((p) => p.status === 'Active').length}
              </div>
              <p className="text-xs text-muted-foreground">Total training programs available</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalParticipants}</div>
              <p className="text-xs text-muted-foreground">Across all active programs</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Completion Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageCompletion.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">Average across all programs</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="grid gap-2">
              <CardTitle>Training Programs</CardTitle>
              <CardDescription>
                Manage and track all company training programs.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1 w-full sm:w-auto">
              <a href="#">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Create Program
                </span>
              </a>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Program Title</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell text-center">
                    Assigned
                  </TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainingPrograms.map((program) => (
                  <TableRow key={program.id}>
                    <TableCell>
                      <div className="font-medium">{program.title}</div>
                      <div className="text-sm text-muted-foreground md:hidden">
                        {program.category}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{program.category}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[program.status]}>{program.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-center">
                      {program.assignedTo}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={program.completionRate} className="h-2 w-16 sm:w-24" />
                        <span className="text-sm text-muted-foreground">
                          {program.completionRate}%
                        </span>
                      </div>
                    </TableCell>
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
                          <DropdownMenuItem>Edit Program</DropdownMenuItem>
                          <DropdownMenuItem>Assign Users</DropdownMenuItem>
                          <DropdownMenuItem>View Report</DropdownMenuItem>
                          <DropdownMenuItem>Archive</DropdownMenuItem>
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
  );
}
