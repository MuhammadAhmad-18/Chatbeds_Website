import type { Metadata, Viewport } from "next";
import "@fontsource-variable/geist";
import "./globals.css";
import "./whatsapp.css";
import "./navbar.css";
import "./workflow.css";
import "./pages.css";
import { DemoProvider } from "@/components/DemoProvider";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://chatbeds.app",
  ),
  title: "ChatBeds — The In-Chat PMS for Modern Hospitality",
  description:
    "Run reservations, rooms, housekeeping, maintenance, guest communication, revenue and more in one complete PMS — while your team works directly from WhatsApp.",
  openGraph: {
    title:
      "ChatBeds — Your property runs here. Your team runs it from WhatsApp.",
    description:
      "A complete hospitality PMS with conversational operations. Connect your front desk, housekeeping, maintenance, guest experience and revenue.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatBeds — The In-Chat PMS",
    description:
      "One complete PMS. Your entire team connected through WhatsApp.",
  },
};
export const viewport: Viewport = { themeColor: "#fffdf9" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
