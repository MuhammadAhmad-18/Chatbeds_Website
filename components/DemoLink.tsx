import { PageLink as Link } from "./PageLink";
import type { ComponentProps } from "react";
import { demoBookingUrl } from "@/lib/site-links";

type DemoLinkProps = Omit<ComponentProps<"a">, "href" | "target" | "rel">;

export function DemoLink(props: DemoLinkProps) {
  if (demoBookingUrl) {
    return (
      <a {...props} href={demoBookingUrl} target="_blank" rel="noopener noreferrer" />
    );
  }
  return <Link {...props} href="/book-a-demo" />;
}
