import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageSquare, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingPlans } from "@/data/pricing";

const features = [
  {
    title: "Know where the lead stands",
    body: "Instantly identify stage and intent so you can prioritize the right conversations.",
    icon: MessageSquare,
  },
  {
    title: "Know what to do next",
    body: "Get one practical next action plus follow-up timing based on real chat context.",
    icon: Sparkles,
  },
  {
    title: "Send better replies faster",
    body: "Use ready-to-send responses so you can close deals without overthinking every message.",
    icon: Send,
  },
];

const faqs = [
  {
    q: "Do I need to connect WhatsApp, Messenger, or CRM?",
    a: "No. For v1, just paste the chat and generate your follow-up plan.",
  },
  {
    q: "Can I use this without an API key?",
    a: "Yes. The app runs in local mock mode when API keys are missing.",
  },
  {
    q: "Is billing live already?",
    a: "Not yet. Pricing is displayed for validation while payment links are added later.",
  },
];

export function LandingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6 sm:pt-12 lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white px-6 py-12 shadow-sm sm:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Chat to Follow-Up
          </p>
          <h1 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Turn customer chats into clear next steps
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Paste a customer conversation and get lead stage, concerns, follow-up timing, and ready-to-send replies in under a minute.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/app">
              <Button className="h-11 px-5 text-sm">
                Try it free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/app#sample">
              <Button variant="outline" className="h-11 px-5 text-sm">
                See sample
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="border-slate-200 shadow-sm">
            <CardHeader>
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                <feature.icon className="h-4 w-4 text-slate-700" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-slate-600">{feature.body}</CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold text-slate-900">Demo preview</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          The app turns messy chats into a clear plan: lead stage, intent level, key concerns, follow-up timing, and three ready-to-send responses.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            "Lead stage + intent",
            "Action + timing",
            "3 message options",
            "Risk notes + summary",
          ].map((item) => (
            <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold text-slate-900">Simple pricing for fast validation</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <p>{plan.priceLabel}</p>
                <Link href={plan.paymentHref}>
                  <Button variant={plan.name === "Free" ? "outline" : "default"} className="h-9 w-full text-sm">
                    {plan.ctaLabel}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold text-slate-900">FAQ</h2>
        <div className="mt-4 space-y-3">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-lg border border-slate-200 p-4">
              <h3 className="text-sm font-semibold text-slate-900">{faq.q}</h3>
              <p className="mt-1 text-sm text-slate-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Ready to turn chats into wins?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">Start with mock mode now, then add your model key when you're ready for live generation.</p>
        <div className="mt-5">
          <Link href="/app">
            <Button className="h-11 px-5">Try it free</Button>
          </Link>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 p-3 backdrop-blur sm:hidden">
        <Link href="/app" className="block">
          <Button className="h-11 w-full">Try it free</Button>
        </Link>
      </div>
    </main>
  );
}
