import { brandColors, logoMarkPaths, logoWordmarkPath } from "@/lib/logo-artwork";

export type LogoProps = {
  variant?: "full" | "icon";
  height?: number;
  className?: string;
  tone?: "default" | "light" | "mono";
  decorative?: boolean;
};

type LogoPalette = {
  purple: string;
  orange: string;
  wordmark: string;
  white: string;
  ink: string;
};

/** Shared vector renderer. Literal palettes also work in next/og's SVG renderer. */
export function LogoArtwork({
  variant = "full",
  height = 32,
  className,
  decorative = false,
  palette,
  mono = false,
}: Omit<LogoProps, "tone"> & { palette: LogoPalette; mono?: boolean }) {
  const viewWidth = variant === "icon" ? 64 : 310;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewWidth} 64`}
      width={(height * viewWidth) / 64}
      height={height}
      className={className}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "ChatBeds"}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
    >
      {logoMarkPaths.map(({ d, paint, ...attributes }, index) =>
        mono && "opacity" in attributes ? null : (
          <path
            key={index}
            d={d}
            fill={palette[paint]}
            fillRule="evenodd"
            {...attributes}
          />
        ),
      )}
      {!mono &&
        [20, 32, 44].map((cx) => (
          <circle key={cx} cx={cx} cy="17" r="3.4" fill={palette.white} />
        ))}
      {variant === "full" && (
        <path d={logoWordmarkPath} fill={palette.wordmark} />
      )}
    </svg>
  );
}

/** Inline SVG only; no client directive, bitmap, font dependency or layout shift. */
export function Logo({ tone = "default", ...props }: LogoProps) {
  const mono = tone === "mono";
  const ink = mono ? "currentColor" : `var(--text, ${brandColors.text})`;
  return LogoArtwork({
    ...props,
    mono,
    palette: {
      purple: mono
        ? ink
        : tone === "light"
          ? `var(--purple-light, ${brandColors.purpleLight})`
          : `var(--purple, ${brandColors.purple})`,
      orange: mono ? ink : `var(--orange, ${brandColors.orange})`,
      wordmark: tone === "light" ? brandColors.white : ink,
      white: "#ffffff",
      ink: "#000000",
    },
  });
}

