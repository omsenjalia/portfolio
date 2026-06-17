"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const tickerRef = useRef<gsap.TickerCallback | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 });

    tickerRef.current = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerRef.current);
    gsap.ticker.lagSmoothing(0);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      lenis.destroy();
      return;
    }

    return () => {
      if (tickerRef.current) gsap.ticker.remove(tickerRef.current);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
