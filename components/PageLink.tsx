"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type PageLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onNavigate"> & {
  href: string;
};

export function PageLink({ href, ...props }: PageLinkProps) {
  return (
    <Link
      {...props}
      href={href}
      onNavigate={() => {
        const destination = new URL(href, window.location.href);
        // Next.js keeps the scroll position when reselecting the current page.
        // Explicit section links still use their normal anchor navigation.
        if (
          !destination.hash &&
          destination.pathname === window.location.pathname
        ) {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
      }}
    />
  );
}
