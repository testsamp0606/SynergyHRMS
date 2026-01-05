import { Header } from "@/components/layout/header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function EmployeeAnnouncementsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Announcements" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Company Announcements</CardTitle>
            <CardDescription>
              Stay up-to-date with the latest news.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Announcements will be displayed here.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
