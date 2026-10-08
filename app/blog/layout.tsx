import { MarketingShell } from "@/components/MarketingPage";
import "./blog.css";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketingShell className="blog-main">{children}</MarketingShell>;
}
