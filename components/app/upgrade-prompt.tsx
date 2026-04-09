import Link from "next/link";
import { ArrowRight, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PAYMENT_LINKS } from "@/data/pricing";

export function UpgradePrompt({ className = "" }: { className?: string }) {
  return (
    <Card className={`border-blue-200 bg-blue-50/70 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Crown className="h-4 w-4" />
          Free usage exhausted for today
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-blue-900/90">Upgrade to continue generating follow-up plans right away.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <Link href={PAYMENT_LINKS.oneTimePack}>
            <Button className="h-10 w-full">Buy one-time pack</Button>
          </Link>
          <Link href={PAYMENT_LINKS.weeklyPro}>
            <Button variant="outline" className="h-10 w-full border-blue-300 bg-white text-blue-800">
              Start weekly pro
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
