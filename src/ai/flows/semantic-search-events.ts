
// src/ai/flows/semantic-search-events.ts
'use server';
/**
 * @fileOverview A semantic search AI agent for events.
 *
 * - semanticSearchEvents - A function that handles the semantic search process.
 * - SemanticSearchEventsInput - The input type for the semanticSearchEvents function.
 * - SemanticSearchEventsOutput - The return type for the semanticSearchEvents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { mockEvents } from '@/lib/mock-data';
import type { Event } from '@/types';

const SemanticSearchEventsInputSchema = z.object({
  query: z.string().describe('The search query.'),
});
export type SemanticSearchEventsInput = z.infer<typeof SemanticSearchEventsInputSchema>;

const EventSchemaForTool = z.object({
  id: z.string().describe('The ID of the event.'),
  source: z.string().describe('The source of the event.'),
  type: z.string().describe('The type of the event.'),
  ts: z.string().describe('The timestamp of the event as an ISO string.'),
  payload: z.record(z.any()).describe('The payload of the event.'),
});

const SemanticSearchEventsOutputSchema = z.object({
  results: z.array(EventSchemaForTool).describe('The search results.'),
});
export type SemanticSearchEventsOutput = z.infer<typeof SemanticSearchEventsOutputSchema>;

export async function semanticSearchEvents(input: SemanticSearchEventsInput): Promise<SemanticSearchEventsOutput> {
  return semanticSearchEventsFlow(input);
}

const performSemanticSearch = ai.defineTool(
  {
    name: 'performSemanticSearch',
    description: 'Performs a keyword search for events based on the user query against available event data. Use this tool to find events matching user criteria.',
    inputSchema: z.object({
      query: z.string().describe('The search query.'),
    }),
    outputSchema: z.array(EventSchemaForTool),
  },
  async (input: { query: string }) => {
    const { query } = input;
    if (!query || query.trim() === '') {
      return [];
    }
    const lowerCaseQuery = query.toLowerCase();

    const results = mockEvents.filter((event: Event) => {
      let searchableText = `${event.source.toLowerCase()} ${event.type.toLowerCase()}`;
      searchableText += ` ${JSON.stringify(event.payload).toLowerCase()}`;
      return searchableText.includes(lowerCaseQuery);
    });

    // Map to the tool's output schema, converting ts to string
    return results.map(event => ({
      id: event.id,
      source: event.source,
      type: event.type,
      ts: event.ts.toISOString(), // Convert Date to ISO string
      payload: event.payload,
    }));
  }
);

const prompt = ai.definePrompt({
  name: 'semanticSearchEventsPrompt',
  input: {schema: SemanticSearchEventsInputSchema},
  output: {schema: SemanticSearchEventsOutputSchema},
  tools: [performSemanticSearch],
  prompt: `You are a helpful assistant that performs semantic searches over events.

  The user will provide a query, and your job is to use the performSemanticSearch tool to find relevant events.
  Always use the performSemanticSearch tool if the user is asking a question about events.
  If the tool returns results, present them to the user. If the tool returns no results, inform the user that no matching events were found.
  Return the results in the format specified by the output schema.
  
  User Query: {{{query}}}`, 
});

const semanticSearchEventsFlow = ai.defineFlow(
  {
    name: 'semanticSearchEventsFlow',
    inputSchema: SemanticSearchEventsInputSchema,
    outputSchema: SemanticSearchEventsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

