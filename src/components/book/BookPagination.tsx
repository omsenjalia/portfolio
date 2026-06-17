"use client";

import { useState, useCallback, type KeyboardEvent } from "react";

type Props = {
  spread: number;
  totalSpreads: number;
  leftPageIdx: number;
  rightPageIdx: number;
  onPrev: () => void;
  onNext: () => void;
  onGoToSpread: (n: number) => void;
};

function SkipStart({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title="Skip to start"
      className="cursor-pointer p-1 hover:text-ink disabled:cursor-not-allowed disabled:text-ink-muted disabled:opacity-50 transition-all duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
          <path d="M5 12l7 -7M5 12l7 7" />
          <path d="M11 12l7 -7M11 12l7 7" />
        </g>
      </svg>
    </button>
  );
}

function Prev({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title="Previous"
      className="cursor-pointer p-1 hover:text-ink disabled:cursor-not-allowed disabled:text-ink-muted disabled:opacity-50 transition-all duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12l7 -7M8 12l7 7" />
      </svg>
    </button>
  );
}

function Next({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title="Next"
      className="cursor-pointer p-1 hover:text-ink disabled:cursor-not-allowed disabled:text-ink-muted disabled:opacity-50 transition-all duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l-7 -7M16 12l-7 7" />
      </svg>
    </button>
  );
}

function SkipEnd({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title="Skip to end"
      className="cursor-pointer p-1 hover:text-ink disabled:cursor-not-allowed disabled:text-ink-muted disabled:opacity-50 transition-all duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
          <path d="M19 12l-7 -7M19 12l-7 7" />
          <path d="M13 12l-7 -7M13 12l-7 7" />
        </g>
      </svg>
    </button>
  );
}

function PageNumberInput({
  leftPageIdx,
  rightPageIdx,
  onChange,
}: {
  leftPageIdx: number;
  rightPageIdx: number;
  onChange: (page: number) => void;
}) {
  const firstPage = leftPageIdx + 1;
  const lastPage = rightPageIdx + 1;
  const label = `${firstPage}–${lastPage}`;

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const n = parseInt(value, 10);
        if (!isNaN(n) && n >= 1) {
          onChange(n);
        }
        setEditing(false);
      }
      if (e.key === "Escape") {
        setEditing(false);
      }
    },
    [value, onChange]
  );

  if (editing) {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => setEditing(false)}
        autoFocus
        className="w-16 rounded py-1 pt-1.5 text-center text-sm outline-none focus:outline-none text-ink"
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      className="cursor-pointer w-16 rounded py-1 pt-1.5 text-center text-sm text-ink-muted hover:text-ink transition-all duration-300"
    >
      {label}
    </span>
  );
}

export default function BookPagination({
  spread,
  totalSpreads,
  leftPageIdx,
  rightPageIdx,
  onPrev,
  onNext,
  onGoToSpread,
}: Props) {
  return (
    <div className="flex min-h-6 w-full items-center justify-between px-4">
      <div className="flex items-center gap-1">
        <SkipStart onClick={() => onGoToSpread(1)} disabled={spread <= 1} />
        <Prev onClick={onPrev} disabled={spread <= 1} />
      </div>
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="text-ink-muted">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12l7 -7M5 12l7 7" />
        </svg>
        <PageNumberInput leftPageIdx={leftPageIdx} rightPageIdx={rightPageIdx} onChange={(n) => onGoToSpread(Math.ceil(n / 2))} />
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="text-ink-muted">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l-7 -7M16 12l-7 7" />
        </svg>
      </div>
      <div className="flex items-center gap-1">
        <Next onClick={onNext} disabled={spread >= totalSpreads} />
        <SkipEnd onClick={() => onGoToSpread(totalSpreads)} disabled={spread >= totalSpreads} />
      </div>
    </div>
  );
}
