import { z } from "zod";

export const generateRequestSchema = z.object({
  conversation: z.string().min(20, "Please paste a fuller conversation for better analysis."),
  offering: z.string().optional(),
  leadStageHint: z.string().optional(),
  followupGoal: z.string().optional(),
});

export const followupResultSchema = z.object({
  lead_stage: z.string(),
  intent_level: z.string(),
  main_concerns: z.array(z.string()),
  recommended_next_action: z.string(),
  followup_timing: z.string(),
  message_options: z
    .array(
      z.object({
        style: z.string(),
        text: z.string(),
      }),
    )
    .length(3),
  risk_notes: z.array(z.string()),
  summary: z.string(),
});

export type GenerateRequest = z.infer<typeof generateRequestSchema>;

export type FollowupResult = {
  lead_stage: string;
  intent_level: "High" | "Medium" | "Low" | string;
  main_concerns: string[];
  recommended_next_action: string;
  followup_timing: string;
  message_options: {
    style: string;
    text: string;
  }[];
  risk_notes: string[];
  summary: string;
};

export type GenerateResponse =
  | { success: true; data: FollowupResult }
  | { success: false; error: string };

export function parseFollowupResult(value: unknown): FollowupResult {
  return followupResultSchema.parse(value);
}
