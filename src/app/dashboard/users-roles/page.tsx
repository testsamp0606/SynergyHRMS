
'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, PlusCircle, Search, User, Shield, Edit, Trash2 } from 'lucide-react';
import { users, roles } from '@/lib/data';
import { Header } from '@/components/layout/header';

export default function UsersRolesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Users & Roles" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">

        <section className="mb-8">
            <CardHeader className="px-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <CardTitle>Roles Management</CardTitle>
                        <CardDescription>Define roles and their permissions.</CardDescription>
                    </div>
                    <Button size="sm" className="gap-1 w-full sm:w-auto">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add New Role
                        </span>
                    </Button>
                </div>
            </CardHeader>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {roles.map(role => (
                    <Card key={role.id}>
                        <CardHeader>
                            <div className='flex items-center justify-between'>
                                <CardTitle className="text-lg">{role.name}</CardTitle>
                                <Shield className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <CardDescription>{role.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="text-sm text-muted-foreground mb-2">Key Permissions:</div>
                             <div className="flex flex-wrap gap-1">
                                {role.permissions.slice(0,3).map(p => <Badge key={p} variant="secondary">{p}</Badge>)}
                                {role.permissions.length > 3 && <Badge variant="outline">+{role.permissions.length - 3} more</Badge>}
                             </div>
                        </CardContent>
                         <CardFooter className="border-t pt-4">
                            <div className="flex w-full justify-end gap-2">
                                <Button variant="outline" size="sm">View Users</Button>
                                <Button variant="ghost" size="icon" className='h-8 w-8'>
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>

        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="grid gap-2">
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and their assigned roles.
              </CardDescription>
            </div>
            <div className="flex w-full md:w-auto items-center gap-2 md:ml-auto">
                <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-8 w-full"
                    />
                </div>
                <Button asChild size="sm" className="gap-1">
                    <a href="#">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add User
                    </span>
                    </a>
                </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 hidden sm:flex">
                          <AvatarImage src={`https://picsum.photos/seed/${user.id}/100/100`} alt="Avatar" />
                          <AvatarFallback>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-0.5">
                          <p className="font-medium leading-none">{user.firstName} {user.lastName}</p>
                           <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">{roles.find(r => r.id === user.roleId)?.name}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <Badge variant="secondary">Active</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit Role</DropdownMenuItem>
                          <DropdownMenuItem><User className="mr-2 h-4 w-4" /> View Activity</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Deactivate User</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
