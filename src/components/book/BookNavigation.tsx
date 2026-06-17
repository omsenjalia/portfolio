"use client";

type Props = {
  onGoToPage: (page: number) => void;
  onToggleBookmarks: () => void;
  bookmarksOpen: boolean;
  showBookmarks: boolean;
};

export default function BookNavigation({ onGoToPage, onToggleBookmarks, bookmarksOpen, showBookmarks }: Props) {
  return (
    <div className="flex w-full items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onGoToPage(1)}
          className="cursor-pointer text-sm font-bold tracking-widest text-ink-muted uppercase hover:text-ink transition-all duration-300"
        >
          TOC
        </button>
      </div>

      <div className="flex items-center gap-2">
        {showBookmarks && (
          <button
            onClick={onToggleBookmarks}
            className="cursor-pointer text-sm font-bold tracking-widest text-ink-muted uppercase hover:underline hover:text-ink transition-all duration-300"
          >
            {bookmarksOpen ? "Close" : "Bookmarks"}
          </button>
        )}
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="text-ink-muted">
          <path fill="currentColor" d="M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0a5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.98 2.98 0 0 0 0-4.24a2.98 2.98 0 0 0-4.24 0l-3.53 3.53a2.98 2.98 0 0 0 0 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0a5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.98 2.98 0 0 0 0 4.24a2.98 2.98 0 0 0 4.24 0l3.53-3.53a2.98 2.98 0 0 0 0-4.24a.973.973 0 0 1 0-1.42" />
        </svg>
      </div>
    </div>
  );
}
