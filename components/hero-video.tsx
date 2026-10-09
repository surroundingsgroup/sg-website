"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Background hero video with an instant poster.
 *
 * The Vimeo background iframe renders black while it loads and buffers, which
 * left the homepage hero blank for a beat. We paint a sharp poster still
 * immediately (priority image) and keep the iframe invisible until the player
 * is actually rendering frames (`timeupdate` / `bufferend`), then crossfade it
 * in over the poster. We subscribe a few times early to beat the player's
 * `ready` handshake race, and a long timeout guarantees the reveal even if the
 * events never arrive.
 */
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    function post(method: string, value?: string) {
      try {
        ref.current?.contentWindow?.postMessage(
          JSON.stringify(value ? { method, value } : { method }),
          "*",
        );
      } catch {
        /* cross-origin before load — ignore */
      }
    }
    function subscribe() {
      post("addEventListener", "timeupdate");
      post("addEventListener", "bufferend");
      post("addEventListener", "playing");
    }
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
      if (event === "ready") subscribe();
      // Reveal only once the video is truly producing frames.
      if (event === "timeupdate" || event === "bufferend") setPlaying(true);
    }
    window.addEventListener("message", onMessage);
    // Beat the ready-race: fire the subscription a few times after mount.
    const subs = [300, 900, 1800].map((d) => setTimeout(subscribe, d));
    // Last-resort reveal so the hero is never stuck on the poster.
    const fallback = setTimeout(() => setPlaying(true), 6000);
    return () => {
      window.removeEventListener("message", onMessage);
      subs.forEach(clearTimeout);
      clearTimeout(fallback);
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
