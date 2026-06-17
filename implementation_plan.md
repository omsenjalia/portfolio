# Phase 0 — Foundation: Next.js + Design System + Auth + Deploy

> The goal of Phase 0 is a **live, empty site with working GitHub login, a polished design system, and the notebook/zine aesthetic established** — deployed on Vercel. No content yet, just the bones.

## Background & Context

This is Phase 0 of an 8-phase portfolio build plan. The full plan describes a Next.js app where GitHub is the database, featuring:
- A block-based page builder (admin-only)
- GitHub-synced projects, blog/diary, Obsidian notes vault browser
- CV page with PDF generation
- Awwwards-level animations (GSAP + Lenis)
- Auth.js v5 for admin gating

Phase 0 establishes the technical foundation that all later phases build on. Getting this right means later phases are "add features to a working app" rather than "fix the foundation."

---

## User Review Required

> [!IMPORTANT]
> **Typography pairing decision.** Based on font availability research:
> - **Syne** (display) + **DM Mono** (body/code) — both on Google Fonts, Syne is expressive/art-led, DM Mono gives the notebook/code feel. This is my recommendation.
> - **Bebas Neue** (display) + **DM Mono** (body/code) — brutalist/editorial direction, both on Google Fonts.
> - **Clash Display** + **General Sans** — organic/studio feel, but requires Fontshare (self-hosted or CDN). Adds complexity.
>
> I recommend **Syne + DM Mono** — both load via `next/font/google` with zero config, the pairing has strong character without being hard to read, and the art/expressive direction matches the notebook aesthetic.

> [!IMPORTANT]
> **Accent color.** The plan suggests warm terracotta vs cool blue. I recommend starting with:
> - **Muted amber/terracotta** (`#C4713B`) — warm, notebook-feeling, distinctive
> - With a secondary **ink teal** (`#2A6F6A`) for interactive states
>
> This creates a warm-but-professional "engineering notebook" palette. We can adjust these in Phase 1 when we see them on real content.

> [!WARNING]
> **Before Phase 0 begins**, you need:
> 1. A **GitHub OAuth App** created at https://github.com/settings/developers for local dev (`http://localhost:3000/api/auth/callback/github`)
> 2. A **Vercel account** connected to your GitHub
> 3. The `omsenjalia/portfolio-content` repo created (private, can be empty for now)

---

## Open Questions

> [!IMPORTANT]
> 1. **Which typography pairing do you prefer?** (Syne + DM Mono, Bebas Neue + DM Mono, or Clash Display + General Sans)
> 2. **Warm terracotta or cool blue accent?** (or should I mock up both in a quick HTML artifact?)
> 3. **`src/` directory or not?** Next.js supports both — `src/` is cleaner for a large project. I recommend yes.
> 4. **Package manager preference?** npm, pnpm, or yarn? (pnpm is fastest, npm is most compatible)
> 5. **Should we set up the `portfolio-content` repo now, or defer to Phase 1?** The app won't read from it in Phase 0, but having the structure ready helps.

---

## Research Summary

### Next.js 15 (App Router)
- **Package:** `create-next-app@latest` with `--yes` flag for defaults
- **Key flags:** `--ts --app --tailwind --eslint --src-dir --use-npm`
- **Current behavior:** TypeScript, App Router, Turbopack are all defaults
- **Requirement:** Node.js 20.9+
- **Docs:** https://nextjs.org/docs

### Tailwind CSS v4
- **No `tailwind.config.js` needed** — CSS-first configuration via `@theme` blocks
- **Setup:** `@import "tailwindcss";` in globals.css
- **PostCSS:** Uses `@tailwindcss/postcss` plugin
- **All theme tokens are native CSS variables** — perfect for our design system
- Automatic content detection — no `content` array needed

### Auth.js v5 (NextAuth)
- **Package:** `next-auth@beta` (v5)
- **Pattern:** Split config — `auth.config.ts` (Edge-safe) + `auth.ts` (full)
- **Route handler:** `/app/api/auth/[...nextauth]/route.ts`
- **Middleware:** Uses `auth.config.ts` for Edge-compatible route protection
- **Key change from v4:** `auth()` replaces `getServerSession()`; cookies/headers are now async in Next.js 15

### GSAP + @gsap/react
- **100% free** since April 2025 (Webflow acquisition)
- **All plugins included:** ScrollTrigger, ScrollSmoother, SplitText, etc.
- **React hook:** `useGSAP` from `@gsap/react` — handles cleanup automatically
- **Install:** `npm install gsap @gsap/react`

### Lenis (Smooth Scroll)
- **Package:** `lenis` on npm
- **Integration:** Syncs with GSAP's ticker for ScrollTrigger compatibility
- **Install:** `npm install lenis`

### Fonts
- **Syne:** Google Fonts ✓ — loaded via `next/font/google`
- **DM Mono:** Google Fonts ✓ — loaded via `next/font/google`
- **Bebas Neue:** Google Fonts ✓ (backup option)
- **Clash Display / General Sans / Satoshi:** Fontshare only (need self-hosting)

---

## Proposed Changes

### Component 1: Project Scaffolding

Create the Next.js 15 project with all dependencies installed.

#### [NEW] Project initialization (root)

```bash
# 1. Initialize Next.js with recommended defaults
npx -y create-next-app@latest ./ --ts --app --tailwind --eslint --src-dir --use-npm --yes

# 2. Install Phase 0 dependencies
npm install next-auth@beta gsap @gsap/react lenis

# 3. Install dev dependencies
npm install -D @types/node
```

**Directory structure after scaffolding:**
```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page (placeholder → Phase 1)
│   │   └── globals.css         # Tailwind + design system
│   └── ...
├── public/
├── package.json
├── tsconfig.json
├── postcss.config.mjs
├── next.config.ts
└── .env.local                  # (gitignored) Auth secrets
```

---

### Component 2: Design System (CSS + Theme)

All design tokens live in `globals.css` using Tailwind v4's `@theme` block. This is the single source of truth for the entire visual system.

#### [MODIFY] [globals.css](file:///home/om/portfolio/src/app/globals.css)

Replace the default Tailwind boilerplate with our complete design system:

```css
@import "tailwindcss";

/* ============================================
   Design System — Notebook/Zine Portfolio
   ============================================ */

@theme {
  /* --- Color Palette --- */
  /* Paper/Background */
  --color-paper: #F4F0E6;
  --color-paper-warm: #EDE8DA;
  --color-paper-cool: #F0F0EC;

  /* Ink/Text */
  --color-ink: #1B1A17;
  --color-ink-light: #3D3B35;
  --color-ink-muted: #6B6860;
  --color-ink-faint: #9E9B93;

  /* Accent — Terracotta */
  --color-accent: #C4713B;
  --color-accent-hover: #A85E30;
  --color-accent-light: #E8A97A;

  /* Secondary — Teal */
  --color-teal: #2A6F6A;
  --color-teal-hover: #1E5450;
  --color-teal-light: #4A9E98;

  /* Surface (cards, blocks) */
  --color-surface: #FFFFFF;
  --color-surface-elevated: #FAFAF7;
  --color-border: #D8D4CA;
  --color-border-light: #E8E5DC;

  /* Feedback */
  --color-error: #B44040;
  --color-success: #3D7A4A;
  --color-warning: #B8860B;

  /* --- Typography Scale --- */
  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Mono', monospace;
  --font-code: 'DM Mono', monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-hero: clamp(3rem, 8vw, 10rem);

  /* --- Spacing --- */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;
  --space-section: clamp(4rem, 10vh, 8rem);

  /* --- Layout --- */
  --max-w-prose: 65ch;
  --max-w-page: 1280px;
  --max-w-wide: 1440px;

  /* --- Radius --- */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* --- Shadows --- */
  --shadow-sm: 0 1px 2px rgba(27, 26, 23, 0.06);
  --shadow-md: 0 4px 12px rgba(27, 26, 23, 0.08);
  --shadow-lg: 0 8px 24px rgba(27, 26, 23, 0.12);
  --shadow-card: 0 2px 8px rgba(27, 26, 23, 0.04), 0 0 0 1px rgba(27, 26, 23, 0.04);

  /* --- Transitions --- */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;

  /* --- Z-index scale --- */
  --z-base: 0;
  --z-above: 10;
  --z-nav: 100;
  --z-modal: 200;
  --z-cursor: 300;
  --z-loader: 400;
  --z-noise: 9999;
}

/* --- Base Styles --- */
html {
  scrollbar-width: none; /* Hide scrollbar (Lenis handles scroll) */
  background-color: var(--color-paper);
  color: var(--color-ink);
}

::-webkit-scrollbar {
  display: none;
}

body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* --- Noise texture overlay --- */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: var(--z-noise);
}

/* --- Typography --- */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

/* --- Selection --- */
::selection {
  background-color: var(--color-accent);
  color: var(--color-paper);
}

/* --- Focus --- */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* --- Links --- */
a {
  color: var(--color-accent);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}
a:hover {
  color: var(--color-accent-hover);
}

/* --- Reduced motion --- */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* --- GPU hints for animated elements --- */
.animated {
  will-change: transform, opacity;
}

/* --- Line mask for text reveals --- */
.line-mask {
  display: block;
  overflow: hidden;
}
.line-mask .line-inner {
  display: block;
}

/* --- Section utility --- */
.section-full {
  min-height: 100svh;
}
```

---

### Component 3: Root Layout & Font Loading

#### [MODIFY] [layout.tsx](file:///home/om/portfolio/src/app/layout.tsx)

Set up fonts via `next/font/google`, metadata, and the root HTML structure:

```tsx
import type { Metadata } from "next";
import { Syne, DM_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Om Senjalia — Developer & Thinker",
    template: "%s | Om Senjalia",
  },
  description:
    "Portfolio, blog, and notes by Om Senjalia. Projects, writing, and explorations in software engineering.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Om Senjalia",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

### Component 4: Auth.js v5 Configuration

Split into Edge-safe config and full auth instance, following the official v5 pattern.

#### [NEW] [auth.config.ts](file:///home/om/portfolio/src/auth.config.ts)

```typescript
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isAdmin = nextUrl.pathname.startsWith("/admin");
      const isLoggedIn = !!auth?.user;

      if (isAdmin) {
        if (!isLoggedIn) return false;
        // Only allow the site owner
        const isOwner = auth.user.email === process.env.ADMIN_EMAIL
          || (auth.user as any).login === "omsenjalia";
        return isOwner;
      }
      return true; // Public routes are always accessible
    },
  },
} satisfies NextAuthConfig;
```

#### [NEW] [auth.ts](file:///home/om/portfolio/src/auth.ts)

```typescript
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, profile }) {
      if (profile) {
        token.login = (profile as any).login; // GitHub username
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).login = token.login;
      }
      return session;
    },
  },
});
```

#### [NEW] [route.ts](file:///home/om/portfolio/src/app/api/auth/[...nextauth]/route.ts)

```typescript
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

---

### Component 5: Middleware (Admin Route Guard)

#### [NEW] [middleware.ts](file:///home/om/portfolio/src/middleware.ts)

```typescript
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/github/:path*",
  ],
};
```

---

### Component 6: Placeholder Pages

Minimal pages so we can verify the app runs and auth works.

#### [MODIFY] [page.tsx](file:///home/om/portfolio/src/app/page.tsx)

Home page placeholder — just verifies the design system is working:

```tsx
export default function Home() {
  return (
    <main className="section-full flex items-center justify-center">
      <div className="text-center max-w-prose mx-auto px-6">
        <h1 className="text-hero font-display font-bold tracking-tight text-ink mb-6">
          Om Senjalia
        </h1>
        <p className="text-lg text-ink-muted font-body">
          Developer & Thinker — Portfolio coming soon.
        </p>
      </div>
    </main>
  );
}
```

#### [NEW] [page.tsx](file:///home/om/portfolio/src/app/admin/page.tsx) (Admin dashboard placeholder)

```tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin");

  return (
    <main className="section-full flex items-center justify-center">
      <div className="text-center max-w-prose mx-auto px-6">
        <h1 className="text-4xl font-display font-bold mb-4">
          Admin Dashboard
        </h1>
        <p className="text-ink-muted font-body mb-4">
          Welcome, {session.user.name || "admin"}
        </p>
        <p className="text-sm text-ink-faint">
          Phase 0 — Auth is working. Dashboard UI comes in Phase 5.
        </p>
      </div>
    </main>
  );
}
```

#### [NEW] [page.tsx](file:///home/om/portfolio/src/app/admin/login/page.tsx) (Login page)

```tsx
import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <main className="section-full flex items-center justify-center">
      <div className="text-center max-w-sm mx-auto px-6">
        <h1 className="text-3xl font-display font-bold mb-6">Sign In</h1>
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/admin" });
          }}
        >
          <button
            type="submit"
            className="px-6 py-3 bg-ink text-paper font-body rounded-md
                       hover:bg-ink-light transition-colors duration-300"
          >
            Continue with GitHub
          </button>
        </form>
      </div>
    </main>
  );
}
```

---

### Component 7: Smooth Scroll Provider (Lenis)

A client component that initializes Lenis and syncs it with GSAP, ready for Phase 6 animations.

#### [NEW] [SmoothScroll.tsx](file:///home/om/portfolio/src/components/providers/SmoothScroll.tsx)

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
    });

    // Sync Lenis with GSAP's ticker
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Respect reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      lenis.destroy();
      return;
    }

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

Then wrap the `<body>` children in `layout.tsx`:
```tsx
<body>
  <SmoothScroll>{children}</SmoothScroll>
</body>
```

---

### Component 8: Environment & Configuration

#### [NEW] [.env.local](file:///home/om/portfolio/.env.local) (gitignored)

```env
# Auth.js
AUTH_SECRET=  # Generate with: npx auth secret
AUTH_GITHUB_ID=  # From GitHub OAuth App
AUTH_GITHUB_SECRET=  # From GitHub OAuth App
ADMIN_EMAIL=  # Your GitHub email

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# GitHub API (for future phases)
GITHUB_PAT=  # Fine-grained PAT, scoped to your repos
GITHUB_OWNER=omsenjalia
```

#### [NEW] [.env.example](file:///home/om/portfolio/.env.example)

Same structure as `.env.local` but with placeholder descriptions instead of values — committed to the repo so others know what env vars are needed.

#### [MODIFY] [next.config.ts](file:///home/om/portfolio/next.config.ts)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  experimental: {
    // Enable server actions (default in Next.js 15, but explicit for clarity)
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
};

export default nextConfig;
```

---

## File Summary

| Action | File | Purpose |
|--------|------|---------|
| MODIFY | `src/app/globals.css` | Complete design system (colors, typography, spacing, utilities) |
| MODIFY | `src/app/layout.tsx` | Root layout with fonts, metadata, SmoothScroll provider |
| MODIFY | `src/app/page.tsx` | Home placeholder verifying design system |
| MODIFY | `next.config.ts` | Image domains, server actions config |
| NEW | `src/auth.config.ts` | Edge-safe Auth.js config (providers, callbacks) |
| NEW | `src/auth.ts` | Full Auth.js instance (JWT, session) |
| NEW | `src/middleware.ts` | Admin route protection |
| NEW | `src/app/api/auth/[...nextauth]/route.ts` | Auth API handler |
| NEW | `src/app/admin/page.tsx` | Admin dashboard placeholder |
| NEW | `src/app/admin/login/page.tsx` | GitHub login page |
| NEW | `src/components/providers/SmoothScroll.tsx` | Lenis smooth scroll + GSAP sync |
| NEW | `.env.local` | Secret env vars (gitignored) |
| NEW | `.env.example` | Env var documentation (committed) |

---

## Verification Plan

### Automated Tests
After implementation, verify:
```bash
# TypeScript compiles without errors
npx tsc --noEmit

# Dev server starts successfully
npm run dev

# Build succeeds (production check)
npm run build
```

### Manual Verification
1. **Home page** — Visit `http://localhost:3000`, verify:
   - Cream/paper background with noise texture
   - Syne font for heading, DM Mono for body
   - "Om Senjalia" hero text centered
2. **Auth flow** — Click through to `/admin`, verify:
   - Redirects to `/admin/login`
   - "Continue with GitHub" button works
   - After login, shows admin dashboard with user name
   - Non-owner GitHub accounts are rejected
3. **Design system** — Inspect in DevTools:
   - CSS custom properties are all defined
   - Tailwind classes using theme tokens work (`text-ink`, `bg-paper`, etc.)
4. **Smooth scroll** — Verify Lenis is active (scroll should feel buttery)
5. **Reduced motion** — Enable `prefers-reduced-motion` in DevTools, verify animations are disabled
6. **Vercel deploy** — Push to GitHub, verify Vercel auto-deploys successfully

### Lighthouse Targets (Phase 0)
- Performance: > 95
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 80 (will improve in Phase 7)
