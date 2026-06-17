# Portfolio — Phase 2: Projects (Handoff)

## Context
Next.js 16 portfolio with a notebook/book UI. Phase 1 delivered a single-page book app. **Phase 2 (Projects) is partially built already** — what exists needs to be committed, then routes and detail pages added.

## Phase 2 Progress Checklist

### Already Done
- `projects.json` in `/home/om/portfolio-content` — curated overrides for 4 featured repos, **untracked** (needs `git add` + commit + push)
- `src/lib/projects.ts` — Octokit wrapper, `getProjectRepos()` fetches 50 repos, fetches README previews, merges with overrides, returns `ProjectOverview[]`
- `src/app/page.tsx` — imports `getProjectRepos()`, passes `projects` to Book
- `src/components/book/Book.tsx` — has a "Projects" internal page (page 9 in the book) rendering featured project cards with name, description, language, topics
- `octokit@^5.0.5` in `package.json` — already installed
- `GITHUB_PAT` in `.env.local` with full repo scope

### Still Missing
1. **No `/projects` route** — standalone grid page outside the book
2. **No `/projects/[slug]` route** — detail page with full README rendering
3. **No markdown-to-HTML** — need a renderer for README content (use `react-markdown` + `remark-gfm`)
4. **projects.json untracked** — needs commit + push in portfolio-content
5. **Uncommitted app changes** — 12 modified/untracked files in portfolio repo (all the book components, projects.ts, etc.)

## Repos
- **App**: `/home/om/portfolio` — `https://github.com/omsenjalia/portfolio`
- **Content**: `/home/om/portfolio-content` — `https://github.com/omsenjalia/portfolio-content`
- **Token**: `GITHUB_PAT` in `.env.local`
- **Branch**: `master` on both

## Key Files
- `src/lib/projects.ts` — Octokit wrapper, repo fetching, override merging (100 lines, working)
- `src/lib/content.ts` — GitHub content fetcher (pattern to follow for README fetching)
- `src/app/page.tsx` — Server component, currently fetches all data, passes to Book (47 lines)
- `src/components/book/Book.tsx` — Book component, pages[8] is the Projects internal page (465 lines)
- `next.config.ts` — Has blanket redirects for `/about`, `/cv`, `/now`, `/uses`, `/colophon` to `/`
- `package.json` — `next`, `react`, `octokit`, `gsap`, `lenis`, `next-auth`

## What to Build

### 1. Commit & Push Everything (start with this)
```bash
# portfolio-content
cd /home/om/portfolio-content
git add projects.json
git commit -m "Phase 2: curated project overrides for featured repos"
git push

# portfolio
cd /home/om/portfolio
git add -A
git commit -m "Phase 2: Octokit repo sync, project model, book UI refinements"
git push
```

### 2. Install `react-markdown` + `remark-gfm`
```bash
npm install react-markdown remark-gfm
```

### 3. Create `/projects` route
- `src/app/projects/page.tsx` — grid of repos (all repos, not just featured)
- Card: name, description, language badge, star count, topics
- Featured repos get a visual indicator (accent border or badge)
- Link each card to `/projects/[name]`
- Server component, uses `getProjectRepos()` from `@/lib/projects`
- Add ISR with `revalidate: 3600`

### 4. Create `/projects/[slug]` route
- `src/app/projects/[slug]/page.tsx` — detail page
- Fetch single repo data via Octokit (`getOctokit().rest.repos.get(...)`)
- Fetch full README via Octokit (`getOctokit().rest.repos.getReadme(...)`)
- Render README with `react-markdown` + `remark-gfm`
- Show: repo name, description, stats (stars, forks, language, topics), GitHub link
- Server component with ISR
- 404 if repo doesn't exist

### 5. Wire up within the Book
- In `Book.tsx` pages, the "Projects" internal page currently links featured repos to GitHub URLs. Change internal cards to link to `/projects/[name]` instead.
- Add "View all projects" link at bottom of the Book's Projects page to `/projects`

### 6. Update redirects
- In `next.config.ts`, add `/projects` to the routes that redirect to `/` if you want it to also work inside the book only. OR keep `/projects` as a standalone route (recommended: keep it standalone, it won't conflict with `redirects` since `projects` is not in the redirect list).

## Design Tokens (from globals.css)
- Background: `#FAFBED` (`var(--color-background)`)
- Ink: `#1C1917` (`var(--color-ink)`)
- Accent: `#DB2777` (`var(--color-accent)`)
- Book/gold accent: `#FFBA00` (`var(--color-book)`)
- Font: Syne (display) + DM Mono (body)
- A4/notebook aesthetic with cream paper, noise texture overlay

## Data Flow
```
portfolio-content/projects.json  -------+
                                        +---> getProjectRepos() ---> merge ---> ProjectOverview[]
GitHub API (Octokit) ---> repos list ---+
```
- `getProjectRepos()` returns `ProjectOverview[]` with `featured: boolean` and `blurb?: string` from overrides
- Repos without overrides get `featured: false`, no blurb

## Verification
- `npm run build` must succeed
- `/projects` shows repo grid with all repos
- `/projects/skywave-remake` shows detail page with rendered README
- Clicking a project card in the Book navigates to the route
- Mobile responsive (use Tailwind breakpoints)

## Notes
- The Book component has a mobile vs desktop split: below 768px it renders a flat scrollable list, above 768px it renders the 3D book. The Projects route pages should be responsive for both.
- `proxy.ts` at `/home/om/portfolio/src/proxy.ts` is dead code — Next.js only reads `middleware.ts`. Don't worry about fixing this in Phase 2.
- `.env.local` has `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` blank — Auth.js sign-in won't work until those are filled in. Not blocking Phase 2.
