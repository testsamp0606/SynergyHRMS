'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/layout/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, PlusCircle, LifeBuoy, ShieldCheck, Server, AlertTriangle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const faqs = [
  {
    question: 'How do I reset my password?',
    answer: 'You can reset your password by clicking the "Forgot Password" link on the login page. An email will be sent to you with instructions.',
  },
  {
    question: 'How do I submit a leave request?',
    answer: 'Navigate to the "Leave" page, click on "New Leave Request", fill in the details, and submit for approval.',
  },
  {
    question: 'Where can I find my payslips?',
    answer: 'Your payslips are available in the "Payroll" section. You can view and download them for any pay period.',
  },
    {
    question: 'How do I update my personal information?',
    answer: 'You can update your personal details by going to the "My Profile" page and clicking the "Edit Profile" button.',
  },
];

const tickets = [
  { id: 'TKT-001', subject: 'Unable to access payroll module', submittedBy: 'Alice Johnson', priority: 'High', status: 'Open', lastUpdate: new Date() },
  { id: 'TKT-002', subject: 'Incorrect leave balance shown', submittedBy: 'Alice Johnson', priority: 'Medium', status: 'In Progress', lastUpdate: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: 'TKT-003', subject: 'Question about expense policy', submittedBy: 'Alice Johnson', priority: 'Low', status: 'Resolved', lastUpdate: new Date(Date.now() - 1000 * 60 * 60 * 72) },
];

const systemStatus = [
    { name: 'API Services', status: 'Operational', icon: <Server className="h-5 w-5 text-green-500" /> },
    { name: 'Authentication Service', status: 'Operational', icon: <ShieldCheck className="h-5 w-5 text-green-500" /> },
    { name: 'Database', status: 'Operational', icon: <Server className="h-5 w-5 text-green-500" /> },
    { name: 'Payroll Processing', status: 'Degraded Performance', icon: <AlertTriangle className="h-5 w-5 text-yellow-500" /> },
    { name: 'Email Notifications', status: 'Operational', icon: <Server className="h-5 w-5 text-green-500" /> },
]

export default function EmployeeHelpSupportPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Help & Support" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tabs defaultValue="knowledge-base">
          <TabsList className="grid w-full grid-cols-1 sm:w-auto sm:grid-cols-3">
            <TabsTrigger value="knowledge-base">Knowledge Base</TabsTrigger>
            <TabsTrigger value="support-tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="system-status">System Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="knowledge-base">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base</CardTitle>
                <CardDescription>
                  Find answers to common questions and access user guides.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search the knowledge base..." className="pl-8" />
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index + 1}`} key={index}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support-tickets">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="grid gap-2">
                    <CardTitle>My Support Tickets</CardTitle>
                    <CardDescription>
                    Track and manage your support requests.
                    </CardDescription>
                </div>
                <Button size="sm" className="ml-auto gap-1 w-full sm:w-auto">
                    <PlusCircle className="h-3.5 w-3.5" />
                    New Ticket
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden sm:table-cell">Last Update</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets.map(ticket => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                        <TableCell className="font-medium">{ticket.subject}</TableCell>
                        <TableCell>
                          <Badge variant={ticket.priority === 'High' ? 'destructive' : ticket.priority === 'Medium' ? 'secondary' : 'outline'}>{ticket.priority}</Badge>
                        </TableCell>
                         <TableCell>
                          <Badge variant={ticket.status === 'Resolved' ? 'default' : 'secondary'}>{ticket.status}</Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{format(ticket.lastUpdate, 'MMM d, yyyy')}</TableCell>
                        <TableCell className="text-right">
                           <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

           <TabsContent value="system-status">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>
                  Check the real-time status of all system services.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <CardHeader className="p-4 flex-row items-center gap-4">
                        <ShieldCheck className="h-6 w-6 text-green-600" />
                        <div>
                            <CardTitle className="text-base">All systems operational</CardTitle>
                            <CardDescription className="text-xs">Last checked: {format(new Date(), 'MMM d, yyyy, hh:mm a')}</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
                <div className="grid gap-4">
                    {systemStatus.map(service => (
                         <div key={service.name} className="flex items-center justify-between rounded-lg border p-3">
                            <div className="flex items-center gap-3">
                                {service.icon}
                                <span className="font-medium text-sm">{service.name}</span>
                            </div>
                            <span className={`text-sm font-semibold ${service.status === 'Operational' ? 'text-green-600' : 'text-yellow-600'}`}>
                                {service.status}
                            </span>
                        </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
