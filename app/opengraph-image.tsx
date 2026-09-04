import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Surroundings Group: The creative partner behind the world's premium brands";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default OG image — used as the social share preview for the
 * homepage and any route that doesn't define its own.
 * Pages that need a route-specific image can drop their own
 * `opengraph-image.tsx` next to their page.tsx.
 */
export default async function Image() {
  const [bold, medium] = await Promise.all([
    readFile(join(process.cwd(), "assets/archivo-bold.ttf")),
    readFile(join(process.cwd(), "assets/archivo-medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f0f0f",
          padding: "72px 80px",
          fontFamily: "Archivo",
          color: "#f7f4f0",
        }}
      >
        {/* Top — wordmark + tiny eyebrow */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.18em",
              color: "#FFBD84",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Surroundings Group
          </div>
          <div
            style={{
              fontSize: 16,
              letterSpacing: "0.14em",
              color: "rgba(247, 244, 240, 0.55)",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            A creative agency for premium brands
          </div>
        </div>

        {/* Middle — main tagline */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            color: "#f7f4f0",
            maxWidth: 1000,
          }}
        >
          The creative partner behind the world&apos;s premium brands.
        </div>

        {/* Bottom — pillars + gold accent */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(255, 189, 132, 0.4)",
            paddingTop: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 24,
              fontSize: 18,
              letterSpacing: "0.16em",
              color: "#FFBD84",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            <span>Full-service</span>
            <span style={{ color: "rgba(255, 189, 132, 0.4)" }}>|</span>
            <span>Vertical-fluent</span>
            <span style={{ color: "rgba(255, 189, 132, 0.4)" }}>|</span>
            <span>Powerful network</span>
          </div>
          <div
            style={{
              fontSize: 16,
              letterSpacing: "0.14em",
              color: "rgba(247, 244, 240, 0.55)",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            surroundingsgroup.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: bold, weight: 800, style: "normal" },
        { name: "Archivo", data: bold, weight: 700, style: "normal" },
        { name: "Archivo", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
