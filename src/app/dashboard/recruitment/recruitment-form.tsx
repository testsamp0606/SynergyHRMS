
'use client';

import {useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {
  generateJobDescription,
  GenerateJobDescriptionInput,
} from '@/ai/flows/generate-job-description';
import {
  generateInterviewQuestions,
  GenerateInterviewQuestionsInput,
} from '@/ai/flows/generate-interview-questions';
import {Loader2, Wand2, ArrowRight} from 'lucide-react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

const formSchema = z.object({
  jobTitle: z.string().min(2, {
    message: 'Job title must be at least 2 characters.',
  }),
  responsibilities: z.string().min(10, {
    message: 'Responsibilities must be at least 10 characters.',
  }),
});

export function RecruitmentForm() {
  const [jobDescription, setJobDescription] = useState<string>('');
  const [interviewQuestions, setInterviewQuestions] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('job-description');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: '',
      responsibilities: '',
    },
  });

  const handleGenerate: SubmitHandler<
    GenerateJobDescriptionInput
  > = async values => {
    setIsGenerating(true);
    setJobDescription('');
    setInterviewQuestions('');

    try {
      const jdResult = await generateJobDescription(values);
      if (jdResult.jobDescription) {
        setJobDescription(jdResult.jobDescription);
        const iqInput: GenerateInterviewQuestionsInput = {
          jobDescription: jdResult.jobDescription,
        };
        const iqResult = await generateInterviewQuestions(iqInput);
        if (iqResult.interviewQuestions) {
          setInterviewQuestions(iqResult.interviewQuestions);
        }
      }
    } catch (error) {
      console.error('Error generating recruitment content:', error);
      // You might want to set an error state here to show in the UI
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Recruitment</CardTitle>
          <CardDescription>
            Generate job descriptions and interview questions using AI. Just
            provide a job title and key responsibilities.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleGenerate)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Senior Software Engineer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="responsibilities"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Key Responsibilities</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Develop and maintain web applications, collaborate with cross-functional teams, write clean and efficient code..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Content
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <CardHeader>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="job-description">Job Description</TabsTrigger>
                    <TabsTrigger value="interview-questions">Interview Questions</TabsTrigger>
                </TabsList>
            </CardHeader>

          {isGenerating && (
            <CardContent className="flex flex-1 items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Loader2 className="mx-auto h-8 w-8 animate-spin mb-2" />
                <p>Generating content...</p>
              </div>
            </CardContent>
          )}

          {!isGenerating && !jobDescription && (
             <CardContent className="flex flex-1 items-center justify-center">
                <div className="text-center text-muted-foreground">
                    <ArrowRight className="mx-auto h-8 w-8 mb-2 -rotate-90 lg:rotate-0" />
                    <p>Generated content will appear here.</p>
                </div>
             </CardContent>
          )}

          {jobDescription && (
            <TabsContent value="job-description" className="flex-1 overflow-auto">
                 <CardContent>
                    <article className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: jobDescription.replace(/\n/g, '<br />') }} />
                </CardContent>
            </TabsContent>
          )}

           {interviewQuestions && (
            <TabsContent value="interview-questions" className="flex-1 overflow-auto">
                 <CardContent>
                    <article className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: interviewQuestions.replace(/\n/g, '<br />') }} />
                </CardContent>
            </TabsContent>
           )}
        </Tabs>
      </Card>
    </div>
  );
}
