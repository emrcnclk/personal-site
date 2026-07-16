import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#05060a",
          backgroundImage:
            "radial-gradient(at 72% 20%, rgba(232,140,70,0.18) 0%, transparent 55%), radial-gradient(at 20% 80%, rgba(90,190,200,0.1) 0%, transparent 50%)",
          color: "#ece0be",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 8,
            color: "#a89880",
          }}
        >
          <span>{site.monogram}</span>
          <span>ISTANBUL · SESSION 01</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 78,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            <span>Game theory.</span>
            <span>Mind like a machine.</span>
            <span style={{ color: "#e88c46" }}>Play with the system.</span>
          </div>
          <div style={{ fontSize: 22, color: "#a89880", letterSpacing: 2, maxWidth: 900 }}>
            {site.motto}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
