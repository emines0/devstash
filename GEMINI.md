# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

**DevStash** — a centralized developer knowledge hub for storing snippets, AI prompts, notes, commands, files, images, and links.

### Context files

Read the following th get the full context of the project:

- @context/project-overview.md
- @context/coding standards.md
- @context/ai-interaction.md
- @context/current-feature.md

**Current phase:** Phase 1 MVP (planning/scaffolding) — database, auth, and core CRUD not yet built.

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build
npm run lint     # ESLint (eslint-config-next core-web-vitals + TypeScript)
```

No test suite configured yet.

## Stack

| Layer        | Choice                                                                 |
| ------------ | ---------------------------------------------------------------------- |
| Framework    | Next.js 16.2.4 — App Router                                            |
| Language     | TypeScript 5                                                           |
| Styling      | Tailwind CSS v4 + shadcn/ui (not yet installed)                        |
| Database     | Neon (serverless Postgres) + Prisma ORM (not yet installed)            |
| Auth         | NextAuth v5 / Auth.js — credentials + GitHub OAuth (not yet installed) |
| File storage | Cloudflare R2 (not yet installed)                                      |
| AI           | OpenAI `gpt-5-nano` (not yet installed)                                |
| Payments     | Stripe (not yet installed)                                             |

## Next.js 16 — Key Differences

**Read `node_modules/next/dist/docs/` before writing routing, caching, or data-fetching code** — this version has breaking changes.

### Caching

`fetch` is **not cached by default**. To cache data, use the `use cache` directive and enable `cacheComponents: true` in `next.config.ts`:

```ts
// next.config.ts
const nextConfig: NextConfig = { cacheComponents: true };
```

```tsx
// cache a server component or function
'use cache'
export default async function Page() { ... }
```

Do not rely on `fetch` cache options (`cache: 'force-cache'`, `next: { revalidate }`) — they are no longer the primary caching mechanism.

### Instant navigations

Suspense alone does not guarantee instant client-side navigation. Routes that should navigate instantly must also export:

```ts
export const unstable_instant = { prefetch: "static" };
```

Omitting this silently blocks client navigations even when Suspense boundaries are correct.

### Server Functions

Use `'use server'` inline or at file level (unchanged from Next.js 15), but always verify auth inside every Server Function — they are reachable via direct POST requests.

## Architecture

```
src/app/
  layout.tsx       # root layout — Geist fonts, Tailwind base classes
  page.tsx         # home page
  globals.css      # Tailwind v4 entry
```

Planned layout (from spec):

- `src/app/(auth)/` — login/register routes
- `src/app/(dashboard)/` — main app (sidebar + grid workspace)
- `src/app/api/` — Route Handlers (AI, Stripe webhooks, file uploads)
- `src/lib/` — Prisma client, auth config, utility functions
- `src/components/` — shared UI (shadcn/ui base + custom)

## Auth

JWT strategy (stateless). Middleware will protect `/dashboard` and nested routes. GitHub OAuth + email/password via NextAuth v5.

## Data Model

Core entities: `User`, `Item`, `ItemType`, `Collection`, `Tag`, `ItemTag`. Items have a `contentType` of `"text"` or `"file"`, with `content` (text) or `fileUrl` (R2) depending on type. System `ItemType` records (`isSystem: true`) are seeded; users can create custom types (Pro plan only). Full Prisma schema in [contex/project-overview.md](contex/project-overview.md).
