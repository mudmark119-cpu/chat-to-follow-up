import { NextResponse } from "next/server";
import { mockResult } from "@/data/mock";
import { generateFollowupWithModel, hasModelKey } from "@/lib/model";
import { parseWithRepair } from "@/lib/parser";
import { followupResultSchema, generateRequestSchema } from "@/types/followup";

function logFailure(message: string, meta?: Record<string, unknown>) {
  console.error("[generate_followup_error]", message, meta ?? {});
}

function getValidatedMock() {
  const parsed = followupResultSchema.safeParse(mockResult);
  if (!parsed.success) {
    throw new Error("Mock result is invalid. Please check mock schema shape.");
  }
  return parsed.data;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedBody = generateRequestSchema.safeParse(body);

    if (!parsedBody.success) {
      const errorMessage = parsedBody.error.issues[0]?.message ?? "Invalid request payload.";
      logFailure("request_validation_failed", { issue_count: parsedBody.error.issues.length });
      return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
    }

    if (!hasModelKey()) {
      return NextResponse.json({ success: true, data: getValidatedMock() });
    }

    const raw = await generateFollowupWithModel(parsedBody.data);
    const parsed = parseWithRepair(raw);

    const validated = followupResultSchema.safeParse(parsed);
    if (!validated.success) {
      logFailure("model_response_validation_failed", {
        issue_count: validated.error.issues.length,
      });
      return NextResponse.json(
        {
          success: false,
          error: "The model response format was invalid. Please try again.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, data: validated.data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error";
    logFailure("request_failed", { message });
    return NextResponse.json(
      {
        success: false,
        error: "We couldn't generate a follow-up plan right now. Please retry in a moment.",
      },
      { status: 500 },
    );
  }
}
