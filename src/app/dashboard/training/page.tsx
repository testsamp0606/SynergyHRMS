import { Header } from "@/components/layout/header";

export default function TrainingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Training & Development" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">Training & Development Page Content</p>
        </div>
      </main>
    </div>
  );
}
