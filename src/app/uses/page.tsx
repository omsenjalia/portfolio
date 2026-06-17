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
    <div className="max-w-prose mx-auto px-6 py-section">
      <h1 className="text-4xl font-display font-bold text-ink mb-2">/uses</h1>
      <p className="text-sm font-body text-ink-faint mb-8">
        My current development setup.
      </p>

      <div className="grid gap-4 mb-8">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-4 py-3 bg-surface border border-border rounded-lg"
          >
            <span className="text-sm font-body text-ink-muted">{item.label}</span>
            <span className="text-sm font-body text-ink font-medium">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {uses.ai.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-display font-bold text-ink mb-3">
            AI Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {uses.ai.map((tool, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-surface-elevated border border-border-light rounded-full text-sm font-body text-ink"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>
      )}

      {uses.homelab.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-display font-bold text-ink mb-3">
            Homelab
          </h2>
          <ul className="list-disc list-inside font-body text-ink text-sm space-y-1">
            {uses.homelab.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {uses.dotfiles && (
        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">
            Dotfiles
          </h2>
          <a
            href={uses.dotfiles}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover transition-colors font-body text-sm"
          >
            {uses.dotfiles} →
          </a>
        </section>
      )}
    </div>
  );
}
