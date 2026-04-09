import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chat to Follow-Up",
  description: "Turn messy customer chats into clear next steps in under a minute.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
