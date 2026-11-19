import { cacheLife } from "next/cache";
import { Logo } from "@/components/brand/logo";
import { TransitionLink } from "@/components/page-transition";
import { exploreLinks, legalLinks, mainNav, type NavLink } from "@/config/navigation";
import { site } from "@/config/site";

async function copyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const linksOf = (label: string): NavLink[] =>
  mainNav.find((item) => item.label === label)?.groups.flatMap((group) => group.links) ?? [];

const columns = [
  { heading: "Who We Help", links: linksOf("Who We Help") },
  { heading: "What We Do", links: linksOf("What We Do") },
  { heading: "Explore", links: exploreLinks },
];

export async function SiteFooter() {
  const year = await copyrightYear();

  return (
    <footer className="bg-navy text-white">
      <div className="page-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <Logo className="h-8 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-white/70">{site.description}</p>
        </div>

        {columns.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h2 className="eyebrow text-white/60">{column.heading}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <TransitionLink href={link.href} className="text-white/85 hover:text-white">
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="eyebrow text-white/60">Contact</h2>
          <address className="mt-4 space-y-4 text-sm not-italic text-white/85">
            {site.offices.map((office) => (
              <p key={office.label}>
                <span className="block font-semibold text-white">{office.label}</span>
                {office.lines.join(", ")}
              </p>
            ))}
            <p>
              <a href={site.contact.phone.href} className="hover:text-white">
                {site.contact.phone.display}
              </a>
              <br />
              <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                {site.contact.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="page-x flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-white/60">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <TransitionLink href={link.href} className="hover:text-white">
                  {link.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
