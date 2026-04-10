export const PAYMENT_LINKS = {
  oneTimePack: "https://pay.example.com/chat-to-follow-up/one-time-pack",
  weeklyPro: "https://pay.example.com/chat-to-follow-up/weekly-pro",
} as const;

export const pricingPlans = [
  {
    name: "Free",
    priceLabel: "1 analysis/day",
    paymentHref: "/app",
    ctaLabel: "Start free",
  },
  {
    name: "One-time pack",
    priceLabel: "₱99 for 5 analyses",
    paymentHref: PAYMENT_LINKS.oneTimePack,
    ctaLabel: "Buy pack",
  },
  {
    name: "Weekly Pro",
    priceLabel: "₱149/week",
    paymentHref: PAYMENT_LINKS.weeklyPro,
    ctaLabel: "Go Pro",
  },
] as const;
