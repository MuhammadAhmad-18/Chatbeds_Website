import { PageLink as Link } from "./PageLink";
import { Logo } from "./Logo";

export function BrandLogo({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand-logo${footer ? " brand-logo-footer" : ""}`}
      aria-label="ChatBeds home"
    >
      {footer ? (
        <Logo variant="full" height={30} decorative />
      ) : (
        <>
          <Logo variant="full" height={32} className="logo-desktop" decorative />
          <Logo variant="icon" height={40} className="logo-mobile" decorative />
        </>
      )}
    </Link>
  );
}
