import { Header } from "@/components/layout/header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function EmployeeExpensesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Expenses" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>My Expenses</CardTitle>
            <CardDescription>
              Manage your expense claims.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Expense claim details will be displayed here.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
