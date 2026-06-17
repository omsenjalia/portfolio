"use client";

import { useState } from "react";
import type { Pin } from "@/lib/content";

type Props = {
  pins: Pin[];
  onSave: (pins: Pin[]) => void;
  onCancel: () => void;
  saving: boolean;
};

export default function PinnedTabsEditor({ pins, onSave, onCancel, saving }: Props) {
  const [localPins, setLocalPins] = useState<Pin[]>(
    pins.length > 0
      ? pins
      : [{ type: "url", label: "", url: "", desc: "" }]
  );

  function updatePin(i: number, field: keyof Pin, value: string) {
    setLocalPins((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: value };
      return next;
    });
  }

  function addPin() {
    setLocalPins((prev) => [...prev, { type: "url", label: "", url: "", desc: "" }]);
  }

  function removePin(i: number) {
    setLocalPins((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center bg-ink/20 backdrop-blur-sm">
      <div className="bg-paper border border-border rounded-xl shadow-lg max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-display font-bold text-ink">Edit Pins</h3>
          <button
            onClick={onCancel}
            className="text-ink-faint hover:text-ink transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4">
          {localPins.map((pin, i) => (
            <div key={i} className="p-3 bg-surface-elevated border border-border-light rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <select
                  value={pin.type}
                  onChange={(e) => updatePin(i, "type", e.target.value)}
                  className="text-xs font-body bg-surface border border-border rounded px-2 py-1 text-ink"
                >
                  <option value="url">🔗 URL</option>
                  <option value="github">📦 GitHub</option>
                  <option value="note">📝 Note</option>
                </select>
                <button
                  onClick={() => removePin(i)}
                  className="text-xs text-error hover:text-error/80 transition-colors"
                >
                  Remove
                </button>
              </div>
              <input
                placeholder="Label"
                value={pin.label}
                onChange={(e) => updatePin(i, "label", e.target.value)}
                className="w-full text-sm font-body bg-surface border border-border rounded px-2 py-1.5 text-ink placeholder:text-ink-faint"
              />
              {pin.type !== "note" ? (
                <input
                  placeholder="URL"
                  value={pin.url || ""}
                  onChange={(e) => updatePin(i, "url", e.target.value)}
                  className="w-full text-sm font-body bg-surface border border-border rounded px-2 py-1.5 text-ink placeholder:text-ink-faint"
                />
              ) : (
                <textarea
                  placeholder="Content"
                  value={pin.content || ""}
                  onChange={(e) => updatePin(i, "content", e.target.value)}
                  rows={3}
                  className="w-full text-sm font-body bg-surface border border-border rounded px-2 py-1.5 text-ink placeholder:text-ink-faint resize-none"
                />
              )}
              <input
                placeholder="Description (optional)"
                value={pin.desc || ""}
                onChange={(e) => updatePin(i, "desc", e.target.value)}
                className="w-full text-sm font-body bg-surface border border-border rounded px-2 py-1.5 text-ink placeholder:text-ink-faint"
              />
            </div>
          ))}

          <button
            onClick={addPin}
            className="w-full py-2 border-2 border-dashed border-border-light rounded-lg text-sm font-body text-ink-faint hover:text-accent hover:border-accent transition-colors"
          >
            + Add Pin
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t border-border">
          <button
            onClick={onCancel}
            disabled={saving}
            className="px-4 py-2 text-sm font-body text-ink-muted hover:text-ink transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(localPins)}
            disabled={saving}
            className="px-4 py-2 text-sm font-body bg-accent text-paper rounded-md hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
