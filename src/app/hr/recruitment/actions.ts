"use server"

import { generateJobDescription } from "@/ai/flows/generate-job-description"
import { generateInterviewQuestions } from "@/ai/flows/generate-interview-questions"

export interface GenerationState {
  jobDescription?: string;
  interviewQuestions?: string;
  error?: string;
  jobDescriptionLoading: boolean;
  interviewQuestionsLoading: boolean;
}

export async function generateDescriptionAction(
  prevState: GenerationState,
  formData: FormData
): Promise<GenerationState> {
  const jobTitle = formData.get("jobTitle") as string
  const responsibilities = formData.get("responsibilities") as string

  if (!jobTitle || !responsibilities) {
    return {
      ...prevState,
      error: "Job title and responsibilities are required.",
      jobDescriptionLoading: false,
    }
  }

  try {
    const { jobDescription } = await generateJobDescription({ jobTitle, responsibilities });
    return {
      jobDescription: jobDescription,
      interviewQuestions: undefined, // Clear previous questions
      jobDescriptionLoading: false,
      interviewQuestionsLoading: false,
    }
  } catch (e) {
    return {
      ...prevState,
      error: "Failed to generate job description. Please try again.",
      jobDescriptionLoading: false,
    }
  }
}

export async function generateQuestionsAction(
  prevState: GenerationState,
  formData: FormData
): Promise<GenerationState> {
    const jobDescription = formData.get("jobDescription") as string;

    if (!jobDescription) {
        return {
            ...prevState,
            error: "Job description is not available to generate questions.",
            interviewQuestionsLoading: false,
        }
    }

    try {
        const { interviewQuestions } = await generateInterviewQuestions({ jobDescription });
        return {
            ...prevState,
            interviewQuestions,
            interviewQuestionsLoading: false,
        }
    } catch (e) {
        return {
            ...prevState,
            error: "Failed to generate interview questions. Please try again.",
            interviewQuestionsLoading: false,
        }
    }
}
