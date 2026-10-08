import { ImageResponse } from "next/og";
import { LogoArtwork } from "@/components/Logo";
import { brandColors, socialLogoPalette } from "@/lib/logo-artwork";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const alt = "ChatBeds";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: brandColors.navy,
      }}
    >
      {LogoArtwork({
        variant: "icon",
        height: 126,
        palette: socialLogoPalette,
        decorative: true,
      })}
    </div>,
    size,
  );
}

