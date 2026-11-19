import { ArrowLink } from "@/components/arrow-link";
import { Logo } from "@/components/brand/logo";
import { MobileMenu } from "@/components/mobile-menu";
import { TransitionLink } from "@/components/page-transition";
import { mainNav, primaryCta } from "@/config/navigation";

export function SiteHeader() {
  return (
    <header className="border-b border-mist bg-paper">
      <div className="page-x flex h-20 items-center justify-between gap-8">
        <TransitionLink href="/" className="text-navy">
          <Logo className="h-8 w-auto" />
        </TransitionLink>
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex gap-8 font-ui text-sm font-medium whitespace-nowrap">
            {mainNav.map((item) => (
              <li key={item.href}>
                <TransitionLink href={item.href} className="hover:text-azure">
                  {item.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden xl:flex">
          <ArrowLink href={primaryCta.href} variant="solid">
            {primaryCta.label}
          </ArrowLink>
        </div>
        <button
          type="button"
          popoverTarget="mobile-menu"
          aria-label="Open menu"
          className="-mr-2.5 grid size-11 place-items-center text-navy xl:hidden"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <MobileMenu />
      </div>
    </header>
  );
}
