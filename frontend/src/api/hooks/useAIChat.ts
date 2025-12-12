import { useMutation } from "@tanstack/react-query";
import api from "@/api/api";

export interface AIChatPayload {
  prompt: string;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  data?: string;
  reply?: string;
  message?: string;
}

/**
 * Extracts text from Gemini API response structure
 * Response format: { candidates: [{ content: { parts: [{ text: string }] } }] }
 */
function extractGeminiText(response: GeminiResponse): string | null {
  const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
  return typeof text === "string" ? text : null;
}

/**
 * Extracts text from fallback response formats
 */
function extractFallbackText(response: GeminiResponse): string | null {
  if (typeof response.data === "string") return response.data;
  if (typeof response.reply === "string") return response.reply;
  if (typeof response.message === "string") return response.message;
  return null;
}

/**
 * Extracts text from various API response formats
 */
function extractResponseText(payload: unknown): string {
  if (typeof payload === "string") {
    return payload;
  }

  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid response format");
  }

  const response = payload as GeminiResponse;

  // Try Gemini format first
  const geminiText = extractGeminiText(response);
  if (geminiText) {
    return geminiText;
  }

  // Fallback for other response formats
  const fallbackText = extractFallbackText(response);
  if (fallbackText) {
    return fallbackText;
  }

  throw new Error("Unable to extract response text from API response");
}

export function useAIChat() {
  return useMutation<string, Error, AIChatPayload>({
    mutationFn: async ({ prompt }) => {
      const res = await api.post("/chat", { prompt });
      return extractResponseText(res.data);
    },
  });
}
