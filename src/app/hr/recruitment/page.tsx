import { Header } from "@/components/layout/header"
import { RecruitmentForm } from "@/app/dashboard/recruitment/recruitment-form"

export default function RecruitmentPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Recruitment Management" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <RecruitmentForm />
      </main>
    </div>
  )
}
