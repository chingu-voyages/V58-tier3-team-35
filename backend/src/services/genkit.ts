import { configure, defineFlow, generate } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { z } from 'zod';
import { PROJECT_FAQ_CONTEXT } from '../utils/gemini';

configure({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GEMINI_API_KEY as string,
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const chatFlow = defineFlow(
  {
    name: 'chatFlow',
    inputSchema: z.object({
      prompt: z.string(),
      history: z.array(z.object({
        role: z.enum(['user', 'model']),
        content: z.array(z.object({
          text: z.string()
        }))
      })),
    }),
    outputSchema: z.string(),
  },
  async ({ prompt, history }) => {
    const fullPrompt = `${PROJECT_FAQ_CONTEXT}\n\nUser question: ${prompt}`;

    const response = await generate({
      model: 'gemini-2.5-flash',
      prompt: fullPrompt,
      history: history,
    });

    return response.text();
  }
);
