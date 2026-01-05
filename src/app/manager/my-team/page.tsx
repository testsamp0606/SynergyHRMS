
'use client';
import { Header } from '@/components/layout/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { employees } from '@/lib/data';
import { Search, Mail, Phone, User, Briefcase, CalendarClock, ChevronsRight } from 'lucide-react';

const teamMemberIds = ['EMP006', 'EMP005', 'EMP004', 'EMP003'];
const teamMembers = employees.filter((emp) => teamMemberIds.includes(emp.id));

export default function MyTeamPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="My Team" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Team Overview</CardTitle>
            <CardDescription>
              View and manage your direct reporting employees.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
              <div className="relative w-full md:w-auto md:flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search team members..."
                  className="pl-8 w-full md:w-80"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Select>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
                    <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
                    <SelectItem value="sales-executive">Sales Executive</SelectItem>
                    <SelectItem value="marketing-lead">Marketing Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <Card key={member.id}>
                  <CardHeader className="flex-row items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{member.email}</span>
                    </div>
                     <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>+1-202-555-0186</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={member.status === 'Active' ? 'secondary' : 'outline'}>
                        {member.status}
                      </Badge>
                       <Badge variant="outline">Probation</Badge>
                    </div>
                  </CardContent>
                   <CardFooter>
                      <Button variant="outline" className="w-full">
                        <User className="mr-2 h-4 w-4" /> View Profile
                      </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
