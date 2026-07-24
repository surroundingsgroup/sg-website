"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Script from "next/script";
import { submitApplication } from "@/app/careers/actions";
import { trackEvent } from "@/lib/analytics";

/** Cloudflare Turnstile site key — set to enable the bot challenge. */
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Job application form — name, email, optional portfolio link and
 * note, plus a required CV upload (PDF/Word, max 5MB). Submissions
 * email the team via the submitApplication server action with the
 * CV attached.
 */
/**
 * Vercel rejects request bodies over ~4.5MB at the platform edge (413)
 * before any of our code runs, so the real ceiling is 4MB — enforced
 * here at file-pick time and again server-side.
 */
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const FILE_TOO_BIG =
  "That file is over 4MB. Please compress it or export a smaller PDF and try again.";

export function ApplicationForm({
  roleTitle,
  roleSlug,
}: {
  roleTitle: string;
  roleSlug?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [fileName, setFileName] = useState<string | null>(null);
  const [result, setResult] = useState<{
    state: "idle" | "ok" | "error";
    message?: string;
  }>({ state: "idle" });

  // When the form first appeared on screen — used for the dwell-time
  // bot check (a submit under a few seconds is a script, not a person).
  const mountedAt = useRef<number>(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > MAX_FILE_BYTES) {
      e.target.value = "";
      setFileName(null);
      setResult({ state: "error", message: FILE_TOO_BIG });
      return;
    }
    setFileName(file?.name ?? null);
    setResult({ state: "idle" });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("role", roleTitle);
    if (roleSlug) formData.set("roleSlug", roleSlug);
    formData.set(
      "dwell",
      String(mountedAt.current ? Date.now() - mountedAt.current : 0),
    );

    const cv = formData.get("cv");
    if (cv instanceof File && cv.size > MAX_FILE_BYTES) {
      setResult({ state: "error", message: FILE_TOO_BIG });
      return;
    }

    startTransition(async () => {
      try {
        const res = await submitApplication(formData);
        if (res.ok) {
          trackEvent("job_application_submit", { role: roleTitle });
          setResult({ state: "ok" });
        } else {
          setResult({ state: "error", message: res.error });
        }
      } catch {
        // Transport-level failure (payload rejected, network drop, or a
        // deploy landing mid-session) — keep the page alive with a
        // human answer instead of crashing to an error screen.
        setResult({
          state: "error",
          message:
            "We couldn't send that. If your file is large, compress it under 4MB — then refresh this page and try again.",
        });
      }
    });
  }

  if (result.state === "ok") {
    return (
      <div className="bg-canvas border border-neutral-200 p-10 lg:p-12 text-center">
        <p className="caption text-neutral-500 mb-4">◆ YOU&apos;RE IN THE POOL</p>
        <h3 className="font-sans font-extrabold text-3xl lg:text-4xl text-ink mb-4">
          Got it. Thanks.
        </h3>
        <p className="text-neutral-600 leading-relaxed max-w-md mx-auto">
          We read every note and keep it on file. When a seat opens for
          this role, you&apos;re first in line — we&apos;ll reach out.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Honeypot — hidden from humans and screen readers */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="caption text-neutral-600 mb-2 block">
            Your name <span className="text-neutral-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="caption text-neutral-600 mb-2 block">
            Email <span className="text-neutral-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="city" className="caption text-neutral-600 mb-2 block">
            City you live in <span className="text-neutral-500">*</span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            required
            autoComplete="address-level2"
            placeholder="e.g. Tampa, FL"
            className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
          />
        </div>
        <div>
          <label htmlFor="phone" className="caption text-neutral-600 mb-2 block">
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(813) 555-0100"
            className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="portfolio" className="caption text-neutral-600 mb-2 block">
          Portfolio (optional)
        </label>
        <input
          id="portfolio"
          name="portfolio"
          type="url"
          placeholder="https:// — a link to your work"
          className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
        />
      </div>

      {/* Social accounts — all optional, fill in whichever apply */}
      <div>
        <p className="caption text-neutral-600 mb-2">
          Social accounts <span className="text-neutral-500">(optional — whichever apply)</span>
        </p>
        <div className="space-y-4">
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            aria-label="LinkedIn profile URL"
            placeholder="LinkedIn — profile URL"
            className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              id="instagram"
              name="instagram"
              type="text"
              aria-label="Instagram handle"
              placeholder="Instagram — @handle"
              className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
            />
            <input
              id="tiktok"
              name="tiktok"
              type="text"
              aria-label="TikTok handle"
              placeholder="TikTok — @handle"
              className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="hear" className="caption text-neutral-600 mb-2 block">
          How did you hear about us? <span className="text-neutral-500">*</span>
        </label>
        <select
          id="hear"
          name="hear"
          required
          defaultValue=""
          className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
        >
          <option value="" disabled>
            Select one…
          </option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Indeed">Indeed</option>
          <option value="Other job board">Other job board</option>
          <option value="Instagram or TikTok">Instagram or TikTok</option>
          <option value="Google search">Google search</option>
          <option value="Referral">Referral (friend or employee)</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="cv" className="caption text-neutral-600 mb-2 block">
          Resume / CV <span className="text-neutral-500">*</span>
        </label>
        <label
          htmlFor="cv"
          className="flex items-center justify-between gap-4 w-full bg-canvas border border-dashed border-neutral-400 px-4 py-4 cursor-pointer hover:border-ink transition-colors"
        >
          <span className="text-sm text-neutral-700 truncate">
            {fileName ?? "Choose a file (PDF or Word, max 4MB)"}
          </span>
          <span className="caption text-neutral-500 shrink-0">
            {fileName ? "CHANGE" : "BROWSE"}
          </span>
        </label>
        <input
          id="cv"
          name="cv"
          type="file"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          onChange={onPickFile}
        />
      </div>

      <div>
        <label htmlFor="message" className="caption text-neutral-600 mb-2 block">
          Anything you want us to know (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors resize-none"
          placeholder="A few lines about what you'd bring to the room."
        />
      </div>

      {/* Cloudflare Turnstile — renders only when configured. The widget
          drops a hidden `cf-turnstile-response` input that rides along in
          the form submission and is verified server-side. */}
      {TURNSTILE_SITE_KEY && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            async
            defer
          />
          <div
            className="cf-turnstile"
            data-sitekey={TURNSTILE_SITE_KEY}
            data-theme="light"
          />
        </>
      )}

      {result.state === "error" && (
        <p className="text-sm text-error">{result.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto bg-ink text-canvas px-8 py-4 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Sending…" : `Join the pool — ${roleTitle}`}
      </button>
    </form>
  );
}
