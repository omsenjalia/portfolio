import type { Metadata } from "next";
import { getUses } from "@/lib/content";

export const metadata: Metadata = {
  title: "Uses",
};

export default async function Uses() {
  const uses = await getUses();

  const items: { label: string; value: string }[] = [
    { label: "OS", value: uses.os },
    { label: "WM", value: uses.wm },
    { label: "Terminal", value: uses.terminal },
    { label: "Editor", value: uses.editor },
  ].filter((i) => i.value);

  return (
    <div className="max-w-page mx-auto px-6 pt-12 pb-16">
      <div className="max-w-prose mx-auto">
        <div className="notebook-header-line mb-6"></div>
        <h1 className="text-2xl font-bold font-display text-ink mb-1">/uses</h1>
        <p className="text-xs font-body text-ink-faint mb-6">Current setup.</p>

        <div className="space-y-2 mb-8 font-body text-sm">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between px-3 py-2 border border-border rounded-sm"
            >
              <span className="text-xs uppercase tracking-widest text-ink-faint font-bold">
                {item.label}
              </span>
              <span className="text-ink">{item.value}</span>
            </div>
          ))}
        </div>

        {uses.ai.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-bold tracking-widest font-body text-ink-faint uppercase mb-3">
              AI Tools
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {uses.ai.map((tool, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 border border-border rounded-sm text-xs font-body text-ink"
                >
                  {tool}
                </span>
              ))}
            </div>
          </section>
        )}

        {uses.homelab.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-bold tracking-widest font-body text-ink-faint uppercase mb-3">
              Homelab
            </h2>
            <ul className="list-disc list-inside font-body text-sm text-ink space-y-0.5">
              {uses.homelab.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {uses.dotfiles && (
          <section>
            <h2 className="text-xs font-bold tracking-widest font-body text-ink-faint uppercase mb-3">
              Dotfiles
            </h2>
            <a
              href={uses.dotfiles}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-body text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
            >
              {uses.dotfiles} →
            </a>
          </section>
        )}
      </div>
    </div>
  );
}
