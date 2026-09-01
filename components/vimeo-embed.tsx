/**
 * Responsive 16:9 Vimeo player.
 *
 * On-demand playback (not a muted background loop) so walkthrough and
 * brand films can be watched with sound. Unlisted videos must pass their
 * `h=` hash — it's the second path segment in a Vimeo share URL, e.g.
 * vimeo.com/1223046177/3b57a19084 → id 1223046177, hash 3b57a19084.
 */
interface VimeoEmbedProps {
  vimeoId: string;
  /** Unlisted-video hash (the `h=` value). Omit for public videos. */
  vimeoHash?: string;
  title?: string;
  /** 9:16 framing for vertical social cuts (defaults to 16:9). */
  vertical?: boolean;
}

export function VimeoEmbed({
  vimeoId,
  vimeoHash,
  title,
  vertical,
}: VimeoEmbedProps) {
  const hash = vimeoHash ? `h=${vimeoHash}&` : "";
  // Clean player chrome + Do Not Track.
  const src = `https://player.vimeo.com/video/${vimeoId}?${hash}title=0&byline=0&portrait=0&dnt=1`;

  return (
    <div
      className={`relative w-full ${vertical ? "aspect-[9/16]" : "aspect-video"} bg-ink overflow-hidden`}
    >
      <iframe
        src={src}
        title={title ?? "Film"}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 h-full w-full"
        style={{ border: 0 }}
      />
    </div>
  );
}
