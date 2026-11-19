import type { ComponentProps } from "react";
import { TransitionLink } from "@/components/page-transition";
import "./arrow-link.css";

type ArrowLinkProps = ComponentProps<typeof TransitionLink> & { variant?: "outline" | "solid" | "light" };

function Arrow({ className = "" }: { className?: string }) {
  return (
    <span className={`arrow-link-icon ${className}`}>
      <svg viewBox="0 0 10 10" fill="none" stroke="currentColor">
        <path d="M1 9 9 1M2.5 1H9v6.5" />
      </svg>
    </span>
  );
}

export function ArrowLink({ variant = "outline", className = "", children, ...props }: ArrowLinkProps) {
  return (
    <TransitionLink {...props} className={`arrow-link arrow-link-${variant} ${className}`}>
      <span className="arrow-link-label">{children}</span>
      <span className="arrow-link-box" aria-hidden="true">
        <Arrow />
        <Arrow className="arrow-link-icon-in" />
      </span>
    </TransitionLink>
  );
}
