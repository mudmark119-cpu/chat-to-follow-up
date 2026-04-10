import { buildFollowupPrompt } from "@/prompts/followupPrompt";
import { GenerateRequest } from "@/types/followup";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export function hasModelKey() {
  // Add your API key in `.env.local`
  // OPENAI_API_KEY=your_key_here
  return Boolean(process.env.OPENAI_API_KEY);
}

export async function generateFollowupWithModel(input: GenerateRequest): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  if (!apiKey) {
    throw new Error("Missing API key");
  }

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: "You output concise, strict JSON only.",
        },
        {
          role: "user",
          content: buildFollowupPrompt(input),
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Model API failed with status ${response.status}`);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Model did not return content");
  }

  return content;
}
