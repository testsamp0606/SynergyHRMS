
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <Tabs defaultValue="general">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Manage your company profile, branding, and localization settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="Synergy Corp" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">Company Logo</Label>
              <Input id="logo" type="file" />
              <p className="text-sm text-muted-foreground">
                Upload a logo to be displayed in the sidebar and on reports.
              </p>
            </div>
             <div className="space-y-2">
                <Label>Theme Color</Label>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary" />
                        <span className="text-sm">Primary</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent" />
                        <span className="text-sm">Accent</span>
                    </div>
                    <Button variant="outline" size="sm">Change Colors</Button>
                </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English (United States)</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Time Zone</Label>
              <Select defaultValue="pst">
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                  <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage your workspace's security settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <Label htmlFor="password-policy">Password Policy</Label>
                    <p className="text-sm text-muted-foreground">
                        Require strong passwords for all users.
                    </p>
                </div>
                <Switch id="password-policy" defaultChecked />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <Label htmlFor="2fa">Two-Factor Authentication (2FA)</Label>
                    <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to user accounts.
                    </p>
                </div>
                <Switch id="2fa" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout</Label>
              <Select defaultValue="30m">
                <SelectTrigger id="session-timeout" className='w-full md:w-1/2'>
                  <SelectValue placeholder="Select timeout duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15m">15 minutes</SelectItem>
                  <SelectItem value="30m">30 minutes</SelectItem>
                   <SelectItem value="1h">1 hour</SelectItem>
                   <SelectItem value="8h">8 hours</SelectItem>
                </SelectContent>
              </Select>
               <p className="text-sm text-muted-foreground">
                Automatically log out users after a period of inactivity.
              </p>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Manage how you receive notifications from the system.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="font-semibold">Email Notifications</div>
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <Label htmlFor="approvals-email">Pending Approvals</Label>
                    <p className="text-sm text-muted-foreground">
                        Receive an email when there are new requests to approve.
                    </p>
                </div>
                <Switch id="approvals-email" defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <Label htmlFor="announcements-email">Announcements</Label>
                    <p className="text-sm text-muted-foreground">
                        Receive an email for new company announcements.
                    </p>
                </div>
                <Switch id="announcements-email" defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <Label htmlFor="reports-email">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">
                        Receive a weekly summary report of HR metrics.
                    </p>
                </div>
                <Switch id="reports-email" />
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </TabsContent>
       <TabsContent value="integrations">
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>
              Connect and manage third-party applications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                </div>
                <div>
                  <div className="font-semibold">Google Workspace</div>
                  <p className="text-sm text-muted-foreground">Sync employees and calendars.</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
               <div className="flex items-center gap-4">
                 <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m22 8-6 4 6 4V8Z"/><path d="M16 12H2"/></svg>
                 </div>
                <div>
                  <div className="font-semibold">Slack</div>
                  <p className="text-sm text-muted-foreground">Send notifications to Slack channels.</p>
                </div>
              </div>
              <Button variant="destructive">Disconnect</Button>
            </div>
          </CardContent>
           <CardFooter className="border-t px-6 py-4">
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </main>
  );
}
