"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import type { PortfolioPin } from "@/lib/locations";

/**
 * Florida-focused portfolio map for a vertical page. Renders the state
 * outline (with faint GA/AL for context) and clickable, clustered pins for
 * that vertical's located projects. A single-project pin navigates on click;
 * a multi-project pin (same location) opens a panel of links.
 *
 * Drawn client-side only — d3 projection floats differ server/browser, so
 * SSR would cause a hydration mismatch (see GlobalReachMap).
 */

const geoUrl = "/florida-region.json";
const GOLD = "#FFBD84";
const CANVAS = "#f7f4f0";

/** Short label from a "Place, City, State" location string. */
function shortLabel(city: string) {
  const parts = city.split(",").map((s) => s.trim());
  return parts.slice(0, 2).join(", ");
}

export function FloridaMap({ pins }: { pins: PortfolioPin[] }) {
  const router = useRouter();
  const [hovered, setHovered] = useState<PortfolioPin | null>(null);
  const [selected, setSelected] = useState<PortfolioPin | null>(null);

  return (
    <div className="relative w-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [-83.7, 27.9], scale: 2850 }}
        width={800}
        height={660}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: Array<{ rsmKey: string; properties?: { name?: string } }> }) =>
            geographies.map((geo) => {
              const isFL = geo.properties?.name === "Florida";
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isFL ? "#221f1b" : "#171513"}
                  stroke={isFL ? "rgba(255,189,132,0.32)" : "#2a2724"}
                  strokeWidth={isFL ? 0.8 : 0.4}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: isFL ? "#282420" : "#171513" },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>

        {pins.map((pin) => {
          const n = pin.projects.length;
          const base = 5 + Math.min(n - 1, 4) * 0.7;
          return (
            <Marker
              key={pin.city}
              coordinates={pin.coordinates}
              onMouseEnter={() => setHovered(pin)}
              onMouseLeave={() => setHovered(null)}
              onClick={() =>
                n === 1 ? router.push(pin.projects[0].href) : setSelected(pin)
              }
              style={{
                default: { cursor: "pointer" },
                hover: { cursor: "pointer" },
                pressed: { cursor: "pointer" },
              }}
            >
              <circle r={base + 7} fill="none" stroke={GOLD} strokeWidth={1} opacity={0.28} />
              <circle r={base + 3} fill="none" stroke={GOLD} strokeWidth={1} opacity={0.5} />
              <circle r={base} fill={GOLD} />
              <circle r={base} fill="none" stroke={CANVAS} strokeWidth={1.2} opacity={0.95} />
              {n > 1 && (
                <text
                  textAnchor="middle"
                  dy="0.33em"
                  style={{
                    fontFamily: "var(--font-dm-sans), system-ui",
                    fontSize: base * 1.1,
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
      </ComposableMap>

      {/* Hover preview */}
      <div
        className={`absolute top-4 left-4 lg:top-6 lg:left-6 max-w-[16rem] bg-canvas/95 text-ink px-4 py-3 transition-opacity duration-200 pointer-events-none ${
          hovered && !selected ? "opacity-100" : "opacity-0"
        }`}
      >
        {hovered && (
          <>
            <p className="caption text-gold mb-1">
              {hovered.projects.length === 1 ? "PROJECT" : "LOCATION"}
            </p>
            <p className="font-sans font-extrabold text-base leading-none">
              {shortLabel(hovered.city)}
            </p>
            <p className="text-xs text-neutral-600 mt-1">
              {hovered.projects.length === 1
                ? hovered.projects[0].title
                : `${hovered.projects.length} projects · click to view`}
            </p>
          </>
        )}
      </div>

      {/* Selected cluster panel */}
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
            {shortLabel(selected.city)}
          </p>
          <ul className="flex flex-col divide-y divide-neutral-200 -mb-1">
            {selected.projects.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="group flex items-center justify-between gap-3 py-2.5">
                  <span className="font-sans font-extrabold text-sm text-ink group-hover:text-gold transition-colors duration-300">
                    {p.title}
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
  );
}
