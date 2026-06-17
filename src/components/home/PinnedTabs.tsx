"use client";

import { useState, useCallback } from "react";
import type { Pin } from "@/lib/content";
import { savePins } from "@/actions/pinned";
import PinnedTabsEditor from "./PinnedTabsEditor";

type Props = {
  initialPins: Pin[];
  initialSha: string;
  isAdmin: boolean;
};

const typeIcons: Record<Pin["type"], string> = {
  github: "📦",
  url: "🔗",
  note: "📝",
};

export default function PinnedTabs({ initialPins, initialSha, isAdmin }: Props) {
  const [pins, setPins] = useState<Pin[]>(initialPins);
  const [sha, setSha] = useState(initialSha);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(async (newPins: Pin[]) => {
    setSaving(true);
    try {
      const result = await savePins(newPins, sha);
      if (result.ok) {
        setPins(newPins);
        setEditing(false);
        setSha("");
      }
    } catch (e) {
      console.error("Failed to save pins:", e);
    } finally {
      setSaving(false);
    }
  }, [sha]);

  return (
    <section className="max-w-page mx-auto px-6 pb-16">
      <div className="max-w-prose mx-auto">
        <div className="notebook-header-line mb-6"></div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold font-body tracking-widest text-ink uppercase">
            📌 Pinned
          </h2>
          {isAdmin && (
            <button
              onClick={() => setEditing(true)}
              className="text-xs font-body text-ink-faint hover:text-accent underline underline-offset-2 transition-colors"
            >
              ✏️ edit
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {pins.map((pin, i) => (
            <a
              key={i}
              href={pin.url || "#"}
              target={pin.url ? "_blank" : undefined}
              rel={pin.url ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-2 px-3 py-2 border border-border rounded-sm hover:border-accent transition-colors text-sm font-body"
            >
              <span>{typeIcons[pin.type]}</span>
              <span className="flex-1 text-ink">{pin.label}</span>
              {pin.desc && (
                <span className="hidden group-hover:inline text-xs text-ink-faint">
                  {pin.desc}
                </span>
              )}
            </a>
          ))}
          {pins.length === 0 && (
            <p className="text-sm font-body text-ink-faint italic">No pins yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
