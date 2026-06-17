"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { GitHubProfile } from "@/lib/github";
import type { CVData, UsesData, Pin } from "@/lib/content";
import gsap from "gsap";

type BookData = {
  profile: GitHubProfile | null;
  cv: CVData | null;
  now: string | null;
  uses: UsesData | null;
  pins: Pin[];
  isAdmin: boolean;
};

type PageDef = {
  title: string;
  render: (data: BookData) => React.ReactNode;
};

const pages: PageDef[] = [
  {
    title: "Contents",
    render: ({ profile }) => (
      <div className="flex flex-col h-full p-8 font-body text-sm">
        <h2 className="text-base font-bold text-ink mb-6 font-display tracking-tight">Contents</h2>
        <div className="space-y-2 text-ink">
          {["Welcome", "About", "CV", "Now", "Uses", "Colophon"].map((p, i) => (
            <div key={p} className="flex items-center gap-2">
              <span className="text-[10px] text-accent font-bold w-5 tabular-nums">{i + 2}.</span>
              <span className="font-bold tracking-wide">{p}</span>
            </div>
          ))}
        </div>
        {profile && (
          <div className="mt-auto pt-4 border-t border-border text-[10px] text-ink-faint">
            {profile.name || profile.login} · {profile.followers} followers
          </div>
        )}
      </div>
    ),
  },
  {
    title: "Welcome",
    render: ({ profile }) => (
      <div className="flex flex-col h-full p-8 font-mono text-[11px] overflow-auto">
        <h2 className="text-base font-bold text-ink mb-4 font-display tracking-tight">package.json</h2>
        <div className="space-y-1.5 text-ink leading-relaxed">
          <div>
            <span className="text-accent font-semibold">name</span>
            <span className="text-ink-muted ml-2">&quot;{profile?.name || "omsenjalia"}&quot;</span>
          </div>
          <div>
            <span className="text-accent font-semibold">description</span>
            <span className="text-ink-muted ml-2">&quot;Notebook &amp; Portfolio&quot;</span>
          </div>
          <div>
            <span className="text-accent font-semibold">version</span>
            <span className="text-ink-muted ml-2">&quot;1.0.0&quot;</span>
          </div>
          <div>
            <span className="text-accent font-semibold">bio</span>
            <span className="text-ink-muted ml-2">&quot;{profile?.bio || "Aspiring Software Engineer"}&quot;</span>
          </div>
          <div>
            <span className="text-accent font-semibold">location</span>
            <span className="text-ink-muted ml-2">&quot;{profile?.location || "India"}&quot;</span>
          </div>
          {profile && (
            <>
              <div>
                <span className="text-accent font-semibold">repos</span>
                <span className="text-ink-muted ml-2">{profile.public_repos}</span>
              </div>
              <div>
                <span className="text-accent font-semibold">followers</span>
                <span className="text-ink-muted ml-2">{profile.followers}</span>
              </div>
            </>
          )}
          <div className="!mt-6 pt-3 border-t border-border">
            <a href={profile?.html_url || "#"} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              github.com/{profile?.login} →
            </a>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "About",
    render: ({ profile }) => (
      <div className="flex flex-col h-full p-8 font-body text-sm overflow-auto">
        <h2 className="text-base font-bold text-ink mb-4 font-display tracking-tight">About</h2>
        <div className="space-y-3 text-ink leading-relaxed">
          {profile?.avatar_url && (
            <div className="flex items-center gap-3 mb-2">
              <img src={profile.avatar_url} alt="" className="w-8 h-8 rounded-full border border-border" />
              <span className="font-bold text-sm">{profile.name}</span>
            </div>
          )}
          <p className="text-xs">{profile?.bio || "Aspiring software engineer, always learning."}</p>
          <p className="text-xs">12th grade student exploring software engineering. Building things that look good and work well.</p>
        </div>
      </div>
    ),
  },
  {
    title: "CV",
    render: ({ cv }) => (
      <div className="flex flex-col h-full p-8 font-body text-sm overflow-auto">
        <h2 className="text-base font-bold text-ink mb-4 font-display tracking-tight">CV</h2>
        {cv ? (
          <div className="space-y-4 text-ink">
            {cv.summary && <p className="text-[11px] leading-relaxed">{cv.summary}</p>}
            {cv.education.length > 0 && (
              <div>
                <h3 className="text-[10px] font-bold tracking-widest text-ink-faint uppercase mb-2">Education</h3>
                {cv.education.map((e, i) => (
                  <div key={i} className="text-[11px] border-l-2 border-border-light pl-3 mb-2">
                    <p className="font-bold">{e.institution}</p>
                    <p className="text-ink-muted">{e.degree} · {e.startDate}–{e.endDate}</p>
                  </div>
                ))}
              </div>
            )}
            {cv.skills.length > 0 && (
              <div>
                <h3 className="text-[10px] font-bold tracking-widest text-ink-faint uppercase mb-2">Skills</h3>
                <div className="flex flex-wrap gap-1">
                  {cv.skills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 border border-border rounded text-[10px]">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-ink-faint italic">Loading...</p>
        )}
      </div>
    ),
  },
  {
    title: "Now",
    render: ({ now }) => (
      <div className="flex flex-col h-full p-8 font-body text-sm overflow-auto">
        <h2 className="text-base font-bold text-ink mb-4 font-display tracking-tight">/now</h2>
        {now ? (
          <div className="text-xs text-ink space-y-2 leading-relaxed whitespace-pre-line">{now}</div>
        ) : (
          <p className="text-xs text-ink-faint italic">Loading...</p>
        )}
      </div>
    ),
  },
  {
    title: "Uses",
    render: ({ uses }) => (
      <div className="flex flex-col h-full p-8 font-body text-sm overflow-auto">
        <h2 className="text-base font-bold text-ink mb-4 font-display tracking-tight">/uses</h2>
        {uses ? (
          <div className="space-y-2 text-[11px]">
            {([["OS", uses.os], ["WM", uses.wm], ["Terminal", uses.terminal], ["Editor", uses.editor]] as const)
              .filter(([_, v]) => v)
              .map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-border-light pb-1">
                  <span className="text-ink-faint uppercase tracking-widest text-[10px]">{label}</span>
                  <span className="text-ink">{value}</span>
                </div>
              ))}
            {uses.ai.length > 0 && (
              <div className="pt-2">
                <span className="text-ink-faint uppercase tracking-widest text-[10px]">AI</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {uses.ai.map((a, i) => (
                    <span key={i} className="px-2 py-0.5 border border-border rounded text-[10px]">{a}</span>
                  ))}
                </div>
              </div>
            )}
            {uses.dotfiles && (
              <div className="pt-2">
                <span className="text-ink-faint uppercase tracking-widest text-[10px]">Dotfiles</span>
                <a href={uses.dotfiles} target="_blank" rel="noopener noreferrer" className="block text-accent hover:underline mt-1 text-xs">{uses.dotfiles}</a>
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-ink-faint italic">Loading...</p>
        )}
      </div>
    ),
  },
  {
    title: "Colophon",
    render: () => (
      <div className="flex flex-col h-full p-8 font-body text-sm overflow-auto">
        <h2 className="text-base font-bold text-ink mb-4 font-display tracking-tight">Colophon</h2>
        <div className="space-y-2 text-[11px] text-ink leading-relaxed">
          <p><strong className="font-bold">Next.js 16</strong> — App Router</p>
          <p><strong className="font-bold">Tailwind v4</strong> — Design tokens</p>
          <p><strong className="font-bold">Auth.js v5</strong> — GitHub OAuth</p>
          <p><strong className="font-bold">GSAP + Lenis</strong> — Animations</p>
          <p className="pt-3 border-t border-border-light mt-2"><strong>Syne</strong> + <strong>DM Mono</strong> · Terracotta on cream · Notebook/zine</p>
          <a href="https://github.com/omsenjalia/portfolio" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline block pt-1">Source →</a>
        </div>
      </div>
    ),
  },
];

type Props = BookData;

export default function Book({ profile, cv, now, uses, pins, isAdmin }: Props) {
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = pages.length;

  const openBook = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setOpen(true);
    gsap.to(coverRef.current, {
      rotationY: -180,
      transformOrigin: "left center",
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        setPage(1);
        setAnimating(false);
      },
    });
  }, [animating]);

  const closeBook = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    gsap.to(coverRef.current, {
      rotationY: 0,
      transformOrigin: "left center",
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setOpen(false);
        setPage(0);
        setAnimating(false);
      },
    });
  }, [animating]);

  const go = useCallback((n: number) => {
    if (animating) return;
    setPage(Math.max(1, Math.min(n, total)));
  }, [animating, total]);

  const prev = useCallback(() => {
    if (animating) return;
    if (page > 1) go(page - 1);
  }, [animating, page, go]);

  const next = useCallback(() => {
    if (animating) return;
    if (page < total) go(page + 1);
    else closeBook();
  }, [animating, page, total, go, closeBook]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && !e.repeat) next();
      if (e.key === "ArrowLeft" && !e.repeat) prev();
    };
    addEventListener("keydown", handler);
    return () => removeEventListener("keydown", handler);
  }, [next, prev]);

  if (!mounted) {
    return (
      <div className="bg-paper h-dvh w-screen overflow-hidden flex items-center justify-center">
        <div className="font-display text-ink-muted text-sm tracking-widest uppercase">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-paper h-dvh w-screen overflow-hidden flex flex-col items-center select-none">
      <div className="flex items-center justify-between w-full max-w-5xl px-6 py-3">
        <button
          onClick={() => go(1)}
          className="text-[10px] font-bold tracking-[0.2em] text-ink-muted uppercase hover:text-ink transition-colors"
        >
          Contents
        </button>
        <button
          onClick={() => {}}
          className="text-[10px] font-bold tracking-[0.2em] text-ink-muted uppercase hover:text-ink transition-colors"
        >
          Bookmarks
        </button>
        <button
          onClick={closeBook}
          disabled={!open}
          className="text-[10px] text-ink-muted hover:text-ink disabled:opacity-20 transition-opacity"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center w-full px-4 pb-2">
        <div className="book-container relative w-full max-w-4xl aspect-[4/3] max-h-[75vh]">
          {!open && (
            <div
              ref={coverRef}
              onClick={openBook}
              className="book-hard-cover book-front-cover absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-white/90 tracking-tight">Om Senjalia</div>
              <div className="font-body text-sm text-white/60 mt-2">Notebook & Portfolio</div>
              <div className="font-body text-[10px] text-white/25 mt-8 tracking-widest uppercase">click to open</div>
            </div>
          )}

          {open && (
            <div className="relative w-full h-full flex" style={{ transformStyle: "preserve-3d" }}>
              <div className="relative w-1/2 h-full book-page" style={{ borderRadius: "3px 0 0 3px" }}>
                <div className="absolute inset-0 book-page-inner opacity-[0.06]" />
                <div className="relative h-full flex flex-col justify-center items-center p-8">
                  <div className="w-16 h-16 border border-accent/20 rotate-45 mb-4" />
                  <div className="text-[10px] text-ink-faint/30 font-display tracking-[0.3em] uppercase">Endpaper</div>
                </div>
              </div>

              <div className="relative w-1/2 h-full book-page" style={{ borderRadius: "0 3px 3px 0" }}>
                <div className="absolute inset-0 book-page-inner opacity-[0.07]" />
                <div className="relative h-full flex flex-col">
                  <div className="px-6 pt-6 pb-2 border-b border-border/40">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-accent font-bold tabular-nums">{page}</span>
                      <span className="text-[10px] text-ink-muted">/</span>
                      <span className="text-[10px] text-ink-muted tabular-nums">{total}</span>
                      <span className="ml-2 text-[11px] font-display font-bold text-ink tracking-tight">
                        {pages[page - 1]?.title}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {pages[page - 1]?.render({ profile, cv, now, uses, pins, isAdmin })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 py-2">
        <button
          onClick={() => go(1)}
          disabled={page <= 1}
          className="text-[10px] font-bold tracking-widest text-ink-muted uppercase hover:text-ink disabled:opacity-20 transition-all"
        >
          ◀◀
        </button>
        <button
          onClick={prev}
          disabled={page <= 1}
          className="text-[10px] font-bold tracking-widest text-ink-muted uppercase hover:text-ink disabled:opacity-20 transition-all"
        >
          ◀
        </button>
        <input
          type="text"
          value={page}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            if (!isNaN(v)) go(v);
          }}
          className="w-10 text-center text-xs border border-border rounded-none bg-transparent text-ink outline-none font-body tabular-nums"
        />
        <button
          onClick={next}
          disabled={page >= total}
          className="text-[10px] font-bold tracking-widest text-ink-muted uppercase hover:text-ink disabled:opacity-20 transition-all"
        >
          ▶
        </button>
        <button
          onClick={() => go(total)}
          disabled={page >= total}
          className="text-[10px] font-bold tracking-widest text-ink-muted uppercase hover:text-ink disabled:opacity-20 transition-all"
        >
          ▶▶
        </button>
      </div>

      <div className="h-4" />
    </div>
  );
}
