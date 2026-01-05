'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating job descriptions from a job title and responsibilities.
 *
 * The flow takes a job title and a list of responsibilities as input and returns a generated job description.
 *
 * @fileOverview
 * - generateJobDescription: A function that generates a job description.
 * - GenerateJobDescriptionInput: The input type for the generateJobDescription function.
 * - GenerateJobDescriptionOutput: The output type for the generateJobDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateJobDescriptionInputSchema = z.object({
  jobTitle: z.string().describe('The title of the job.'),
  responsibilities: z
    .string()
    .describe(
      'A short description of the responsibilities associated with the job.'
    ),
});
export type GenerateJobDescriptionInput = z.infer<
  typeof GenerateJobDescriptionInputSchema
>;

const GenerateJobDescriptionOutputSchema = z.object({
  jobDescription: z.string().describe('The generated job description.'),
});
export type GenerateJobDescriptionOutput = z.infer<
  typeof GenerateJobDescriptionOutputSchema
>;

export async function generateJobDescription(
  input: GenerateJobDescriptionInput
): Promise<GenerateJobDescriptionOutput> {
  return generateJobDescriptionFlow(input);
}

const generateJobDescriptionPrompt = ai.definePrompt({
  name: 'generateJobDescriptionPrompt',
  input: {schema: GenerateJobDescriptionInputSchema},
  output: {schema: GenerateJobDescriptionOutputSchema},
  prompt: `You are an expert HR professional specializing in writing job descriptions. Based on the job title and responsibilities, generate a compelling job description.

Job Title: {{{jobTitle}}}
Responsibilities: {{{responsibilities}}}`,
});

const generateJobDescriptionFlow = ai.defineFlow(
  {
    name: 'generateJobDescriptionFlow',
    inputSchema: GenerateJobDescriptionInputSchema,
    outputSchema: GenerateJobDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateJobDescriptionPrompt(input);
    return output!;
  }
);
