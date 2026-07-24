/**
 * Monday.com client for talent-pool applications.
 *
 * Pushes every website application onto the "Recruiting Applications"
 * board (7925750497) so the site and the board are a single pipeline —
 * no more applicants living only in an inbox.
 *
 * Requires MONDAY_API_TOKEN in the environment (add it in Vercel).
 * When the token is absent (e.g. local dev), the push is skipped
 * silently and the email path still delivers the application.
 *
 * Board column map (from get_board_info):
 *   name             → item name (applicant name)
 *   status_1__1      → "Position Applying For" (status label)
 *   email__1         → "Your Email" (email)
 *   phone__1         → "Your Phone" (phone)
 *   text__1          → "City You Live" (text)
 *   link__1          → "LinkedIn or Portfolio Link" (link)
 *   files__1         → "Resume (Upload)" (file)
 *   date4            → "Today's Date" (date)
 */

const MONDAY_API = "https://api.monday.com/v2";
const MONDAY_FILE_API = "https://api.monday.com/v2/file";

const BOARD_ID = "7925750497";
/** "Applications" group — new applicants land at the top of intake. */
const GROUP_ID = "topics";

const COL = {
  position: "status_1__1",
  email: "email__1",
  phone: "phone__1",
  city: "text__1",
  link: "link__1",
  resume: "files__1",
  date: "date4",
  linkedin: "link_mm5j6trz",
  instagram: "text_mm5h4cfx",
  tiktok: "text_mm5j75kz",
  hear: "color_mm5jzc8v",
  note: "long_text_mm5jfjb3",
} as const;

/**
 * Maps a website job slug to the exact "Position Applying For" label
 * already on the board, so applications file under the existing labels
 * instead of spawning near-duplicates. Unmapped slugs fall through and
 * rely on create_labels_if_missing.
 */
const SLUG_TO_LABEL: Record<string, string> = {
  "business-development-manager": "Business Development Manager",
  "sales-development-representative": "Sales Development Representative",
  "photographer-videographer": "Photographer and Videographer",
  "email-marketing-specialist": "Email Marketing Specialist",
  "paid-media-specialist": "Paid Media Specialist",
  "pr-brand-communications-specialist": "PR & Brand Communications Specialist",
  "social-media-coordinator": "Social Media Coordinator",
  "intern-business-development": "Intern Business Development Representative",
  "intern-social-media": "Intern Social Media",
};

export interface MondayApplicant {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  portfolio?: string;
  /** LinkedIn profile URL. */
  linkedin?: string;
  /** Instagram handle or URL. */
  instagram?: string;
  /** TikTok handle or URL. */
  tiktok?: string;
  /** "How did you hear about us?" — maps to a status label. */
  hear?: string;
  /** Website job slug — used to map to the board's position label. */
  roleSlug?: string;
  /** Human-readable role, used as a fallback label + in the note. */
  roleTitle?: string;
  message?: string;
  resume?: { filename: string; buffer: Buffer; contentType?: string };
}

export interface MondayResult {
  ok: boolean;
  itemId?: string;
  /** Non-fatal warnings (e.g. resume upload failed but item was created). */
  warnings?: string[];
  error?: string;
}

/** Today's date as YYYY-MM-DD (Monday date column format). */
function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Keep digits and a single leading +, so the phone column accepts it. */
function normalizePhone(raw: string): string {
  const trimmed = raw.trim();
  const plus = trimmed.startsWith("+") ? "+" : "";
  return plus + trimmed.replace(/[^\d]/g, "");
}

async function mondayGraphQL(
  token: string,
  query: string,
  variables: Record<string, unknown>,
): Promise<{ data?: unknown; errors?: { message: string }[] }> {
  const res = await fetch(MONDAY_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "API-Version": "2024-10",
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

/**
 * Creates the applicant item, then (best-effort) uploads the resume and
 * posts the note. Returns ok:true if the item was created; resume/note
 * failures are surfaced as warnings, not hard errors, since the item —
 * and the applicant's contact info — is what matters most.
 */
export async function pushApplicantToMonday(
  a: MondayApplicant,
): Promise<MondayResult> {
  const token = process.env.MONDAY_API_TOKEN;
  if (!token) {
    console.warn("[Monday] MONDAY_API_TOKEN not set — skipping board push");
    return { ok: false, error: "missing token" };
  }

  const warnings: string[] = [];

  // Build column values, only including fields we actually have.
  const columnValues: Record<string, unknown> = {
    [COL.email]: { email: a.email, text: a.email },
    [COL.date]: { date: today() },
  };

  const label = a.roleSlug ? SLUG_TO_LABEL[a.roleSlug] : undefined;
  const positionLabel = label ?? a.roleTitle;
  if (positionLabel) columnValues[COL.position] = { label: positionLabel };

  if (a.phone) {
    columnValues[COL.phone] = {
      phone: normalizePhone(a.phone),
      countryShortName: "US",
    };
  }
  if (a.city) columnValues[COL.city] = a.city;
  if (a.portfolio) {
    columnValues[COL.link] = { url: a.portfolio, text: a.portfolio };
  }
  if (a.linkedin) {
    columnValues[COL.linkedin] = { url: a.linkedin, text: a.linkedin };
  }
  if (a.instagram) columnValues[COL.instagram] = a.instagram;
  if (a.tiktok) columnValues[COL.tiktok] = a.tiktok;
  if (a.hear) columnValues[COL.hear] = { label: a.hear };
  if (a.message) columnValues[COL.note] = { text: a.message };

  // 1) Create the item.
  const createQuery = `
    mutation ($boardId: ID!, $groupId: String!, $itemName: String!, $columnValues: JSON!) {
      create_item(
        board_id: $boardId,
        group_id: $groupId,
        item_name: $itemName,
        column_values: $columnValues,
        create_labels_if_missing: true
      ) { id }
    }`;

  let itemId: string;
  try {
    const json = await mondayGraphQL(token, createQuery, {
      boardId: BOARD_ID,
      groupId: GROUP_ID,
      itemName: a.name,
      columnValues: JSON.stringify(columnValues),
    });
    if (json.errors?.length) {
      const msg = json.errors.map((e) => e.message).join("; ");
      console.error("[Monday] create_item errors:", msg);
      return { ok: false, error: msg };
    }
    const data = json.data as
      | { create_item?: { id?: string } }
      | undefined;
    const id = data?.create_item?.id;
    if (!id) {
      console.error("[Monday] create_item returned no id:", json);
      return { ok: false, error: "no item id returned" };
    }
    itemId = id;
  } catch (err) {
    console.error("[Monday] create_item request failed:", err);
    return { ok: false, error: "create_item request failed" };
  }

  // 2) Upload the resume to the file column (best-effort).
  if (a.resume) {
    try {
      const uploadQuery = `mutation ($file: File!) {
        add_file_to_column(item_id: ${itemId}, column_id: "${COL.resume}", file: $file) { id }
      }`;
      const form = new FormData();
      form.append("query", uploadQuery);
      const blob = new Blob([new Uint8Array(a.resume.buffer)], {
        type: a.resume.contentType || "application/octet-stream",
      });
      form.append("variables[file]", blob, a.resume.filename);

      const res = await fetch(MONDAY_FILE_API, {
        method: "POST",
        headers: { Authorization: token },
        body: form,
      });
      const json = (await res.json()) as { errors?: { message: string }[] };
      if (json.errors?.length) {
        const msg = json.errors.map((e) => e.message).join("; ");
        console.error("[Monday] resume upload errors:", msg);
        warnings.push("resume upload failed");
      }
    } catch (err) {
      console.error("[Monday] resume upload failed:", err);
      warnings.push("resume upload failed");
    }
  }

  // The applicant's note now lands directly in the "Applicant Note"
  // long-text column (set in columnValues above), so there's no longer a
  // separate update to post.

  return { ok: true, itemId, warnings: warnings.length ? warnings : undefined };
}
