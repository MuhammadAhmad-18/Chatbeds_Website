"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Globe2,
  Menu,
  MessagesSquare,
  X,
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { LoginButton } from "./LoginButton";
import { DemoLink } from "./DemoLink";

const integrations = [
  {
    label: "WhatsApp operations",
    description: "Keep frontline work connected to your PMS.",
    href: "/integrations/whatsapp",
    icon: MessagesSquare,
  },
  {
    label: "Guest messaging",
    description: "Bring guest conversations into one inbox.",
    href: "/integrations/guest-messaging",
    icon: MessagesSquare,
  },
  {
    label: "Distribution & calendars",
    description: "Airbnb, Booking.com, Vrbo and calendar sync.",
    href: "/integrations/distribution",
    icon: Globe2,
  },
];

function IntegrationsDropdown({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = mobile ? "mobile-integrations" : "desktop-integrations";
  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  return (
    <div
      className="nav-integrations"
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node))
          setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className={`nav-item integrations-trigger${pathname.startsWith("/integrations") ? " nav-current" : ""}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        Integrations <ChevronDown size={14} aria-hidden="true" />
      </button>
      <div id={id} className="integrations-panel" hidden={!open}>
        <span className="integrations-eyebrow">CONNECTED TO YOUR PROPERTY</span>
        {integrations.map(({ label, description, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            onClick={() => {
              setOpen(false);
              onNavigate();
            }}
          >
            <Icon size={19} aria-hidden="true" />
            <span>
              <strong>{label}</strong>
              <small>{description}</small>
            </span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        ))}
        <Link
          className="integrations-view-all"
          href="/integrations"
          aria-current={pathname === "/integrations" ? "page" : undefined}
          onClick={() => {
            setOpen(false);
            onNavigate();
          }}
        >
          View all integrations
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

function NavigationLinks({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  function current(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`)
      ? ("page" as const)
      : undefined;
  }
  return (
    <>
      <Link
        className="nav-item"
        href="/about"
        aria-current={current("/about")}
        onClick={onNavigate}
      >
        About
      </Link>
      <IntegrationsDropdown mobile={mobile} onNavigate={onNavigate} />
      <Link
        className="nav-item"
        href="/how-it-works"
        aria-current={current("/how-it-works")}
        onClick={onNavigate}
      >
        How it works
      </Link>
      <Link
        className="nav-item nav-pricing"
        href="/pricing"
        aria-current={current("/pricing")}
        onClick={onNavigate}
      >
        Pricing
      </Link>
      <Link
        className="nav-item"
        href="/blog"
        aria-current={current("/blog")}
        onClick={onNavigate}
      >
        Blog
      </Link>
      <Link
        className="nav-item"
        href="/contact"
        aria-current={current("/contact")}
        onClick={onNavigate}
      >
        Contact
      </Link>
    </>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  return (
    <header
      className="site-header compact-header"
      ref={header}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div className="container navbar">
        <BrandLogo />
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavigationLinks onNavigate={() => setOpen(false)} />
        </nav>
        <div className="nav-actions">
          <LoginButton onOpen={() => setOpen(false)} />
          <DemoLink
            className="button button-primary nav-demo"
            onClick={() => setOpen(false)}
          >
            Book a Demo
          </DemoLink>
          <button
            ref={menuButton}
            className="icon-button menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-nav"
        className={`mobile-nav${open ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        inert={!open}
      >
        <NavigationLinks mobile onNavigate={() => setOpen(false)} />
      </nav>
    </header>
  );
}
