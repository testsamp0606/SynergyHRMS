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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen,
  Search,
  BookMarked,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { trainingPrograms } from '@/lib/data';
import { Input } from '@/components/ui/input';

const myTraining = [
  { ...trainingPrograms[0], progress: 75, status: 'In Progress' },
  { ...trainingPrograms[1], progress: 25, status: 'In Progress' },
  { ...trainingPrograms[4], progress: 100, status: 'Completed' },
];

const allPrograms = trainingPrograms;
const mySkills = ["React", "Project Management", "Communication", "Leadership"];


export default function EmployeeTrainingPage() {
  return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tabs defaultValue="my-learning">
          <TabsList className="grid w-full grid-cols-1 sm:w-auto sm:grid-cols-3">
            <TabsTrigger value="my-learning">
              <BookMarked className="mr-2 h-4 w-4" /> My Learning
            </TabsTrigger>
            <TabsTrigger value="catalog">
              <BookOpen className="mr-2 h-4 w-4" /> Catalog
            </TabsTrigger>
            <TabsTrigger value="skills">
              <Sparkles className="mr-2 h-4 w-4" /> My Skills
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-learning">
            <Card>
              <CardHeader>
                <CardTitle>My Learning</CardTitle>
                <CardDescription>
                  Your assigned courses and learning paths. Keep up the great work!
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {myTraining.map((course) => (
                  <Card key={course.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                         <Badge variant={course.status === 'Completed' ? 'default' : 'secondary'}>{course.status}</Badge>
                      </div>
                      <CardDescription>{course.category} - {course.duration}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Progress value={course.progress} className="h-2" />
                        <span className="text-sm font-medium text-muted-foreground">{course.progress}%</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                       {course.status === 'Completed' ? (
                            <Button variant="outline" className="w-full">
                                <Trophy className="mr-2 h-4 w-4" /> View Certificate
                            </Button>
                        ) : (
                            <Button className="w-full">
                                Continue Course
                            </Button>
                        )}
                    </CardFooter>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="catalog">
            <Card>
              <CardHeader>
                <CardTitle>Course Catalog</CardTitle>
                <CardDescription>
                  Browse and enroll in new training programs to enhance your skills.
                </CardDescription>
                 <div className="relative pt-4">
                  <Search className="absolute left-2.5 top-6 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search for courses..." className="pl-8" />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program Title</TableHead>
                      <TableHead className="hidden sm:table-cell">Category</TableHead>
                      <TableHead className="hidden md:table-cell">Duration</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allPrograms.map((program) => (
                      <TableRow key={program.id}>
                        <TableCell className="font-medium">{program.title}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="outline">{program.category}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{program.duration}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="secondary" size="sm">Enroll</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
             <Card>
              <CardHeader>
                <CardTitle>My Skills</CardTitle>
                <CardDescription>
                  A showcase of the skills you've developed through your training.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                    {mySkills.map(skill => (
                         <Badge key={skill} variant="default" className="text-sm py-1 px-3">
                            <Sparkles className="mr-2 h-3 w-3" />
                            {skill}
                        </Badge>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
  );
}
