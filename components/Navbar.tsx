"use client";

import { PageLink as Link } from "./PageLink";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { ArrowUpRight, ChevronDown, Globe2, Menu, MessagesSquare, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { LoginButton } from "./LoginButton";
import { DemoLink } from "./DemoLink";
import { availableGroupLinks, headerNavigation, isNavigationCurrent } from "@/lib/navigation";
import type { NavigationGroup, NavigationLink } from "@/lib/navigation";

const integrationIcons = { messages: MessagesSquare, globe: Globe2 };

function NavigationDropdown({ group, mobile, pathname, openMenu, setOpenMenu, onNavigate }: {
  group: NavigationGroup;
  mobile: boolean;
  pathname: string;
  openMenu: string | null;
  setOpenMenu: Dispatch<SetStateAction<string | null>>;
  onNavigate: () => void;
}) {
  const id = `${mobile ? "mobile" : "desktop"}-${group.id}`;
  const open = openMenu === id;
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeDelay = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHover = useRef(false);
  const links = availableGroupLinks(group);
  const current = links.some((item) => isNavigationCurrent(pathname, item.href));
  const integrations = group.id === "integrations";

  function cancelClose() {
    if (closeDelay.current) clearTimeout(closeDelay.current);
    closeDelay.current = null;
  }

  useEffect(() => () => {
    if (closeDelay.current) clearTimeout(closeDelay.current);
  }, []);

  useLayoutEffect(() => {
    if (!open || mobile || !panel.current) return;
    function alignPanel() {
      const element = panel.current;
      if (!element) return;
      element.style.left = "0px";
      const bounds = element.getBoundingClientRect();
      if (bounds.right > window.innerWidth - 16) {
        element.style.left = `${Math.max(16 - bounds.left, window.innerWidth - 16 - bounds.right)}px`;
      }
    }
    alignPanel();
    window.addEventListener("resize", alignPanel);
    return () => window.removeEventListener("resize", alignPanel);
  }, [open, mobile]);

  function focusLink(index: number) {
    requestAnimationFrame(() => {
      const items = panel.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
      if (!items?.length) return;
      items[(index + items.length) % items.length]?.focus();
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const onTrigger = event.target === trigger.current;
    if (event.key === "Escape" && open && !mobile) {
      event.preventDefault();
      event.stopPropagation();
      cancelClose();
      setOpenMenu(null);
      trigger.current?.focus();
      return;
    }
    if (onTrigger && (event.key === "Enter" || event.key === " ")) openedByHover.current = false;
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    if (!onTrigger && !open) return;
    event.preventDefault();
    cancelClose();
    openedByHover.current = false;
    setOpenMenu(id);
    const items = Array.from(panel.current?.querySelectorAll<HTMLAnchorElement>("a[href]") || []);
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (event.key === "Home") focusLink(0);
    else if (event.key === "End" || (onTrigger && event.key === "ArrowUp")) focusLink(items.length - 1);
    else if (onTrigger) focusLink(0);
    else focusLink(index + (event.key === "ArrowDown" ? 1 : -1));
  }

  if (links.length === 0) return null;
  if (links.length === 1) return <NavigationItem item={links[0]} pathname={pathname} onNavigate={onNavigate} />;

  return (
    <div
      className={`nav-dropdown${integrations ? " nav-integrations" : ""}`}
      ref={root}
      onMouseEnter={() => {
        if (mobile) return;
        cancelClose();
        if (!open) openedByHover.current = true;
        setOpenMenu(id);
      }}
      onMouseLeave={() => {
        if (mobile) return;
        cancelClose();
        closeDelay.current = setTimeout(() => {
          // Keyboard focus keeps the panel available after the pointer leaves.
          if (!root.current?.contains(document.activeElement)) {
            setOpenMenu((value) => value === id ? null : value);
          }
        }, 150);
      }}
      onBlur={(event) => {
        if (!mobile && !event.currentTarget.contains(event.relatedTarget as Node)) {
          cancelClose();
          setOpenMenu((value) => value === id ? null : value);
        }
      }}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={trigger}
        type="button"
        className={`nav-item nav-dropdown-trigger${integrations ? " integrations-trigger" : ""}${current ? " nav-current" : ""}`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={id}
        onClick={() => {
          cancelClose();
          setOpenMenu(openedByHover.current ? id : open ? null : id);
          openedByHover.current = false;
        }}
      >
        {group.label} <ChevronDown size={14} aria-hidden="true" />
      </button>
      <div ref={panel} id={id} className={`nav-dropdown-panel${integrations ? " integrations-panel" : ""}`} hidden={!open}>
        {integrations && <span className="integrations-eyebrow">CONNECTED TO YOUR PROPERTY</span>}
        <ul>
          {links.map((item) => {
            const Icon = item.icon ? integrationIcons[item.icon] : null;
            const overview = item.id === group.overview?.id;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={overview ? "integrations-view-all" : undefined}
                  aria-current={pathname === item.href ? "page" : undefined}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={onNavigate}
                >
                  {Icon && <Icon size={19} aria-hidden="true" />}
                  {item.description ? <span><strong>{item.label}</strong><small>{item.description}</small></span> : item.label}
                  {integrations && <ArrowUpRight size={overview ? 15 : 14} aria-hidden="true" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function NavigationItem({ item, pathname, onNavigate }: { item: NavigationLink; pathname: string; onNavigate: () => void }) {
  if (!item.available) return null;
  return (
    <Link
      className="nav-item"
      href={item.href}
      aria-current={pathname === item.href ? "page" : undefined}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  );
}

function NavigationLinks({ mobile = false, pathname, openMenu, setOpenMenu, onNavigate }: {
  mobile?: boolean;
  pathname: string;
  openMenu: string | null;
  setOpenMenu: Dispatch<SetStateAction<string | null>>;
  onNavigate: () => void;
}) {
  return headerNavigation.map((item) => "children" in item ? (
    <NavigationDropdown key={item.id} group={item} mobile={mobile} pathname={pathname} openMenu={openMenu} setOpenMenu={setOpenMenu} onNavigate={onNavigate} />
  ) : <NavigationItem key={item.id} item={item} pathname={pathname} onNavigate={onNavigate} />);
}

function NavbarContent({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const restoreScroll = useRef(true);

  function closeNavigation() {
    setOpen(false);
    setOpenMenu(null);
  }

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1200px)");
    function resize() {
      setOpenMenu(null);
      if (desktop.matches) setOpen(false);
    }
    desktop.addEventListener("change", resize);
    return () => desktop.removeEventListener("change", resize);
  }, []);

  useEffect(() => {
    if (!open && !openMenu) return;
    function outside(event: PointerEvent) {
      const activeTrigger = openMenu ? header.current?.querySelector<HTMLButtonElement>(`button[aria-controls="${openMenu}"]`) : null;
      const boundary = open ? header.current : activeTrigger?.closest(".nav-dropdown");
      if (!boundary?.contains(event.target as Node)) {
        setOpen(false);
        setOpenMenu(null);
      }
    }
    function escape(event: globalThis.KeyboardEvent) {
      if (event.key !== "Escape" || open || !openMenu) return;
      const trigger = header.current?.querySelector<HTMLButtonElement>(`button[aria-controls="${openMenu}"]`);
      event.preventDefault();
      setOpenMenu(null);
      trigger?.focus();
    }
    function activateLink(event: MouseEvent) {
      if (header.current?.contains(event.target as Node) && (event.target as Element).closest("a")) {
        restoreScroll.current = false;
        setOpen(false);
        setOpenMenu(null);
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("click", activateLink, true);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("click", activateLink, true);
      document.removeEventListener("keydown", escape);
    };
  }, [open, openMenu]);

  useEffect(() => {
    if (!open || !header.current) return;
    const element = header.current;
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const originalPath = window.location.pathname;
    restoreScroll.current = true;
    const properties = ["position", "top", "left", "right", "width", "overflow", "padding-right"];
    const previousStyles = properties.map((property) => [property, body.style.getPropertyValue(property), body.style.getPropertyPriority(property)]);
    const htmlOverflow = [html.style.getPropertyValue("overflow"), html.style.getPropertyPriority("overflow")];
    const scrollbar = window.innerWidth - html.clientWidth;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = `-${scrollX}px`;
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    html.style.overflow = "hidden";

    const inerted = new Map<HTMLElement, boolean>();
    let branch: HTMLElement = element;
    while (branch.parentElement) {
      for (const sibling of branch.parentElement.children) {
        if (sibling !== branch && sibling instanceof HTMLElement) {
          inerted.set(sibling, sibling.inert);
          sibling.setAttribute("inert", "");
        }
      }
      if (branch.parentElement === body) break;
      branch = branch.parentElement;
    }

    function focusable() {
      return Array.from(element.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), [tabindex='0']"))
        .filter((item) => item.getClientRects().length > 0 && !item.closest("[inert]"));
    }
    function trapFocus(event: globalThis.KeyboardEvent) {
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || !element.contains(document.activeElement))) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !element.contains(document.activeElement))) {
        event.preventDefault();
        first?.focus();
      }
    }
    function containFocus(event: FocusEvent) {
      if (!element.contains(event.target as Node)) menuButton.current?.focus();
    }
    document.addEventListener("keydown", trapFocus);
    document.addEventListener("focusin", containFocus);
    return () => {
      document.removeEventListener("keydown", trapFocus);
      document.removeEventListener("focusin", containFocus);
      inerted.forEach((wasInert, sibling) => {
        if (wasInert) sibling.setAttribute("inert", "");
        else sibling.removeAttribute("inert");
      });
      previousStyles.forEach(([property, value, priority]) => {
        if (value) body.style.setProperty(property, value, priority);
        else body.style.removeProperty(property);
      });
      if (htmlOverflow[0]) html.style.setProperty("overflow", htmlOverflow[0], htmlOverflow[1]);
      else html.style.removeProperty("overflow");
      if (restoreScroll.current && window.location.pathname === originalPath) window.scrollTo({ top: scrollY, left: scrollX, behavior: "instant" });
    };
  }, [open]);

  return (
    <header
      className={`site-header compact-header${open ? " mobile-menu-open" : ""}`}
      ref={header}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          closeNavigation();
          menuButton.current?.focus();
        }
      }}
    >
      <div className="container navbar">
        <BrandLogo />
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavigationLinks pathname={pathname} openMenu={openMenu} setOpenMenu={setOpenMenu} onNavigate={closeNavigation} />
        </nav>
        <div className="nav-actions">
          <LoginButton onOpen={closeNavigation} />
          <DemoLink className="button button-primary nav-demo" onClick={closeNavigation}>Book a Demo</DemoLink>
          <button
            ref={menuButton}
            type="button"
            className="icon-button menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => {
              setOpen(!open);
              setOpenMenu(null);
            }}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-nav" className={`mobile-nav${open ? " is-open" : ""}`} aria-label="Mobile navigation" inert={!open}>
        <NavigationLinks mobile pathname={pathname} openMenu={openMenu} setOpenMenu={setOpenMenu} onNavigate={closeNavigation} />
      </nav>
    </header>
  );
}

export function Navbar() {
  const pathname = usePathname();
  // A route change remounts the menu and runs its scroll/inert cleanup.
  return <NavbarContent key={pathname} pathname={pathname} />;
}
