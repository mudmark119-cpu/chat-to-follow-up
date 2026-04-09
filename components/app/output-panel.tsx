"use client";

import { AlertCircle, Copy, MessageCircleMore } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { copyText } from "@/lib/utils";
import { FollowupResult } from "@/types/followup";

function CopyButton({ value }: { value: string }) {
  return (
    <Button variant="ghost" className="h-8 px-2 text-xs text-slate-600" onClick={() => copyText(value)}>
      <Copy className="mr-1.5 h-3.5 w-3.5" />
      Copy
    </Button>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold text-slate-700">{title}</CardTitle>
        <CopyButton value={value} />
      </CardHeader>
      <CardContent className="text-sm leading-relaxed text-slate-900">{value}</CardContent>
    </Card>
  );
}

export function OutputPanel({
  loading,
  error,
  result,
}: {
  loading: boolean;
  error: string | null;
  result: FollowupResult | null;
}) {
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="flex-row items-center gap-2 space-y-0">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <CardTitle className="text-red-700">Error</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-red-700">{error}</CardContent>
        <CardContent className="pt-0 text-xs text-red-700/80">Tip: if this keeps failing, retry with a slightly longer conversation or use Fill sample to verify output flow.</CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Output will appear here</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-600">Paste a conversation and click Generate follow-up plan.</CardContent>
      </Card>
    );
  }

  const copyAll = JSON.stringify(result, null, 2);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => copyText(copyAll)}>
          <Copy className="mr-2 h-4 w-4" />
          Copy all output
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard title="Lead stage" value={result.lead_stage} />
        <InfoCard title="Intent level" value={result.intent_level} />
      </div>

      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold text-slate-700">Main concerns</CardTitle>
          <CopyButton value={result.main_concerns.join("\n")} />
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-800">
            {result.main_concerns.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <InfoCard title="Recommended next action" value={result.recommended_next_action} />
      <InfoCard title="Best follow-up timing" value={result.followup_timing} />

      <Card className="border-blue-200 bg-blue-50/60 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <MessageCircleMore className="h-4 w-4 text-blue-700" />
            <CardTitle className="text-base text-blue-900">Message options</CardTitle>
          </div>
          <p className="text-xs text-blue-700">Choose one and send as-is, or lightly personalize with the customer's name.</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {result.message_options.map((option) => (
            <div key={option.style} className="rounded-lg border border-blue-200 bg-white p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">{option.style}</span>
                <CopyButton value={option.text} />
              </div>
              <p className="text-sm leading-relaxed text-slate-800">{option.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-amber-50/70 shadow-sm">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold text-amber-900">Risk notes</CardTitle>
          <CopyButton value={result.risk_notes.join("\n")} />
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-1 pl-5 text-sm text-amber-900/90">
            {result.risk_notes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <InfoCard title="One-line summary" value={result.summary} />

      <details className="rounded-lg border border-slate-200 bg-white p-4 text-slate-700">
        <summary className="cursor-pointer text-sm font-medium">Raw JSON</summary>
        <pre className="mt-3 overflow-auto rounded bg-slate-50 p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
      </details>
    </div>
  );
}
