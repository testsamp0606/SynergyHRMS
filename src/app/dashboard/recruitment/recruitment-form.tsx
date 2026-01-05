"use client"

import { useFormState, useFormStatus } from "react-dom"
import { generateDescriptionAction, generateQuestionsAction, GenerationState } from "./actions"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Bot, Loader2, Wand2 } from "lucide-react"

const initialState: GenerationState = {
  jobDescription: undefined,
  interviewQuestions: undefined,
  error: undefined,
  jobDescriptionLoading: false,
  interviewQuestionsLoading: false,
}

function SubmitButton({ text, loading }: { text: string; loading: boolean }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending || loading} className="w-full sm:w-auto">
      {pending || loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          {text}
        </>
      )}
    </Button>
  )
}

export function RecruitmentForm() {
  const [descriptionState, descriptionFormAction] = useFormState(generateDescriptionAction, initialState)
  const [questionState, questionFormAction] = useFormState(generateQuestionsAction, descriptionState)

  const finalState = questionState.interviewQuestions ? questionState : descriptionState;

  return (
    <div className="grid gap-8">
      <Card>
        <form action={descriptionFormAction}>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Provide the job title and key responsibilities to generate a compelling job description.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                placeholder="e.g., Senior Frontend Engineer"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="responsibilities">Key Responsibilities</Label>
              <Textarea
                id="responsibilities"
                name="responsibilities"
                placeholder="e.g., Develop and maintain web applications, collaborate with cross-functional teams..."
                required
                className="min-h-[120px]"
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <SubmitButton text="Generate Job Description" loading={finalState.jobDescriptionLoading} />
          </CardFooter>
        </form>
      </Card>

      {finalState.jobDescription && (
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
             <Bot className="h-8 w-8 text-accent" />
            <div>
              <CardTitle>Generated Job Description</CardTitle>
              <CardDescription>Review the AI-generated content below. You can now generate interview questions.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md border p-4 bg-muted/50">
            {finalState.jobDescription}
          </CardContent>
          <CardFooter className="justify-end">
             <form action={questionFormAction}>
                <input type="hidden" name="jobDescription" value={finalState.jobDescription} />
                <SubmitButton text="Generate Interview Questions" loading={finalState.interviewQuestionsLoading} />
             </form>
          </CardFooter>
        </Card>
      )}
      
      {finalState.interviewQuestions && (
         <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <Bot className="h-8 w-8 text-accent" />
                <div>
                    <CardTitle>Generated Interview Questions</CardTitle>
                    <CardDescription>Use these questions to assess candidates effectively.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md border p-4 bg-muted/50">
                {finalState.interviewQuestions}
            </CardContent>
        </Card>
      )}

      {finalState.error && (
        <p className="text-sm text-destructive">{finalState.error}</p>
      )}
    </div>
  )
}
