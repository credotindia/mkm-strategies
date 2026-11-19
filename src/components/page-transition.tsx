"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createContext,
  startTransition,
  use,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";

const EASE_IN = "cubic-bezier(0.5, 0, 0.75, 0)";
const EASE_OUT = "cubic-bezier(0.25, 1, 0.5, 1)";

const TransitionContext = createContext<(href: string) => boolean>(() => false);

function slide(el: HTMLElement, translate: string[], options: KeyframeAnimationOptions) {
  return el
    .animate({ translate, visibility: ["visible", "visible"] }, { ...options, fill: "forwards" })
    .finished.catch(() => undefined);
}

export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const panel = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const navigated = useRef(false);
  const [reveal, setReveal] = useState(0);

  useEffect(() => {
    const navigation = (window as Window & { navigation?: EventTarget }).navigation;
    const reset = (event: Event) => {
      if (event instanceof PageTransitionEvent && !event.persisted) return;
      panel.current?.getAnimations().forEach((animation) => animation.cancel());
      busy.current = false;
    };
    window.addEventListener("pageshow", reset);
    navigation?.addEventListener("navigateerror", reset);
    return () => {
      window.removeEventListener("pageshow", reset);
      navigation?.removeEventListener("navigateerror", reset);
    };
  }, []);

  useLayoutEffect(() => {
    const el = panel.current;
    if (!reveal || !el?.getAnimations().length) return;
    if (navigated.current) {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? (document.getElementById(id) ?? document.getElementsByName(id)[0]) : null;
      if (!target?.getClientRects().length) window.scrollTo(0, 0);
    }
    slide(el, ["0 0", "0 100%"], { duration: 1200, delay: 100, easing: EASE_OUT }).then(() => {
      el.getAnimations().forEach((animation) => animation.cancel());
      busy.current = false;
    });
  }, [reveal]);

  function start(href: string) {
    if (busy.current) return true;
    const el = panel.current;
    const url = new URL(href, window.location.href);
    const samePage = url.pathname === window.location.pathname && url.search === window.location.search;
    if (!el || samePage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

    busy.current = true;
    const interrupted = new AbortController();
    window.addEventListener("popstate", () => interrupted.abort(), { signal: interrupted.signal });
    window.addEventListener("pagehide", () => interrupted.abort(), { signal: interrupted.signal });
    router.prefetch(href);
    slide(el, ["0 -100%", "0 0"], { duration: 1000, easing: EASE_IN }).then(() => {
      if (!busy.current) return;
      navigated.current = !interrupted.signal.aborted;
      interrupted.abort();
      startTransition(() => {
        setReveal((count) => count + 1);
        if (navigated.current) router.push(href);
      });
    });
    return true;
  }

  return (
    <TransitionContext value={start}>
      {children}
      <div ref={panel} aria-hidden="true" className="invisible fixed inset-0 z-90 bg-navy" />
    </TransitionContext>
  );
}

type TransitionLinkProps = Omit<
  ComponentProps<typeof Link>,
  "href" | "onNavigate" | "replace" | "scroll" | "transitionTypes"
> & { href: string };

export function TransitionLink({ href, ...props }: TransitionLinkProps) {
  const start = use(TransitionContext);
  return (
    <Link
      {...props}
      href={href}
      onNavigate={(event) => {
        if (start(href)) event.preventDefault();
      }}
    />
  );
}
