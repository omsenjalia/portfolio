"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { GitHubProfile } from "@/lib/github";
import type { CVData, UsesData, Pin } from "@/lib/content";
import type { ProjectOverview } from "@/lib/projects";
import BookCover from "./BookCover";
import BookSpread from "./BookSpread";
import BookNavigation from "./BookNavigation";
import BookPagination from "./BookPagination";
import BookmarksPanel from "./BookmarksPanel";

type BookData = {
  profile: GitHubProfile | null;
  cv: CVData | null;
  now: string | null;
  uses: UsesData | null;
  pins: Pin[];
  isAdmin: boolean;
  projects?: ProjectOverview[];
};

type PageDef = {
  title: string;
  render: (data: BookData) => React.ReactNode;
};

const pages: PageDef[] = [
  {
    title: "Cover",
    render: ({ profile }) => (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <div className="flex flex-row font-bold text-2xl md:text-3xl text-ink">
          <span>𝓞</span><span>𝓶</span>
          <span className="ml-2">𝓢</span><span>𝓮</span><span>𝓷</span><span>𝓳</span><span>𝓪</span><span>𝓵</span><span>𝓲</span><span>𝓪</span>
        </div>
        <div className="text-center text-sm text-ink-muted">Personal Notebook &amp; Portfolio</div>
        {profile && (
          <div className="mt-4 text-xs text-ink-faint">{profile.login}</div>
        )}
      </div>
    ),
  },
  {
    title: "package.json",
    render: ({ profile }) => (
      <div className="h-full p-2 font-mono relative pl-2 overflow-hidden min-h-full flex flex-col">
        <h1 className="text-lg font-bold text-ink mb-4">📦 package.json</h1>
        <div className="flex flex-col text-xs overflow-auto h-full">
          <div>
            <span className="text-accent font-semibold">name</span>:<span className="text-ink-muted">&quot;{profile?.name || "omsenjalia"}&quot;</span>
          </div>
          <div>
            <span className="text-accent font-semibold">description</span>:<span className="text-ink-muted">&quot;Notebook &amp; Portfolio&quot;</span>
          </div>
          <div>
            <span className="text-accent font-semibold">version</span>:<span className="text-ink-muted">&quot;1.0.0&quot;</span>
          </div>
          <div>
            <span className="text-accent font-semibold">bio</span>:<span className="text-ink-muted">&quot;{profile?.bio || "Aspiring Software Engineer"}&quot;</span>
          </div>
          <div>
            <span className="text-accent font-semibold">location</span>:<span className="text-ink-muted">&quot;{profile?.location || "India"}&quot;</span>
          </div>
          {profile && (
            <>
              <div>
                <span className="text-accent font-semibold">repos</span>:<span className="text-ink-muted"> {profile.public_repos}</span>
              </div>
              <div>
                <span className="text-accent font-semibold">followers</span>:<span className="text-ink-muted"> {profile.followers}</span>
              </div>
            </>
          )}
          <div className="w-full mt-3">
            <span className="text-accent font-semibold">links</span>:
            <div className="ml-6 mt-1 flex flex-col gap-1 text-xs">
              <button className="flex gap-1 flex-row items-start text-left cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="text-[10px] mt-0.5 shrink-0 w-fit text-ink-muted"><path fill="currentColor" d="M1 21h22L12 2" /></svg>
                <span className="text-error">github</span> — <span className="text-ink-muted line-clamp-1">{profile?.html_url || "github.com/omsenjalia"}</span>
              </button>
              <a href={profile?.html_url || "#"} target="_blank" rel="noopener noreferrer" className="flex gap-1 flex-row items-start ml-6 mt-1 text-book hover:text-[#D9A100]">
                github.com/{profile?.login} &rarr;
              </a>
            </div>
          </div>
          <div className="mt-4 mb-2">
            <span className="text-accent font-semibold">dependencies</span>:
            <div className="ml-6 mt-1 flex flex-wrap gap-2 text-xs">
              {["react ^19.2.4", "next ^16.2.9", "gsap ^3.15.0", "lenis ^1.3.23", "octokit ^5.0.5", "next-auth ^5.0.0"].map((dep) => (
                <span key={dep} className="px-2 py-1 rounded bg-success/10 text-success/90">{dep}</span>
              ))}
            </div>
          </div>
          <div className="mt-2">
            <span className="text-accent font-semibold">devDependencies</span>:
            <div className="ml-6 mt-1 flex flex-wrap gap-2 text-xs">
              {["tailwindcss ^4", "typescript ^5", "eslint ^9"].map((dep) => (
                <span key={dep} className="px-2 py-1 rounded bg-warning/10 text-warning/90">{dep}</span>
              ))}
            </div>
          </div>
          <div className="mt-4 text-xs text-ink-faint italic">// Thanks for scrolling down here! :)</div>
        </div>
      </div>
    ),
  },
  {
    title: "Contents",
    render: ({ profile }) => (
      <div className="flex flex-col h-full">
        <h2 className="text-base font-bold text-ink mb-6 font-display tracking-tight">Contents</h2>
        <div className="space-y-2 text-ink">
          {["Cover", "package.json", "Contents", "About", "CV", "Now", "Uses", "Projects", "Colophon"].map((p, i) => (
            <div key={p} className="flex items-center gap-2">
              <span className="text-[10px] text-ink-faint font-bold w-5 tabular-nums">{i + 1}.</span>
              <span className="font-bold tracking-wide">{p}</span>
            </div>
          ))}
        </div>
        {profile && (
          <div className="mt-auto pt-4 border-t border-ink-border/40 text-[10px] text-ink-faint">
            {profile.name || profile.login} &middot; {profile.followers} followers
          </div>
        )}
      </div>
    ),
  },
  {
    title: "About",
    render: ({ profile }) => (
      <div className="h-full">
        <h2 className="text-base font-bold text-ink mb-4 font-display tracking-tight">About</h2>
        <div className="space-y-3 text-ink leading-relaxed">
          {profile?.avatar_url && (
            <div className="flex items-center gap-3 mb-2">
              <img src={profile.avatar_url} alt="" className="w-8 h-8 rounded-full border border-ink-border/40" />
              <span className="font-bold text-sm">{profile.name}</span>
            </div>
          )}
          <p className="text-[11px]">{profile?.bio || "Aspiring software engineer, always learning."}</p>
          <p className="text-[11px]">12th grade student exploring software engineering. Building things that look good and work well.</p>
        </div>
      </div>
    ),
  },
  {
    title: "CV",
    render: ({ cv }) => (
      <div className="h-full">
        <h2 className="text-base font-bold text-ink mb-4 font-display tracking-tight">CV</h2>
        {cv ? (
          <div className="space-y-4 text-ink">
            {cv.summary && <p className="text-[11px] leading-relaxed">{cv.summary}</p>}
            {cv.education.length > 0 && (
              <div>
                <h3 className="text-[10px] font-bold tracking-widest text-ink-faint uppercase mb-2">Education</h3>
                {cv.education.map((e, i) => (
                  <div key={i} className="text-[11px] border-l-2 border-ink-border-light pl-3 mb-2">
                    <p className="font-bold">{e.institution}</p>
                    <p className="text-ink-muted">{e.degree} &middot; {e.startDate}&ndash;{e.endDate}</p>
                  </div>
                ))}
              </div>
            )}
            {cv.skills.length > 0 && (
              <div>
                <h3 className="text-[10px] font-bold tracking-widest text-ink-faint uppercase mb-2">Skills</h3>
                <div className="flex flex-wrap gap-1">
                  {cv.skills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 border border-ink-border/40 rounded text-[10px]">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-[11px] text-ink-faint italic">Loading...</p>
        )}
      </div>
    ),
  },
  {
    title: "Now",
    render: ({ now }) => (
      <div className="h-full">
        <h2 className="text-base font-bold text-ink mb-4 font-display tracking-tight">/now</h2>
        {now ? (
          <div className="text-[11px] text-ink space-y-2 leading-relaxed whitespace-pre-line">{now}</div>
        ) : (
          <p className="text-[11px] text-ink-faint italic">Loading...</p>
        )}
      </div>
    ),
  },
  {
    title: "Uses",
    render: ({ uses }) => (
      <div className="h-full">
        <h2 className="text-base font-bold text-ink mb-4 font-display tracking-tight">/uses</h2>
        {uses ? (
          <div className="space-y-2 text-[11px]">
            {([["OS", uses.os], ["WM", uses.wm], ["Terminal", uses.terminal], ["Editor", uses.editor]] as const)
              .filter(([_, v]) => v)
              .map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-ink-border-light pb-1">
                  <span className="text-ink-faint uppercase tracking-widest text-[10px]">{label}</span>
                  <span className="text-ink">{value}</span>
                </div>
              ))}
            {uses.ai.length > 0 && (
              <div className="pt-2">
                <span className="text-ink-faint uppercase tracking-widest text-[10px]">AI</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {uses.ai.map((a, i) => (
                    <span key={i} className="px-2 py-0.5 border border-ink-border/40 rounded text-[10px]">{a}</span>
                  ))}
                </div>
              </div>
            )}
            {uses.dotfiles && (
              <div className="pt-2">
                <span className="text-ink-faint uppercase tracking-widest text-[10px]">Dotfiles</span>
                <a href={uses.dotfiles} target="_blank" rel="noopener noreferrer" className="block text-book hover:text-[#D9A100] mt-1 text-[11px]">{uses.dotfiles}</a>
              </div>
            )}
          </div>
        ) : (
          <p className="text-[11px] text-ink-faint italic">Loading...</p>
        )}
      </div>
    ),
  },
  {
    title: "Projects",
    render: ({ projects }) => (
      <div className="h-full">
        <h2 className="text-base font-bold text-ink mb-4 font-display tracking-tight">/projects</h2>
        {projects && projects.length > 0 ? (
          <div className="space-y-3">
            {projects.filter(p => p.featured).map(p => (
              <a key={p.name} href={p.html_url} target="_blank" rel="noopener noreferrer"
                className="block p-3 border border-ink-border/40 rounded-sm hover:bg-background/30 transition-colors group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-bold text-ink group-hover:text-accent transition-colors">{p.name}</span>
                  {p.language && (
                    <span className="text-[9px] px-1.5 py-0.5 border border-ink-border/40 rounded text-ink-muted">{p.language}</span>
                  )}
                </div>
                <p className="text-[10px] text-ink-muted leading-relaxed">{p.blurb || p.description}</p>
                {p.topics && p.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.topics.slice(0, 4).map(t => (
                      <span key={t} className="text-[8px] px-1.5 py-0.5 bg-accent/5 text-accent rounded">{t}</span>
                    ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        ) : (
          <p className="text-[11px] text-ink-faint italic">Projects loading...</p>
        )}
      </div>
    ),
  },
  {
    title: "Colophon",
    render: () => (
      <div className="h-full">
        <h2 className="text-base font-bold text-ink mb-4 font-display tracking-tight">Colophon</h2>
        <div className="space-y-2 text-[11px] text-ink leading-relaxed">
          <p><strong className="font-bold">Next.js 16</strong> &mdash; App Router</p>
          <p><strong className="font-bold">Tailwind v4</strong> &mdash; Design tokens</p>
          <p><strong className="font-bold">Auth.js v5</strong> &mdash; GitHub OAuth</p>
          <p><strong className="font-bold">GSAP + Lenis</strong> &mdash; Animations</p>
          <p className="pt-3 border-t border-ink-border-light mt-2"><strong>Syne</strong> + <strong>DM Mono</strong> &middot; Golden on cream &middot; Notebook/zine</p>
          <a href="https://github.com/omsenjalia/portfolio" target="_blank" rel="noopener noreferrer" className="text-book hover:text-[#D9A100] block pt-1">Source &rarr;</a>
        </div>
      </div>
    ),
  },
];

type Props = BookData;

export default function Book({ profile, cv, now, uses, pins, isAdmin, projects }: Props) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [spread, setSpread] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const bookmarksRef = useRef<HTMLDivElement>(null);

  const totalPages = pages.length;
  const totalSpreads = Math.ceil(totalPages / 2);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const leftIdx = (s: number) => (s - 1) * 2;
  const rightIdx = (s: number) => (s - 1) * 2 + 1;

  const openBook = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setOpen(true);
    setSpread(1);
    setTimeout(() => setAnimating(false), 1500);
  }, [animating]);

  const closeBook = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setOpen(false);
    setSpread(0);
    setTimeout(() => setAnimating(false), 1000);
  }, [animating]);

  const goToSpread = useCallback((target: number) => {
    if (animating) return;
    const clamped = Math.max(1, Math.min(target, totalSpreads));
    if (clamped === spread) return;
    setAnimating(true);
    setSpread(clamped);
    setTimeout(() => setAnimating(false), 400);
  }, [animating, spread, totalSpreads]);

  const prev = useCallback(() => {
    if (spread > 1) goToSpread(spread - 1);
  }, [spread, goToSpread]);

  const next = useCallback(() => {
    if (spread < totalSpreads) goToSpread(spread + 1);
    else closeBook();
  }, [spread, totalSpreads, goToSpread, closeBook]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (bookmarksOpen) return;
      if (e.key === "ArrowRight" && !e.repeat) next();
      if (e.key === "ArrowLeft" && !e.repeat) prev();
    };
    addEventListener("keydown", handler);
    return () => removeEventListener("keydown", handler);
  }, [next, prev, bookmarksOpen]);

  useEffect(() => {
    if (!bookmarksOpen) return;
    const handler = (e: MouseEvent) => {
      if (bookmarksRef.current && !bookmarksRef.current.contains(e.target as Node)) {
        setBookmarksOpen(false);
      }
    };
    setTimeout(() => addEventListener("click", handler), 0);
    return () => removeEventListener("click", handler);
  }, [bookmarksOpen]);

  if (!mounted) {
    return (
      <div className="bg-background h-dvh w-screen overflow-hidden flex items-center justify-center">
        <div className="font-display text-ink-muted text-sm tracking-widest uppercase">Loading...</div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="bg-background min-h-dvh w-screen overflow-y-auto flex flex-col">
        <div className="sticky top-0 bg-background/95 backdrop-blur z-10 flex items-center justify-between px-4 py-3 border-b border-ink-border/40">
          <span className="font-display font-bold text-sm text-ink">Book of Life</span>
          {isAdmin && (
            <button onClick={() => setBookmarksOpen(!bookmarksOpen)}
              className="text-[10px] font-bold tracking-[0.2em] text-ink-muted uppercase hover:text-ink transition-colors">
              {bookmarksOpen ? "Close" : "Bookmarks"}
            </button>
          )}
        </div>
        <div className="flex-1 px-4 py-6 space-y-6 max-w-lg mx-auto w-full">
          {pages.map((p, i) => (
            <div key={i} className="bg-page rounded-lg shadow-md p-6 border border-ink-border/30">
              <div className="text-[10px] text-ink-faint font-bold tabular-nums mb-3 font-mono">
                {i + 1} / {totalPages}
              </div>
              <div className="book-page-content">
                {p.render({ profile, cv, now, uses, pins, isAdmin, projects })}
              </div>
            </div>
          ))}
        </div>
        <div className="h-8" />
        {bookmarksOpen && <BookmarksPanel pins={pins} ref={bookmarksRef} onClose={() => setBookmarksOpen(false)} />}
      </div>
    );
  }

  const leftPageIdx = leftIdx(spread);
  const rightPageIdx = rightIdx(spread);
  const valid = leftPageIdx >= 0 && rightPageIdx < totalPages;

  const pageData = {
    profile, cv, now, uses, pins, isAdmin, projects,
  };

  return (
    <div className="bg-background h-dvh w-screen overflow-hidden flex flex-col items-center select-none">
      {/* Top Navigation */}
      <div className="w-full max-w-5xl px-6 py-3">
        <BookNavigation
          onGoToPage={(n) => goToSpread(Math.ceil(n / 2))}
          onToggleBookmarks={() => setBookmarksOpen(!bookmarksOpen)}
          bookmarksOpen={bookmarksOpen}
          showBookmarks={isAdmin}
        />
      </div>

      {/* Book */}
      <div className="flex-1 flex items-center justify-center w-full px-4 pb-2">
        <div className={`book-container relative w-full max-w-4xl aspect-[4/3] max-h-[75vh] ${open ? "book-cover-opened" : ""}`}>
          {/* Spread is always rendered behind the cover */}
          {valid && (
            <BookSpread
              leftPage={{
                content: pages[leftPageIdx]?.render(pageData),
                title: pages[leftPageIdx]?.title,
                pageNum: leftPageIdx + 1,
              }}
              rightPage={{
                content: pages[rightPageIdx]?.render(pageData),
                title: pages[rightPageIdx]?.title,
                pageNum: rightPageIdx + 1,
              }}
            />
          )}

          {/* Cover sits on top; CSS handles the flip animation */}
          <BookCover onOpen={openBook} open={open} animating={animating} />
        </div>
      </div>

      {/* Bottom Pagination */}
      <div className="w-full max-w-5xl px-6 pb-3">
        <BookPagination
          spread={spread}
          totalSpreads={totalSpreads}
          leftPageIdx={leftPageIdx}
          rightPageIdx={rightPageIdx}
          onPrev={prev}
          onNext={next}
          onGoToSpread={goToSpread}
        />
      </div>

      {bookmarksOpen && <BookmarksPanel pins={pins} ref={bookmarksRef} onClose={() => setBookmarksOpen(false)} />}
    </div>
  );
}
