import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colophon",
};

export default function Colophon() {
  return (
    <div className="max-w-prose mx-auto px-6 py-section">
      <h1 className="text-4xl font-display font-bold text-ink mb-2">Colophon</h1>
      <p className="text-sm font-body text-ink-faint mb-8">
        How this site is built and why.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-display font-bold text-ink mb-3">
          Technology
        </h2>
        <ul className="space-y-3 font-body text-ink text-sm">
          <li>
            <strong className="font-bold">Next.js 16</strong> — React framework
            with App Router and server components
          </li>
          <li>
            <strong className="font-bold">Tailwind CSS v4</strong> — CSS-first
            utility framework with custom design tokens
          </li>
          <li>
            <strong className="font-bold">Auth.js v5</strong> — GitHub OAuth
            for admin authentication
          </li>
          <li>
            <strong className="font-bold">GSAP</strong> — Animation library
            (future phases)
          </li>
          <li>
            <strong className="font-bold">Lenis</strong> — Smooth scrolling
            (future phases)
          </li>
          <li>
            <strong className="font-bold">react-markdown</strong> — Markdown
            rendering for content pages
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-display font-bold text-ink mb-3">
          Design
        </h2>
        <ul className="space-y-3 font-body text-ink text-sm">
          <li>
            <strong className="font-bold">Typography:</strong> Syne (display) +
            DM Mono (body/code) — both from Google Fonts
          </li>
          <li>
            <strong className="font-bold">Accent:</strong> Warm terracotta (#C4713B)
          </li>
          <li>
            <strong className="font-bold">Palette:</strong> Cream paper (#F4F0E6),
            ink (#1B1A17), subtle noise texture overlay
          </li>
          <li>
            <strong className="font-bold">Aesthetic:</strong> Notebook / zine —
            warm, minimal, tactile
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-display font-bold text-ink mb-3">
          Data
        </h2>
        <p className="font-body text-ink text-sm leading-relaxed">
          This site uses GitHub as its database. Content is stored in the
          portfolio-content repository and fetched via the GitHub API at build
          and request time. This approach keeps the site fast while allowing
          easy content updates through git.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-ink mb-3">
          Deployment
        </h2>
        <p className="font-body text-ink text-sm leading-relaxed">
          Built with <code className="bg-surface-elevated px-1 rounded text-accent">npm run build</code> and deployed on Vercel.
          Source code available on{" "}
          <a
            href="https://github.com/omsenjalia/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover transition-colors"
          >
            GitHub
          </a>
          .
        </p>
      </section>
    </div>
  );
}
