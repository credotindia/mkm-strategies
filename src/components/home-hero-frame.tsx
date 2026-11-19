"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HomeHeroFrame({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    const copy = el?.querySelector(".home-hero-copy");
    if (!el || !copy) return;
    const root = el.closest<HTMLElement>(".home-hero") ?? el;
    const observer = new ResizeObserver(([entry]) => {
      root.style.setProperty("--copy-h", `${Math.ceil(entry.borderBoxSize[0].blockSize)}px`);
    });
    observer.observe(copy);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frame} className="home-hero-frame">
      {children}
    </div>
  );
}
