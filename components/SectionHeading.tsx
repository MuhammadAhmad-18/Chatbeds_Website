import type { ReactNode } from "react";
export function SectionHeading({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`section-heading relative ${className}`}>
      <span className="eyebrow">
        <span className="eyebrow-line" />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
