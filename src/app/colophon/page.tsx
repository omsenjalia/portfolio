import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colophon",
};

export default function Colophon() {
  return (
    <div className="max-w-page mx-auto px-6 pt-12 pb-16">
      <div className="max-w-prose mx-auto">
        <div className="notebook-header-line mb-6"></div>
        <h1 className="text-2xl font-bold font-display text-ink mb-6">Colophon</h1>

        <section className="mb-6">
          <h2 className="text-xs font-bold tracking-widest font-body text-ink-faint uppercase mb-2">
            Technology
          </h2>
          <ul className="space-y-1.5 font-body text-sm text-ink">
            <li>
              <strong className="font-bold">Next.js 16</strong> — React framework
              with App Router
            </li>
            <li>
              <strong className="font-bold">Tailwind CSS v4</strong> — CSS-first
              design tokens
            </li>
            <li>
              <strong className="font-bold">Auth.js v5</strong> — GitHub OAuth
              for admin
            </li>
            <li>
              <strong className="font-bold">GSAP + Lenis</strong> — Animations
              and smooth scroll
            </li>
            <li>
              <strong className="font-bold">react-markdown</strong> — Markdown
              rendering
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xs font-bold tracking-widest font-body text-ink-faint uppercase mb-2">
            Design
          </h2>
          <ul className="space-y-1.5 font-body text-sm text-ink">
            <li>
              <strong className="font-bold">Syne</strong> +{" "}
              <strong className="font-bold">DM Mono</strong> — Display + body
              fonts from Google Fonts
            </li>
            <li>
              <strong className="font-bold">Terracotta</strong> (#C4713B) — Warm
              accent on cream paper (#F4F0E6)
            </li>
            <li>
              <strong className="font-bold">Notebook/zine</strong> — Warm,
              minimal, tactile
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xs font-bold tracking-widest font-body text-ink-faint uppercase mb-2">
            Data
          </h2>
          <p className="font-body text-sm text-ink leading-relaxed">
            GitHub is the database. Content lives in the portfolio-content repo
            and is fetched via the GitHub API.
          </p>
        </section>

        <section>
          <h2 className="text-xs font-bold tracking-widest font-body text-ink-faint uppercase mb-2">
            Deployment
          </h2>
          <p className="font-body text-sm text-ink leading-relaxed">
            Built with <code className="bg-surface-elevated px-1 rounded-sm text-accent">npm run build</code> and hosted on Vercel.{" "}
            <a
              href="https://github.com/omsenjalia/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
            >
              Source →
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
