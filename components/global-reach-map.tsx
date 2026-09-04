"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import {
  servedAreas,
  studioLocation,
  type PortfolioPin,
  type RailItem,
} from "@/lib/locations";

/**
 * Global reach map — studio + clickable portfolio pins + served areas,
 * paired with a synced, horizontally-scrollable project rail.
 *
 * Sync: hovering a rail card pulses its map pin(s); hovering a pin rings
 * the matching rail card and scrolls it into view. A single-project pin
 * navigates on click; a cluster opens a panel of links. Portfolio data is
 * derived on the server and passed in as `pins` / `rail`, so the full work
 * array never ships to the browser bundle.
 */

// Topojson — bundled in node_modules via the world-atlas package
const geoUrl = "/world-110m.json";

const GOLD = "#FFBD84";
const CANVAS = "#f7f4f0";
const TAUPE = "#BCA988";

type Hovered = {
  kind: "studio" | "served" | "portfolio";
  title: string;
  sub: string;
};

export function GlobalReachMap({
  pins,
  rail,
}: {
  pins: PortfolioPin[];
  rail: RailItem[];
}) {
  const router = useRouter();
  const railRef = useRef<HTMLUListElement>(null);
  const [hovered, setHovered] = useState<Hovered | null>(null);
  const [selected, setSelected] = useState<PortfolioPin | null>(null);
  // Sync state: which rail card / which pin-city is currently spotlighted.
  const [railSlug, setRailSlug] = useState<string | null>(null);
  const [pinCity, setPinCity] = useState<string | null>(null);
  // Zoom drives inverse marker scaling: pins hold constant screen size
  // while the map expands, so clusters actually separate.
  const [zoom, setZoom] = useState(1);
  const z = Math.max(zoom, 1);

  const activeCities = railSlug
    ? (rail.find((r) => r.slug === railSlug)?.cities ?? [])
    : pinCity
      ? [pinCity]
      : [];

  function cardActive(item: RailItem) {
    if (railSlug === item.slug) return true;
    if (pinCity && item.cities.includes(pinCity)) return true;
    return false;
  }

  function onPinEnter(pin: PortfolioPin) {
    setRailSlug(null);
    setPinCity(pin.city);
    setHovered({
      kind: "portfolio",
      title: pin.city,
      sub:
        pin.projects.length === 1
          ? pin.projects[0].title
          : `${pin.projects.length} projects · click to view`,
    });
    // Scroll the first matching rail card into view.
    const match = rail.find((r) => r.cities.includes(pin.city));
    if (match && railRef.current) {
      railRef.current
        .querySelector(`[data-slug="${match.slug}"]`)
        ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }

  function onPinClick(pin: PortfolioPin) {
    if (pin.projects.length === 1) router.push(pin.projects[0].href);
    else setSelected(pin);
  }

  return (
    <div className="relative w-full">
      <div className="relative">
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
              <circle r={12 / z} fill="none" stroke={GOLD} strokeWidth={1 / z} opacity={0.4} />
              <circle r={7 / z} fill="none" stroke={GOLD} strokeWidth={1.2 / z} opacity={0.8} />
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

            {/* Served-area pins — subtle taupe rings, non-clickable */}
            {servedAreas.map((p) => (
              <Marker
                key={`${p.city}-${p.coordinates[0]}`}
                coordinates={p.coordinates}
                onMouseEnter={() =>
                  setHovered({ kind: "served", title: p.city, sub: p.region })
                }
                onMouseLeave={() => setHovered(null)}
              >
                <circle r={3.5 / z} fill="none" stroke={TAUPE} strokeWidth={1.2 / z} opacity={0.85} />
                <circle r={1.2 / z} fill={TAUPE} opacity={0.85} />
              </Marker>
            ))}

            {/* Portfolio pins — gold core + canvas ring, clickable + synced */}
            {pins.map((pin) => {
              const n = pin.projects.length;
              const active = activeCities.includes(pin.city);
              const base = (4.5 + Math.min(n - 1, 4) * 0.5) * (active ? 1.55 : 1);
              return (
                <Marker
                  key={pin.city}
                  coordinates={pin.coordinates}
                  onMouseEnter={() => onPinEnter(pin)}
                  onMouseLeave={() => {
                    setPinCity(null);
                    setHovered(null);
                  }}
                  onClick={() => onPinClick(pin)}
                  style={{
                    default: { cursor: "pointer" },
                    hover: { cursor: "pointer" },
                    pressed: { cursor: "pointer" },
                  }}
                >
                  <circle
                    r={(base + (active ? 8 : 5)) / z}
                    fill="none"
                    stroke={GOLD}
                    strokeWidth={1 / z}
                    opacity={active ? 0.6 : 0.35}
                  />
                  <circle r={base / z} fill={GOLD} style={{ cursor: "pointer" }} />
                  <circle r={base / z} fill="none" stroke={CANVAS} strokeWidth={1.2 / z} opacity={0.95} />
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
                    : "AREA SERVED"}
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
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </button>
            <p className="caption text-gold mb-1">◆ ON LOCATION</p>
            <p className="font-sans font-extrabold text-lg leading-none mb-4">
              {selected.city}
            </p>
            <ul className="flex flex-col divide-y divide-neutral-200 -mb-1">
              {selected.projects.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="group flex items-center justify-between gap-3 py-2.5">
                    <span>
                      <span className="caption text-neutral-500 block text-[0.62rem] mb-0.5">
                        {p.vertical}
                      </span>
                      <span className="font-sans font-extrabold text-sm text-ink group-hover:text-gold transition-colors duration-300">
                        {p.title}
                      </span>
                    </span>
                    <svg width="13" height="9" viewBox="0 0 14 10" fill="none" aria-hidden className="shrink-0 text-neutral-400 group-hover:text-gold group-hover:translate-x-0.5 transition-all duration-300">
                      <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Marker key */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        <span className="caption text-canvas/60 inline-flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-gold ring-2 ring-canvas/90" aria-hidden />
          Portfolio projects
        </span>
        <span className="caption text-canvas/60 inline-flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full border border-taupe" aria-hidden />
          Areas served
        </span>
        <span className="caption text-canvas/40">Hover a pin or a card. They’re linked</span>
      </div>

      {/* Synced project rail */}
      <div className="relative mt-8">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10 bg-gradient-to-r from-ink to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10 bg-gradient-to-l from-ink to-transparent" aria-hidden />
        <ul
          ref={railRef}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 snap-x [scrollbar-width:thin] [scrollbar-color:rgba(247,244,240,0.25)_transparent]"
        >
          {rail.map((item) => {
            const active = cardActive(item);
            return (
              <li key={item.slug} data-slug={item.slug} className="snap-start shrink-0 w-[200px] sm:w-[220px]">
                <Link
                  href={item.href}
                  onMouseEnter={() => {
                    setRailSlug(item.slug);
                    setPinCity(null);
                  }}
                  onMouseLeave={() => setRailSlug(null)}
                  className={`group block overflow-hidden rounded-xl bg-canvas/[0.03] border transition-all duration-300 ${
                    active
                      ? "border-gold/70 -translate-y-1 shadow-[0_18px_44px_-22px_rgba(255,189,132,0.5)]"
                      : "border-canvas/10 hover:border-canvas/30"
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.cover}
                      alt={item.alt}
                      fill
                      sizes="220px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" aria-hidden />
                    <div className={`absolute top-0 right-0 h-px w-10 transition-colors duration-300 ${active ? "bg-gold" : "bg-gold/50"}`} aria-hidden />
                  </div>
                  <div className="p-3.5">
                    <p className="caption text-gold text-[0.6rem] mb-1">{item.vertical}</p>
                    <p className="font-sans font-extrabold text-sm text-canvas leading-tight group-hover:text-gold transition-colors duration-300">
                      {item.title}
                    </p>
                    <p className="text-xs text-canvas/55 mt-1 truncate">{item.location}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
