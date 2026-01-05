import { Header } from "@/components/layout/header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function EmployeeAttendancePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Attendance" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>My Attendance</CardTitle>
            <CardDescription>
              View your attendance records.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Attendance details will be displayed here.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
