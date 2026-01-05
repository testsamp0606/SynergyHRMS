import { Header } from "@/components/layout/header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function EmployeeHelpSupportPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Help & Support" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Help & Support</CardTitle>
            <CardDescription>
              Find answers and get help.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Support resources will be displayed here.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
