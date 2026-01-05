import { Header } from "@/components/layout/header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function EmployeeProfilePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="My Profile" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>
              Your personal and professional information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Profile details will be displayed here.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
