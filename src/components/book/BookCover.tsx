"use client";

type Props = {
  onOpen: () => void;
  open: boolean;
  animating: boolean;
};

export default function BookCover({ onOpen, open, animating }: Props) {
  const state = open ? "book-cover-opened" : "";

  return (
    <div
      onClick={animating ? undefined : onOpen}
      className={`book-front-cover absolute inset-0 z-10 ${state}`}
      style={{
        transformStyle: "preserve-3d",
        cursor: animating ? "default" : "pointer",
      }}
    >
      <div className="book-hard-cover absolute inset-0 rounded-lg flex flex-col items-center justify-center">
        <div className="font-display text-4xl font-bold text-white/90 tracking-tight">Book of Life</div>
        <div className="w-24 h-px bg-white/20 my-4" />
        <div className="font-display text-base text-white/70 tracking-wide">Om Senjalia</div>
        <div className="font-body text-[10px] text-white/30 mt-10 tracking-widest uppercase">click to open</div>
      </div>
    </div>
  );
}
