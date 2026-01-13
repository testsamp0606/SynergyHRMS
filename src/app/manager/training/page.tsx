
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
import { Progress } from '@/components/ui/progress';
import { PlusCircle, BookOpen, Users, CheckCircle } from 'lucide-react';
import { trainingPrograms } from '@/lib/data';

export default function ManagerTrainingPage() {
  const teamPrograms = trainingPrograms.slice(0, 3); 

  return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Team Training Overview</CardTitle>
              <CardDescription>
                Manage and track training programs for your team.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <a href="#">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Recommend Training
                </span>
              </a>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Program Title</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamPrograms.map((program) => (
                  <TableRow key={program.id}>
                    <TableCell>
                      <div className="font-medium">{program.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {program.category}
                      </div>
                    </TableCell>
                    <TableCell>
                      {program.assignedTo > 1 ? `${program.assignedTo} members` : '1 member'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={program.completionRate} className="h-2 w-24" />
                        <span className="text-sm text-muted-foreground">
                          {program.completionRate}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={program.status === 'Active' ? 'default' : 'secondary'}>{program.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
  );
}
