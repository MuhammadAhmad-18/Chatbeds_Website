import { ArrowUpRight, Mail, MapPin, Phone, Linkedin, Instagram, Facebook, Youtube, Globe2 } from "lucide-react";
import { PageLink as Link } from "./PageLink";
import { company, contactEmail } from "@/lib/company";
import { BrandLogo } from "./BrandLogo";
import { DemoButton } from "./DemoProvider";
import { loginUrl } from "@/lib/site-links";
import { socials } from "@/lib/socials";
import { backToTopNavigation, footerNavigation, legalNavigation } from "@/lib/navigation";
const socialIcons = { linkedin: Linkedin, instagram: Instagram, facebook: Facebook, youtube: Youtube, website: Globe2 };
export function Footer() {
  const activeSocials = socials.filter((social) => {
    try {
      const url = new URL(social.url);
      return (url.protocol === "https:" || url.protocol === "http:") && Boolean(url.hostname);
    } catch { return false; }
  });
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand" id="about">
            <BrandLogo footer />
            <p>{company.description}</p>
            <span>
              A proud product of{" "}
              <a
                href={company.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>{company.parentName}</strong>
              </a>
            </span>
            <address className="footer-address" id="contact">
              <span>
                <MapPin size={16} aria-hidden="true" />
                <span>{company.address}</span>
              </span>
              <div className="footer-contact-row">
                <a href={company.phoneHref}>
                  <Phone size={16} aria-hidden="true" />
                  <span>{company.phone}</span>
                </a>
                <a href={`mailto:${contactEmail}`}>
                  <Mail size={16} aria-hidden="true" />
                  <span>{contactEmail}</span>
                </a>
              </div>
            </address>
          </div>
          {footerNavigation.map((column) => (
            <div className="footer-column" key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined}>
                      {item.footerLabel || item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="footer-column footer-contact">
            <h3>Let’s connect</h3>
            <DemoButton className="footer-demo" arrow={false}>
              Book a Demo <ArrowUpRight size={15} />
            </DemoButton>
            <a href={loginUrl}>
              Login <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        {activeSocials.length > 0 && (
          <nav className="footer-socials" aria-label="ChatBeds social profiles">
            {activeSocials.map((social) => {
              const Icon = socialIcons[social.network];
              return <a key={social.url} href={social.url} aria-label={social.label} target="_blank" rel="noopener noreferrer"><Icon size={20} aria-hidden="true" /></a>;
            })}
          </nav>
        )}
        <div className="footer-bottom">
          <span>
            © {new Date().getUTCFullYear()} {company.name}. All rights reserved.
          </span>
          <nav className="footer-legal" aria-label="Legal">
            {legalNavigation.map((item) => (
              <Link key={item.id} href={item.href}>{item.footerLabel || item.label}</Link>
            ))}
          </nav>
          <Link href={backToTopNavigation.href}>{backToTopNavigation.label}</Link>
        </div>
      </div>
    </footer>
  );
}
