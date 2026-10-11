import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// OG images can't read CSS variables — keep these in sync with globals.css tokens.
const colors = {
  background: "#09090b",
  foreground: "#fafafa",
  muted: "#a1a1aa",
  accent: "#818cf8",
};

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 80,
        background: colors.background,
        color: colors.foreground,
      }}
    >
      <div style={{ width: 64, height: 8, background: colors.accent, marginBottom: 40 }} />
      <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: "-0.03em" }}>{site.name}</div>
      <div style={{ fontSize: 36, color: colors.muted, marginTop: 16 }}>{site.tagline}</div>
    </div>,
    size,
  );
}
