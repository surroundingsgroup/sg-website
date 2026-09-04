import { ImageResponse } from "next/og";
import { services } from "@/lib/services";

export const alt = "Surroundings Group · Service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const s = services.find((x) => x.slug === params.slug);
  return [
    {
      id: "default",
      alt: s ? `Surroundings Group · ${s.name}` : "Surroundings Group",
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
  const service = services.find((s) => s.slug === params.slug);
  const name = service?.name ?? "Services";
  const tagline =
    service?.tagline ?? "The creative partner behind the world's premium brands.";

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
            Service area · Full-service
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 168,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "#f7f4f0",
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
            All in-house. No handoffs.
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
