import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { company, contactEmail } from "@/lib/company";
import { BrandLogo } from "./BrandLogo";
import { DemoButton } from "./DemoProvider";
import { loginUrl } from "@/lib/site-links";
const columns = [
  {
    title: "Product",
    links: [
      ["Complete PMS", "#platform"],
      ["How it works", "/how-it-works"],
      ["Integrations", "/integrations"],
      ["Pricing", "/pricing"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About ChatBeds", "/about"],
      ["Blog", "/blog"],
      ["Contact us", "/contact"],
    ],
  },
];
export function Footer() {
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
          {columns.map((column) => (
            <div className="footer-column" key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href.startsWith("#") ? `/${href}` : href}>
                      {label}
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
        <div className="footer-bottom">
          <span>
            © {new Date().getUTCFullYear()} {company.name}. All rights reserved.
          </span>
          <span></span>
          <Link href="/#home">Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
}
