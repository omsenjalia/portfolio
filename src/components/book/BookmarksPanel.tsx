"use client";

import { forwardRef } from "react";
import type { Pin } from "@/lib/content";

const BookmarksPanel = forwardRef<HTMLDivElement, { pins: Pin[]; onClose: () => void }>(
  ({ pins, onClose }, ref) => (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/5" onClick={onClose} />
      <div
        ref={ref}
        className="relative w-80 max-w-[85vw] h-full bg-background shadow-2xl border-l border-ink-border/40 overflow-y-auto"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-border/40">
          <h3 className="text-sm font-bold font-display text-ink tracking-tight">Bookmarks</h3>
          <button onClick={onClose} className="text-xs text-ink-muted hover:text-ink transition-colors">
            &times;
          </button>
        </div>
        <div className="p-4 space-y-3">
          {pins.length === 0 ? (
            <p className="text-xs text-ink-faint italic">No bookmarks saved yet.</p>
          ) : (
            pins.map((pin, i) => (
              <div key={i} className="p-3 rounded-md border border-ink-border/30 hover:bg-background/30 transition-colors">
                {pin.type === "github" || pin.type === "url" ? (
                  <a href={pin.url} target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-accent font-bold uppercase font-mono">{pin.type}</span>
                      <span className="text-xs font-bold text-ink group-hover:text-accent transition-colors">
                        {pin.label}
                      </span>
                    </div>
                    {pin.desc && <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">{pin.desc}</p>}
                  </a>
                ) : (
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-success font-bold uppercase font-mono">note</span>
                      <span className="text-xs font-bold text-ink">{pin.label}</span>
                    </div>
                    {pin.content && <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">{pin.content}</p>}
                    {pin.desc && <p className="text-[10px] text-ink-faint mt-0.5">{pin.desc}</p>}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
);
BookmarksPanel.displayName = "BookmarksPanel";

export default BookmarksPanel;
