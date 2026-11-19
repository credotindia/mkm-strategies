"use client";

import { useEffect, useRef } from "react";

type LoopVideoProps = { src: string; poster: string; className?: string };

export function LoopVideo({ src, poster, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduce.matches) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "25% 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return <video ref={ref} src={src} poster={poster} className={className} muted loop playsInline preload="none" />;
}
