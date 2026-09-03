# Portfolio CMS (Sanity) — setup

Self-serve editor for portfolio projects. Add a project, drag in photos,
paste Vimeo links, publish — no code, no deploy. Lives at
`surroundingsgroup.com/studio`.

Verticals (hero copy, taglines, SEO, FAQs) stay in code. **Projects** — the
work collections you add constantly — live in Sanity.

## What Billy needs to do once (creating the project needs your login)

1. Go to **sanity.io** → sign up (free) with Google.
2. **Create new project** → name it "Surroundings Group Portfolio".
   - Dataset: **production**, visibility **public**.
3. Copy the **Project ID** (Project → settings, or the URL). Send it to me.
4. **API token** (for the one-time import): Project → **API → Tokens →
   Add API token** → name "migration", permissions **Editor** → copy it.
5. **CORS**: Project → **API → CORS origins → Add** these (allow credentials):
   - `http://localhost:3000`
   - `https://surroundingsgroup.com`
6. Put the values in **`.env.local`** (copy from `.env.local.example`):
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=<the project id>
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_WRITE_TOKEN=<the editor token>
   ```
   The token is secret — it stays in `.env.local` (gitignored). I only need
   the Project ID.

## Then I run (one time)

```
npx tsx scripts/migrate-to-sanity.ts
```

Uploads every current photo + creates a project doc per collection. Then I
wire the live site to read from Sanity and add the env vars to Vercel.

## Day-to-day (you / an assistant)

- Go to `/studio`, log in.
- **+ Create → Portfolio Project.** Fill title, vertical, client, location,
  description. Paste the main-film + social-cut Vimeo URLs. Drag in photos
  (upload the originals — the site resizes). Set a focal point per photo if
  you want to control the crop. Drop a map pin. **Publish.**
- Reorder a vertical's wall by dragging projects in its list.
