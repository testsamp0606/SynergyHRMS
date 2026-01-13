
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { announcements } from '@/lib/data';
import { format } from 'date-fns';
import { Megaphone, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AnnouncementsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <Card>
      <CardHeader>
        <CardTitle>Create New Announcement</CardTitle>
        <CardDescription>
          Draft and send announcements to all or specific departments.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
            <Input id="title" placeholder="Announcement Title" />
        </div>
        <div className="grid gap-2">
          <Textarea
            id="announcement"
            placeholder="Type your announcement here..."
            className="min-h-[120px]"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="grid gap-2">
                <Select defaultValue="everyone">
                    <SelectTrigger>
                        <SelectValue placeholder="Target Audience" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="everyone">Everyone</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                    </SelectContent>
                </Select>
           </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button>
          <Send className="mr-2 h-4 w-4" /> Send Announcement
        </Button>
      </CardFooter>
    </Card>

    <div className="mt-8">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Recent Announcements</h2>
        <div className="grid gap-4">
            {announcements.map((announcement) => (
                <Card key={announcement.id}>
                    <CardHeader className="flex flex-col sm:flex-row items-start gap-4">
                        <Megaphone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div className='w-full'>
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                <CardTitle>{announcement.title}</CardTitle>
                                <Badge variant="outline" className="whitespace-nowrap">{announcement.target}</Badge>
                            </div>
                            <CardDescription>
                                Sent by {announcement.author} on {format(announcement.date, 'MMMM d, yyyy')}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground sm:pl-10">{announcement.content}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  </main>
  );
}
