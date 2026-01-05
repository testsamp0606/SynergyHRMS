import { Header } from "@/components/layout/header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function EmployeeDashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Employee Dashboard" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Welcome!</CardTitle>
            <CardDescription>
              This is your employee dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>You can access your information and tasks from the sidebar.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
