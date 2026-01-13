
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
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Download, Edit, X, Camera } from 'lucide-react';
import { employees } from '@/lib/data';
import { useState, useRef } from 'react';

const user = employees[0]; // Using Alice Johnson as the example user

export default function EmployeeProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };
  
  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically handle the form submission,
    // like sending the data and new image to your backend.
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileImage(user.avatar);
  };


  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="My Profile" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
            <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileImage} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                    <>
                        <Input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute bottom-1 right-1 h-8 w-8 rounded-full"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Camera className="h-4 w-4" />
                        </Button>
                    </>
                )}
            </div>
            <div className="grid flex-1 gap-1">
              <CardTitle className="text-3xl">{user.name}</CardTitle>
              <CardDescription>{user.role}</CardDescription>
              <div className="mt-2 flex items-center justify-center md:justify-start gap-4">
                <Progress value={80} className="w-full max-w-sm" />
                <span className="text-sm text-muted-foreground whitespace-nowrap">80% Complete</span>
              </div>
            </div>
             {!isEditing && <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>}
          </CardHeader>
        </Card>

        <Tabs defaultValue="personal">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="employment">Job</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal & Contact Information</CardTitle>
                <CardDescription>
                  Manage your personal details, contact information, and emergency contacts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                    <h3 className="font-semibold">Contact Details</h3>
                     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" defaultValue={user.email} readOnly />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" defaultValue="+1 (555) 123-4567" readOnly={!isEditing} />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="address">Home Address</Label>
                        <Input id="address" defaultValue="1234 Maple Street, Springfield, USA" readOnly={!isEditing} />
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    <h3 className="font-semibold">Emergency Contact</h3>
                     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="emergency-name">Full Name</Label>
                            <Input id="emergency-name" defaultValue="Jane Johnson" readOnly={!isEditing} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="emergency-phone">Phone Number</Label>
                            <Input id="emergency-phone" defaultValue="+1 (555) 987-6543" readOnly={!isEditing} />
                        </div>
                         <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="emergency-relation">Relationship</Label>
                            <Input id="emergency-relation" defaultValue="Spouse" readOnly={!isEditing} />
                        </div>
                    </div>
                </div>
              </CardContent>
              {isEditing && (
               <CardFooter className="border-t px-6 py-4 justify-end gap-2">
                <Button variant="outline" onClick={handleCancel}>
                    <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="employment">
            <Card>
              <CardHeader>
                <CardTitle>Job & Employment Details</CardTitle>
                 <CardDescription>
                  Your role, department, and other employment information. This data is managed by HR.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-sm">
                 <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
                    <div><span className="font-semibold text-muted-foreground">Employee ID:</span> {user.id}</div>
                    <div><span className="font-semibold text-muted-foreground">Department:</span> {user.department}</div>
                    <div><span className="font-semibold text-muted-foreground">Role:</span> {user.role}</div>
                    <div><span className="font-semibold text-muted-foreground">Reporting Manager:</span> Bob Williams</div>
                    <div><span className="font-semibold text-muted-foreground">Employment Type:</span> Full-time</div>
                    <div><span className="font-semibold text-muted-foreground">Employment Status:</span> {user.status}</div>
                 </div>
                 <Separator />
                  <div>
                    <h3 className="font-semibold mb-4">Employment History</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <div>
                                <p className="font-medium">Senior Software Engineer</p>
                                <p className="text-muted-foreground">Synergy Corp</p>
                            </div>
                            <p className="text-muted-foreground">Jan 2023 - Present</p>
                        </div>
                         <div className="flex justify-between">
                            <div>
                                <p className="font-medium">Software Engineer</p>
                                <p className="text-muted-foreground">Tech Solutions Inc.</p>
                            </div>
                            <p className="text-muted-foreground">Jun 2020 - Dec 2022</p>
                        </div>
                    </div>
                 </div>
              </CardContent>
            </Card>
          </TabsContent>

            <TabsContent value="documents">
                <Card>
                    <CardHeader>
                        <CardTitle>My Documents</CardTitle>
                        <CardDescription>
                        Key documents related to your employment.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            <li className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <p className="font-medium">Employment Contract</p>
                                    <p className="text-sm text-muted-foreground">Signed on Jan 15, 2023</p>
                                </div>
                                <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Download</Button>
                            </li>
                             <li className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <p className="font-medium">Q2 2024 Performance Review</p>
                                    <p className="text-sm text-muted-foreground">Completed on Jul 30, 2024</p>
                                </div>
                                <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Download</Button>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}
