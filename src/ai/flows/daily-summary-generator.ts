'use server';

/**
 * @fileOverview Generates a daily summary of events and tasks.
 *
 * - generateDailySummary - A function that generates a daily summary.
 * - DailySummaryInput - The input type for the generateDailySummary function.
 * - DailySummaryOutput - The return type for the generateDailySummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailySummaryInputSchema = z.object({
  events: z.string().describe('A JSON string of the events from yesterday.'),
  tasks: z.string().describe('A JSON string of the tasks from yesterday.'),
});
export type DailySummaryInput = z.infer<typeof DailySummaryInputSchema>;

const DailySummaryOutputSchema = z.object({
  summary: z.string().describe('A markdown summary of the events and tasks.'),
});
export type DailySummaryOutput = z.infer<typeof DailySummaryOutputSchema>;

export async function generateDailySummary(input: DailySummaryInput): Promise<DailySummaryOutput> {
  return generateDailySummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailySummaryPrompt',
  input: {schema: DailySummaryInputSchema},
  output: {schema: DailySummaryOutputSchema},
  prompt: `You are a personal assistant who summarizes events and tasks from yesterday.

  Summarize the following events:
  {{{events}}}

  Summarize the following tasks:
  {{{tasks}}}

  The summary should be in markdown format.
  `,
});

const generateDailySummaryFlow = ai.defineFlow(
  {
    name: 'generateDailySummaryFlow',
    inputSchema: DailySummaryInputSchema,
    outputSchema: DailySummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
