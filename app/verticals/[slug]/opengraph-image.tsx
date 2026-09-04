import { ImageResponse } from "next/og";
import { verticals } from "@/lib/verticals";

export const alt = "Surroundings Group · Industry";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const v = verticals.find((x) => x.slug === params.slug);
  return [
    {
      id: "default",
      alt: v ? `Surroundings Group · ${v.name}` : "Surroundings Group",
      size,
      contentType,
    },
  ];
}

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const vertical = verticals.find((v) => v.slug === params.slug);
  const name = vertical?.name ?? "Premium Markets";
  const tagline =
    vertical?.tagline ?? "The creative partner behind the world's premium brands.";

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
          fontFamily:
            "Helvetica Neue, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          color: "#f7f4f0",
        }}
      >
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
              letterSpacing: "0.16em",
              color: "rgba(247, 244, 240, 0.55)",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            Industry · Premium markets
          </div>
        </div>

        {/* Vertical name as headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 108,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              color: "#f7f4f0",
              maxWidth: 1040,
            }}
          >
            {name}.
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              lineHeight: 1.3,
              color: "rgba(247, 244, 240, 0.7)",
              maxWidth: 920,
            }}
          >
            {tagline}
          </div>
        </div>

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
              fontSize: 18,
              letterSpacing: "0.16em",
              color: "#FFBD84",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Vertical-fluent. By design.
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
    { ...size },
  );
}
