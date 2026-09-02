"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import {
  audienceHubs,
  reachLocations,
  studioLocation,
  type PortfolioPin,
} from "@/lib/locations";

/**
 * Premium dark-mode world map — studio + audience hubs + reach pins, plus
 * clickable portfolio pins tied to the work.
 *
 * Portfolio pins (gold dot + canvas ring) are derived from the work data on
 * the server and passed in as `pins`. Same-city projects cluster onto one
 * pin: a single project navigates straight to its page on click; a cluster
 * opens a panel listing each project as a link. Audience hubs are gold dots
 * sized by weight; reach pins are hollow canvas rings.
 */

// Topojson — bundled in node_modules via the world-atlas package
const geoUrl = "/world-110m.json";

const GOLD = "#FFBD84";
const CANVAS = "#f7f4f0";

type Hovered =
  | { kind: "studio" | "audience" | "reach"; title: string; sub: string }
  | { kind: "portfolio"; title: string; sub: string };

export function GlobalReachMap({ pins }: { pins: PortfolioPin[] }) {
  const router = useRouter();
  const [hovered, setHovered] = useState<Hovered | null>(null);
  const [selected, setSelected] = useState<PortfolioPin | null>(null);
  // Zoom level drives inverse marker scaling: pins hold constant
  // screen size while the map expands, so clusters actually separate.
  const [zoom, setZoom] = useState(1);
  const z = Math.max(zoom, 1);

  function onPinClick(pin: PortfolioPin) {
    if (pin.projects.length === 1) {
      router.push(pin.projects[0].href);
    } else {
      setSelected(pin);
    }
  }

  return (
    <div className="relative w-full">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 160 }}
        width={980}
        height={480}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup
          center={[20, 30]}
          zoom={1}
          minZoom={1}
          maxZoom={8}
          onMoveEnd={({ zoom: nextZoom }) => setZoom(nextZoom)}
        >
          {/* Country outlines */}
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: Array<{ rsmKey: string }> }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1c1a18"
                  stroke="#2e2b27"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#2e2b27" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Studio marker — Tampa */}
          <Marker
            coordinates={studioLocation.coordinates}
            onMouseEnter={() =>
              setHovered({
                kind: "studio",
                title: studioLocation.city,
                sub: studioLocation.region,
              })
            }
            onMouseLeave={() => setHovered(null)}
          >
            <circle
              r={12 / z}
              fill="none"
              stroke={GOLD}
              strokeWidth={1 / z}
              opacity={0.4}
            />
            <circle
              r={7 / z}
              fill="none"
              stroke={GOLD}
              strokeWidth={1.2 / z}
              opacity={0.8}
            />
            <circle r={4 / z} fill={GOLD} />
            <text
              y={-18 / z}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-dm-sans), system-ui",
                fontSize: 9 / z,
                fontWeight: 800,
                letterSpacing: "0.1em",
                fill: GOLD,
                textTransform: "uppercase",
              }}
            >
              Studio
            </text>
          </Marker>

          {/* Audience hub markers */}
          {audienceHubs.map((hub) => (
            <Marker
              key={`${hub.city}-${hub.coordinates[0]}`}
              coordinates={hub.coordinates}
              onMouseEnter={() =>
                setHovered({
                  kind: "audience",
                  title: hub.city,
                  sub: hub.region,
                })
              }
              onMouseLeave={() => setHovered(null)}
            >
              <circle
                r={(hub.weight * 1.5 + 1) / z}
                fill={GOLD}
                opacity={0.85}
                style={{ transition: "all 200ms ease", cursor: "pointer" }}
              />
              <circle
                r={(hub.weight * 1.5 + 1) / z}
                fill="none"
                stroke={GOLD}
                strokeWidth={1 / z}
                opacity={0.25}
                style={{
                  transform: `scale(${hub.weight + 1})`,
                  transformOrigin: "center",
                  transformBox: "fill-box",
                }}
              />
            </Marker>
          ))}

          {/* Reach pins — hollow canvas rings, non-clickable */}
          {reachLocations.map((p) => (
            <Marker
              key={`${p.city}-${p.coordinates[0]}`}
              coordinates={p.coordinates}
              onMouseEnter={() =>
                setHovered({ kind: "reach", title: p.city, sub: p.region })
              }
              onMouseLeave={() => setHovered(null)}
            >
              <circle
                r={4 / z}
                fill="none"
                stroke={CANVAS}
                strokeWidth={1.4 / z}
                opacity={0.85}
                style={{ cursor: "pointer" }}
              />
              <circle r={1.4 / z} fill={CANVAS} opacity={0.85} />
            </Marker>
          ))}

          {/* Portfolio pins — gold core + canvas ring, clickable */}
          {pins.map((pin) => {
            const n = pin.projects.length;
            const base = 4.5 + Math.min(n - 1, 4) * 0.5;
            return (
              <Marker
                key={pin.city}
                coordinates={pin.coordinates}
                onMouseEnter={() =>
                  setHovered({
                    kind: "portfolio",
                    title: pin.city,
                    sub:
                      n === 1
                        ? pin.projects[0].title
                        : `${n} projects · click to view`,
                  })
                }
                onMouseLeave={() => setHovered(null)}
                onClick={() => onPinClick(pin)}
                style={{
                  default: { cursor: "pointer" },
                  hover: { cursor: "pointer" },
                  pressed: { cursor: "pointer" },
                }}
              >
                <circle
                  r={(base + 5) / z}
                  fill="none"
                  stroke={GOLD}
                  strokeWidth={1 / z}
                  opacity={0.35}
                />
                <circle r={base / z} fill={GOLD} style={{ cursor: "pointer" }} />
                <circle
                  r={base / z}
                  fill="none"
                  stroke={CANVAS}
                  strokeWidth={1.2 / z}
                  opacity={0.95}
                />
                {n > 1 && (
                  <text
                    textAnchor="middle"
                    dy="0.33em"
                    style={{
                      fontFamily: "var(--font-dm-sans), system-ui",
                      fontSize: (base * 1.15) / z,
                      fontWeight: 800,
                      fill: "#0f0f0f",
                      pointerEvents: "none",
                    }}
                  >
                    {n}
                  </text>
                )}
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Hover preview */}
      <div
        className={`absolute top-4 right-4 lg:top-6 lg:right-6 max-w-[16rem] bg-canvas/95 text-ink px-4 py-3 transition-opacity duration-200 pointer-events-none ${
          hovered && !selected ? "opacity-100" : "opacity-0"
        }`}
      >
        {hovered && (
          <>
            <p className="caption text-gold mb-1">
              {hovered.kind === "studio"
                ? "STUDIO"
                : hovered.kind === "portfolio"
                  ? "PROJECT LOCATION"
                  : hovered.kind === "reach"
                    ? "ON LOCATION"
                    : "AUDIENCE HUB"}
            </p>
            <p className="font-sans font-extrabold text-base leading-none">
              {hovered.title}
            </p>
            <p className="text-xs text-neutral-600 mt-1">{hovered.sub}</p>
          </>
        )}
      </div>

      {/* Selected cluster panel — clickable project links */}
      {selected && (
        <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 w-[17rem] max-w-[calc(100%-2rem)] bg-canvas text-ink p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]">
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Close"
            className="absolute top-3 right-3 text-neutral-400 hover:text-ink transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </button>
          <p className="caption text-gold mb-1">◆ ON LOCATION</p>
          <p className="font-sans font-extrabold text-lg leading-none mb-4">
            {selected.city}
          </p>
          <ul className="flex flex-col divide-y divide-neutral-200 -mb-1">
            {selected.projects.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="group flex items-center justify-between gap-3 py-2.5"
                >
                  <span>
                    <span className="caption text-neutral-500 block text-[0.62rem] mb-0.5">
                      {p.vertical}
                    </span>
                    <span className="font-sans font-extrabold text-sm text-ink group-hover:text-gold transition-colors duration-300">
                      {p.title}
                    </span>
                  </span>
                  <svg
                    width="13"
                    height="9"
                    viewBox="0 0 14 10"
                    fill="none"
                    aria-hidden
                    className="shrink-0 text-neutral-400 group-hover:text-gold group-hover:translate-x-0.5 transition-all duration-300"
                  >
                    <path
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Marker key */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        <span className="caption text-canvas/60 inline-flex items-center gap-2">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full bg-gold"
            aria-hidden
          />
          Audience hubs
        </span>
        <span className="caption text-canvas/60 inline-flex items-center gap-2">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full bg-gold ring-2 ring-canvas/90"
            aria-hidden
          />
          Portfolio projects
        </span>
        <span className="caption text-canvas/60 inline-flex items-center gap-2">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full border border-canvas"
            aria-hidden
          />
          On location
        </span>
      </div>

      {/* Region legend at bottom */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6 max-w-3xl mx-auto">
        <RegionStat region="Americas" pct="46%" />
        <RegionStat region="Europe" pct="22%" />
        <RegionStat region="Middle East" pct="16%" />
        <RegionStat region="Asia + Pacific" pct="14%" />
      </div>
    </div>
  );
}

function RegionStat({ region, pct }: { region: string; pct: string }) {
  return (
    <div className="text-center">
      <p className="font-sans font-extrabold text-2xl lg:text-3xl text-canvas leading-none mb-2">
        {pct}
      </p>
      <p className="caption text-canvas/60">{region}</p>
    </div>
  );
}
