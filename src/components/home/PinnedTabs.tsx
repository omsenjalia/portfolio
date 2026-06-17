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
    <section className="max-w-page mx-auto px-6 py-section">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-ink">📌 Pinned</h2>
        {isAdmin && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-body text-ink-muted hover:text-accent border border-border rounded-md hover:border-accent transition-colors"
          >
            ✏️ Edit
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {pins.map((pin, i) => (
          <a
            key={i}
            href={pin.url || "#"}
            target={pin.url ? "_blank" : undefined}
            rel={pin.url ? "noopener noreferrer" : undefined}
            className="group relative flex items-center gap-2 px-4 py-2.5 bg-surface border border-border rounded-lg hover:border-accent hover:shadow-sm transition-all cursor-pointer"
          >
            <span className="text-base">{typeIcons[pin.type]}</span>
            <div>
              <span className="text-sm font-body text-ink font-medium">
                {pin.label}
              </span>
              {pin.desc && (
                <span className="hidden group-hover:block absolute top-full left-0 mt-1 px-3 py-1.5 bg-ink text-paper text-xs font-body rounded-md shadow-lg whitespace-nowrap z-above">
                  {pin.desc}
                </span>
              )}
            </div>
          </a>
        ))}
        {pins.length === 0 && (
          <p className="text-sm font-body text-ink-faint">No pins yet.</p>
        )}
      </div>

      {editing && (
        <PinnedTabsEditor
          pins={pins}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
          saving={saving}
        />
      )}
    </section>
  );
}
