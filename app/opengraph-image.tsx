import { ImageResponse } from "next/og";
import { LogoArtwork } from "@/components/Logo";
import { brandColors, socialLogoPalette } from "@/lib/logo-artwork";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "ChatBeds — Your property runs in ChatBeds. Your team runs it from WhatsApp.";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 84,
        background: brandColors.navy,
        color: brandColors.white,
      }}
    >
      {LogoArtwork({ height: 96, palette: socialLogoPalette, decorative: true })}
      <div
        style={{
          display: "flex",
          width: 64,
          height: 5,
          background: brandColors.orange,
          marginTop: 46,
          marginBottom: 30,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 49,
          lineHeight: 1.3,
          letterSpacing: -1,
        }}
      >
        <span>Your property runs in ChatBeds.</span>
        <span>Your team runs it from WhatsApp.</span>
      </div>
    </div>,
    size,
  );
}

