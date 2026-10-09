"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Background hero video with an instant poster.
 *
 * The Vimeo background iframe renders black while it loads and buffers, which
 * left the homepage hero blank for a beat. We now paint a sharp poster still
 * immediately (priority image) and keep the iframe invisible until the player
 * reports it's actually playing, then crossfade it in. A timeout fallback
 * guarantees the video reveals even if the player events never arrive.
 */
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (typeof e.origin === "string" && !e.origin.includes("vimeo.com")) return;
      let data: unknown = e.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      const event = (data as { event?: string } | null)?.event;
      if (event === "ready") {
        // Subscribe to playback so we know when the first frame is live.
        try {
          ref.current?.contentWindow?.postMessage(
            JSON.stringify({ method: "addEventListener", value: "playing" }),
            "*",
          );
        } catch {
          /* cross-origin — ignore */
        }
      }
      if (event === "playing" || event === "timeupdate") setPlaying(true);
    }
    window.addEventListener("message", onMessage);
    // Fallback: never keep the video hidden longer than this.
    const t = setTimeout(() => setPlaying(true), 2500);
    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={poster}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <iframe
        ref={ref}
        src={src}
        title="Surroundings Group reel"
        allow="autoplay; fullscreen; picture-in-picture"
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "max(100%, calc(100vh * 16 / 9))",
          height: "max(100%, calc(100vw * 9 / 16))",
          minWidth: "100%",
          minHeight: "100%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          border: 0,
          opacity: playing ? 1 : 0,
          transition: "opacity 800ms ease",
        }}
      />
    </div>
  );
}
