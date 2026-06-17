"use client";

import type { ReactNode } from "react";

type Props = {
  leftPage: {
    content: ReactNode;
    title: string;
    pageNum: number;
  };
  rightPage: {
    content: ReactNode;
    title: string;
    pageNum: number;
  };
};

export default function BookSpread({ leftPage, rightPage }: Props) {
  return (
    <div className="relative w-full h-full flex">
      {/* LEFT PAGE */}
      <div className="relative w-[calc(50%-14px)] h-full book-page book-page-left">
        <div className="absolute inset-0 book-page-texture opacity-[0.04]" />
        <div className="absolute inset-0 shadow-[inset_-8px_0_10px_-6px_rgba(0,0,0,0.06)] pointer-events-none" />
        <div className="relative h-full flex flex-col">
          <div className="px-8 pt-8 pb-1">
            <span className="text-[10px] text-ink-faint font-bold tabular-nums font-mono">{leftPage.pageNum}</span>
          </div>
          <div className="flex-1 overflow-y-auto px-8 pb-2 book-page-content">
            {leftPage.content}
          </div>
          <div className="px-8 pb-5 text-center">
            <span className="text-[9px] text-ink-faint/50 font-body tracking-wider">{leftPage.title}</span>
          </div>
        </div>
      </div>

      {/* SPINE */}
      <div className="relative w-[28px] h-full flex-shrink-0">
        <div className="book-spine absolute inset-0" />
        <div className="absolute inset-y-0 left-0 w-[4px] bg-gradient-to-r from-black/25 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[4px] bg-gradient-to-l from-black/15 to-transparent" />
        <div className="absolute left-1/2 top-6 bottom-6 w-px bg-white/5 -translate-x-1/2" />
      </div>

      {/* RIGHT PAGE */}
      <div className="relative w-[calc(50%-14px)] h-full book-page book-page-right">
        <div className="absolute inset-0 book-page-texture opacity-[0.04]" />
        <div className="absolute inset-0 shadow-[inset_8px_0_10px_-6px_rgba(0,0,0,0.06)] pointer-events-none" />
        <div className="relative h-full flex flex-col">
          <div className="px-8 pt-8 pb-1">
            <span className="text-[10px] text-ink-faint font-bold tabular-nums font-mono">{rightPage.pageNum}</span>
          </div>
          <div className="flex-1 overflow-y-auto px-8 pb-2 book-page-content">
            {rightPage.content}
          </div>
          <div className="px-8 pb-5 text-center">
            <span className="text-[9px] text-ink-faint/50 font-body tracking-wider">{rightPage.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
