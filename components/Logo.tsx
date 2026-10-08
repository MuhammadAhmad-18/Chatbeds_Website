import { brandColors, logoMarkPaths, logoWordmarkPaths } from "@/lib/logo-artwork";

export type LogoProps = {
  variant?: "full" | "icon";
  height?: number;
  className?: string;
  tone?: "default" | "light" | "mono";
  decorative?: boolean;
};

type LogoPalette = {
  chat: string;
  beds: string;
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
        <>
          <path d={logoWordmarkPaths.chat} fill={palette.chat} />
          <path d={logoWordmarkPaths.beds} fill={palette.beds} />
        </>
      )}
    </svg>
  );
}

/** Inline SVG only; no client directive, bitmap, font dependency or layout shift. */
export function Logo({ tone = "default", ...props }: LogoProps) {
  const mono = tone === "mono";
  return LogoArtwork({
    ...props,
    mono,
    palette: {
      chat: mono
        ? "currentColor"
        : `var(--logo-chat, ${brandColors.blue})`,
      beds: mono
        ? "currentColor"
        : `var(--logo-beds, ${brandColors.orange})`,
      white: "#ffffff",
      ink: "#000000",
    },
  });
}

