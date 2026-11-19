"use client";

import type { MouseEvent } from "react";
import { Logo } from "@/components/brand/logo";
import { TransitionLink } from "@/components/page-transition";
import { mainNav, primaryCta } from "@/config/navigation";

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`size-4 shrink-0 ${className}`}
    >
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}

function closeOnLink(event: MouseEvent<HTMLDivElement>) {
  if ((event.target as Element).closest("a")) event.currentTarget.hidePopover();
}

export function MobileMenu() {
  return (
    <div
      id="mobile-menu"
      popover="auto"
      onClick={closeOnLink}
      className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-paper p-0 text-ink"
    >
      <div className="flex h-full flex-col">
        <div className="page-x flex h-20 shrink-0 items-center justify-between border-b border-mist">
          <TransitionLink href="/" className="text-navy">
            <Logo className="h-8 w-auto" />
          </TransitionLink>
          <button
            type="button"
            popoverTarget="mobile-menu"
            popoverTargetAction="hide"
            aria-label="Close menu"
            className="-mr-2.5 grid size-11 place-items-center text-navy"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="page-x flex-1 overflow-y-auto overscroll-contain">
          {mainNav.map((item) => (
            <details key={item.href} name="mobile-nav" className="group border-b border-mist">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between font-ui font-medium text-navy [&::-webkit-details-marker]:hidden">
                {item.label}
                <Chevron className="transition-transform group-open:rotate-90" />
              </summary>
              <ul className="pb-3">
                {item.groups
                  .flatMap((group) => group.links)
                  .map((link) => (
                    <li key={link.href}>
                      <TransitionLink href={link.href} className="flex min-h-11 items-center justify-between gap-4 pl-3 text-sm">
                        {link.label}
                        <Chevron className="text-navy/40" />
                      </TransitionLink>
                    </li>
                  ))}
                <li>
                  <TransitionLink
                    href={item.footerLink.href}
                    className="mt-1 flex min-h-11 items-center justify-between gap-4 rounded bg-mist/70 px-3 text-sm font-semibold text-navy"
                  >
                    {item.footerLink.label}
                    <Chevron />
                  </TransitionLink>
                </li>
              </ul>
            </details>
          ))}
        </nav>

        <div className="page-x shrink-0 border-t border-mist pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <TransitionLink
            href={primaryCta.href}
            className="block rounded bg-navy py-3.5 text-center font-ui text-sm font-semibold text-white"
          >
            {primaryCta.label}
          </TransitionLink>
          <button
            type="button"
            popoverTarget="mobile-menu"
            popoverTargetAction="hide"
            className="mt-1 min-h-11 w-full text-sm text-navy/70"
          >
            Close menu
          </button>
        </div>
      </div>
    </div>
  );
}
