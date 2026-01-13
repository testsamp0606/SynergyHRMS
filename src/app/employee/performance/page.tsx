'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Star,
  MessageSquare,
  Target,
  Trophy,
  History,
  Send,
} from 'lucide-react';
import {
  currentPerformanceCycle,
  performanceHistory,
} from '@/lib/data';
import { format } from 'date-fns';

const ratingStars = (rating: number) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default function EmployeePerformancePage() {
  return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tabs defaultValue="current">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">
              <Trophy className="mr-2 h-4 w-4" /> Current Review Cycle
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="mr-2 h-4 w-4" /> Performance History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentPerformanceCycle.cycleName} (
                  {format(currentPerformanceCycle.startDate, 'MMM yyyy')} -{' '}
                  {format(currentPerformanceCycle.endDate, 'MMM yyyy')})
                </CardTitle>
                <CardDescription>
                  Review your goals, track your progress, and complete your
                  self-appraisal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5" /> My Goals & KPIs
                  </h3>
                  <div className="space-y-4">
                    {currentPerformanceCycle.goals.map((goal) => (
                      <Card key={goal.id} className="bg-muted/40">
                        <CardHeader className="p-4">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">
                              {goal.title}
                            </CardTitle>
                            <Badge variant="outline">{goal.status}</Badge>
                          </div>
                          <CardDescription className="text-xs pt-1">
                            {goal.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex items-center gap-4">
                            <Progress
                              value={goal.progress}
                              className="h-2 flex-1"
                            />
                            <span className="text-sm font-medium">
                              {goal.progress}%
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" /> My Self-Appraisal
                  </h3>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="self-appraisal"
                        className="text-sm font-medium"
                      >
                        Your comments on your performance this cycle:
                      </label>
                      <Textarea
                        id="self-appraisal"
                        placeholder="Reflect on your achievements, challenges, and areas for growth..."
                        className="min-h-[150px]"
                        defaultValue={currentPerformanceCycle.selfAppraisal}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button>
                        <Send className="mr-2 h-4 w-4" /> Submit Appraisal
                      </Button>
                    </div>
                  </form>
                </div>

                 <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    Manager Feedback
                  </h3>
                  <Card className="border-dashed">
                      <CardContent className="p-6">
                           {currentPerformanceCycle.managerFeedback ? (
                               <p className="text-sm italic text-muted-foreground">{currentPerformanceCycle.managerFeedback}</p>
                           ) : (
                                <p className="text-sm text-center text-muted-foreground">Manager feedback will appear here once submitted.</p>
                           )}
                      </CardContent>
                  </Card>
                </div>

              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Performance History</CardTitle>
                <CardDescription>
                  Review your past performance cycles and feedback.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Review Cycle</TableHead>
                      <TableHead>Final Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceHistory.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">
                          {review.cycleName}
                        </TableCell>
                        <TableCell>{ratingStars(review.rating)}</TableCell>
                        <TableCell>
                          <Badge>{review.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
  );
}
