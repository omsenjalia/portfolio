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
    <div className="fixed inset-0 z-modal flex items-center justify-center bg-ink/30 backdrop-blur-sm">
      <div className="bg-paper border border-border rounded-sm shadow-lg max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="text-sm font-bold font-body tracking-widest text-ink uppercase">
            Edit Pins
          </h3>
          <button
            onClick={onCancel}
            className="text-ink-faint hover:text-ink transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-3">
          {localPins.map((pin, i) => (
            <div key={i} className="p-3 border border-border-light rounded-sm space-y-2 text-xs font-body">
              <div className="flex items-center justify-between">
                <select
                  value={pin.type}
                  onChange={(e) => updatePin(i, "type", e.target.value)}
                  className="bg-surface border border-border rounded-sm px-2 py-1 text-ink text-xs font-body"
                >
                  <option value="url">🔗 URL</option>
                  <option value="github">📦 GitHub</option>
                  <option value="note">📝 Note</option>
                </select>
                <button
                  onClick={() => removePin(i)}
                  className="text-error hover:text-error/80 transition-colors text-xs"
                >
                  remove
                </button>
              </div>
              <input
                placeholder="Label"
                value={pin.label}
                onChange={(e) => updatePin(i, "label", e.target.value)}
                className="w-full bg-surface border border-border rounded-sm px-2 py-1 text-ink placeholder:text-ink-faint"
              />
              {pin.type !== "note" ? (
                <input
                  placeholder="URL"
                  value={pin.url || ""}
                  onChange={(e) => updatePin(i, "url", e.target.value)}
                  className="w-full bg-surface border border-border rounded-sm px-2 py-1 text-ink placeholder:text-ink-faint"
                />
              ) : (
                <textarea
                  placeholder="Content"
                  value={pin.content || ""}
                  onChange={(e) => updatePin(i, "content", e.target.value)}
                  rows={3}
                  className="w-full bg-surface border border-border rounded-sm px-2 py-1 text-ink placeholder:text-ink-faint resize-none"
                />
              )}
              <input
                placeholder="Description (optional)"
                value={pin.desc || ""}
                onChange={(e) => updatePin(i, "desc", e.target.value)}
                className="w-full bg-surface border border-border rounded-sm px-2 py-1 text-ink placeholder:text-ink-faint"
              />
            </div>
          ))}

          <button
            onClick={addPin}
            className="w-full py-2 border border-dashed border-border-light rounded-sm text-xs font-body text-ink-faint hover:text-accent hover:border-accent transition-colors"
          >
            + add pin
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 px-4 py-3 border-t border-border">
          <button
            onClick={onCancel}
            disabled={saving}
            className="text-xs font-body text-ink-muted hover:text-ink transition-colors underline underline-offset-2"
          >
            cancel
          </button>
          <button
            onClick={() => onSave(localPins)}
            disabled={saving}
            className="px-4 py-1.5 text-xs font-body bg-accent text-paper rounded-sm hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            {saving ? "saving..." : "save"}
          </button>
        </div>
      </div>
    </div>
  );
}
