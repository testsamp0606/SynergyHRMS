
'use client';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { employees, Employee } from '@/lib/data';
import { Search, Mail, Phone, User, Building, Briefcase } from 'lucide-react';
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';

const teamMemberIds = ['EMP006', 'EMP005', 'EMP004', 'EMP003'];
const teamMembers = employees.filter((emp) => teamMemberIds.includes(emp.id));

// Get unique roles for the filter dropdown
const uniqueRoles = [...new Set(teamMembers.map(member => member.role))];

export default function MyTeamPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedMember, setSelectedMember] = useState<Employee | null>(null);

  const filteredTeamMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full md:w-[220px]">
                    <SelectValue placeholder="Filter by Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {uniqueRoles.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTeamMembers.map((member) => (
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
                      <Button variant="outline" className="w-full" onClick={() => setSelectedMember(member)}>
                        <User className="mr-2 h-4 w-4" /> View Profile
                      </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
             {filteredTeamMembers.length === 0 && (
                <div className="text-center text-muted-foreground py-12">
                    No team members match your criteria.
                </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={!!selectedMember} onOpenChange={(isOpen) => !isOpen && setSelectedMember(null)}>
            <DialogContent className="sm:max-w-md">
                {selectedMember && (
                    <>
                        <DialogHeader className="items-center text-center">
                             <Avatar className="h-20 w-20">
                                <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                                <AvatarFallback>{selectedMember.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <DialogTitle className="text-2xl">{selectedMember.name}</DialogTitle>
                            <DialogDescription>{selectedMember.email}</DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                            <Separator />
                             <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-1">
                                    <div className="text-muted-foreground">Department</div>
                                    <div className="font-medium flex items-center gap-2"><Building className="h-4 w-4" /> {selectedMember.department}</div>
                                </div>
                                 <div className="space-y-1">
                                    <div className="text-muted-foreground">Role</div>
                                    <div className="font-medium flex items-center gap-2"><Briefcase className="h-4 w-4" /> {selectedMember.role}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-muted-foreground">Status</div>
                                    <div className="font-medium">
                                        <Badge variant={selectedMember.status === 'Active' ? 'secondary' : 'outline'}>
                                            {selectedMember.status}
                                        </Badge>
                                    </div>
                                </div>
                                 <div className="space-y-1">
                                    <div className="text-muted-foreground">Phone</div>
                                    <div className="font-medium flex items-center gap-2"><Phone className="h-4 w-4" /> +1-202-555-0186</div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
      </main>
  );
}
