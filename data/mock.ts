import { FollowupResult } from "@/types/followup";

export const sampleConversation = `Customer: Hi! Is your social media package still available?
Seller: Yes, we have a monthly plan at ₱7,500. What platform do you want to focus on?
Customer: Mostly Facebook and Instagram. Do you include content creation?
Seller: Yes, 12 posts per month and basic ad support.
Customer: Hmm okay. I'm checking other providers too. Can you send sample results?
Seller: Sure, I can send case studies. Are you planning to start this month?
Customer: Maybe next month if budget allows. I'll get back to you.`;

export const mockResult: FollowupResult = {
  lead_stage: "Comparing options",
  intent_level: "Medium",
  main_concerns: [
    "Wants proof of results before deciding",
    "Budget is still uncertain",
    "Currently comparing multiple providers",
  ],
  recommended_next_action:
    "Send one short case study with clear metrics and offer a 15-minute call to align package scope with budget.",
  followup_timing: "Follow up in 48 hours, then again 4 days later if no response.",
  message_options: [
    {
      style: "Direct",
      text: "Thanks for checking our package. I can share a one-page case study with actual results and a right-fit option for your budget—can I send it now?",
    },
    {
      style: "Friendly",
      text: "Appreciate you exploring options! If helpful, I can send a quick sample result from a similar business and suggest a starter plan that works even with a tighter budget.",
    },
    {
      style: "Gentle reminder",
      text: "Hi! Just circling back in case this is still a priority for next month. Happy to share a short success sample and help you choose the most practical package.",
    },
  ],
  risk_notes: [
    "Lead may go cold while comparing providers",
    "Price sensitivity can delay decision unless value is clear",
  ],
  summary:
    "Interested lead, but needs proof and budget confidence before committing.",
};
