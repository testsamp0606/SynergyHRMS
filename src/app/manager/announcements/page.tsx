
'use client';
import { Header } from '@/components/layout/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { announcements } from '@/lib/data';
import { format } from 'date-fns';
import { Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ManagerAnnouncementsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Announcements" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Company Announcements</CardTitle>
            <CardDescription>
              Stay up-to-date with the latest news and updates from across the company.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="bg-muted/40">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Megaphone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <Badge variant="outline">{announcement.target}</Badge>
                      </div>
                      <CardDescription>
                        Posted by {announcement.author} on{' '}
                        {format(announcement.date, 'MMMM d, yyyy')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground ml-10">
                    {announcement.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
