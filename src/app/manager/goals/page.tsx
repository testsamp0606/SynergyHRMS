
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PlusCircle, Target } from 'lucide-react';
import { currentPerformanceCycle } from '@/lib/data';

export default function ManagerGoalsPage() {
  return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Team Goals & KPIs</CardTitle>
              <CardDescription>
                Create, assign, and track goals for your team members.
              </CardDescription>
            </div>
            <Button size="sm" className="ml-auto gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              Assign New Goal
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Goal</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPerformanceCycle.goals.map((goal) => (
                  <TableRow key={goal.id}>
                    <TableCell className="font-medium">{goal.title}</TableCell>
                    <TableCell>Alice Johnson</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={goal.progress} className="h-2 w-24" />
                        <span className="text-sm text-muted-foreground">
                          {goal.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={goal.status === 'Completed' ? 'default' : 'secondary'}>{goal.status}</Badge>
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
