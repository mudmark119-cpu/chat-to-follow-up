"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { OutputPanel } from "@/components/app/output-panel";
import { UpgradePrompt } from "@/components/app/upgrade-prompt";
import { mockResult, sampleConversation } from "@/data/mock";
import { FollowupResult, GenerateResponse } from "@/types/followup";

const stageOptions = ["just asking", "interested", "comparing", "price-sensitive", "close to buying", "silent lead"];
const goalOptions = ["move toward sale", "keep the conversation warm", "build trust", "revive a silent lead"];
const FREE_DAILY_LIMIT = 1;
const USAGE_STORAGE_KEY = "chat_to_followup_free_usage_v1";

type UsageState = { date: string; count: number };

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function getUsageFromStorage(): UsageState {
  if (typeof window === "undefined") {
    return { date: todayStamp(), count: 0 };
  }

  const raw = window.localStorage.getItem(USAGE_STORAGE_KEY);
  if (!raw) {
    return { date: todayStamp(), count: 0 };
  }

  try {
    const parsed = JSON.parse(raw) as UsageState;
    if (parsed.date !== todayStamp()) {
      return { date: todayStamp(), count: 0 };
    }
    return parsed;
  } catch {
    return { date: todayStamp(), count: 0 };
  }
}

function writeUsageToStorage(value: UsageState) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(value));
}

export function GeneratorPage() {
  const [conversation, setConversation] = useState("");
  const [offering, setOffering] = useState("");
  const [leadStageHint, setLeadStageHint] = useState("");
  const [followupGoal, setFollowupGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FollowupResult | null>(null);
  const [usage, setUsage] = useState<UsageState>({ date: todayStamp(), count: 0 });

  useEffect(() => {
    const initialUsage = getUsageFromStorage();
    setUsage(initialUsage);
    writeUsageToStorage(initialUsage);
  }, []);

  const remainingFree = useMemo(() => Math.max(0, FREE_DAILY_LIMIT - usage.count), [usage.count]);
  const isFreeExhausted = remainingFree === 0;

  const recordUsage = () => {
    const current = getUsageFromStorage();
    const next: UsageState = { date: current.date, count: current.count + 1 };
    setUsage(next);
    writeUsageToStorage(next);
  };

  const submit = async () => {
    if (isFreeExhausted) {
      setError("You have used your free analysis for today. Please upgrade to continue.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation, offering, leadStageHint, followupGoal }),
      });

      const payload = (await res.json()) as GenerateResponse;
      if (!res.ok || !payload.success) {
        const fallback = res.status >= 500
          ? "Server issue while generating. Please try again in a few seconds."
          : "Please check your input and try again.";
        throw new Error((payload.success ? undefined : payload.error) || fallback);
      }
      setResult(payload.data);
      recordUsage();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unexpected error while generating follow-up plan.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setConversation("");
    setOffering("");
    setLeadStageHint("");
    setFollowupGoal("");
    setResult(null);
    setError(null);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 sm:pt-8 lg:px-8">
      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Chat to Follow-Up</h1>
            <p className="mt-1 text-sm text-slate-600">Turn messy customer chats into clear next steps in under a minute.</p>
          </div>
          <Link href="/">
            <Button variant="outline">Back to landing</Button>
          </Link>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            Designed for fast, practical follow-up decisions
          </p>
          <p className="text-xs text-slate-600">Free analyses left today: {remainingFree}</p>
        </div>
      </div>

      {isFreeExhausted ? <UpgradePrompt className="mb-5" /> : null}

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <Card id="sample" className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Customer conversation *</label>
              <Textarea
                placeholder="Paste the full customer conversation here..."
                value={conversation}
                onChange={(e) => setConversation(e.target.value)}
                className="min-h-44"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">What are you selling?</label>
              <Input value={offering} onChange={(e) => setOffering(e.target.value)} placeholder="e.g., Social media management package" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Lead stage hint</label>
                <Select value={leadStageHint} onChange={(e) => setLeadStageHint(e.target.value)}>
                  <option value="">Select stage</option>
                  {stageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Follow-up goal</label>
                <Select value={followupGoal} onChange={(e) => setFollowupGoal(e.target.value)}>
                  <option value="">Select goal</option>
                  {goalOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Button onClick={submit} disabled={loading || !conversation.trim() || isFreeExhausted} className="h-10">
                {loading ? "Generating..." : "Generate follow-up plan"}
              </Button>
              <Button
                variant="outline"
                className="h-10"
                onClick={() => {
                  setConversation(sampleConversation);
                  setOffering("Social media management package");
                  setLeadStageHint("comparing");
                  setFollowupGoal("move toward sale");
                  setResult(mockResult);
                }}
              >
                Fill sample
              </Button>
              <Button variant="ghost" className="h-10" onClick={clear}>
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <OutputPanel loading={loading} error={error} result={result} />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
        <Button onClick={submit} disabled={loading || !conversation.trim() || isFreeExhausted} className="h-11 w-full">
          {isFreeExhausted ? "Free limit reached — upgrade" : loading ? "Generating..." : "Generate follow-up plan"}
        </Button>
      </div>
    </main>
  );
}
