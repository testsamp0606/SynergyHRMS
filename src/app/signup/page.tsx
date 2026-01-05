"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth, useFirestore, useUser, setDocumentNonBlocking } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { doc, collection, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import type { Role } from "@/lib/types";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isUserLoading, router]);
  
  useEffect(() => {
    const fetchRoles = async () => {
      if (!firestore) return;
      const rolesCollection = collection(firestore, "roles");
      try {
        const rolesSnapshot = await getDocs(rolesCollection);
        const rolesList = rolesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Role));
        setRoles(rolesList);
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast({
            variant: "destructive",
            title: "Error fetching roles",
            description: "Could not load roles for signup.",
        });
      }
    };

    fetchRoles();
  }, [firestore, toast]);


  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (!roleId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a role.",
      });
      return;
    }

    try {
      // First, create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      
      // As soon as the user is created, create their profile in Firestore
      const userProfileRef = doc(firestore, "users", newUser.uid);
      setDocumentNonBlocking(userProfileRef, {
        id: newUser.uid,
        firstName,
        lastName,
        email,
        roleId,
      }, { merge: true });
      
      toast({
        title: "Signup Successful",
        description: "You are now being redirected.",
      });

      // The onAuthStateChanged listener in the layout will handle the redirect
    } catch (error: any) {
      let description = "An unexpected error occurred.";
      if (error.code === 'auth/email-already-in-use') {
        description = "This email address is already in use.";
      } else if (error.code === 'auth/weak-password') {
        description = "The password is too weak. Please use at least 6 characters.";
      }
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: description,
      });
    }
  };

  if (isUserLoading || user) {
    return <div className="flex h-screen items-center justify-center"><p>Loading...</p></div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={setRoleId} value={roleId} required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                      ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
