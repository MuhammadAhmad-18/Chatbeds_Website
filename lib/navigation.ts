export type NavigationLink = {
  id: string;
  label: string;
  href: string;
  available: boolean;
  external?: boolean;
  description?: string;
  icon?: "messages" | "globe";
  footerLabel?: string;
};

export type NavigationGroup = {
  id: string;
  label: string;
  children: readonly NavigationLink[];
  overview?: NavigationLink;
};

export type NavigationEntry = (NavigationLink | NavigationGroup) & {
  header?: boolean;
};

// Availability is audited against app/ routes. Enable a missing destination only
// after its page (or a real, approved external URL) is ready.
export const navigation: readonly NavigationEntry[] = [
  {
    id: "integrations",
    label: "Integrations",
    children: [
      { id: "whatsapp", label: "WhatsApp operations", href: "/integrations/whatsapp", available: true, description: "Keep frontline work connected to your PMS.", icon: "messages" },
      { id: "guest-messaging", label: "Guest messaging", href: "/integrations/guest-messaging", available: true, description: "Bring guest conversations into one inbox.", icon: "messages" },
      { id: "distribution", label: "Distribution & calendars", href: "/integrations/distribution", available: true, description: "Airbnb, Booking.com, Vrbo and calendar sync.", icon: "globe" },
    ],
    overview: { id: "integrations-overview", label: "View all integrations", footerLabel: "Integrations", href: "/integrations", available: true },
  },
  { id: "how-it-works", label: "How it works", href: "/how-it-works", available: true },
  { id: "pricing", label: "Pricing", href: "/pricing", available: true },
  {
    id: "company",
    label: "Company",
    children: [
      { id: "about", label: "About", href: "/about", available: true },
      { id: "blog", label: "Blog", href: "/blog", available: true },
      { id: "news", label: "News", href: "/news", available: false },
      { id: "careers", label: "Careers", href: "/careers", available: false },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    children: [
      { id: "docs", label: "Developer docs", href: "/docs", available: false },
      { id: "help", label: "Help Center", href: "/help", available: false },
      { id: "privacy", label: "Privacy Policy", footerLabel: "Privacy", href: "/privacy", available: true },
      { id: "terms", label: "Terms and Conditions", footerLabel: "Terms", href: "/terms", available: true },
    ],
  },
  { id: "contact", label: "Contact", footerLabel: "Contact us", href: "/contact", available: true },
  { id: "platform", label: "Complete PMS", href: "/#platform", available: true, header: false },
  { id: "home-top", label: "Back to top ↑", href: "/#home", available: true, header: false },
];

export function availableGroupLinks(group: NavigationGroup): NavigationLink[] {
  return [...group.children, ...(group.overview ? [group.overview] : [])].filter((item) => item.available);
}

export const headerNavigation = navigation.filter((item) => item.header !== false);

const allLinks = navigation.flatMap((item) => "children" in item ? [...item.children, ...(item.overview ? [item.overview] : [])] : [item]);

export function navigationLinks(ids: readonly string[]): NavigationLink[] {
  return ids.flatMap((id) => {
    const item = allLinks.find((link) => link.id === id);
    return item?.available ? [item] : [];
  });
}

export const footerNavigation = [
  { title: "Product", links: navigationLinks(["platform", "how-it-works", "integrations-overview", "pricing"]) },
  { title: "Company", links: navigationLinks(["about", "blog", "news", "careers", "contact"]) },
  { title: "Resources", links: navigationLinks(["docs", "help"]) },
].filter((group) => group.links.length > 0);

export const legalNavigation = navigationLinks(["privacy", "terms"]);
export const backToTopNavigation = navigationLinks(["home-top"])[0];

export function isNavigationCurrent(pathname: string, href: string): boolean {
  if (href.startsWith("http") || href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}
